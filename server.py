from __future__ import annotations

import html
import json
import os
import socket
import time
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Lock
from urllib.parse import parse_qs, urlparse


HOST = "0.0.0.0"
PORT = int(os.getenv("PORT", "8000"))
BASE_DIR = Path(__file__).resolve().parent
SITE_STATE_FILE = BASE_DIR / "site_state.json"
PLAYER_TTL_SECONDS = 12
MAX_PLAYERS_IN_RESPONSE = 64
MAX_CHAT_MESSAGES = 80

presence_lock = Lock()
presence_store: dict[str, dict] = {}
chat_messages: list[dict] = []


def load_site_state() -> dict:
    fallback = {
        "site_name": "Transformers Play",
        "site_description": "Transformers Play, Bayverse inspired 2D web combat deneyimi.",
        "site_url": f"http://127.0.0.1:{PORT}",
        "google_site_verification": "",
        "version": "0.4.0",
        "maintenance": False,
        "maintenance_message": "",
        "update_notes": [
            "Earth savas haritalari buyutuldu.",
            "Yeni temel karakterler eklendi.",
            "Lane sistemi ve yikilabilir cover geldi.",
        ],
        "shared_map": "iacon_heights",
    }
    try:
        data = json.loads(SITE_STATE_FILE.read_text(encoding="utf-8"))
        return {**fallback, **data}
    except Exception:
        return fallback


def prune_players() -> None:
    now = time.time()
    stale_keys = [key for key, value in presence_store.items() if now - value.get("updated_at", 0) > PLAYER_TTL_SECONDS]
    for key in stale_keys:
        presence_store.pop(key, None)


def local_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("8.8.8.8", 80))
            return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"


def normalize_site_url(url: str) -> str:
    value = (url or "").strip().rstrip("/")
    if not value:
        return f"http://127.0.0.1:{PORT}"
    return value


class AppHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path in ("", "/", "/index.html"):
            self.handle_index()
            return
        if parsed.path == "/api/status":
            self.handle_status()
            return
        if parsed.path == "/api/presence":
            self.handle_presence_get(parsed.query)
            return
        if parsed.path == "/api/chat":
            self.handle_chat_get(parsed.query)
            return
        if parsed.path == "/robots.txt":
            self.handle_robots()
            return
        if parsed.path == "/sitemap.xml":
            self.handle_sitemap()
            return
        super().do_GET()

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/presence":
            self.handle_presence_post()
            return
        if parsed.path == "/api/chat":
            self.handle_chat_post()
            return
        self.send_error(HTTPStatus.NOT_FOUND, "API endpoint not found")

    def log_message(self, format: str, *args) -> None:
        super().log_message(format, *args)

    def read_json_body(self) -> dict:
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        raw = self.rfile.read(length) if length > 0 else b"{}"
        try:
            return json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            return {}

    def send_json(self, payload: dict, status: HTTPStatus = HTTPStatus.OK) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.end_headers()
        self.wfile.write(body)

    def send_text(self, body: str, content_type: str, status: HTTPStatus = HTTPStatus.OK) -> None:
        data = body.encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", f"{content_type}; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.end_headers()
        self.wfile.write(data)

    def handle_index(self) -> None:
        site_state = load_site_state()
        site_url = normalize_site_url(site_state.get("site_url", ""))
        template = (BASE_DIR / "index.html").read_text(encoding="utf-8")
        rendered = (
            template
            .replace("__SITE_NAME__", html.escape(site_state.get("site_name", "Transformers Play")))
            .replace("__SITE_DESCRIPTION__", html.escape(site_state.get("site_description", "")))
            .replace("__SITE_URL__", html.escape(site_url))
            .replace("__GOOGLE_SITE_VERIFICATION__", html.escape(site_state.get("google_site_verification", "")))
        )
        self.send_text(rendered, "text/html")

    def handle_robots(self) -> None:
        site_state = load_site_state()
        site_url = normalize_site_url(site_state.get("site_url", ""))
        body = "\n".join(
            [
                "User-agent: *",
                "Allow: /",
                "",
                f"Sitemap: {site_url}/sitemap.xml",
                "",
            ]
        )
        self.send_text(body, "text/plain")

    def handle_sitemap(self) -> None:
        site_state = load_site_state()
        site_url = normalize_site_url(site_state.get("site_url", ""))
        body = "\n".join(
            [
                '<?xml version="1.0" encoding="UTF-8"?>',
                '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
                "  <url>",
                f"    <loc>{html.escape(site_url)}/</loc>",
                "    <changefreq>daily</changefreq>",
                "    <priority>1.0</priority>",
                "  </url>",
                "</urlset>",
                "",
            ]
        )
        self.send_text(body, "application/xml")

    def handle_status(self) -> None:
        with presence_lock:
            prune_players()
            active_players = len(presence_store)
        site_state = load_site_state()
        self.send_json(
            {
                "site_name": site_state["site_name"],
                "version": site_state["version"],
                "maintenance": bool(site_state["maintenance"]),
                "maintenance_message": site_state["maintenance_message"],
                "update_notes": site_state["update_notes"],
                "shared_map": site_state["shared_map"],
                "active_players": active_players,
            }
        )

    def handle_presence_get(self, query_string: str) -> None:
        query = parse_qs(query_string)
        requested_map = (query.get("map") or [""])[0]
        client_id = (query.get("client_id") or [""])[0]
        with presence_lock:
            prune_players()
            players = list(presence_store.values())
        if requested_map:
            players = [player for player in players if player.get("map") == requested_map]
        if client_id:
            players = [player for player in players if player.get("client_id") != client_id]
        players = players[:MAX_PLAYERS_IN_RESPONSE]
        self.send_json({"players": players})

    def handle_presence_post(self) -> None:
        payload = self.read_json_body()
        client_id = str(payload.get("client_id", "")).strip()[:48]
        nickname = str(payload.get("nickname", "Pilot")).strip()[:18] or "Pilot"
        if not client_id:
            self.send_json({"ok": False, "error": "client_id_required"}, HTTPStatus.BAD_REQUEST)
            return
        player = {
            "client_id": client_id,
            "nickname": nickname,
            "faction": str(payload.get("faction", "Autobot"))[:16],
            "character": str(payload.get("character", "optimus_prime"))[:24],
            "map": str(payload.get("map", "iacon_heights"))[:32],
            "x": float(payload.get("x", 0)),
            "y": float(payload.get("y", 0)),
            "lane": float(payload.get("lane", 0)),
            "form": str(payload.get("form", "robot"))[:16],
            "score": int(payload.get("score", 0)),
            "health": int(payload.get("health", 0)),
            "updated_at": time.time(),
        }
        with presence_lock:
            presence_store[client_id] = player
            prune_players()
            total = len(presence_store)
        self.send_json({"ok": True, "active_players": total})

    def handle_chat_get(self, query_string: str) -> None:
        query = parse_qs(query_string)
        requested_map = (query.get("map") or [""])[0]
        with presence_lock:
            messages = chat_messages[-36:]
        if requested_map:
            messages = [message for message in messages if message.get("map") == requested_map]
        self.send_json({"messages": messages})

    def handle_chat_post(self) -> None:
        payload = self.read_json_body()
        nickname = str(payload.get("nickname", "Pilot")).strip()[:18] or "Pilot"
        message = str(payload.get("message", "")).strip()[:240]
        faction = str(payload.get("faction", "Autobot")).strip()[:16] or "Autobot"
        client_id = str(payload.get("client_id", "")).strip()[:48]
        map_id = str(payload.get("map", "iacon_heights")).strip()[:32] or "iacon_heights"
        if not message:
            self.send_json({"ok": False, "error": "message_required"}, HTTPStatus.BAD_REQUEST)
            return
        chat_item = {
            "client_id": client_id,
            "nickname": nickname,
            "faction": faction,
            "map": map_id,
            "message": message,
            "created_at": time.time(),
        }
        with presence_lock:
            chat_messages.append(chat_item)
            del chat_messages[:-MAX_CHAT_MESSAGES]
        self.send_json({"ok": True})


def main() -> None:
    server = ThreadingHTTPServer((HOST, PORT), AppHandler)
    lan_ip = local_ip()
    print(f"Transformers site hazir: http://127.0.0.1:{PORT}")
    if lan_ip != "127.0.0.1":
        print(f"Ayni agdan erisim: http://{lan_ip}:{PORT}")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nSunucu kapatildi.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
