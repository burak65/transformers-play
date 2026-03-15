const dom = {
  screens: {
    menu: document.getElementById("menuScreen"),
    loading: document.getElementById("loadingScreen"),
    command: document.getElementById("commandScreen"),
    profile: document.getElementById("profileScreen"),
    lore: document.getElementById("loreScreen"),
    updates: document.getElementById("updatesScreen"),
    settings: document.getElementById("settingsScreen"),
    game: document.getElementById("gameScreen")
  },
  globalBanner: document.getElementById("globalBanner"),
  playButton: document.getElementById("playButton"),
  continueButton: document.getElementById("continueButton"),
  soundToggleButton: document.getElementById("soundToggleButton"),
  menuNavButtons: document.querySelectorAll("[data-nav]"),
  dailyMissionBadge: document.getElementById("dailyMissionBadge"),
  loadingFill: document.getElementById("loadingFill"),
  loadingValue: document.getElementById("loadingValue"),
  loadingHint: document.getElementById("loadingHint"),
  factionGrid: document.getElementById("factionGrid"),
  characterList: document.getElementById("characterList"),
  characterStatus: document.getElementById("characterStatus"),
  mapList: document.getElementById("mapList"),
  mapStatus: document.getElementById("mapStatus"),
  nicknameInput: document.getElementById("nicknameInput"),
  inviteCode: document.getElementById("inviteCode"),
  copyInviteButton: document.getElementById("copyInviteButton"),
  briefingStory: document.getElementById("briefingStory"),
  saveStatus: document.getElementById("saveStatus"),
  saveMeta: document.getElementById("saveMeta"),
  profileScore: document.getElementById("profileScore"),
  profileWins: document.getElementById("profileWins"),
  profileEnergon: document.getElementById("profileEnergon"),
  profileKills: document.getElementById("profileKills"),
  chatMessages: document.getElementById("chatMessages"),
  chatInput: document.getElementById("chatInput"),
  chatSendButton: document.getElementById("chatSendButton"),
  enterBattleButton: document.getElementById("enterBattleButton"),
  profileDetailGrid: document.getElementById("profileDetailGrid"),
  loreList: document.getElementById("loreList"),
  updatesList: document.getElementById("updatesList"),
  qualityHighButton: document.getElementById("qualityHighButton"),
  qualityLowButton: document.getElementById("qualityLowButton"),
  styleCinematicButton: document.getElementById("styleCinematicButton"),
  styleStylizedButton: document.getElementById("styleStylizedButton"),
  mobileControlsButton: document.getElementById("mobileControlsButton"),
  audioSynthButton: document.getElementById("audioSynthButton"),
  audioAssetButton: document.getElementById("audioAssetButton"),
  tutorialButton: document.getElementById("tutorialButton"),
  statsJoined: document.querySelectorAll('[data-stat="joined"]'),
  statsActive: document.querySelectorAll('[data-stat="active"]'),
  hudNickname: document.getElementById("hudNickname"),
  hudFaction: document.getElementById("hudFaction"),
  hudCharacter: document.getElementById("hudCharacter"),
  hudMapName: document.getElementById("hudMapName"),
  hudWeapon: document.getElementById("hudWeapon"),
  hudForm: document.getElementById("hudForm"),
  healthFill: document.getElementById("healthFill"),
  healthValue: document.getElementById("healthValue"),
  energonValue: document.getElementById("energonValue"),
  matrixValue: document.getElementById("matrixValue"),
  scoreValue: document.getElementById("scoreValue"),
  killsValue: document.getElementById("killsValue"),
  objectiveTitle: document.getElementById("objectiveTitle"),
  objectiveText: document.getElementById("objectiveText"),
  logList: document.getElementById("logList"),
  statusOverlay: document.getElementById("statusOverlay"),
  crossOverlay: document.getElementById("crossOverlay"),
  saveToast: document.getElementById("saveToast"),
  resultPanel: document.getElementById("resultPanel"),
  resultTitle: document.getElementById("resultTitle"),
  resultText: document.getElementById("resultText"),
  resultContinueButton: document.getElementById("resultContinueButton"),
  resultMenuButton: document.getElementById("resultMenuButton"),
  pauseModal: document.getElementById("pauseModal"),
  resumeButton: document.getElementById("resumeButton"),
  pauseSettingsButton: document.getElementById("pauseSettingsButton"),
  saveQuitButton: document.getElementById("saveQuitButton"),
  heroSlideA: document.getElementById("heroSlideA"),
  heroSlideB: document.getElementById("heroSlideB"),
  mobileControls: document.getElementById("mobileControls"),
  mobileButtons: document.querySelectorAll("[data-mobile]"),
  canvas: document.getElementById("gameCanvas")
};

const ctx = dom.canvas.getContext("2d");
const VIEW_W = dom.canvas.width;
const VIEW_H = dom.canvas.height;
const STORAGE = {
  profile: "transformers-play-profile-v5",
  settings: "transformers-play-settings-v5"
};
const DAILY = ["Energon Run", "Prime Vanguard", "Kaon Sweep", "Iacon Hold", "Darkmount Break"];
const HINTS = [
  "Cybertron veri katmanlari aciliyor...",
  "Energon silah protokolleri yukleniyor...",
  "Matrix rezonansi olculuyor...",
  "Command uplink baglaniyor...",
  "Combat shell stabil hale geliyor..."
];
const API = {
  status: "/api/status",
  presence: "/api/presence",
  chat: "/api/chat"
};
const UI_ASSETS = {
  heroPoster: "assets/ui/hero/transformers_play.jpg",
  logos: {
    Autobot: "assets/ui/logos/autobot_logo.png",
    Decepticon: "assets/ui/logos/decepticon_logo.png"
  },
  backgrounds: [
    "assets/ui/backgrounds/bg01.jpg",
    "assets/ui/backgrounds/bg02.webp",
    "assets/ui/backgrounds/bg03.jpg",
    "assets/ui/backgrounds/bg04.jpg",
    "assets/ui/backgrounds/bg05.jpg",
    "assets/ui/backgrounds/bg06.jpg",
    "assets/ui/backgrounds/bg07.jpg",
    "assets/ui/backgrounds/bg08.webp",
    "assets/ui/backgrounds/bg09.jpg",
    "assets/ui/backgrounds/bg10.jpg",
    "assets/ui/backgrounds/bg11.jpg",
    "assets/ui/backgrounds/bg12.webp",
    "assets/ui/backgrounds/bg13.avif",
    "assets/ui/backgrounds/bg14.avif",
    "assets/ui/backgrounds/bg15.avif"
  ]
};
const FACTIONS = [
  { id: "Autobot", icon: "AU", motto: "Hold the line", desc: "Liderlik ve savunma gucu.", iconClass: "autobot" },
  { id: "Decepticon", icon: "DE", motto: "Take the core", desc: "Baski ve hizli saldiri.", iconClass: "decepticon" },
  { id: "Mercenary", icon: "ME", motto: "Paid by energon", desc: "Taraflar arasi avcilar.", iconClass: "mercenary" },
  { id: "Neutral", icon: "NE", motto: "Survive the war", desc: "Kendi yolunu cizenler.", iconClass: "neutral" }
];
const CHARACTERS = [
  {
    id: "optimus_prime",
    name: "Optimus Prime",
    faction: "Autobot",
    role: "Frontline Commander",
    difficulty: "Medium",
    formType: "Peterbilt Truck",
    special: "Matrix Beam",
    lore: "Bayverse etkili agir komutan. Robot ve truck formu arasinda hizli gecis yapar.",
    playable: true,
    stats: { health: 170, matrix: 120, move: 252, truck: 388, mass: 1.18 }
  },
  { id: "bumblebee", name: "Bumblebee", faction: "Autobot", role: "Scout", difficulty: "Easy", formType: "Camaro", special: "Shock Rush", lore: "Hizli Autobot avcisi. Cevik, seri ve agresif.", playable: true, stats: { health: 122, matrix: 72, move: 312, truck: 430, mass: 0.84 } },
  { id: "ironhide", name: "Ironhide", faction: "Autobot", role: "Heavy Assault", difficulty: "Medium", formType: "Armored Truck", special: "Fortress Burst", lore: "Agir saha kirmasi ve yakin menzil baskisi.", playable: true, stats: { health: 164, matrix: 66, move: 240, truck: 360, mass: 1.2 } },
  { id: "ratchet", name: "Ratchet", faction: "Autobot", role: "Support", difficulty: "Hard", formType: "Rescue Van", special: "Repair Field", lore: "Destek ve saha iyilestirme uzmanı.", playable: true, stats: { health: 138, matrix: 92, move: 246, truck: 354, mass: 1.02 } },
  { id: "megatron", name: "Megatron", faction: "Decepticon", role: "Tyrant", difficulty: "Hard", formType: "War Tank", special: "Dark Burst", lore: "Agir darbeli Decepticon lideri. Yavas ama yikici.", playable: true, stats: { health: 182, matrix: 60, move: 222, truck: 346, mass: 1.28 } },
  { id: "starscream", name: "Starscream", faction: "Decepticon", role: "Air Hunter", difficulty: "Medium", formType: "Jet", special: "Sky Barrage", lore: "Hizli hava avcisi. Hafif zirh, seri pozisyon degisimi.", playable: true, stats: { health: 118, matrix: 70, move: 306, truck: 420, mass: 0.8 } },
  { id: "soundwave", name: "Soundwave", faction: "Decepticon", role: "Signal Control", difficulty: "Hard", formType: "Recon Vehicle", special: "Drone Swarm", lore: "Veri bozma ve alan baskisi odakli.", playable: true, stats: { health: 144, matrix: 78, move: 248, truck: 364, mass: 1.06 } },
  { id: "shockwave", name: "Shockwave", faction: "Decepticon", role: "Siege Weapon", difficulty: "Hard", formType: "Artillery Walker", special: "Core Lance", lore: "Uzak menzil yikicilik ve agir isabet.", playable: true, stats: { health: 176, matrix: 84, move: 228, truck: 332, mass: 1.22 } }
];
const CHARACTER_VISUALS = {
  optimus_prime: { primary: "#cb2234", secondary: "#265ac0", glow: "#7deaff", altPrimary: "#143463", altSecondary: "#cb2234", width: 84, height: 146, altWidth: 142, altHeight: 82, laneScale: 1.12 },
  bumblebee: { primary: "#ffcc2d", secondary: "#1f2430", glow: "#bff7ff", altPrimary: "#1f2430", altSecondary: "#ffcc2d", width: 72, height: 120, altWidth: 122, altHeight: 66, laneScale: 0.98 },
  megatron: { primary: "#c8c8ce", secondary: "#575a68", glow: "#ff8e8e", altPrimary: "#6d6f7b", altSecondary: "#b8bac9", width: 92, height: 154, altWidth: 148, altHeight: 86, laneScale: 1.16 },
  starscream: { primary: "#c1c8d8", secondary: "#b21831", glow: "#8bd4ff", altPrimary: "#79869c", altSecondary: "#b21831", width: 74, height: 122, altWidth: 136, altHeight: 62, laneScale: 0.94 },
  ironhide: { primary: "#1b222f", secondary: "#61718d", glow: "#ffd784", altPrimary: "#343f50", altSecondary: "#151b25", width: 86, height: 142, altWidth: 140, altHeight: 76, laneScale: 1.1 },
  ratchet: { primary: "#d6d8dd", secondary: "#6cc58f", glow: "#a7f4c5", altPrimary: "#bfc4cd", altSecondary: "#5fa47d", width: 80, height: 132, altWidth: 132, altHeight: 74, laneScale: 1 },
  soundwave: { primary: "#405fbd", secondary: "#20263b", glow: "#76e2ff", altPrimary: "#2c3e7e", altSecondary: "#20263b", width: 84, height: 138, altWidth: 134, altHeight: 74, laneScale: 1.04 },
  shockwave: { primary: "#7257a8", secondary: "#2c233b", glow: "#f08bff", altPrimary: "#54406f", altSecondary: "#2c233b", width: 90, height: 148, altWidth: 144, altHeight: 80, laneScale: 1.14 }
};
const WEAPONS = [
  { id: "energon_pistol", name: "Energon Pistol", damage: 16, cooldown: 0.2, speed: 920, radius: 5, color: "#7deaff", type: "projectile", energy: 0 },
  { id: "auto_scan_rifle", name: "Auto Scan Rifle", damage: 11, cooldown: 0.1, speed: 1020, radius: 4, color: "#a7f8ff", type: "rapid", energy: 1 },
  { id: "star_saber", name: "Star Saber", damage: 48, cooldown: 0.36, speed: 0, radius: 0, color: "#7fd7ff", type: "melee", energy: 0 },
  { id: "ion_bombs", name: "Ion Bombs", damage: 34, cooldown: 0.5, speed: 560, radius: 10, color: "#ffc964", type: "bomb", energy: 8 },
  { id: "shellstorm_cannon", name: "Shellstorm Cannon", damage: 10, cooldown: 0.34, speed: 860, radius: 4, color: "#ffd9a6", type: "spread", energy: 3 }
];
const ENEMIES = {
  trooper: { hp: 42, speed: 110, color: "#ff6c8a", bullet: 520, damage: 9, score: 80, pickup: 16 },
  drone: { hp: 28, speed: 130, color: "#9c7dff", bullet: 560, damage: 7, score: 70, pickup: 14 },
  brute: { hp: 72, speed: 88, color: "#ffb36d", bullet: 0, damage: 16, score: 120, pickup: 24 },
  sniper: { hp: 34, speed: 96, color: "#ffa4ad", bullet: 760, damage: 14, score: 110, pickup: 18 }
};
const LORE = [
  ["Cybertron Divide", "Autobot vs Decepticon", "Her kule, her kopru ve her cekirdek yeni bir cephe demek."],
  ["Matrix Fracture", "Leadership'in kalan isigi", "Matrix tam gucunde degil ama savasi anlik degistirecek kadar guclu."],
  ["War Corridors", "Iacon, Kaon, Darkmount", "Her harita farkli bir ruh ve savas dili tasiyor."],
  ["Web Arena Vision", "Kisa savas, uzun omurlu platform", "Bu prototip ileride guild, arena, sezon ve topluluk sistemlerine acik kuruldu."]
];
const UPDATES = [
  ["Phase 1", "Core Combat Prototype", "Tek karakter, 10 harita, profil kaydi, pickup, save ve mobil temel."],
  ["Phase 2", "Expanded Enemy Types", "Drone varyasyonlari, mini boss, mastery ve basarimlar."],
  ["Phase 3", "Mobile Friendly Progression", "Gunluk gorevler, kalite profili, kisa match yapisi ve yeni karakterler."],
  ["Phase 4", "Backend + Community", "Python API, cloud save, davet kodu, oda mantigi ve skor tablosu."],
  ["Phase 5", "Living Platform", "Arena, survival, savunma modu, lore arsivi ve RP chat."]
];

