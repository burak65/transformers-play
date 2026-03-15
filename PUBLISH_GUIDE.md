# Transformers Play Publish Guide

Bu proje Python tabanli oldugu icin ucretsiz yayinlama icin en pratik yol `Render` web service kullanmaktir.

## 1. GitHub'a yukle

1. Proje klasorunu bir GitHub reposuna yukle.
2. Bu klasor repo kokundeyse `render.yaml` dogrudan calisir.
3. Eger repo kokun bunun ust klasoruyse Render tarafinda `Root Directory` olarak `comand-py` sec.

## 2. Render ile ucretsiz yayinla

1. `https://render.com/` uzerinde hesap ac.
2. `New +` > `Blueprint` veya `Web Service` sec.
3. GitHub reponu bagla.
4. `render.yaml` okunursa servis otomatik hazirlanir.
5. Servis acildiginda sana bir adres verir:
   - ornek: `https://transformers-play.onrender.com`

## 3. Site URL bilgisini guncelle

Deploy olduktan sonra [site_state.json](/C:/Users/ffgon/OneDrive/Masa%C3%BCst%C3%BC/web%20sitesi/comand-py/site_state.json) icindeki `site_url` alanini Render adresin veya kendi domainin ile degistir:

```json
"site_url": "https://transformers-play.onrender.com"
```

Kendi alan adin varsa daha sonra bunu onunla degistir:

```json
"site_url": "https://www.senin-alan-adin.com"
```

## 4. Domain baglama

1. Render panelinde servis ayarlarina gir.
2. `Custom Domains` bolumunden domain ekle.
3. Domain saglayicinda Render'in verdigi DNS kayitlarini ekle.
4. SSL otomatik aktif olduktan sonra `site_url` alanini yeni domain ile guncelle.

## 5. Google'da gorunme ayarlari

1. `Google Search Console` ac.
2. Domain veya URL prefix property ekle.
3. Sana verilen dogrulama meta kodunu [site_state.json](/C:/Users/ffgon/OneDrive/Masa%C3%BCst%C3%BC/web%20sitesi/comand-py/site_state.json) icindeki `google_site_verification` alanina yaz:

```json
"google_site_verification": "BURAYA_GOOGLE_KODU"
```

4. Deploy ettikten sonra Search Console icinde su adresi gonder:
   - `https://senin-site-adresin.com/sitemap.xml`

## 6. Robots ve sitemap

Bu projede [server.py](/C:/Users/ffgon/OneDrive/Masa%C3%BCst%C3%BC/web%20sitesi/comand-py/server.py) su dosyalari otomatik uretiyor:

- `/robots.txt`
- `/sitemap.xml`

Yani `site_url` dogru oldugu surece bunlar otomatik dogru calisir.

## 7. Kontrol listesi

- Ana site aciliyor mu
- `https://alan-adin.com/robots.txt` aciliyor mu
- `https://alan-adin.com/sitemap.xml` aciliyor mu
- Search Console dogrulamasi tamamlandi mi
- `site_url` localhost yerine gercek domain oldu mu
