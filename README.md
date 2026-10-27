# Website Profil Abid Zakaria

Website portofolio **satu halaman, dua bahasa (Indonesia / English)** yang siap di-hosting gratis di
**GitHub Pages** atau di VPS sendiri dengan Docker. Dibangun dengan HTML, [Tailwind CSS](https://tailwindcss.com)
(via CDN), dan JavaScript murni — **tanpa build step**, tanpa `npm install`, tanpa proses kompilasi.

- Situs: <https://abidzk01.github.io/>
- Pemilik: **Abid Zakaria** — FullStack Web Developer di CV. Langitnet Sidoarjo
- Lokasi: Gresik, Jawa Timur, Indonesia

## Daftar Isi

- [Fitur](#fitur)
- [Struktur Proyek](#struktur-proyek)
- [Menjalankan Secara Lokal](#menjalankan-secara-lokal)
- [Mengubah Data Profil](#mengubah-data-profil)
- [Multi-bahasa (ID / EN)](#multi-bahasa-id--en)
- [Halaman CV](#halaman-cv)
- [SEO](#seo)
- [Deploy ke GitHub Pages](#deploy-ke-github-pages)
- [Deploy dengan Docker](#deploy-dengan-docker)
- [Kustomisasi Lanjutan](#kustomisasi-lanjutan)
- [Pemecahan Masalah](#pemecahan-masalah)

---

## Fitur

| Fitur | Keterangan |
| --- | --- |
| **Section Profile / Hero** | Foto profil, nama, role, ringkasan, tombol CTA, dan tautan sosial media |
| **Section About** | Deskripsi diri plus kartu info lokasi, status, minat, dan bahasa |
| **Section Projects** | Kartu **Langitnet Shop** & **Langitnet Mitra** (tautan publik) + badge aplikasi internal |
| **Section Skills** | Tag/badge per kategori: Frontend, Backend, Tools & Lainnya (tanpa persentase) |
| **Section Contact (Email Me)** | Kartu Email, WhatsApp, GitHub, LinkedIn, Facebook + form yang mengisi email otomatis |
| **Halaman CV (`cv.html`)** | CV satu halaman ukuran A4, dua bahasa, siap cetak/PDF + berkas `cv.pdf` dan `cv-en.pdf` untuk diunduh |
| **Multi-bahasa (ID / EN)** | Tombol `ID` / `EN` di navbar, seluruh teks + meta + JSON-LD ikut berganti |
| **Dark / Light Mode** | Tombol toggle di navbar, preferensi disimpan di `localStorage` |
| **Responsif** | Diuji dari lebar 320 px sampai desktop |
| **Animasi & Scrollspy** | Scroll reveal, blob bergerak, dan link navigasi aktif mengikuti scroll |
| **Aksesibel** | Skip-link, label ARIA (ikut bahasa aktif), navigasi keyboard, hormati `prefers-reduced-motion` |
| **SEO Lengkap** | Meta description, Open Graph, Twitter Card, canonical, JSON-LD `Person`, `robots.txt`, `sitemap.xml`, `manifest` |
| **Siap Docker** | `Dockerfile` + `docker-compose.yml` berbasis Nginx alpine (read-only, healthcheck, log terbatas) |
| **Tanpa Build Step** | Cukup unggah file, langsung jalan |

---

## Struktur Proyek

```
myprofile/
├── index.html                 # Seluruh halaman (semua section) + penanda data-i18n
├── cv.html                    # CV satu halaman (A4, siap cetak) + penanda data-i18n
├── cv.pdf                     # Hasil cetak cv.html versi Indonesia
├── cv-en.pdf                  # Hasil cetak cv.html versi Inggris
├── css/
│   ├── style.css              # Animasi, palet cyan, gaya kustom di luar Tailwind
│   └── cv.css                 # Gaya halaman CV (print-first, tanpa Tailwind)
├── js/
│   ├── i18n.js                # Kamus dua bahasa (id / en) + penerjemah otomatis
│   └── main.js                # Tema, menu mobile, scrollspy, pemilih bahasa, form kontak
├── images/
│   ├── Profile.jpg            # Foto asli (sumber, tidak dipakai langsung di situs)
│   ├── avatar.jpg             # Foto profil 800x800 hasil crop (EXIF sudah diperbaiki)
│   ├── favicon.ico            # Ikon utama (16–256 px) — dipakai tab browser
│   ├── favicon.svg            # Versi vektor favicon (untuk browser modern)
│   ├── og-image.png           # Kartu preview saat link dibagikan (1200x630)
│   ├── apple-touch-icon.png   # Ikon iOS / home screen (180x180)
│   └── icon-512.png           # Ikon manifest PWA (512x512)
├── robots.txt                 # Aturan perayapan mesin pencari
├── sitemap.xml                # Peta situs untuk Google
├── manifest.webmanifest       # Metadata PWA (nama & ikon saat dipasang)
├── .gen-images.ps1            # Skrip pembuat ulang og-image & ikon (GDI+/System.Drawing)
├── .nojekyll                  # Agar GitHub Pages tidak memproses lewat Jekyll
├── Dockerfile                 # Resep image Nginx untuk deploy di VPS
├── docker-compose.yml         # Menjalankan container (port, healthcheck, restart)
├── .env.example               # Contoh konfigurasi port (salin menjadi .env)
├── .dockerignore              # File yang tidak perlu dikirim saat build image
├── docker/
│   ├── nginx.conf             # Konfigurasi Nginx: gzip, cache, log, /healthz
│   └── security-headers.conf  # CSP & header keamanan (dipakai berulang)
├── .gitignore
└── README.md
```

> **`DATA.md` tidak ada di repositori.** File itu berisi data pribadi (termasuk nomor HP), sudah
> didaftarkan di `.gitignore` supaya tidak ikut ter-publish ke GitHub Pages. Simpan hanya di lokal.
>
> **`images/Profile.jpg` juga tidak di-push.** Foto asli dari kamera menyimpan EXIF GPS (lokasi
> pengambilan foto). Situs memakai `images/avatar.jpg` yang sudah dibersihkan metadatanya. Simpan
> `Profile.jpg` hanya di lokal sebagai sumber; `.dockerignore` juga sudah mengecualikannya.

---

## Menjalankan Secara Lokal

### Opsi 1 — Server statis sederhana (paling cepat)

Jalankan salah satu perintah berikut di folder proyek:

```bash
# Python 3
python -m http.server 8080

# Node.js (tanpa instalasi global)
npx serve .
```

Lalu buka <http://localhost:8080>.

### Opsi 2 — Laragon / XAMPP

Letakkan folder ini di document root (`C:\laragon\www\myprofile` atau `htdocs\myprofile`),
lalu buka `http://localhost/myprofile/`.

### Opsi 3 — Docker / Podman (mendekati kondisi server)

```bash
docker compose up -d --build
```

Buka <http://localhost:8080>, hentikan dengan `docker compose down`.

> **Catatan:** membuka `index.html` langsung lewat `file://` juga bisa, tetapi sebagian browser
> membatasi `localStorage` pada protokol tersebut sehingga pilihan bahasa tidak tersimpan.
> Gunakan server lokal agar perilakunya sama seperti saat di-hosting.
>
> Memakai Podman? Perintahnya sama, cukup ganti `docker` menjadi `podman`.

---

## Mengubah Data Profil

Situs ini hanya memuat data yang sudah diverifikasi. Ada tiga tempat yang perlu diperhatikan.

### 1. Tautan & kontak — `js/main.js`

Semua tautan menghubungi Anda bersumber dari satu objek `SITE` (bagian atas file). Ubah di sini,
maka seluruh halaman (hero, kartu kontak, footer) ikut berubah otomatis:

```js
const SITE = {
  email: 'abidzakaria6@gmail.com',
  whatsapp: 'https://wa.me/6283114840702',   // format internasional tanpa tanda +
  github: 'https://github.com/abidzk01',
  linkedin: 'https://www.linkedin.com/in/abid-zakaria-139b1a112',
  x: 'https://x.com/rxdiag_',
  facebook: 'https://www.facebook.com/abidpoenya',
  formspreeId: ''                            // opsional, lihat bagian form di bawah
};
```

### 2. Tulisan di halaman — `js/i18n.js` **dan** `index.html`

Semua teks ada di kamus `js/i18n.js` (dua bagian: `id` dan `en`). Saat mengubah kalimat:

1. Ubah nilainya di **kedua** bahasa pada `js/i18n.js`.
2. Perbarui juga teks cadangan yang tertulis di `index.html` pada elemen dengan atribut
   `data-i18n="..."` — teks ini yang tampil bila JavaScript dimatikan.

### 3. Proyek & keahlian

- **Proyek**: cari `<article class="card reveal` di `index.html`. Setiap kartu berisi judul
  (`data-i18n="projects.shopTitle"`), deskripsi, daftar tag, dan tautan.
- **Keahlian**: daftar `<li>` di dalam section `#skills`. Untuk menambah teknologi, cukup tambahkan
  satu `<li>` dengan kelas yang sama seperti tetangganya.

### Mengganti foto profil

1. Simpan foto barumu sebagai `images/Profile.jpg` (boleh potret, orientasi apa pun).
2. Perbaiki rotasi EXIF, crop 1:1 ke area wajah, lalu simpan sebagai `images/avatar.jpg`:

   ```powershell
   Add-Type -AssemblyName System.Drawing
   $src = [System.Drawing.Image]::FromFile((Resolve-Path 'images\Profile.jpg').Path)
   $src.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipNone)   # sesuaikan orientasi EXIF
   $rect = New-Object System.Drawing.Rectangle(606, 796, 2850, 2850)     # x, y, ukuran (fokus wajah)
   $out  = New-Object System.Drawing.Bitmap(800, 800)
   $g = [System.Drawing.Graphics]::FromImage($out)
   $g.InterpolationMode = 'HighQualityBicubic'
   $g.DrawImage($src, (New-Object System.Drawing.Rectangle(0,0,800,800)), $rect, 'Pixel')
   $g.Dispose(); $src.Dispose()
   $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | ? { $_.MimeType -eq 'image/jpeg' }
   $par = New-Object System.Drawing.Imaging.EncoderParameters(1)
   $par.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 88L)
   $out.Save((Join-Path (Get-Location) 'images\avatar.jpg'), $codec, $par)
   $out.Dispose()
   ```

3. Jalankan ulang `.gen-images.ps1` agar `og-image.png` memakai foto yang baru (lihat [SEO](#seo)).

---

## Multi-bahasa (ID / EN)

### Cara pakai

Klik tombol **ID** / **EN** di navbar. Pilihan disimpan di `localStorage` dengan kunci
`profile-lang`, jadi tetap sama saat halaman dibuka lagi. Bila pengunjung belum pernah memilih,
bahasa mengikuti `navigator.language` (Indonesia → `id`, selain itu → `en`).

### Cara kerja

| Bagian | Peran |
| --- | --- |
| `js/i18n.js` | Kamus `DICT.id` / `DICT.en` + fungsi `apply()` yang menyisir DOM |
| `data-i18n="key"` | Mengganti `textContent` elemen (hanya untuk elemen yang isinya teks polos) |
| `data-i18n-attr="content:key,placeholder:key2"` | Mengganti atribut (bisa lebih dari satu, dipisah koma) |
| `data-lang-btn="id"` / `"en"` | Tombol pemilih bahasa; `aria-pressed` otomatis diperbarui |
| `js/i18n.js` dimuat **tanpa** `defer` | Agar bahasa terpasang sebelum render pertama (mencegah kedipan) |
| `js/main.js` (defer) | Menangani klik tombol bahasa, form, tema, dan label ARIA |

Saat bahasa berganti, yang ikut berubah bukan hanya teks: `<html lang>`, `<title>`,
`meta description`, Open Graph, Twitter Card, `og:locale`, dan field `description` /
`inLanguage` / `jobTitle` pada JSON-LD juga diperbarui.

### Menambah bahasa ketiga (mis. Jepang)

1. Tambahkan kunci `ja: { ... }` di `DICT` pada `js/i18n.js` (salin blok `en`, terjemahkan).
2. Tambahkan `'ja'` ke daftar `SUPPORTED` di file yang sama.
3. Tambahkan satu tombol di navbar `index.html`:
   `<button type="button" data-lang-btn="ja" aria-pressed="false" class="lang-btn">JA</button>`

Tidak ada perubahan lain yang diperlukan.

---

## Halaman CV

`cv.html` adalah versi CV satu halaman dari profil ini: ukuran A4, dua bahasa, dan
langsung siap dicetak. Tombol **Unduh CV** di hero dan footer `index.html` mengarah ke
`cv.pdf`, sedangkan menu **CV** di navbar membuka `cv.html`.

| Berkas | Isi |
| --- | --- |
| `cv.html` | Markup CV + penanda `data-i18n` (teks Indonesia menjadi fallback) |
| `css/cv.css` | Gaya layar & aturan cetak (`@page` A4, tanpa Tailwind) |
| `js/i18n.js` | Terjemahan Inggris pada kunci berawalan `cv.*` |
| `cv.pdf` | Hasil cetak versi Indonesia |
| `cv-en.pdf` | Hasil cetak versi Inggris |

### Mengubah isi CV

1. Ubah teks Indonesia langsung di `cv.html`.
2. Ubah teks yang sama pada blok `cv.*` di `js/i18n.js` (bagian `id` dan `en`).
3. Periksa hasilnya di `cv.html` dan `cv.html?lang=en`.

Section **Pendidikan** dan **Sertifikasi** sengaja disembunyikan (atribut `hidden`)
karena datanya belum diisi. Setelah melengkapi nama kampus/jurusan/tahun atau nama
sertifikasi, hapus atribut `hidden` pada `<section>` terkait.

### Membuat ulang PDF

PDF dibuat dari `cv.html` memakai Chrome/Edge headless, sehingga hasilnya sama dengan
tampilan cetak:

```powershell
$chrome = "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"

& $chrome --headless=new --disable-gpu --no-pdf-header-footer `
  --virtual-time-budget=5000 --print-to-pdf="cv.pdf" `
  "file:///$((Get-Location).Path -replace '\\','/')/cv.html?lang=id"

& $chrome --headless=new --disable-gpu --no-pdf-header-footer `
  --virtual-time-budget=5000 --print-to-pdf="cv-en.pdf" `
  "file:///$((Get-Location).Path -replace '\\','/')/cv.html?lang=en"
```

Tanpa Chrome, buka `cv.html` lalu klik **Cetak** (atau `Ctrl+P`) dan pilih
*Save as PDF* — pastikan ukuran kertas A4 dan opsi *Headers and footers* dimatikan.

> Jangan lupa memperbarui tanggal pada `cv.updated` di `js/i18n.js` setiap kali isi CV
> berubah, lalu jalankan ulang perintah di atas agar PDF ikut terbarui.

---

## SEO

### Yang sudah terpasang

- `<title>`, `meta description`, `keywords`, `author`, `robots`, `canonical`, dan `geo.*`
- **Open Graph** + **Twitter Card** lengkap (termasuk `og:image` 1200×630)
- **JSON-LD `Person`** (`id="jsonld-person"`): nama, profesi, perusahaan, alamat, email,
  telepon, `knowsAbout`, dan `sameAs` (GitHub, LinkedIn, X, Facebook)
- `robots.txt` (menolak crawler pengikis + menunjuk sitemap) dan `sitemap.xml`
- `manifest.webmanifest` + ikon 180/512 untuk pemasangan PWA

URL di dalam `index.html`, `robots.txt`, dan `sitemap.xml` memakai
`https://abidzk01.github.io/`. Bila memakai domain kustom, ganti ketiganya sekaligus
(mis. menjadi `https://abidzakaria.com/`).

### Verifikasi setelah deploy

1. **Rich Results Test** — <https://search.google.com/test/rich-results> (tempel URL, pastikan `Person` terbaca).
2. **Facebook Sharing Debugger** — <https://developers.facebook.com/tools/debug/> (klik *Scrape Again*).
3. **LinkedIn Post Inspector** — <https://www.linkedin.com/post-inspector/>.
4. **PageSpeed Insights** — <https://pagespeed.web.dev/>.
5. Daftarkan sitemap di [Google Search Console](https://search.google.com/search-console).

### Membuat ulang gambar SEO

`og-image.png`, `apple-touch-icon.png`, dan `icon-512.png` dibuat oleh `.gen-images.ps1`.
Jalankan setelah mengganti foto profil atau favicon:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .gen-images.ps1
```

Skrip ini menggambar `og-image.png` (gradien cyan + nama + role + **foto profil** dari
`images/avatar.jpg`) dan menurunkan ikon 180/512 dari frame terbesar `images/favicon.ico`
sehingga identitas visualnya konsisten. Untuk mengganti teks di kartu OG, ubah variabel
`$Nama`, `$Role`, dan `$Tagline` di bagian atas skrip.

> `favicon.svg` adalah versi vektor mark yang sama (laptop + kode) dan ditulis manual.
> `favicon.ico` tetap dipakai sebagai ikon utama agar kompatibel di semua browser.

---

## Deploy ke GitHub Pages

### Skenario A — Situs utama (`abidzk01.github.io`)

1. Buat repositori bernama persis **`abidzk01.github.io`**.
2. Jalankan:

   ```bash
   git init
   git add .
   git commit -m "Situs profil Abid Zakaria"
   git branch -M main
   git remote add origin https://github.com/abidzk01/abidzk01.github.io.git
   git push -u origin main
   ```

3. Buka **Settings → Pages**, pastikan *Source* = `Deploy from a branch`, *Branch* = `main` / `root`.
4. Tunggu 1–2 menit, lalu buka <https://abidzk01.github.io/>.

### Skenario B — Situs proyek (`abidzk01.github.io/myprofile`)

Jika memakai repositori bernama `myprofile`, situs akan berada di sub-path. Ganti semua URL
`https://abidzk01.github.io/` menjadi `https://abidzk01.github.io/myprofile/` pada
`index.html`, `robots.txt`, dan `sitemap.xml`.

### Update setelah deploy

```bash
git add .
git commit -m "Perbarui konten"
git push
```

> Pastikan `DATA.md` **tidak** muncul di daftar file (`git status`). File itu sudah ada di
> `.gitignore`; jangan pernah `git add -f DATA.md`.

---

## Deploy dengan Docker

Cocok untuk VPS tanpa GitHub Pages, atau bila ingin memakai domain sendiri.

### 1. Prasyarat di server

```bash
# Ubuntu / Debian
sudo apt update
sudo apt install -y docker.io docker-compose-v2
sudo systemctl enable --now docker
```

### 2. Menjalankan

Salin folder proyek ke server (mis. `scp -r` atau `git clone`), lalu:

```bash
cp .env.example .env        # opsional, ubah APP_PORT bila perlu
docker compose up -d --build
docker compose ps           # status harus "healthy"
```

Buka `http://IP-SERVER:8080`.

### 3. Mengubah port

Ubah `APP_PORT` di `.env` (mis. `APP_PORT=127.0.0.1:8080` bila berada di belakang reverse proxy),
lalu `docker compose up -d`.

### 4. Perilaku server yang sudah diatur

- **Read-only root filesystem.** Nginx hanya boleh menulis ke `tmpfs`: `/var/cache/nginx` dan
  `/var/run` (tempat `/var/run/nginx.pid`). **Jangan hapus baris `/var/run`** — tanpa itu container
  gagal start.
- `cap_drop: ALL` dengan hanya capability yang benar-benar dibutuhkan Nginx.
- `no-new-privileges: true`.
- Healthcheck `GET /healthz`, log dibatasi 10 MB × 3 file.
- Header keamanan (CSP, `X-Content-Type-Options`, `Referrer-Policy`, dll.) dari
  `docker/security-headers.conf`, gzip, dan cache aset statis 1 tahun.

### 5. HTTPS & domain dengan reverse proxy

Jalankan reverse proxy (Nginx Proxy Manager, Caddy, Traefik) di host yang sama, arahkan domain
ke `127.0.0.1:8080`, lalu keluarkan sertifikat Let's Encrypt lewat reverse proxy tersebut.
Bila reverse proxy dan container berada di jaringan Docker yang sama, aktifkan blok `networks`
yang sudah disediakan (dikomentari) di `docker-compose.yml`.

### 6. Perintah harian

```bash
docker compose logs -f      # lihat log
docker compose restart      # restart
docker compose down         # hentikan
docker compose up -d --build  # terapkan perubahan file
```

---

## Kustomisasi Lanjutan

### Mengubah skema warna

Palet merek ada di dua tempat dan harus diubah bersamaan:

1. `index.html` → `tailwind.config` (`colors.brand`) memakai skala cyan
   (`50 #ecfeff` … `900 #164e63`).
2. `css/style.css` → gradient pada `.text-gradient`, `.btn-primary`, `.avatar-ring`, `.blob-1`,
   `.blob-2`, `.nav-link::after`, `.field:focus`, dan `::selection`.

### Mengganti font

Ubah tautan Google Fonts dan `fontFamily.sans` di `tailwind.config` pada `index.html`,
lalu samakan `font-family` di `css/style.css` dan critical CSS di kepala `index.html`.

### Mengubah urutan section

Section berada berurutan di dalam `<main>`: `#home`, `#about`, `#projects`, `#skills`, `#contact`.
Pindahkan blok `<section>` utuhnya. Urutan menu navbar dan scrollspy mengikuti atribut `href`,
jadi tidak perlu diubah selama id-nya tetap sama.

### Mode produksi Tailwind (opsional)

CDN Tailwind praktis untuk pengembangan, tetapi mengirim JS yang lebih besar. Untuk produksi:

```bash
npx tailwindcss@3 -i css/tailwind-input.css -o css/tailwind-build.css --minify
```

lalu ganti `<script src="https://cdn.tailwindcss.com"></script>` dengan
`<link rel="stylesheet" href="css/tailwind-build.css" />` dan pindahkan konfigurasi tema ke
`tailwind.config.js`.

---

## Pemecahan Masalah

| Gejala | Penyebab & solusi |
| --- | --- |
| Bahasa tidak berubah / teks campur | Pastikan `js/i18n.js` dimuat **sebelum** `js/main.js` dan tanpa `defer`. Cek Console untuk error. |
| Pilihan bahasa tidak tersimpan | Halaman dibuka lewat `file://` (localStorage diblokir) atau mode privat. Jalankan server lokal. |
| Foto profil tidak muncul | `images/avatar.jpg` hilang; generasi ulang dari `images/Profile.jpg` (lihat bagian foto profil). |
| Foto tampak miring | Orientasi EXIF belum diperbaiki — jalankan ulang langkah `RotateFlip`. |
| Preview link tidak keluar | URL di `og:image` harus absolut dan sudah ter-deploy. Pakai *Scrape Again* di Facebook Debugger. |
| Port 8080 sudah dipakai | Ubah `APP_PORT` di `.env` lalu `docker compose up -d`. |
| Container `myprofile-web` langsung berhenti | Biasanya karena `tmpfs: /var/run` dihapus saat `read_only: true`. Kembalikan baris tersebut. |
| Font/ikon tidak muncul | Cek koneksi ke `fonts.googleapis.com` dan `cdn.tailwindcss.com` (diblokir jaringan tertentu). |

---

## Lisensi

Bebas dipakai dan dimodifikasi untuk keperluan pribadi.