function mapDef(id, name, subtitle, tone, difficulty, skyTop, skyBottom, accent, objective, width, spawnX, exitX, platforms, ladders, enemies) {
  return {
    id,
    name,
    subtitle,
    tone,
    difficulty,
    skyTop,
    skyBottom,
    accent,
    objective,
    width,
    spawn: { x: spawnX, y: 520 },
    exit: { x: exitX, y: 250, w: 96, h: 180 },
    platforms: [{ x: 0, y: 630, w: width, h: 100 }, ...platforms.map((p) => ({ x: p[0], y: p[1], w: p[2], h: p[3] || 20 }))],
    ladders: ladders.map((l) => ({ x: l[0], y: l[1], w: l[2] || 34, h: l[3] })),
    enemies: enemies.map((e) => ({ x: e[0], y: e[1], type: e[2], range: e[3] }))
  };
}

const BASE_MAPS = [
  mapDef("rotf_desert_edge", "RotF Desert Edge", "Col tonlari ve acik hat", "Amber Front", "Medium", "#70533a", "#150b09", "#ffb774", "Yikik savunma hattini temizle ve enerji konvoyunu guvenceye al.", 3000, 120, 2840,
    [[260, 548, 190], [530, 478, 180], [850, 410, 190], [1140, 348, 210], [1480, 498, 250, 22], [1840, 430, 190], [2140, 358, 210], [2450, 290, 190], [2620, 472, 180, 22]],
    [[332, 570, 34, 60], [610, 498, 34, 132], [930, 430, 34, 200], [1208, 368, 34, 262], [2490, 310, 34, 320]],
    [[620, 400, "trooper", 140], [930, 336, "drone", 110], [1230, 284, "brute", 120], [1880, 368, "trooper", 140], [2490, 226, "sniper", 180], [2690, 402, "brute", 100]]),
  mapDef("iacon_heights", "Iacon Heights", "Neon sehir katlari", "Neon Blue", "Medium", "#294a7d", "#09111d", "#67d0ff", "Yuksek savunma kulelerini temizle ve Iacon uplink cekirdegini ac.", 2900, 110, 2720,
    [[240, 540, 210, 22], [560, 470, 180], [860, 398, 170], [1100, 326, 180], [1400, 520, 240, 22], [1740, 452, 180], [2030, 382, 180], [2300, 314, 170], [2490, 248, 170]],
    [[324, 562, 34, 68], [632, 490, 34, 140], [930, 418, 34, 212], [1172, 346, 34, 284], [2368, 334, 34, 296]],
    [[640, 410, "trooper", 140], [930, 334, "drone", 110], [1170, 260, "sniper", 160], [1470, 458, "brute", 120], [2050, 318, "trooper", 130], [2520, 184, "sniper", 170]]),
  mapDef("kaon_ruins", "Kaon Ruins", "Karanlik ve sert hat", "Crimson Iron", "Hard", "#4d1d24", "#12070a", "#ff7b82", "Kaon kalintilarinda isgal gucunu dagit ve sinyal diregini sustur.", 2960, 120, 2790,
    [[300, 560, 180, 22], [560, 492, 180], [820, 420, 170], [1090, 350, 180], [1420, 518, 230, 22], [1730, 448, 180], [2050, 380, 180], [2330, 312, 180], [2560, 472, 200, 22]],
    [[370, 582, 34, 48], [632, 512, 34, 118], [894, 440, 34, 190], [1162, 370, 34, 260], [2398, 332, 34, 298]],
    [[600, 424, "trooper", 120], [880, 356, "brute", 110], [1170, 286, "drone", 110], [1790, 384, "trooper", 140], [2080, 318, "brute", 120], [2610, 398, "sniper", 170]]),
  mapDef("neural_bridge", "Neural Bridge", "Enerji kopruleri", "Electric Cyan", "Medium", "#1b3761", "#03111f", "#6fdfff", "Enerji koprulerini stabilize et ve veri akisini temizle.", 2860, 100, 2670,
    [[220, 520, 220], [500, 450, 200, 18], [830, 390, 180, 18], [1100, 330, 180, 18], [1390, 500, 220], [1690, 440, 180, 18], [1960, 380, 180, 18], [2240, 320, 180, 18], [2470, 260, 160, 18]],
    [[314, 540, 32, 90], [586, 470, 32, 160], [906, 410, 32, 220], [1176, 350, 32, 280], [2314, 340, 32, 290]],
    [[560, 388, "drone", 130], [900, 328, "trooper", 130], [1170, 268, "sniper", 170], [1730, 370, "trooper", 140], [2260, 250, "drone", 120]]),
  mapDef("darkmount_yard", "Darkmount Yard", "Sanayi sahasi", "Steel Furnace", "Hard", "#35272b", "#09070a", "#ff9b61", "Darkmount lojistik hatlarini kir ve agir birlikleri sahadan sil.", 3100, 120, 2910,
    [[260, 550, 180], [530, 482, 180], [810, 412, 190], [1100, 342, 210], [1450, 520, 250, 22], [1800, 448, 180], [2080, 378, 180], [2370, 308, 190], [2680, 248, 170]],
    [[334, 570, 34, 60], [606, 502, 34, 128], [892, 432, 34, 198], [1186, 362, 34, 268], [2446, 328, 34, 302]],
    [[600, 404, "trooper", 120], [880, 340, "brute", 120], [1190, 278, "sniper", 170], [1830, 384, "brute", 110], [2120, 316, "trooper", 140], [2720, 184, "sniper", 170]]),
  mapDef("sea_of_rust_front", "Sea of Rust Front", "Pasli alanlar", "Dust Rust", "Medium", "#765341", "#16100d", "#ffbb7f", "Sea of Rust cephesindeki drone baskisini kir ve pickup konvoyunu kurtar.", 3040, 120, 2860,
    [[260, 540, 190], [530, 472, 180, 18], [840, 406, 180, 18], [1140, 342, 190, 18], [1470, 520, 230], [1790, 458, 180, 18], [2100, 392, 180, 18], [2390, 326, 180, 18], [2610, 262, 180, 18]],
    [[334, 560, 34, 70], [606, 492, 34, 138], [916, 426, 34, 204], [1218, 362, 34, 268], [2464, 346, 34, 284]],
    [[560, 396, "drone", 120], [916, 340, "trooper", 130], [1220, 280, "sniper", 180], [1820, 392, "brute", 110], [2440, 262, "trooper", 140]]),
  mapDef("praxis_core", "Praxis Core", "Enerji sutunlari", "Core White", "Hard", "#374c68", "#0b121b", "#b1ddff", "Praxis cekirdegini kapat ve savunma AI birimlerini temizle.", 3120, 120, 2940,
    [[260, 520, 200, 18], [560, 450, 180, 18], [850, 380, 170, 18], [1130, 312, 180, 18], [1460, 510, 220, 18], [1760, 440, 180, 18], [2070, 370, 180, 18], [2360, 300, 180, 18], [2660, 230, 180, 18]],
    [[344, 540, 34, 90], [624, 470, 34, 160], [910, 400, 34, 230], [1194, 332, 34, 298], [2734, 250, 34, 380]],
    [[620, 388, "drone", 130], [906, 320, "trooper", 130], [1194, 250, "brute", 100], [1780, 370, "sniper", 190], [2400, 230, "trooper", 140], [2720, 160, "brute", 100]]),
  mapDef("tyger_pax_causeway", "Tyger Pax Causeway", "Tarihi koridorlar", "Royal Steel", "Medium", "#4b4568", "#090913", "#b6b1ff", "Tyger Pax yolunu ac ve tarihi koridoru savunan dusman hattini kir.", 2940, 120, 2780,
    [[240, 550, 210], [560, 480, 180, 18], [860, 410, 180, 18], [1160, 340, 180, 18], [1460, 510, 220], [1770, 440, 180, 18], [2060, 372, 180, 18], [2360, 304, 180, 18], [2560, 238, 170, 18]],
    [[324, 570, 34, 60], [636, 500, 34, 130], [936, 430, 34, 200], [1236, 360, 34, 270], [2428, 324, 34, 306]],
    [[620, 410, "trooper", 130], [930, 340, "sniper", 180], [1230, 268, "drone", 120], [1810, 370, "trooper", 140], [2410, 236, "sniper", 180]]),
  mapDef("orbital_relay_7", "Orbital Relay 7", "Uzay aktarma halkasi", "Void Signal", "Hard", "#1d2758", "#02060f", "#8ca4ff", "Orbital Relay 7 ile uzay koprusu arasindaki enerji kanalini geri al.", 3180, 120, 3010,
    [[280, 520, 220], [600, 452, 180, 18], [890, 382, 180, 18], [1180, 314, 190, 18], [1490, 500, 230, 18], [1800, 432, 180, 18], [2110, 364, 190, 18], [2400, 296, 180, 18], [2700, 228, 180, 18]],
    [[354, 540, 34, 90], [664, 472, 34, 158], [954, 402, 34, 228], [1244, 334, 34, 296], [2764, 248, 34, 382]],
    [[650, 390, "drone", 120], [952, 320, "trooper", 130], [1250, 248, "sniper", 190], [1820, 362, "brute", 110], [2440, 228, "drone", 120], [2740, 160, "sniper", 180]]),
  mapDef("dark_cybertron_rift", "Dark Cybertron Rift", "Siyah energon baskisi", "Dark Energon", "Hard", "#2f1d44", "#05030a", "#d174ff", "Karanlik yarik boyunca ilerle ve cekirdek cikisini kilitle.", 3240, 120, 3060,
    [[280, 530, 210, 18], [600, 460, 180, 18], [900, 392, 180, 18], [1210, 324, 180, 18], [1530, 504, 220, 18], [1850, 436, 180, 18], [2160, 368, 180, 18], [2470, 300, 180, 18], [2780, 232, 180, 18]],
    [[354, 550, 34, 80], [664, 480, 34, 150], [964, 412, 34, 218], [1274, 344, 34, 286], [2844, 252, 34, 378]],
    [[650, 398, "trooper", 130], [964, 330, "drone", 120], [1268, 258, "brute", 110], [1890, 366, "trooper", 140], [2490, 230, "sniper", 190], [2860, 164, "brute", 110]])
];

