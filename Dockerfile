# ==========================================================================
# Website Profil Pribadi — image produksi (Nginx alpine)
# --------------------------------------------------------------------------
# Situs ini murni statis (HTML + CSS + JS) tanpa proses build, jadi image
# hanya berisi Nginx + file situs. Hasilnya ringan (beberapa MB), cepat
# di-deploy, dan tidak butuh Node/PHP di server.
#
# Build:
#   docker build -t myprofile-web .
#
# Jalankan cepat:
#   docker run -d --name myprofile -p 8080:80 --restart unless-stopped myprofile-web
#   lalu buka http://localhost:8080
#
# Cara yang disarankan tetap lewat Docker Compose (lihat docker-compose.yml).
# ==========================================================================

FROM nginx:alpine

# Untuk build 100% reproducible, kunci versinya, mis.: FROM nginx:1.27-alpine
# (cek tag terbaru di https://hub.docker.com/_/nginx)

LABEL org.opencontainers.image.title="Website Profil Pribadi"
LABEL org.opencontainers.image.description="Situs profil statis (HTML, Tailwind CSS CDN, JS) yang disajikan oleh Nginx"

# --------------------------------------------------------------------------
# 1. Konfigurasi Nginx (menggantikan konfigurasi bawaan image)
# --------------------------------------------------------------------------
RUN mkdir -p /etc/nginx/snippets

COPY docker/nginx.conf             /etc/nginx/nginx.conf
COPY docker/security-headers.conf  /etc/nginx/snippets/security-headers.conf

# --------------------------------------------------------------------------
# 2. File situs
#    Disalin satu per satu (bukan "COPY . .") supaya jelas apa yang masuk
#    image dan file dev seperti README/.env tidak ikut terbawa.
# --------------------------------------------------------------------------
COPY index.html            /usr/share/nginx/html/index.html
COPY cv.html               /usr/share/nginx/html/cv.html
COPY cv.pdf                /usr/share/nginx/html/cv.pdf
COPY cv-en.pdf             /usr/share/nginx/html/cv-en.pdf
COPY manifest.webmanifest  /usr/share/nginx/html/manifest.webmanifest
COPY robots.txt            /usr/share/nginx/html/robots.txt
COPY sitemap.xml           /usr/share/nginx/html/sitemap.xml
COPY css/                  /usr/share/nginx/html/css/
COPY js/                   /usr/share/nginx/html/js/
COPY images/               /usr/share/nginx/html/images/

# --------------------------------------------------------------------------
# 3. Runtime
# --------------------------------------------------------------------------
EXPOSE 80

# Cek kesehatan container: Nginx harus merespons di /healthz.
# Dipakai docker compose ps (status "healthy") dan depends_on: service_healthy.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1

# Hentikan container dengan SIGQUIT agar Nginx menutup koneksi dengan rapi.
STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