const WORLD_MAP_PRESETS = [
  { name: "Chicago Rupture", subtitle: "Yikik caddeler ve genis savas koridoru", tone: "Urban Fireline", objective: "Autobot tahliye hattini ac ve Decepticon sokak baskisini kir.", world: "earth_city" },
  { name: "Cairo Blackout", subtitle: "Tozlu bloklar ve kule savasi", tone: "Desert Siege", objective: "Sehir merkezindeki blackout alanini temizle ve sinyal vericisini geri al.", world: "earth_desert" },
  { name: "Mission City Collapse", subtitle: "Coken kopruler ve metal enkaz", tone: "Steel Collapse", objective: "Enkaz hattindan ilerle ve konvoyu sehir disina cikar.", world: "earth_city" },
  { name: "Shanghai Vertical Line", subtitle: "Yuksek yapilar ve dikey baski", tone: "Neon Rain", objective: "Gokdelenler arasindaki enerji hattini geri kazan.", world: "earth_city" },
  { name: "Hoover Dam Breach", subtitle: "Baraj, raylar ve agir cover savasi", tone: "Concrete Strike", objective: "Baraj cephesinde savunma cekirdegini tut ve agir birlikleri durdur.", world: "earth_industrial" },
  { name: "Pacific Overpass", subtitle: "Yuksek yol, konvoy ve hava tehdidi", tone: "Ocean Storm", objective: "Koprudeki Decepticon pususunu dagit ve cikis yolunu ac.", world: "earth_coast" },
  { name: "Washington Siege", subtitle: "Genis meydan ve savunma hatlari", tone: "Night Assault", objective: "Savunma halkasini temizle ve komuta terminaline ulas.", world: "earth_city" },
  { name: "Siberia Relay", subtitle: "Karli saha ve mekanik kuleler", tone: "Frozen Signal", objective: "Relay istasyonunu yeniden aktif et ve enerji firtinasini bastir.", world: "earth_snow" },
  { name: "Hong Kong Overrun", subtitle: "Sik sokaklar ve neon yukseklik", tone: "Storm Neon", objective: "Sokak hatti boyunca ilerle ve hava saldirisini kes.", world: "earth_city" },
  { name: "Atlantic Convoy", subtitle: "Liman cephesi ve agir makine parki", tone: "Harbor War", objective: "Liman hattindaki konvoyu koru ve son cikis terminalini ac.", world: "earth_harbor" }
];

function buildDestructibleProps(map) {
  return map.platforms.slice(1, 8).map((platform, index) => ({
    x: platform.x + Math.max(18, platform.w * (0.18 + (index % 3) * 0.16)),
    y: platform.y - 52,
    w: 42 + (index % 2) * 10,
    h: 52 + (index % 3) * 8,
    hp: 34 + index * 6,
    maxHp: 34 + index * 6,
    lane: (index % 3) - 1,
    kind: index % 2 === 0 ? "crate" : "barrier",
    alive: true
  }));
}

function expandMap(base, preset, index) {
  const scale = 1.42 + (index % 2) * 0.08;
  const remapPlatform = (platform, idx) => ({
    ...platform,
    x: Math.round(platform.x * scale),
    w: idx === 0 ? Math.round(base.width * scale) : platform.w
  });
  const map = {
    ...base,
    name: preset.name,
    subtitle: preset.subtitle,
    tone: preset.tone,
    objective: preset.objective,
    world: preset.world,
    width: Math.round(base.width * scale),
    spawn: { ...base.spawn, x: Math.round(base.spawn.x * scale) },
    exit: { ...base.exit, x: Math.round(base.exit.x * scale) },
    platforms: base.platforms.map(remapPlatform),
    ladders: base.ladders.map((ladder) => ({ ...ladder, x: Math.round(ladder.x * scale) })),
    enemies: base.enemies.map((enemy, enemyIndex) => ({
      ...enemy,
      x: Math.round(enemy.x * scale),
      lane: (enemyIndex % 3) - 1
    }))
  };
  map.props = buildDestructibleProps(map);
  return map;
}

const MAPS = BASE_MAPS.map((map, index) => expandMap(map, WORLD_MAP_PRESETS[index] || WORLD_MAP_PRESETS[0], index));

function loadSettings() {
  const base = { soundEnabled: true, quality: "high", styleMode: "cinematic", mobileControls: false, audioProfile: "synth", tutorial: true };
  try { return { ...base, ...(JSON.parse(localStorage.getItem(STORAGE.settings) || "null") || {}) }; } catch { return base; }
}

function loadProfile() {
  const base = {
    nickname: "PrimeHunter",
    faction: "Autobot",
    characterId: "optimus_prime",
    inviteCode: "PRIME-001",
    level: 1,
    score: 0,
    wins: 0,
    totalKills: 0,
    totalEnergon: 0,
    favoriteCharacter: "Optimus Prime",
    lastMap: MAPS[0].id,
    streak: 0,
    lastRewardDay: "",
    lastPlayedAt: ""
  };
  try { return { ...base, ...(JSON.parse(localStorage.getItem(STORAGE.profile) || "null") || {}) }; } catch { return base; }
}

function emptyGame() {
  return {
    active: false,
    paused: false,
    result: false,
    lastFrame: 0,
    time: 0,
    cameraX: 0,
    shake: 0,
    map: null,
    player: null,
    enemies: [],
    props: [],
    projectiles: [],
    pickups: [],
    particles: [],
    startedAt: 0,
    objectiveComplete: false
  };
}

const state = {
  assetConfig: window.TransformersAssets?.characters?.optimusPrimeBayverse || null,
  assetImage: null,
  assetAudio: {},
  audioCtx: null,
  audioGain: null,
  audioUnlocked: false,
  currentScreen: "menu",
  selectedFaction: "Autobot",
  selectedCharacter: "optimus_prime",
  selectedMap: MAPS[0].id,
  profile: loadProfile(),
  settings: loadSettings(),
  community: { joined: 1248, active: 118 },
  input: { held: Object.create(null), just: Object.create(null), mouse: { x: 900, y: 300, down: false, inside: false } },
  logs: [],
  menuVisual: { index: 0, currentA: true, timer: null },
  network: {
    clientId: localStorage.getItem("transformers-play-client-id") || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    version: null,
    sharedMap: null,
    remotePlayers: [],
    chatMessages: [],
    statusTimer: null,
    presenceTimer: null,
    chatTimer: null,
    maintenanceActive: false
  },
  loadingTimer: null,
  game: emptyGame()
};
localStorage.setItem("transformers-play-client-id", state.network.clientId);

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (ax, ay, bx, by) => Math.hypot(ax - bx, ay - by);
const rectHit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
const rectContains = (r, x, y) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
function circleRectHit(c, r) {
  const nx = clamp(c.x, r.x, r.x + r.w);
  const ny = clamp(c.y, r.y, r.y + r.h);
  const dx = c.x - nx;
  const dy = c.y - ny;
  return dx * dx + dy * dy < c.radius * c.radius;
}
function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
function idCode(seed) {
  const root = (seed || "PRIME").replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 5) || "PRIME";
  return `${root}-${String(100 + ((root.charCodeAt(0) || 80) * 7) % 900)}`;
}
function getChar() { return CHARACTERS.find((x) => x.id === state.selectedCharacter) || CHARACTERS[0]; }
function getMap() { return MAPS.find((x) => x.id === state.selectedMap) || MAPS[0]; }
function getWeapon(id) { return WEAPONS.find((x) => x.id === id) || WEAPONS[0]; }
function isTouchMode() { return state.settings.mobileControls || window.matchMedia("(max-width: 820px)").matches; }

function saveSettings() { localStorage.setItem(STORAGE.settings, JSON.stringify(state.settings)); }
function saveProfile(silent = false) {
  state.profile.lastPlayedAt = new Date().toLocaleString("tr-TR");
  localStorage.setItem(STORAGE.profile, JSON.stringify(state.profile));
  if (!silent) showToast("Verileriniz kaydedildi, daha sonra tekrar oynayabilirsiniz.");
  syncContinue();
  renderProfile();
}

function showToast(text) {
  dom.saveToast.textContent = text;
  dom.saveToast.classList.add("show");
  clearTimeout(showToast.t);
  showToast.t = setTimeout(() => dom.saveToast.classList.remove("show"), 1800);
}

function showBanner(text) {
  dom.globalBanner.textContent = text;
  dom.globalBanner.classList.add("show");
  clearTimeout(showBanner.t);
  showBanner.t = setTimeout(() => dom.globalBanner.classList.remove("show"), 2300);
}

function flash(el, text, ms = 900) {
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), ms);
}

function log(text) {
  state.logs.unshift(text);
  state.logs = state.logs.slice(0, 7);
  dom.logList.innerHTML = state.logs.map((item) => `<li>${item}</li>`).join("");
}

function showScreen(name) {
  Object.entries(dom.screens).forEach(([key, screen]) => screen.classList.toggle("active", key === name));
  state.currentScreen = name;
}

function setTheme() {
  document.body.dataset.faction = state.selectedFaction;
  document.body.dataset.quality = state.settings.quality;
  document.body.dataset.styleMode = state.settings.styleMode;
  document.documentElement.style.setProperty("--hero-poster", `url("${UI_ASSETS.heroPoster}")`);
  dom.mobileControls.style.display = isTouchMode() ? "flex" : "";
}

function syncTopbar() {
  dom.statsJoined.forEach((n) => { n.textContent = String(state.community.joined); });
  dom.statsActive.forEach((n) => { n.textContent = String(state.community.active); });
  dom.dailyMissionBadge.textContent = pick(DAILY);
}

function applyHeroBackground(url, useFirstLayer) {
  const target = useFirstLayer ? dom.heroSlideA : dom.heroSlideB;
  const other = useFirstLayer ? dom.heroSlideB : dom.heroSlideA;
  target.style.backgroundImage = `url("${url}")`;
  target.classList.add("active");
  other.classList.remove("active");
}

function startHeroSlideshow() {
  const pool = [...UI_ASSETS.backgrounds];
  if (!pool.length) return;
  clearInterval(state.menuVisual.timer);
  state.menuVisual.index = Math.floor(Math.random() * pool.length);
  state.menuVisual.currentA = true;
  applyHeroBackground(pool[state.menuVisual.index], true);
  state.menuVisual.timer = setInterval(() => {
    let next = Math.floor(Math.random() * pool.length);
    if (pool.length > 1) {
      while (next === state.menuVisual.index) next = Math.floor(Math.random() * pool.length);
    }
    state.menuVisual.index = next;
    state.menuVisual.currentA = !state.menuVisual.currentA;
    applyHeroBackground(pool[next], state.menuVisual.currentA);
  }, 1000);
}

async function fetchSiteStatus() {
  try {
    const response = await fetch(`${API.status}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    if (payload.site_name) document.title = payload.site_name;
    state.network.sharedMap = payload.shared_map || state.network.sharedMap;
    state.community.active = Math.max(1, payload.active_players || state.community.active);
    syncTopbar();
    const previousMaintenance = state.network.maintenanceActive;
    state.network.maintenanceActive = Boolean(payload.maintenance);
    if (payload.maintenance && payload.maintenance_message) {
      showBanner(payload.maintenance_message || "Bekle, guncelleniyor...");
    } else if (previousMaintenance && !payload.maintenance) {
      localStorage.setItem("transformers-play-pending-update", JSON.stringify({ version: payload.version, notes: payload.update_notes || [] }));
      showBanner("Guncelleme bitti. Sayfayi yenile.");
    }
    const seenVersion = localStorage.getItem("transformers-play-version-seen");
    if (payload.version && payload.version !== seenVersion) {
      localStorage.setItem("transformers-play-version-seen", payload.version);
      localStorage.setItem("transformers-play-pending-update", JSON.stringify({ version: payload.version, notes: payload.update_notes || [] }));
    }
    state.network.version = payload.version || state.network.version;
  } catch {}
}

function showPendingUpdateNotes() {
  try {
    const raw = localStorage.getItem("transformers-play-pending-update");
    if (!raw) return;
    const payload = JSON.parse(raw);
    const firstNote = (payload.notes || [])[0];
    if (payload.version) {
      showBanner(firstNote ? `Yeni surum ${payload.version}: ${firstNote}` : `Yeni surum ${payload.version} hazir.`);
    }
  } catch {}
}

function renderChatMessages() {
  if (!dom.chatMessages) return;
  const items = state.network.chatMessages || [];
  if (!items.length) {
    dom.chatMessages.innerHTML = '<div class="chat-message"><strong>System</strong><p>Bagli oyuncular burada mesajlasabilecek.</p></div>';
    return;
  }
  dom.chatMessages.innerHTML = items.map((item) => {
    const factionClass = item.faction === "Decepticon" ? "decepticon" : "autobot";
    const selfTag = item.client_id === state.network.clientId ? " <small>sen</small>" : "";
    return `
      <div class="chat-message ${factionClass}">
        <strong>${escapeHtml(item.nickname || "Pilot")}${selfTag}</strong>
        <p>${escapeHtml(item.message || "")}</p>
      </div>
    `;
  }).join("");
  dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

async function fetchChatMessages() {
  try {
    const mapId = state.game.map?.id || state.selectedMap || state.network.sharedMap || "iacon_heights";
    const params = new URLSearchParams({ map: mapId });
    const response = await fetch(`${API.chat}?${params.toString()}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    state.network.chatMessages = Array.isArray(payload.messages) ? payload.messages : [];
    renderChatMessages();
  } catch {}
}

async function sendChatMessage() {
  const raw = dom.chatInput?.value || "";
  const message = raw.trim();
  if (!message) return;
  try {
    await fetch(API.chat, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: state.network.clientId,
        nickname: state.profile.nickname || "PrimeHunter",
        faction: state.selectedFaction,
        map: state.game.map?.id || state.selectedMap || state.network.sharedMap || "iacon_heights",
        message
      })
    });
    dom.chatInput.value = "";
    playSound("ui");
    fetchChatMessages();
  } catch {
    showBanner("Sohbet baglantisi kurulamadi.");
  }
}

async function pushPresence() {
  if (!state.game.active || !state.game.player || !state.game.map) return;
  const p = state.game.player;
  try {
    await fetch(API.presence, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: state.network.clientId,
        nickname: state.profile.nickname,
        faction: state.selectedFaction,
        character: state.selectedCharacter,
        map: state.game.map.id,
        x: p.x,
        y: p.y,
        lane: p.lane,
        form: p.form,
        score: p.score,
        health: Math.round(p.health)
      })
    });
  } catch {}
}

async function fetchPresence() {
  if (!state.game.active || !state.game.map) {
    state.network.remotePlayers = [];
    return;
  }
  try {
    const params = new URLSearchParams({ map: state.game.map.id, client_id: state.network.clientId });
    const response = await fetch(`${API.presence}?${params.toString()}`, { cache: "no-store" });
    if (!response.ok) return;
    const payload = await response.json();
    state.network.remotePlayers = Array.isArray(payload.players) ? payload.players : [];
  } catch {}
}

function startNetworkLoops() {
  clearInterval(state.network.statusTimer);
  clearInterval(state.network.presenceTimer);
  clearInterval(state.network.chatTimer);
  state.network.statusTimer = setInterval(fetchSiteStatus, 8000);
  state.network.presenceTimer = setInterval(() => {
    fetchPresence();
    pushPresence();
  }, 500);
  state.network.chatTimer = setInterval(fetchChatMessages, 1200);
}

function renderFactions() {
  dom.factionGrid.innerHTML = FACTIONS.map((f) => `
    <button class="faction-card ${f.id === state.selectedFaction ? "active" : ""}" data-faction="${f.id}" type="button">
      <div class="faction-icon ${f.iconClass}">${UI_ASSETS.logos[f.id] ? `<img src="${UI_ASSETS.logos[f.id]}" alt="${f.id} logo">` : f.icon}</div>
      <strong>${f.id}</strong>
      <span>${f.desc}</span>
      <div class="entity-meta"><small>${f.motto}</small></div>
    </button>
  `).join("");
  dom.factionGrid.querySelectorAll("[data-faction]").forEach((button) => button.addEventListener("click", () => {
    unlockAudio();
    state.selectedFaction = button.dataset.faction;
    state.profile.faction = state.selectedFaction;
    renderFactions();
    refreshCommand();
  }));
}

function renderCharacters() {
  const active = CHARACTERS.filter((x) => x.playable).length;
  dom.characterStatus.textContent = `${active} aktif pilot / ${CHARACTERS.length - active} yakinda`;
  dom.characterList.innerHTML = CHARACTERS.map((c) => `
    <button class="entity-card ${c.id === state.selectedCharacter ? "active" : ""} ${c.playable ? "" : "locked"}" data-character="${c.id}" type="button" ${c.playable ? "" : "disabled"}>
      <strong>${c.name}</strong>
      <span>${c.lore}</span>
      <div class="entity-meta"><small>${c.faction || "Hybrid"}</small><small>${c.role}</small><small>${c.difficulty}</small><small>${c.formType}</small><small>${c.playable ? c.special : "Yakinda"}</small></div>
    </button>
  `).join("");
  dom.characterList.querySelectorAll("[data-character]").forEach((button) => button.addEventListener("click", () => {
    unlockAudio();
    state.selectedCharacter = button.dataset.character;
    state.profile.characterId = state.selectedCharacter;
    if (getChar().faction) {
      state.selectedFaction = getChar().faction;
      state.profile.faction = state.selectedFaction;
      renderFactions();
    }
    renderCharacters();
    refreshCommand();
  }));
}

function renderMaps() {
  dom.mapStatus.textContent = `${MAPS.length} operasyon hazir`;
  dom.mapList.innerHTML = MAPS.map((m) => `
    <button class="entity-card ${m.id === state.selectedMap ? "active" : ""}" data-map="${m.id}" type="button">
      <strong>${m.name}</strong>
      <span>${m.subtitle}</span>
      <div class="entity-meta"><small>${m.tone}</small><small>${m.difficulty}</small><small>${m.enemies.length} dusman</small></div>
    </button>
  `).join("");
  dom.mapList.querySelectorAll("[data-map]").forEach((button) => button.addEventListener("click", () => {
    unlockAudio();
    state.selectedMap = button.dataset.map;
    state.profile.lastMap = state.selectedMap;
    renderMaps();
    refreshCommand();
  }));
}

function renderLore() {
  dom.loreList.innerHTML = LORE.map((item) => `<article class="archive-card"><strong>${item[0]}</strong><span>${item[1]}</span><p>${item[2]}</p></article>`).join("");
}

function renderUpdates() {
  dom.updatesList.innerHTML = UPDATES.map((item) => `<article class="archive-card"><strong>${item[0]}</strong><span>${item[1]}</span><p>${item[2]}</p></article>`).join("");
}

function renderProfile() {
  const char = getChar();
  const map = getMap();
  dom.profileDetailGrid.innerHTML = [
    ["Pilot", state.profile.nickname, `Takim: ${state.profile.faction}`],
    ["Level", String(state.profile.level), `Skor: ${state.profile.score}`],
    ["Wins", String(state.profile.wins), `Toplam kill: ${state.profile.totalKills}`],
    ["Energon", String(state.profile.totalEnergon), `Davet kodu: ${state.profile.inviteCode}`],
    ["Favorite", state.profile.favoriteCharacter, `Secili karakter: ${char.name}`],
    ["Last Map", map.name, `Son oturum: ${state.profile.lastPlayedAt || "Henuz savas yok"}`],
    ["Daily Streak", `${state.profile.streak} gun`, "Gunluk oduller ve gorevler icin hazir."],
    ["Audio", state.settings.audioProfile.toUpperCase(), `Ses: ${state.settings.soundEnabled ? "Acik" : "Kapali"}`],
    ["Graphics", state.settings.quality.toUpperCase(), `Mobil kontroller: ${isTouchMode() ? "Acik" : "Kapali"}`]
  ].map((x) => `<article class="archive-card"><strong>${x[0]}</strong><span>${x[1]}</span><p>${x[2]}</p></article>`).join("");
}

function syncSettings() {
  dom.qualityHighButton.classList.toggle("active", state.settings.quality === "high");
  dom.qualityLowButton.classList.toggle("active", state.settings.quality === "low");
  dom.styleCinematicButton.classList.toggle("active", state.settings.styleMode === "cinematic");
  dom.styleStylizedButton.classList.toggle("active", state.settings.styleMode === "stylized");
  dom.mobileControlsButton.classList.toggle("active", isTouchMode());
  dom.audioSynthButton.classList.toggle("active", state.settings.audioProfile === "synth");
  dom.audioAssetButton.classList.toggle("active", state.settings.audioProfile === "asset");
  dom.tutorialButton.classList.toggle("active", state.settings.tutorial);
  dom.soundToggleButton.textContent = `Ses: ${state.settings.soundEnabled ? "Acik" : "Kapali"}`;
  setTheme();
}

function syncContinue() {
  dom.continueButton.disabled = !localStorage.getItem(STORAGE.profile);
}

function refreshCommand() {
  state.profile.nickname = dom.nicknameInput.value.trim() || state.profile.nickname || "PrimeHunter";
  state.profile.inviteCode = idCode(state.profile.nickname);
  dom.inviteCode.textContent = state.profile.inviteCode;
  dom.profileScore.textContent = String(state.profile.score);
  dom.profileWins.textContent = String(state.profile.wins);
  dom.profileEnergon.textContent = String(state.profile.totalEnergon);
  dom.profileKills.textContent = String(state.profile.totalKills);
  dom.saveStatus.textContent = localStorage.getItem(STORAGE.profile) ? "Kayit bulundu" : "Yeni profil hazir";
  dom.saveMeta.textContent = localStorage.getItem(STORAGE.profile) ? `Son oturum: ${state.profile.lastPlayedAt || "kayitli ama oynanmadi"}` : "Kayitlar localStorage ile korunur ve continue icin kullanilir.";
  dom.briefingStory.textContent = `${getChar().name}, ${state.selectedFaction} cephesi icin ${getMap().name} alanina indiriliyor. ${getMap().objective}`;
  renderProfile();
  syncContinue();
  setTheme();
}

function unlockAudio() {
  if (state.audioUnlocked) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) { state.audioUnlocked = true; return; }
  state.audioCtx = new Ctx();
  state.audioGain = state.audioCtx.createGain();
  state.audioGain.gain.value = 0.16;
  state.audioGain.connect(state.audioCtx.destination);
  state.audioUnlocked = true;
}

function loadAssets() {
  if (state.assetConfig?.spriteSheetUrl) {
    const img = new Image();
    img.src = state.assetConfig.spriteSheetUrl;
    img.onload = () => { state.assetImage = img; };
  }
  if (state.assetConfig?.sfx) {
    Object.entries(state.assetConfig.sfx).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = "auto";
      state.assetAudio[key] = audio;
    });
  }
  [UI_ASSETS.heroPoster, ...UI_ASSETS.backgrounds, ...Object.values(UI_ASSETS.logos)].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function tone(steps) {
  if (!state.settings.soundEnabled || !state.audioUnlocked || !state.audioCtx || !state.audioGain) return;
  const now = state.audioCtx.currentTime;
  steps.forEach((s, i) => {
    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();
    osc.type = s.type || "sawtooth";
    osc.frequency.setValueAtTime(s.freq, now + i * 0.03);
    gain.gain.setValueAtTime(s.gain, now + i * 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + (s.len || 0.1));
    osc.connect(gain);
    gain.connect(state.audioGain);
    osc.start(now + i * 0.03);
    osc.stop(now + i * 0.03 + (s.len || 0.1));
  });
}

function playSound(name) {
  if (!state.settings.soundEnabled) return;
  if (state.settings.audioProfile === "asset" && state.assetAudio[name]) {
    try {
      const audio = state.assetAudio[name].cloneNode();
      audio.volume = 0.5;
      audio.play().catch(() => {});
      return;
    } catch {}
  }
  const map = {
    ui: [{ freq: 620, gain: 0.08, len: 0.08 }, { freq: 860, gain: 0.05, len: 0.08 }],
    blaster: [{ freq: 290, gain: 0.08, len: 0.07 }, { freq: 210, gain: 0.05, len: 0.08 }],
    auto_rifle: [{ freq: 360, gain: 0.06, len: 0.04 }],
    shotgun: [{ freq: 150, gain: 0.08, len: 0.1 }],
    bomb: [{ freq: 160, gain: 0.08, len: 0.14 }, { freq: 90, gain: 0.05, len: 0.2 }],
    transform: [{ freq: 240, gain: 0.08, len: 0.18 }, { freq: 340, gain: 0.08, len: 0.16 }, { freq: 520, gain: 0.05, len: 0.12 }],
    pickup: [{ freq: 780, gain: 0.07, len: 0.08 }, { freq: 1100, gain: 0.05, len: 0.08 }],
    hit: [{ freq: 180, gain: 0.05, len: 0.05 }, { freq: 130, gain: 0.04, len: 0.05 }],
    kill: [{ freq: 480, gain: 0.07, len: 0.08 }, { freq: 760, gain: 0.08, len: 0.12 }],
    hurt: [{ freq: 140, gain: 0.08, len: 0.12 }],
    matrix: [{ freq: 420, gain: 0.08, len: 0.18 }, { freq: 680, gain: 0.08, len: 0.26 }],
    revive: [{ freq: 320, gain: 0.08, len: 0.12 }, { freq: 520, gain: 0.07, len: 0.16 }, { freq: 820, gain: 0.05, len: 0.2 }]
  };
  tone(map[name] || map.ui);
}

function applyDailyReward() {
  const today = new Date().toISOString().slice(0, 10);
  if (state.profile.lastRewardDay === today) return;
  state.profile.lastRewardDay = today;
  state.profile.streak += 1;
  state.profile.score += 35;
  state.profile.totalEnergon += 12;
  state.profile.level = 1 + Math.floor(state.profile.score / 600);
  saveProfile(true);
  showBanner(`Gunluk giris odulu: +35 skor, +12 energon. Seri: ${state.profile.streak}`);
}

function startLoading(next) {
  showScreen("loading");
  clearInterval(state.loadingTimer);
  let progress = 0;
  let hint = 0;
  dom.loadingFill.style.width = "0%";
  dom.loadingValue.textContent = "0%";
  dom.loadingHint.textContent = HINTS[0];
  state.loadingTimer = setInterval(() => {
    progress = Math.min(100, progress + Math.floor(8 + Math.random() * 11));
    hint = (hint + 1) % HINTS.length;
    dom.loadingFill.style.width = `${progress}%`;
    dom.loadingValue.textContent = `${progress}%`;
    dom.loadingHint.textContent = HINTS[hint];
    if (progress >= 100) {
      clearInterval(state.loadingTimer);
      setTimeout(next, 160);
    }
  }, 85);
}

function setAction(action, down, just = false) {
  state.input.held[action] = down;
  if (just) state.input.just[action] = true;
}

function isDown(action) { return Boolean(state.input.held[action]); }
function consume(action) {
  if (!state.input.just[action]) return false;
  state.input.just[action] = false;
  return true;
}
function clearFrameInput() { state.input.just = Object.create(null); }

function bindKeyboard() {
  const map = {
    KeyA: "left", ArrowLeft: "left", KeyD: "right", ArrowRight: "right",
    KeyW: "jump", ArrowUp: "jump", Space: "jump",
    KeyS: "down", ArrowDown: "down", KeyJ: "climb", KeyT: "transform", Tab: "weapon",
    KeyQ: "matrix", KeyM: "special", KeyK: "heal", KeyY: "melee1", KeyO: "melee2", KeyP: "melee3", KeyL: "roll", KeyR: "laneFront", KeyF: "laneBack", Escape: "pause"
  };
  addEventListener("keydown", (e) => {
    if (document.activeElement === dom.chatInput || document.activeElement === dom.nicknameInput) {
      if (e.code === "Enter" && document.activeElement === dom.chatInput) {
        e.preventDefault();
        sendChatMessage();
      }
      return;
    }
    const action = map[e.code];
    if (!action) return;
    if (["Tab", "Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) e.preventDefault();
    unlockAudio();
    setAction(action, true, !state.input.held[action]);
  });
  addEventListener("keyup", (e) => {
    const action = map[e.code];
    if (action) setAction(action, false, false);
  });
}

function bindPointer() {
  function sync(clientX, clientY) {
    const rect = dom.canvas.getBoundingClientRect();
    state.input.mouse.x = (clientX - rect.left) * (VIEW_W / rect.width);
    state.input.mouse.y = (clientY - rect.top) * (VIEW_H / rect.height);
    state.input.mouse.inside = true;
  }
  dom.canvas.addEventListener("mousemove", (e) => sync(e.clientX, e.clientY));
  dom.canvas.addEventListener("mouseleave", () => { state.input.mouse.inside = false; });
  dom.canvas.addEventListener("mousedown", (e) => { unlockAudio(); sync(e.clientX, e.clientY); state.input.mouse.down = true; });
  addEventListener("mouseup", () => { state.input.mouse.down = false; });
}

function bindMobile() {
  const actions = { left: { hold: "left" }, right: { hold: "right" }, down: { hold: "down" }, jump: { just: "jump" }, fire: { hold: "fire" }, transform: { just: "transform" }, weapon: { just: "weapon" }, matrix: { just: "matrixTouch" }, melee: { just: "meleeTouch" } };
  dom.mobileButtons.forEach((button) => {
    const bind = (down) => {
      const config = actions[button.dataset.mobile];
      if (!config) return;
      unlockAudio();
      if (config.hold) setAction(config.hold, down, down);
      if (down && config.just) setAction(config.just, true, true);
      if (!down && config.hold) setAction(config.hold, false, false);
    };
    ["pointerdown", "touchstart"].forEach((ev) => button.addEventListener(ev, (e) => { e.preventDefault(); bind(true); }, { passive: false }));
    ["pointerup", "pointerleave", "pointercancel", "touchend"].forEach((ev) => button.addEventListener(ev, () => bind(false), { passive: true }));
  });
}

function playerTemplate() {
  const c = getChar();
  const visual = CHARACTER_VISUALS[c.id] || CHARACTER_VISUALS.optimus_prime;
  const a = state.assetConfig?.stats || {};
  const map = getMap();
  const width = visual.width;
  const height = visual.height;
  const ground = map.platforms.find((platform) => map.spawn.x + width > platform.x && map.spawn.x < platform.x + platform.w);
  const startY = ground ? ground.y - height : map.spawn.y;
  return {
    x: map.spawn.x, y: startY, w: width, h: height, vx: 0, vy: 0, facing: 1, onGround: Boolean(ground),
    jumpsLeft: 1, climbing: false, roll: 0, attack: 0, cooldown: 0, transformCooldown: 0, invuln: 0, damagePulse: 0,
    beam: 0, beamDir: 1, matrixOpen: false, form: "robot", weaponId: WEAPONS[0].id,
    health: c.id === "optimus_prime" ? (a.maxHealth || c.stats.health) : c.stats.health, maxHealth: c.id === "optimus_prime" ? (a.maxHealth || c.stats.health) : c.stats.health,
    energon: 40, matrix: a.maxMatrix || c.stats.matrix, maxMatrix: a.maxMatrix || c.stats.matrix,
    score: 0, kills: 0, collectedEnergon: 0, move: c.id === "optimus_prime" ? (a.moveSpeed || c.stats.move) : c.stats.move, truck: c.id === "optimus_prime" ? (a.truckSpeed || c.stats.truck) : c.stats.truck, meleeIndex: 0,
    lane: 0, laneShift: 0, visual
  };
}

function enemyTemplate(spec) {
  const e = ENEMIES[spec.type];
  const drone = spec.type === "drone";
  return {
    type: spec.type, x: spec.x, y: spec.y, baseY: spec.y, w: drone ? 54 : spec.type === "brute" ? 72 : 58, h: drone ? 54 : spec.type === "brute" ? 104 : 88,
    vx: 0, vy: 0, facing: -1, hp: e.hp, maxHp: e.hp, speed: e.speed, range: spec.range, cooldown: Math.random() * 0.6, meleeCooldown: 0, hit: 0, alive: true, patrol: spec.x, color: e.color, lane: spec.lane || 0
  };
}

function startMission() {
  const map = getMap();
  state.game = emptyGame();
  state.game.active = true;
  state.game.map = map;
  state.game.player = playerTemplate();
  state.game.enemies = map.enemies.map(enemyTemplate);
  state.game.props = map.props.map((prop) => ({ ...prop }));
  state.network.remotePlayers = [];
  state.network.chatMessages = [];
  renderChatMessages();
  state.game.startedAt = performance.now();
  state.logs = [];
  dom.resultPanel.classList.add("hidden");
  dom.pauseModal.classList.add("hidden");
  showScreen("game");
  log(`${map.name} operasyonu acildi.`);
  if (state.settings.tutorial) log("Ipucu: Tum dusmanlari temizle, sonra cikis kapisina ilerle.");
  flash(dom.statusOverlay, "Systems Online", 1000);
  playSound("ui");
  updateHud();
  pushPresence();
  fetchPresence();
  fetchChatMessages();
}

function pauseGame(value) {
  if (!state.game.active) return;
  state.game.paused = typeof value === "boolean" ? value : !state.game.paused;
  dom.pauseModal.classList.toggle("hidden", !state.game.paused);
}

function spawnParticles(x, y, color, count) {
  const total = state.settings.quality === "high" ? count : Math.ceil(count * 0.55);
  for (let i = 0; i < total; i += 1) state.game.particles.push({ x, y, vx: -220 + Math.random() * 440, vy: -220 + Math.random() * 260, life: 0.18 + Math.random() * 0.44, maxLife: 0.62, size: 2 + Math.random() * 4, color });
}

function spawnSlash(player, color) {
  for (let i = 0; i < 9; i += 1) state.game.particles.push({ x: player.x + player.w / 2 + player.facing * 30, y: player.y + 38, vx: player.facing * (120 + Math.random() * 180), vy: -80 + Math.random() * 160, life: 0.16, maxLife: 0.16, size: 3 + Math.random() * 4, color });
}

function currentAim(player) {
  if (!state.input.mouse.inside || isTouchMode()) return player.facing === 1 ? 0 : Math.PI;
  const mx = state.game.cameraX + state.input.mouse.x;
  return Math.atan2(state.input.mouse.y - (player.y + 42), mx - (player.x + player.w / 2));
}

function laneOffset(lane) {
  return lane * 52;
}

function laneScale(entity) {
  const styleBoost = entity.visual?.laneScale || 1;
  return (1 + entity.lane * 0.08) * styleBoost;
}

function laneNear(a, b) {
  return Math.abs((a.lane || 0) - (b.lane || 0)) <= 0.6;
}

function shootProjectile(x, y, angle, weapon, owner) {
  const lane = owner === "player" ? state.game.player.lane : 0;
  state.game.projectiles.push({ x, y, vx: Math.cos(angle) * weapon.speed, vy: Math.sin(angle) * weapon.speed, radius: weapon.radius, damage: weapon.damage, owner, color: weapon.color, life: weapon.type === "bomb" ? 1.5 : 1.2, gravity: weapon.type === "bomb" ? 520 : 0, bomb: weapon.type === "bomb", lane });
}

function cycleWeapon() {
  const p = state.game.player;
  const i = WEAPONS.findIndex((w) => w.id === p.weaponId);
  p.weaponId = WEAPONS[(i + 1) % WEAPONS.length].id;
  flash(dom.statusOverlay, getWeapon(p.weaponId).name, 650);
  playSound("ui");
}

function transformPlayer() {
  const p = state.game.player;
  if (p.transformCooldown > 0) return;
  const oldH = p.h;
  p.form = p.form === "robot" ? "truck" : "robot";
  p.transformCooldown = 0.55;
  if (p.form === "truck") { p.w = p.visual.altWidth; p.h = p.visual.altHeight; p.climbing = false; flash(dom.statusOverlay, "Alt Form", 900); }
  else { p.w = p.visual.width; p.h = p.visual.height; flash(dom.statusOverlay, "Robot Form", 900); }
  p.y += oldH - p.h;
  spawnParticles(p.x + p.w / 2, p.y + p.h / 2, p.form === "truck" ? "#ffb36d" : "#6fdfff", 16);
  playSound("transform");
}

function healPlayer() {
  const p = state.game.player;
  if (p.energon < 20 || p.health >= p.maxHealth) return flash(dom.statusOverlay, "Energon yetersiz", 700);
  p.energon -= 20;
  p.health = clamp(p.health + 34, 0, p.maxHealth);
  p.matrix = clamp(p.matrix + 8, 0, p.maxMatrix);
  spawnParticles(p.x + p.w / 2, p.y + 20, "#7fff9f", 14);
  playSound("revive");
  log("Matrix destekli tamir uygulandi.");
}

function matrixBeam() {
  const p = state.game.player;
  if (p.matrix < 32) return flash(dom.statusOverlay, "Matrix enerjisi dusuk", 700);
  p.matrix -= 32;
  p.matrixOpen = true;
  p.beam = 0.34;
  p.beamDir = p.facing;
  state.game.shake = 16;
  state.game.enemies.forEach((e) => {
    if (!e.alive) return;
    const sameLane = Math.abs((e.y + e.h / 2) - (p.y + p.h / 2)) < 130 && laneNear(p, e);
    const inFront = p.facing === 1 ? e.x > p.x : e.x < p.x;
    const close = Math.abs(e.x - p.x) < 460;
    if (sameLane && inFront && close) damageEnemy(e, 42, "matrix");
  });
  playSound("matrix");
  log("Matrix beam aktif.");
}

function melee(kind) {
  const p = state.game.player;
  if (p.form === "truck") return flash(dom.statusOverlay, "Truck formunda melee kisitli", 700);
  const set = {
    melee1: { label: "Kick", damage: 26, range: 82, push: 160, color: "#ffb36d" },
    melee2: { label: "Punch", damage: 22, range: 72, push: 140, color: "#ffd37a" },
    melee3: { label: "Headbutt", damage: 32, range: 58, push: 180, color: "#ff8e65" },
    saber: { label: "Star Saber", damage: 48, range: 118, push: 220, color: "#7fd7ff" }
  }[kind];
  p.attack = 0.2;
  let hit = false;
  state.game.enemies.forEach((e) => {
    if (!e.alive) return;
    const front = p.facing === 1 ? e.x > p.x - 10 : e.x < p.x + 10;
    const reach = Math.abs((e.x + e.w / 2) - (p.x + p.w / 2)) < set.range;
    const lane = Math.abs((e.y + e.h / 2) - (p.y + p.h / 2)) < 84;
    if (front && reach && lane && laneNear(p, e)) { damageEnemy(e, set.damage, kind); e.vx += p.facing * set.push; hit = true; }
  });
  spawnSlash(p, set.color);
  playSound(kind === "saber" ? "shotgun" : "hit");
  if (!hit) flash(dom.statusOverlay, set.label, 500);
}

function rollPlayer() {
  const p = state.game.player;
  if (p.form !== "robot" || !p.onGround || p.roll > 0) return;
  p.roll = 0.28;
  p.invuln = Math.max(p.invuln, 0.22);
  p.vx = p.facing * 440;
  flash(dom.statusOverlay, "Combat Roll", 520);
}

function firePlayer() {
  const p = state.game.player;
  if (p.cooldown > 0) return;
  const w = getWeapon(p.weaponId);
  if (p.form === "truck" && w.type === "melee") return flash(dom.statusOverlay, "Truck formu icin menzilli silah sec", 720);
  if (p.energon < w.energy) return flash(dom.statusOverlay, "Energon dusuk", 700);
  p.cooldown = w.cooldown;
  p.energon = clamp(p.energon - w.energy, 0, 999);
  if (w.type === "melee") return melee("saber");
  const x = p.x + p.w / 2 + p.facing * (p.form === "truck" ? 52 : 30);
  const y = p.y + (p.form === "truck" ? 24 : 42);
  const angle = currentAim(p);
  if (w.type === "spread") {
    [-0.18, -0.09, 0, 0.09, 0.18].forEach((s) => shootProjectile(x, y, angle + s, w, "player"));
    playSound("shotgun");
  } else {
    shootProjectile(x, y, angle, w, "player");
    playSound(w.type === "bomb" ? "bomb" : w.type === "rapid" ? "auto_rifle" : "blaster");
  }
}

function damageEnemy(enemy, amount, source) {
  if (!enemy.alive) return;
  const p = state.game.player;
  const final = p.matrixOpen ? Math.round(amount * 1.15) : amount;
  enemy.hp -= final;
  enemy.hit = 0.14;
  spawnParticles(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, enemy.color, 8);
  flash(dom.crossOverlay, source === "matrix" ? "MATRIX" : "X HIT", 240);
  playSound("hit");
  if (enemy.hp <= 0) {
    enemy.alive = false;
    p.score += ENEMIES[enemy.type].score;
    p.kills += 1;
    state.profile.totalKills += 1;
    spawnPickup(enemy.x + enemy.w / 2, enemy.y + enemy.h / 2, ENEMIES[enemy.type].pickup);
    state.game.shake = 12;
    flash(dom.crossOverlay, "KILL", 300);
    playSound("kill");
    log(`${enemy.type.toUpperCase()} imha edildi.`);
  }
}

function damagePlayer(amount) {
  const p = state.game.player;
  if (p.invuln > 0) return;
  p.health = clamp(p.health - amount, 0, p.maxHealth);
  p.invuln = 0.34;
  p.damagePulse = 0.18;
  state.game.shake = 10;
  playSound("hurt");
  if (p.health <= 0) endMission(false);
}

function spawnPickup(x, y, amount) {
  state.game.pickups.push({ x, y, vx: -60 + Math.random() * 120, vy: -180 + Math.random() * 100, amount, size: 16, life: 14 });
}

function damageProp(prop, amount, color = "#ffc964") {
  if (!prop.alive) return;
  prop.hp -= amount;
  spawnParticles(prop.x + prop.w / 2, prop.y + prop.h / 2, color, 10);
  if (prop.hp <= 0) {
    prop.alive = false;
    state.game.player.score += 24;
    flash(dom.statusOverlay, "Cover Broken", 420);
  }
}

function land(entity, previousY) {
  entity.onGround = false;
  for (const p of state.game.map.platforms) {
    const prevBottom = previousY + entity.h;
    const newBottom = entity.y + entity.h;
    const overlapX = entity.x + entity.w > p.x && entity.x < p.x + p.w;
    if (entity.vy >= 0 && prevBottom <= p.y && newBottom >= p.y && overlapX) {
      entity.y = p.y - entity.h;
      entity.vy = 0;
      entity.onGround = true;
      if (entity.jumpsLeft !== undefined) entity.jumpsLeft = 1;
      break;
    }
  }
}

function ladderOf(entity) {
  return state.game.map.ladders.find((l) => entity.x + entity.w > l.x && entity.x < l.x + l.w && entity.y + entity.h > l.y && entity.y < l.y + l.h);
}

function updatePlayer(dt) {
  const p = state.game.player;
  p.cooldown = Math.max(0, p.cooldown - dt);
  p.transformCooldown = Math.max(0, p.transformCooldown - dt);
  p.attack = Math.max(0, p.attack - dt);
  p.invuln = Math.max(0, p.invuln - dt);
  p.roll = Math.max(0, p.roll - dt);
  p.beam = Math.max(0, p.beam - dt);
  p.damagePulse = Math.max(0, p.damagePulse - dt);
  p.matrix = clamp(p.matrix + dt * (p.matrixOpen ? 2.4 : 1.2), 0, p.maxMatrix);

  if (consume("transform")) transformPlayer();
  if (consume("weapon")) cycleWeapon();
  if (consume("matrix")) { p.matrixOpen = !p.matrixOpen; flash(dom.statusOverlay, p.matrixOpen ? "Matrix Link Open" : "Matrix Link Closed", 700); playSound(p.matrixOpen ? "matrix" : "ui"); }
  if (consume("special")) matrixBeam();
  if (consume("heal")) healPlayer();
  if (consume("roll")) rollPlayer();
  if (consume("laneFront")) p.lane = clamp(p.lane + 1, -1, 1);
  if (consume("laneBack")) p.lane = clamp(p.lane - 1, -1, 1);
  if (consume("matrixTouch")) { if (p.matrixOpen) matrixBeam(); else { p.matrixOpen = true; flash(dom.statusOverlay, "Matrix Link Open", 700); playSound("matrix"); } }
  if (consume("meleeTouch")) { p.meleeIndex = (p.meleeIndex + 1) % 3; melee(["melee1", "melee2", "melee3"][p.meleeIndex]); }
  if (consume("melee1")) melee("melee1");
  if (consume("melee2")) melee("melee2");
  if (consume("melee3")) melee("melee3");
  if (isDown("fire") || state.input.mouse.down) firePlayer();

  const ladder = ladderOf(p);
  if (p.form === "robot" && isDown("climb") && ladder) { p.climbing = true; p.vy = 0; }
  else if (!ladder || p.form === "truck") p.climbing = false;

  if (p.roll > 0) {
    p.vx = p.facing * 430;
  } else {
    const dir = (isDown("right") ? 1 : 0) - (isDown("left") ? 1 : 0);
    if (dir) p.facing = dir > 0 ? 1 : -1;
    p.vx = dir * (p.form === "truck" ? p.truck : p.move) * (p.matrixOpen ? 1.08 : 1);
  }

  if (p.climbing) {
    p.vy = 0;
    if (isDown("jump")) p.vy = -230;
    if (isDown("down")) p.vy = 230;
  } else {
    if (consume("jump")) {
      if (p.onGround) { p.vy = p.form === "truck" ? -500 : -620; p.onGround = false; p.jumpsLeft = 1; }
      else if (p.jumpsLeft > 0 && p.form === "robot") { p.vy = -540; p.jumpsLeft -= 1; }
    }
    p.vy += 1800 * dt;
  }

  const prevY = p.y;
  p.laneShift = lerp(p.laneShift, laneOffset(p.lane), clamp(dt * 8, 0, 1));
  p.x += p.vx * dt;
  p.x = clamp(p.x, 0, state.game.map.width - p.w);
  p.y += p.vy * dt;
  land(p, prevY);
  if (p.y + p.h > VIEW_H + 180) damagePlayer(999);
  state.game.enemies.forEach((e) => {
    if (!e.alive) return;
    if (p.form === "truck" && Math.abs(p.vx) > 270 && rectHit(p, e) && laneNear(p, e)) { damageEnemy(e, 20, "ram"); e.vx += p.facing * 200; state.game.shake = 8; }
  });
  state.game.props.forEach((prop) => {
    if (!prop.alive) return;
    if (p.form === "truck" && Math.abs(p.vx) > 270 && rectHit(p, prop) && laneNear(p, prop)) {
      damageProp(prop, 28, "#ffb36d");
      state.game.shake = 6;
    }
  });
}

function enemyShot(enemy) {
  if (enemy.type === "brute") return;
  const p = state.game.player;
  const stats = ENEMIES[enemy.type];
  const angle = Math.atan2((p.y + p.h / 2) - (enemy.y + enemy.h / 2), (p.x + p.w / 2) - (enemy.x + enemy.w / 2));
  state.game.projectiles.push({ x: enemy.x + enemy.w / 2, y: enemy.y + enemy.h / 2, vx: Math.cos(angle) * stats.bullet, vy: Math.sin(angle) * stats.bullet, radius: enemy.type === "sniper" ? 6 : 4, damage: stats.damage, owner: "enemy", color: enemy.color, life: enemy.type === "sniper" ? 1.6 : 1.2, gravity: 0, bomb: false, lane: enemy.lane });
}

function updateEnemies(dt) {
  const p = state.game.player;
  state.game.enemies.forEach((e) => {
    if (!e.alive) return;
    e.cooldown = Math.max(0, e.cooldown - dt);
    e.meleeCooldown = Math.max(0, e.meleeCooldown - dt);
    e.hit = Math.max(0, e.hit - dt);
    const dx = (p.x + p.w / 2) - (e.x + e.w / 2);
    const dy = (p.y + p.h / 2) - (e.y + e.h / 2);
    const d = Math.hypot(dx, dy);
    e.facing = dx >= 0 ? 1 : -1;
    if (e.type === "drone") {
      e.baseY += Math.sin(state.game.time * 0.2 + e.x * 0.01) * 0.12;
      e.y = e.baseY + Math.sin(state.game.time * 3 + e.x * 0.02) * 18;
      e.x += clamp(dx, -1, 1) * e.speed * 0.38 * dt;
      if (d < e.range && e.cooldown <= 0) { e.cooldown = 1.05; enemyShot(e); }
      return;
    }
    const prevY = e.y;
    const inRange = d < e.range;
    if (inRange) e.vx = e.type === "sniper" ? (Math.abs(dx) < 150 ? -e.facing * e.speed * 0.6 : 0) : e.facing * e.speed;
    else e.vx = clamp(e.patrol - e.x, -1, 1) * e.speed * 0.6;
    e.vy += 1800 * dt;
    e.x += e.vx * dt;
    e.y += e.vy * dt;
    e.x = clamp(e.x, 0, state.game.map.width - e.w);
    land(e, prevY);
    if (e.type === "brute" && d < e.range && Math.abs(dy) < 90 && laneNear(e, p) && e.meleeCooldown <= 0) {
      e.meleeCooldown = 1;
      damagePlayer(ENEMIES.brute.damage);
      p.vx += e.facing * 180;
      spawnParticles(p.x + p.w / 2, p.y + p.h / 2, "#ff8e65", 12);
      return;
    }
    if (e.type !== "brute" && inRange && Math.abs(dy) < 130 && laneNear(e, p) && e.cooldown <= 0) {
      e.cooldown = e.type === "sniper" ? 1.4 : 0.95;
      enemyShot(e);
    }
  });
}

function bombExplode(b) {
  spawnParticles(b.x, b.y, "#ffc964", 24);
  playSound("bomb");
  state.game.enemies.forEach((e) => {
    if (!e.alive) return;
    if (dist(b.x, b.y, e.x + e.w / 2, e.y + e.h / 2) < 90) damageEnemy(e, b.damage + 12, "bomb");
  });
}

function updateProjectiles(dt) {
  const p = state.game.player;
  const map = state.game.map;
  state.game.projectiles = state.game.projectiles.filter((b) => {
    b.life -= dt;
    b.vy += b.gravity * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    if (b.life <= 0) { if (b.bomb) bombExplode(b); return false; }
    if (b.x < -80 || b.x > map.width + 80 || b.y < -80 || b.y > VIEW_H + 180) return false;
    if (b.bomb) {
      for (const pf of map.platforms) {
        if (b.x > pf.x && b.x < pf.x + pf.w && b.y + b.radius >= pf.y && b.y < pf.y + 20 && b.vy > 0) { bombExplode(b); return false; }
      }
    }
    if (b.owner === "player") {
      for (const e of state.game.enemies) if (e.alive && laneNear(b, e) && circleRectHit(b, e)) { damageEnemy(e, b.damage, "shot"); return false; }
      for (const prop of state.game.props) if (prop.alive && laneNear(b, prop) && circleRectHit(b, prop)) { damageProp(prop, b.damage, b.color); return false; }
    } else if (laneNear(b, p) && circleRectHit(b, p)) { damagePlayer(b.damage); return false; }
    return true;
  });
}

function updatePickups(dt) {
  const p = state.game.player;
  state.game.pickups = state.game.pickups.filter((g) => {
    g.life -= dt;
    g.vy += 680 * dt;
    g.x += g.vx * dt;
    g.y += g.vy * dt;
    for (const pf of state.game.map.platforms) {
      if (g.x + g.size > pf.x && g.x - g.size < pf.x + pf.w && g.y + g.size >= pf.y && g.y < pf.y + 30) {
        g.y = pf.y - g.size;
        g.vy *= -0.22;
      }
    }
    if (g.life <= 0) return false;
    if (dist(g.x, g.y, p.x + p.w / 2, p.y + p.h / 2) < 44) {
      p.energon += g.amount;
      p.collectedEnergon += g.amount;
      p.health = clamp(p.health + Math.ceil(g.amount * 0.45), 0, p.maxHealth);
      p.matrix = clamp(p.matrix + Math.ceil(g.amount * 0.32), 0, p.maxMatrix);
      state.profile.totalEnergon += g.amount;
      spawnParticles(g.x, g.y, "#7fff9f", 10);
      playSound("pickup");
      log(`Energon toplandi +${g.amount}`);
      return false;
    }
    return true;
  });
}

function updateParticles(dt) {
  state.game.particles = state.game.particles.filter((p) => {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 120 * dt;
    return p.life > 0;
  });
}

function updateObjective() {
  if (!state.game.enemies.some((e) => e.alive) && !state.game.objectiveComplete) {
    state.game.objectiveComplete = true;
    flash(dom.statusOverlay, "Extraction Ready", 1200);
    log("Cikis kapisi aktif.");
    playSound("ui");
  }
  const p = state.game.player;
  if (state.game.objectiveComplete && rectContains(state.game.map.exit, p.x + p.w / 2, p.y + p.h / 2)) endMission(true);
}

function updateHud() {
  if (!state.game.player || !state.game.map) return;
  const p = state.game.player;
  dom.hudNickname.textContent = state.profile.nickname;
  dom.hudFaction.textContent = state.selectedFaction;
  dom.hudCharacter.textContent = getChar().name;
  dom.hudMapName.textContent = state.game.map.name;
  dom.hudWeapon.textContent = getWeapon(p.weaponId).name;
  dom.hudForm.textContent = p.form === "truck" ? "Truck" : "Robot";
  dom.healthFill.style.width = `${(p.health / p.maxHealth) * 100}%`;
  dom.healthValue.textContent = `${Math.ceil(p.health)} / ${p.maxHealth}`;
  dom.energonValue.textContent = String(Math.floor(p.energon));
  dom.matrixValue.textContent = String(Math.floor(p.matrix));
  dom.scoreValue.textContent = String(p.score);
  dom.killsValue.textContent = String(p.kills);
  dom.objectiveTitle.textContent = state.game.map.name;
  dom.objectiveText.textContent = state.game.objectiveComplete ? "Dusmanlar temizlendi. Cikis kapisina ulas." : state.game.map.objective;
}

function endMission(success) {
  if (state.game.result) return;
  state.game.result = true;
  state.game.paused = true;
  const p = state.game.player;
  const elapsed = Math.max(1, Math.round((performance.now() - state.game.startedAt) / 1000));
  if (success) {
    p.score += 280 + Math.round(p.health * 1.2) + p.collectedEnergon;
    state.profile.score += p.score;
    state.profile.wins += 1;
    state.profile.favoriteCharacter = getChar().name;
    dom.resultTitle.textContent = "Mission Complete";
    dom.resultText.textContent = `Skor ${p.score} | Kill ${p.kills} | Energon ${p.collectedEnergon} | Sure ${elapsed} sn`;
    log("Gorev tamamlandi.");
    playSound("kill");
  } else {
    state.profile.score += Math.round(p.score * 0.35);
    dom.resultTitle.textContent = "Mission Failed";
    dom.resultText.textContent = `Prime dususu kaydedildi. Kill ${p.kills} | Energon ${p.collectedEnergon} | Sure ${elapsed} sn`;
    log("Gorev basarisiz oldu.");
  }
  state.profile.level = 1 + Math.floor(state.profile.score / 600);
  state.profile.lastMap = state.selectedMap;
  saveProfile(true);
  dom.resultPanel.classList.remove("hidden");
  flash(dom.statusOverlay, success ? "Objective Complete" : "Systems Critical", 1200);
}

function updateGame(dt) {
  if (!state.game.active || state.game.paused || state.game.result) return;
  state.game.time += dt;
  state.game.shake = Math.max(0, state.game.shake - 42 * dt);
  updatePlayer(dt);
  updateEnemies(dt);
  updateProjectiles(dt);
  updatePickups(dt);
  updateParticles(dt);
  updateObjective();
  updateHud();
  state.game.cameraX = lerp(state.game.cameraX, clamp(state.game.player.x - VIEW_W * 0.34, 0, state.game.map.width - VIEW_W), clamp(dt * 5.2, 0, 1));
}

function drawBackground() {
  const m = state.game.map;
  const gradient = ctx.createLinearGradient(0, 0, 0, VIEW_H);
  gradient.addColorStop(0, m.skyTop);
  gradient.addColorStop(1, m.skyBottom);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  const layers = state.settings.quality === "high" ? 4 : 2;
  for (let layer = 0; layer < layers; layer += 1) {
    const speed = 0.15 + layer * 0.12;
    const baseY = 500 + layer * 52;
    const width = 110 + layer * 34;
    for (let i = 0; i < 16; i += 1) {
      const x = ((i * 210) - state.game.cameraX * speed) % (VIEW_W + 240) - 120;
      const h = 110 + ((i + layer * 7) % 5) * 38;
      ctx.fillStyle = layer === 0 ? "rgba(255,255,255,0.04)" : layer === 1 ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.42)";
      ctx.fillRect(x, baseY - h, width, h);
      ctx.fillStyle = `${m.accent}22`;
      ctx.fillRect(x + 12, baseY - h + 12, 10, h - 24);
    }
  }
  if (state.settings.styleMode === "cinematic") {
    for (let i = 0; i < 5; i += 1) {
      const burstX = (i * 270 - state.game.cameraX * 0.18) % (VIEW_W + 180);
      const burstY = 120 + (i % 3) * 70;
      ctx.fillStyle = "rgba(255, 170, 90, 0.14)";
      ctx.beginPath();
      ctx.arc(burstX, burstY, 54 + i * 6, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    ctx.fillStyle = "rgba(255,255,255,0.04)";
    for (let i = 0; i < 24; i += 1) ctx.fillRect((i * 70 - state.game.cameraX * 0.2) % (VIEW_W + 90), 84 + (i % 6) * 24, 3, 3);
  }
}

function drawPlatforms() {
  const m = state.game.map;
  ctx.save();
  ctx.translate(-state.game.cameraX, 0);
  m.platforms.forEach((p, i) => {
    const g = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
    g.addColorStop(0, "rgba(255,255,255,0.15)");
    g.addColorStop(1, "rgba(6,12,20,0.96)");
    ctx.fillStyle = g;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    ctx.fillStyle = i === 0 ? `${m.accent}33` : "rgba(255,255,255,0.06)";
    ctx.fillRect(p.x, p.y, p.w, 4);
  });
  m.ladders.forEach((l) => {
    ctx.fillStyle = `${m.accent}22`;
    ctx.fillRect(l.x, l.y, l.w, l.h);
    ctx.strokeStyle = `${m.accent}66`;
    ctx.lineWidth = 2;
    ctx.strokeRect(l.x + 4, l.y, l.w - 8, l.h);
    for (let y = l.y + 10; y < l.y + l.h; y += 18) ctx.fillRect(l.x + 8, y, l.w - 16, 4);
  });
  const ex = m.exit;
  ctx.strokeStyle = state.game.objectiveComplete ? "#7fff9f" : "rgba(255,255,255,0.25)";
  ctx.lineWidth = 4;
  ctx.strokeRect(ex.x, ex.y, ex.w, ex.h);
  if (state.game.objectiveComplete) { ctx.fillStyle = "rgba(127,255,159,0.14)"; ctx.fillRect(ex.x, ex.y, ex.w, ex.h); }
  ctx.restore();
}

function drawProps() {
  ctx.save();
  ctx.translate(-state.game.cameraX, 0);
  state.game.props
    .filter((prop) => prop.alive)
    .sort((a, b) => a.lane - b.lane)
    .forEach((prop) => {
      const offsetY = laneOffset(prop.lane);
      const scale = 1 + prop.lane * 0.08;
      const w = prop.w * scale;
      const h = prop.h * scale;
      const x = prop.x - (w - prop.w) * 0.5;
      const y = prop.y + offsetY - (h - prop.h);
      ctx.fillStyle = prop.kind === "crate" ? "rgba(153, 90, 42, 0.88)" : "rgba(101, 110, 132, 0.92)";
      ctx.fillRect(x, y, w, h);
      ctx.strokeStyle = prop.kind === "crate" ? "rgba(255, 204, 132, 0.55)" : "rgba(190, 210, 255, 0.45)";
      ctx.strokeRect(x + 1.5, y + 1.5, w - 3, h - 3);
      ctx.fillStyle = "rgba(0,0,0,0.28)";
      ctx.fillRect(x + 5, y + h - 12, w - 10, 6);
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(x, y - 12, w, 5);
      ctx.fillStyle = prop.kind === "crate" ? "#ffbf76" : "#9ad6ff";
      ctx.fillRect(x, y - 12, w * (prop.hp / prop.maxHp), 5);
    });
  ctx.restore();
}

function drawPlayerMarker(screenX, screenY, color, label) {
  ctx.save();
  ctx.translate(screenX, screenY);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, -16);
  ctx.lineTo(12, 0);
  ctx.lineTo(0, 16);
  ctx.lineTo(-12, 0);
  ctx.closePath();
  ctx.fill();
  if (label) {
    ctx.font = "600 13px Oxanium";
    ctx.fillStyle = "#f2f7fd";
    ctx.textAlign = "center";
    ctx.fillText(label, 0, -24);
  }
  ctx.restore();
}

function drawRemotePlayers() {
  if (!state.network.remotePlayers.length) return;
  ctx.save();
  ctx.translate(-state.game.cameraX, 0);
  state.network.remotePlayers
    .slice()
    .sort((a, b) => (a.lane || 0) - (b.lane || 0))
    .forEach((remote) => {
      const visual = CHARACTER_VISUALS[remote.character] || CHARACTER_VISUALS.optimus_prime;
      const lane = remote.lane || 0;
      const scale = 0.86 + lane * 0.06;
      const centerX = remote.x + visual.width * 0.5;
      const centerY = remote.y + visual.height * 0.5 + laneOffset(lane);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(scale, scale);
      if (remote.form === "truck") {
        ctx.fillStyle = visual.altPrimary;
        ctx.fillRect(-visual.altWidth * 0.38, -12, visual.altWidth * 0.76, 28);
        ctx.fillStyle = visual.primary;
        ctx.fillRect(-visual.altWidth * 0.24, -32, visual.altWidth * 0.44, 42);
      } else {
        ctx.fillStyle = visual.secondary;
        ctx.fillRect(-18, -54, 36, 46);
        ctx.fillStyle = visual.primary;
        ctx.fillRect(-30, -20, 60, 52);
        ctx.fillStyle = visual.primary;
        ctx.fillRect(-48, -16, 16, 52);
        ctx.fillRect(32, -16, 16, 52);
        ctx.fillStyle = "#0e223f";
        ctx.fillRect(-30, 32, 18, 42);
        ctx.fillRect(12, 32, 18, 42);
      }
      ctx.restore();
      drawPlayerMarker(centerX, remote.y - 34 + laneOffset(lane), remote.faction === "Decepticon" ? "#ff7580" : "#66d1ff", remote.nickname);
    });
  ctx.restore();
}

function drawPlayer() {
  const p = state.game.player;
  const visual = p.visual || CHARACTER_VISUALS.optimus_prime;
  const depthScale = state.settings.styleMode === "cinematic" ? laneScale(p) : 0.94 + p.lane * 0.06;
  const x = p.x - state.game.cameraX + p.w / 2;
  const y = p.y + p.h / 2 + p.laneShift;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(p.facing * depthScale, depthScale);
  const spriteReady = getChar().id === "optimus_prime" && Boolean(state.assetImage && state.assetConfig?.animations);
  if (spriteReady) {
    const key = p.form === "truck" ? (Math.abs(p.vx) > 24 ? "truck_drive" : "truck_idle") : p.beam > 0 || p.matrixOpen ? "robot_matrix" : p.attack > 0 ? "robot_attack" : !p.onGround ? "robot_jump" : Math.abs(p.vx) > 20 ? "robot_run" : "robot_idle";
    const frames = state.assetConfig.animations[key] || state.assetConfig.animations.robot_idle;
    const frame = frames[Math.floor(state.game.time * 10) % frames.length];
    const scale = p.form === "truck" ? (state.assetConfig.stats?.truckScale || 0.88) : (state.assetConfig.stats?.robotScale || 0.82);
    ctx.drawImage(state.assetImage, frame.x, frame.y, frame.w, frame.h, -frame.anchorX * scale, -frame.anchorY * scale, frame.w * scale, frame.h * scale);
  } else if (p.form === "truck") {
    if (getChar().id === "starscream") {
      ctx.fillStyle = visual.secondary; ctx.beginPath(); ctx.moveTo(-66, 8); ctx.lineTo(0, -26); ctx.lineTo(68, 8); ctx.lineTo(8, 20); ctx.closePath(); ctx.fill();
      ctx.fillStyle = visual.primary; ctx.fillRect(-20, -16, 40, 20);
      ctx.fillStyle = visual.glow; ctx.fillRect(30, 0, 22, 6);
    } else if (getChar().id === "megatron") {
      ctx.fillStyle = visual.secondary; ctx.fillRect(-68, -8, 136, 34);
      ctx.fillStyle = visual.primary; ctx.fillRect(-34, -28, 72, 36);
      ctx.fillStyle = visual.glow; ctx.fillRect(36, -18, 28, 10);
      ctx.fillStyle = "#151515"; ctx.beginPath(); ctx.arc(-38, 28, 15, 0, Math.PI * 2); ctx.arc(38, 28, 15, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.fillStyle = visual.altPrimary; ctx.fillRect(-54, -12, 108, 28);
      ctx.fillStyle = visual.primary; ctx.fillRect(-38, -30, 56, 40);
      ctx.fillStyle = visual.secondary; ctx.fillRect(10, -30, 34, 40);
      ctx.fillStyle = "#d4e9ff"; ctx.fillRect(-18, -24, 20, 14);
      ctx.fillStyle = "#ffa647"; ctx.beginPath(); ctx.moveTo(-18, -18); ctx.lineTo(10, -8); ctx.lineTo(-4, 4); ctx.lineTo(-24, -2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#151515"; ctx.beginPath(); ctx.arc(-28, 20, 14, 0, Math.PI * 2); ctx.arc(28, 20, 14, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = visual.glow; ctx.fillRect(38, -12, 16, 8);
    }
  } else {
    ctx.fillStyle = visual.secondary; ctx.fillRect(-18, -52, 36, 48);
    ctx.fillStyle = visual.primary; ctx.fillRect(-30, -22, 60, 50);
    ctx.fillStyle = "#dce8ff"; ctx.fillRect(-10, -40, 20, 18);
    ctx.fillStyle = "#0e223f"; ctx.fillRect(-34, 28, 22, 48 + (visual.height > 140 ? 8 : 0)); ctx.fillRect(12, 28, 22, 48 + (visual.height > 140 ? 8 : 0));
    ctx.fillStyle = visual.primary; ctx.fillRect(-50, -18, 18, 56); ctx.fillRect(32, -18, 18, 56);
    ctx.fillStyle = visual.glow; ctx.fillRect(-6, -70, 12, 12);
    ctx.fillStyle = "#ffa647"; ctx.beginPath(); ctx.moveTo(-18, -8); ctx.lineTo(8, 0); ctx.lineTo(-4, 10); ctx.lineTo(-20, 6); ctx.closePath(); ctx.fill();
    if (p.matrixOpen) { ctx.strokeStyle = "rgba(111,223,255,0.65)"; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, -8, 52, 0, Math.PI * 2); ctx.stroke(); }
  }
  if (p.beam > 0) { ctx.fillStyle = "rgba(111,223,255,0.7)"; ctx.fillRect(0, -12, 360, 22); }
  ctx.restore();
  drawPlayerMarker(x, p.y - 38 + p.laneShift, "#4bb2ff", state.profile.nickname);
}

function drawEnemies() {
  ctx.save();
  ctx.translate(-state.game.cameraX, 0);
  state.game.enemies.forEach((e) => {
    if (!e.alive) return;
    const depthScale = 1 + e.lane * 0.07;
    ctx.save();
    ctx.translate(e.x + e.w / 2, e.y + e.h / 2 + laneOffset(e.lane));
    ctx.scale(e.facing * depthScale, depthScale);
    if (e.type === "drone") {
      ctx.fillStyle = e.color;
      ctx.beginPath(); ctx.moveTo(0, -26); ctx.lineTo(24, 0); ctx.lineTo(0, 26); ctx.lineTo(-24, 0); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#c8d8ff"; ctx.fillRect(-8, -4, 16, 8);
    } else {
      ctx.fillStyle = e.color; ctx.fillRect(-16, -26, 32, 36);
      ctx.fillStyle = "#280914"; ctx.fillRect(-20, 10, 14, 34); ctx.fillRect(6, 10, 14, 34);
      ctx.fillStyle = "#1a0a18"; ctx.fillRect(-30, -12, 12, 42); ctx.fillRect(18, -12, 12, 42);
      if (e.type === "sniper") { ctx.fillStyle = "#ffd9e1"; ctx.fillRect(16, -8, 24, 6); }
      if (e.type === "brute") { ctx.fillStyle = "#452417"; ctx.fillRect(-28, -12, 56, 20); }
    }
    if (e.hit > 0) { ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillRect(-e.w / 2, -e.h / 2, e.w, e.h); }
    ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(-e.w / 2, -e.h / 2 - 14, e.w, 6);
    ctx.fillStyle = e.color; ctx.fillRect(-e.w / 2, -e.h / 2 - 14, e.w * (e.hp / e.maxHp), 6);
    ctx.restore();
  });
  ctx.restore();
}

function drawProjectiles() {
  ctx.save();
  ctx.translate(-state.game.cameraX, 0);
  state.game.projectiles.forEach((b) => {
    ctx.fillStyle = b.color; ctx.beginPath(); ctx.arc(b.x, b.y + laneOffset(b.lane || 0), b.radius, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `${b.color}55`; ctx.beginPath(); ctx.arc(b.x, b.y + laneOffset(b.lane || 0), b.radius * 2.2, 0, Math.PI * 2); ctx.fill();
  });
  ctx.restore();
}

function drawPickups() {
  ctx.save();
  ctx.translate(-state.game.cameraX, 0);
  state.game.pickups.forEach((g) => {
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.rotate(state.game.time * 4);
    ctx.fillStyle = "#7deaff";
    ctx.beginPath(); ctx.moveTo(0, -g.size); ctx.lineTo(g.size * 0.68, 0); ctx.lineTo(0, g.size); ctx.lineTo(-g.size * 0.68, 0); ctx.closePath(); ctx.fill();
    ctx.restore();
  });
  ctx.restore();
}

function drawParticles() {
  ctx.save();
  ctx.translate(-state.game.cameraX, 0);
  state.game.particles.forEach((p) => {
    const a = Math.round(clamp(p.life / p.maxLife, 0, 1) * 255).toString(16).padStart(2, "0");
    ctx.fillStyle = `${p.color}${a}`;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
  ctx.restore();
}

function drawTutorial() {
  if (!state.settings.tutorial || state.game.time > 11) return;
  ctx.fillStyle = "rgba(5,9,19,0.78)";
  ctx.fillRect(24, 24, 420, 98);
  ctx.strokeStyle = "rgba(111,223,255,0.3)";
  ctx.strokeRect(24, 24, 420, 98);
  ctx.fillStyle = "#f2f7fd";
  ctx.font = "700 20px Oxanium";
  ctx.fillText("Tutorial", 44, 56);
  ctx.font = "16px Space Grotesk";
  ctx.fillStyle = "#c7d4e4";
  ctx.fillText("WASD ile hareket et, Mouse ile ates et, T ile donus.", 44, 84);
  ctx.fillText("Tum dusmanlari temizleyince cikis kapisi acilir.", 44, 108);
}

function drawPulse() {
  const p = state.game.player;
  if (p.damagePulse <= 0) return;
  ctx.fillStyle = `rgba(255,96,96,${p.damagePulse})`;
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);
}

function draw() {
  if (!state.game.player || !state.game.map) return;
  ctx.clearRect(0, 0, VIEW_W, VIEW_H);
  const sx = state.game.shake ? (-state.game.shake + Math.random() * state.game.shake * 2) : 0;
  const sy = state.game.shake ? (-state.game.shake + Math.random() * state.game.shake * 2) : 0;
  ctx.save();
  ctx.translate(sx, sy);
  drawBackground();
  drawPlatforms();
  drawProps();
  drawPickups();
  drawProjectiles();
  drawEnemies();
  drawRemotePlayers();
  drawPlayer();
  drawParticles();
  drawTutorial();
  drawPulse();
  ctx.restore();
}

function loop(ts) {
  if (!state.game.lastFrame) state.game.lastFrame = ts;
  const dt = Math.min(0.033, (ts - state.game.lastFrame) / 1000);
  state.game.lastFrame = ts;
  if (state.game.active) {
    if (consume("pause")) pauseGame();
    updateGame(dt);
    draw();
  }
  clearFrameInput();
  requestAnimationFrame(loop);
}

function applyProfileSelections() {
  state.selectedFaction = state.profile.faction || state.selectedFaction;
  state.selectedCharacter = state.profile.characterId || state.selectedCharacter;
  state.selectedMap = state.profile.lastMap || state.selectedMap;
}

function fillInputs() {
  dom.nicknameInput.value = state.profile.nickname;
  dom.inviteCode.textContent = state.profile.inviteCode || idCode(state.profile.nickname);
}

function playFlow() {
  if (state.network.sharedMap && MAPS.some((map) => map.id === state.network.sharedMap)) {
    state.selectedMap = state.network.sharedMap;
  }
  state.profile.nickname = (dom.nicknameInput.value || "PrimeHunter").trim() || "PrimeHunter";
  state.profile.faction = state.selectedFaction;
  state.profile.characterId = state.selectedCharacter;
  state.profile.lastMap = state.selectedMap;
  state.profile.inviteCode = idCode(state.profile.nickname);
  state.profile.favoriteCharacter = getChar().name;
  saveProfile(true);
  startLoading(startMission);
}

function continueFlow() {
  if (!localStorage.getItem(STORAGE.profile)) return showBanner("Kayit bulunamadi. Once profil olustur.");
  state.profile = loadProfile();
  applyProfileSelections();
  fillInputs();
  refreshCommand();
  startLoading(startMission);
}

function bindUi() {
  dom.playButton.addEventListener("click", () => { unlockAudio(); startLoading(() => { showScreen("command"); refreshCommand(); }); });
  dom.continueButton.addEventListener("click", continueFlow);
  dom.menuNavButtons.forEach((button) => button.addEventListener("click", () => {
    unlockAudio();
    playSound("ui");
    if (button.dataset.nav === "profile") renderProfile();
    if (button.dataset.nav === "command") refreshCommand();
    showScreen(button.dataset.nav);
  }));
  dom.nicknameInput.addEventListener("input", () => { state.profile.nickname = dom.nicknameInput.value.trim() || "PrimeHunter"; state.profile.inviteCode = idCode(state.profile.nickname); refreshCommand(); });
  dom.chatSendButton.addEventListener("click", () => { unlockAudio(); sendChatMessage(); });
  dom.chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      unlockAudio();
      sendChatMessage();
    }
  });
  dom.copyInviteButton.addEventListener("click", async () => { unlockAudio(); try { await navigator.clipboard.writeText(dom.inviteCode.textContent); showBanner("Davet kodu kopyalandi."); } catch { showBanner("Kopyalama desteklenmedi."); } });
  dom.enterBattleButton.addEventListener("click", playFlow);
  dom.soundToggleButton.addEventListener("click", () => { unlockAudio(); state.settings.soundEnabled = !state.settings.soundEnabled; saveSettings(); syncSettings(); if (state.settings.soundEnabled) playSound("ui"); });
  dom.qualityHighButton.addEventListener("click", () => { state.settings.quality = "high"; saveSettings(); syncSettings(); });
  dom.qualityLowButton.addEventListener("click", () => { state.settings.quality = "low"; saveSettings(); syncSettings(); });
  dom.styleCinematicButton.addEventListener("click", () => { state.settings.styleMode = "cinematic"; saveSettings(); syncSettings(); });
  dom.styleStylizedButton.addEventListener("click", () => { state.settings.styleMode = "stylized"; saveSettings(); syncSettings(); });
  dom.mobileControlsButton.addEventListener("click", () => { state.settings.mobileControls = !state.settings.mobileControls; saveSettings(); syncSettings(); });
  dom.audioSynthButton.addEventListener("click", () => { state.settings.audioProfile = "synth"; saveSettings(); syncSettings(); });
  dom.audioAssetButton.addEventListener("click", () => { state.settings.audioProfile = "asset"; saveSettings(); syncSettings(); });
  dom.tutorialButton.addEventListener("click", () => { state.settings.tutorial = !state.settings.tutorial; saveSettings(); syncSettings(); });
  dom.resumeButton.addEventListener("click", () => pauseGame(false));
  dom.pauseSettingsButton.addEventListener("click", () => { pauseGame(true); showScreen("settings"); });
  dom.saveQuitButton.addEventListener("click", () => { saveProfile(); state.game = emptyGame(); showScreen("menu"); });
  dom.resultContinueButton.addEventListener("click", () => {
    const i = MAPS.findIndex((m) => m.id === state.selectedMap);
    state.selectedMap = MAPS[(i + 1) % MAPS.length].id;
    state.profile.lastMap = state.selectedMap;
    saveProfile(true);
    playFlow();
  });
  dom.resultMenuButton.addEventListener("click", () => { saveProfile(); state.game = emptyGame(); showScreen("menu"); });
}

function initCommunity() {
  setInterval(() => {
    state.community.joined += Math.random() > 0.68 ? 1 : 0;
    syncTopbar();
  }, 3800);
}

function init() {
  applyProfileSelections();
  if (!state.profile.inviteCode) state.profile.inviteCode = idCode(state.profile.nickname);
  fillInputs();
  renderFactions();
  renderCharacters();
  renderMaps();
  renderLore();
  renderUpdates();
  renderProfile();
  refreshCommand();
  bindUi();
  bindKeyboard();
  bindPointer();
  bindMobile();
  syncSettings();
  syncTopbar();
  syncContinue();
  loadAssets();
  startHeroSlideshow();
  fetchSiteStatus();
  showPendingUpdateNotes();
  renderChatMessages();
  fetchChatMessages();
  startNetworkLoops();
  applyDailyReward();
  initCommunity();
  requestAnimationFrame(loop);
}

init();
