/* ==========================================================================
   i18n.js
   Kamus dua bahasa (Indonesia / Inggris) untuk website profil.

   Cara kerja singkat:
   - Elemen teks diberi atribut  data-i18n="key"
   - Elemen atribut diberi     data-i18n-attr="content:key,placeholder:key2"
   - Tombol bahasa memakai     data-lang-btn="id" / "en"

   File ini dimuat di akhir <body> TANPA "defer" supaya bahasa terpasang
   sebelum catatan pertama dirender (mencegah kedipan teks Indonesia saat
   pengunjung memilih English).
   ========================================================================== */

(function () {
  'use strict';

  var LANG_KEY = 'profile-lang';
  var DEFAULT_LANG = 'id';
  var SUPPORTED = ['id', 'en'];

  /* ======================================================================
     KAMUS
     ====================================================================== */
  var DICT = {
    id: {
      /* Navigasi & aksesibilitas */
      'nav.home': 'Beranda',
      'nav.about': 'Tentang',
      'nav.projects': 'Proyek',
      'nav.skills': 'Keahlian',
      'nav.contact': 'Kontak',
      'nav.emailCta': 'Email Saya',
      'nav.cv': 'CV',
      'nav.openMenu': 'Buka menu navigasi',
      'nav.menuOpen': 'Menu navigasi terbuka',
      'nav.langLabel': 'Pilih bahasa',
      'a11y.skip': 'Lewati ke konten utama',
      'a11y.backToTop': 'Kembali ke atas',
      'a11y.themeDark': 'Aktifkan mode gelap',
      'a11y.themeLight': 'Aktifkan mode terang',
      'lang.switch': 'Ganti bahasa ke',
      'lang.current': 'Bahasa aktif:',

      /* Hero */
      'hero.badge': 'Berbasis di Gresik, Jawa Timur',
      'hero.greeting': 'Hai, saya',
      'hero.role': 'FullStack Web Developer',
      'hero.desc':
        'Saya membangun aplikasi web — dari antarmuka yang rapi sampai API yang andal. Sehari-hari bekerja di CV. Langitnet Sidoarjo dan terbuka untuk kolaborasi maupun kerja remote.',
      'hero.ctaProjects': 'Lihat Proyek',
      'hero.ctaEmail': 'Email Saya',
      'hero.ctaCv': 'Unduh CV',
      'hero.follow': 'Ikuti',
      'hero.cardLabel': 'Posisi saat ini',

      /* Tentang */
      'about.label': 'Tentang Saya',
      'about.title': 'Developer yang peduli pada detail',
      'about.p1':
        'Saya mulai menulis kode sejak kuliah dan terus menikmati proses mengubah ide menjadi produk nyata. Fokus saya adalah membangun aplikasi web yang cepat, mudah dipakai, dan mudah dirawat oleh tim.',
      'about.p2':
        'Sehari-hari saya bekerja dengan Laravel, Vue, dan PHP, serta tidak asing dengan Node.js/Bun, Python, dan ElysiaJS. Saya terbiasa menangani basis data, deployment, sampai pemantauan performa di VPS.',
      'about.p3':
        'Di luar koding, saya suka menulis catatan teknis, mengikuti komunitas developer lokal, dan bereksperimen dengan alat baru untuk melihat apakah layak dipakai di proyek berikutnya.',
      'about.ctaWork': 'Ayo Bekerja Sama',
      'about.ctaSkills': 'Lihat Keahlian',
      'about.locLabel': 'Lokasi',
      'about.locValue': 'Gresik, Jawa Timur, Indonesia',
      'about.statusLabel': 'Status',
      'about.statusValue': 'FullStack Web Developer di CV. Langitnet Sidoarjo',
      'about.interestsLabel': 'Minat',
      'about.interestsValue': 'Web performance, UX, open source',
      'about.langLabel': 'Bahasa',
      'about.langValue': 'Indonesia (native), Inggris (profesional)',

      /* Proyek */
      'projects.label': 'Portofolio',
      'projects.title': 'Proyek pilihan',
      'projects.desc': 'Aplikasi yang saya bangun dan kembangkan di CV. Langitnet.',
      'projects.allGithub': 'Semua di GitHub',
      'projects.demo': 'Kunjungi',
      'projects.shopTitle': 'Langitnet Shop',
      'projects.shopDesc':
        'Aplikasi e-commerce Langitnet untuk pemesanan produk dan layanan, dibangun dengan Laravel, Alpine.js, dan Redis.',
      'projects.mitraTitle': 'Langitnet Mitra',
      'projects.mitraDesc':
        'Aplikasi ERP khusus mitra Langitnet untuk mengelola kemitraan dan operasional harian.',
      'projects.badgeProduction': 'Produksi',
      'projects.badgeErp': 'ERP',
      'projects.othersTitle': 'Aplikasi internal Langitnet lainnya',
      'projects.othersNote':
        'Sebagian besar bersifat internal, jadi belum ada tautan publik.',
      'projects.othersMore': '+5 aplikasi lainnya',

      /* Keahlian */
      'skills.label': 'Keahlian',
      'skills.title': 'Teknologi yang saya pakai',
      'skills.desc':
        'Rangkuman alat dan teknologi yang saya pakai sehari-hari, dikelompokkan per area.',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Tools & Lainnya',

      /* Halaman CV (cv.html) */
      'cv.docTitle': 'CV — Abid Zakaria, FullStack Web Developer',
      'cv.role': 'FullStack Web Developer',
      'cv.location': 'Gresik, Jawa Timur, Indonesia',
      'cv.summary': 'Ringkasan',
      'cv.summaryText':
        'FullStack Web Developer yang membangun aplikasi web produksi dari antarmuka sampai API. Sehari-hari bekerja dengan Laravel, PHP, dan Redis, serta memakai Node.js/Bun, Python, dan Docker untuk kebutuhan lain. Terbiasa menangani aplikasi sejak pengembangan, deployment di VPS, sampai pemantauan performa.',
      'cv.skills': 'Keahlian',
      'cv.skillsLang': 'Bahasa',
      'cv.skillsBackend': 'Backend',
      'cv.skillsFrontend': 'Frontend',
      'cv.skillsData': 'Data & Infrastruktur',
      'cv.skillsTools': 'Alat & Operasional',
      'cv.experience': 'Pengalaman Kerja',
      'cv.expRole': 'FullStack Web Developer',
      'cv.expPeriod': 'Sidoarjo, Jawa Timur',
      'cv.expCompany': 'CV. Langitnet Sidoarjo',
      'cv.expB1':
        'Membangun dan merawat Langitnet Shop, aplikasi e-commerce untuk pemesanan produk dan layanan, dengan Laravel, Alpine.js, dan Redis.',
      'cv.expB2':
        'Mengembangkan Langitnet Mitra, aplikasi ERP kemitraan untuk mengelola kemitraan dan operasional harian mitra.',
      'cv.expB3':
        'Menangani sembilan aplikasi internal Langitnet, termasuk B2B, Expedition, Ngantor, dan RMA.',
      'cv.expB4':
        'Menjalankan deployment dan operasional di VPS: Docker/Podman, Nginx, Coolify/CloudPanel, cache Redis, dan penyimpanan S3.',
      'cv.projects': 'Proyek',
      'cv.proj1Name': 'Langitnet Shop — E-Commerce',
      'cv.proj1Desc':
        'Aplikasi e-commerce untuk pemesanan produk dan layanan: katalog, keranjang, dan proses pesanan.',
      'cv.proj2Name': 'Langitnet Mitra — ERP Kemitraan',
      'cv.proj2Desc': 'ERP khusus mitra untuk mengelola kemitraan dan operasional harian.',
      'cv.proj3Name': 'Aplikasi Internal Langitnet',
      'cv.proj3Desc':
        'B2B, Expedition, Ngantor, RMA, dan lima aplikasi lain untuk operasional internal perusahaan.',
      'cv.education': 'Pendidikan',
      'cv.certifications': 'Sertifikasi & Pelatihan',
      'cv.languages': 'Bahasa',
      'cv.languagesValue': 'Indonesia (native) · Inggris (profesional)',
      'cv.updated': 'Diperbarui Oktober 2026',
      'cv.print': 'Cetak',
      'cv.downloadPdf': 'Unduh PDF',
      'cv.backToPortfolio': 'Kembali ke portofolio',
      'cv.printHint':
        'Tips: pada dialog cetak, pilih "Simpan sebagai PDF" dan matikan header/footer.',

      /* Kontak */
      'contact.label': 'Kontak',
      'contact.title': 'Mari bikin sesuatu bersama',
      'contact.desc':
        'Ada proyek, tawaran kerja, atau sekadar ingin menyapa? Kirim email atau pesan WhatsApp dan saya biasanya membalas dalam 1–2 hari kerja.',
      'contact.emailLabel': 'Email',
      'contact.whatsappLabel': 'WhatsApp',
      'contact.githubLabel': 'GitHub',
      'contact.linkedinLabel': 'LinkedIn',
      'contact.facebookLabel': 'Facebook',

      /* Form */
      'form.name': 'Nama',
      'form.email': 'Email',
      'form.subject': 'Subjek',
      'form.message': 'Pesan',
      'form.required': '(wajib diisi)',
      'form.namePlaceholder': 'Nama kamu',
      'form.emailPlaceholder': 'nama@email.com',
      'form.subjectPlaceholder': 'Kolaborasi proyek',
      'form.messagePlaceholder': 'Ceritakan sedikit tentang proyek atau pertanyaanmu...',
      'form.submit': 'Kirim Pesan',
      'form.statusInvalid':
        'Mohon lengkapi nama, email yang valid, dan pesan terlebih dahulu.',
      'form.statusMailto':
        'Aplikasi email kamu sedang dibuka dengan pesan yang sudah terisi.',
      'form.statusOk': 'Terima kasih! Pesanmu sudah terkirim. Saya akan segera membalas.',
      'form.statusFail':
        'Pesan gagal terkirim. Silakan kirim email langsung ke alamat di samping.',

      /* Footer */
      'footer.built': 'Dibuat dengan',
      'footer.email': 'Kirim Email',
      'footer.cv': 'CV',

      /* Metadata */
      'meta.language': 'Indonesian',
      'meta.title': 'Abid Zakaria — FullStack Web Developer | Portofolio',
      'meta.siteName': 'Abid Zakaria — Portofolio',
      'meta.description':
        'Portofolio pribadi Abid Zakaria, FullStack Web Developer di CV. Langitnet Sidoarjo. Lihat proyek, keahlian, dan cara menghubungi saya.',
      'meta.ogAlt': 'Kartu profil Abid Zakaria, FullStack Web Developer',
      'jsonld.jobTitle': 'FullStack Web Developer',
      'jsonld.description':
        'FullStack Web Developer di CV. Langitnet Sidoarjo yang membangun aplikasi web modern, cepat, dan mudah digunakan.',
      'img.avatarAlt': 'Foto profil Abid Zakaria'
    },

    en: {
      /* Navigasi & aksesibilitas */
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.projects': 'Projects',
      'nav.skills': 'Skills',
      'nav.contact': 'Contact',
      'nav.emailCta': 'Email Me',
      'nav.cv': 'Resume',
      'nav.openMenu': 'Open navigation menu',
      'nav.menuOpen': 'Navigation menu open',
      'nav.langLabel': 'Select language',
      'a11y.skip': 'Skip to main content',
      'a11y.backToTop': 'Back to top',
      'a11y.themeDark': 'Switch to dark mode',
      'a11y.themeLight': 'Switch to light mode',
      'lang.switch': 'Switch language to',
      'lang.current': 'Active language:',

      /* Hero */
      'hero.badge': 'Based in Gresik, East Java',
      'hero.greeting': "Hi, I'm",
      'hero.role': 'FullStack Web Developer',
      'hero.desc':
        'I build web applications — from clean interfaces to reliable APIs. Currently working at CV. Langitnet Sidoarjo and open to collaboration and remote work.',
      'hero.ctaProjects': 'View Projects',
      'hero.ctaEmail': 'Email Me',
      'hero.ctaCv': 'Download CV',
      'hero.follow': 'Follow',
      'hero.cardLabel': 'Current role',

      /* Tentang */
      'about.label': 'About Me',
      'about.title': 'A developer who cares about the details',
      'about.p1':
        'I started writing code in college and still enjoy turning ideas into real products. My focus is building web applications that are fast, easy to use, and easy for a team to maintain.',
      'about.p2':
        'Day to day I work with Laravel, Vue, and PHP, and I am comfortable with Node.js/Bun, Python, and ElysiaJS. I regularly handle databases, deployment, and performance monitoring on VPS servers.',
      'about.p3':
        'Outside of coding, I enjoy writing technical notes, joining local developer communities, and experimenting with new tools to see if they are worth using in my next project.',
      'about.ctaWork': "Let's Work Together",
      'about.ctaSkills': 'View Skills',
      'about.locLabel': 'Location',
      'about.locValue': 'Gresik, East Java, Indonesia',
      'about.statusLabel': 'Status',
      'about.statusValue': 'FullStack Web Developer at CV. Langitnet Sidoarjo',
      'about.interestsLabel': 'Interests',
      'about.interestsValue': 'Web performance, UX, open source',
      'about.langLabel': 'Languages',
      'about.langValue': 'Indonesian (native), English (professional)',

      /* Proyek */
      'projects.label': 'Portfolio',
      'projects.title': 'Selected projects',
      'projects.desc': 'Applications I have built and maintained at CV. Langitnet.',
      'projects.allGithub': 'All on GitHub',
      'projects.demo': 'Visit',
      'projects.shopTitle': 'Langitnet Shop',
      'projects.shopDesc':
        "Langitnet's e-commerce application for ordering products and services, built with Laravel, Alpine.js, and Redis.",
      'projects.mitraTitle': 'Langitnet Mitra',
      'projects.mitraDesc':
        'ERP application for Langitnet partners to manage partnerships and daily operations.',
      'projects.badgeProduction': 'Production',
      'projects.badgeErp': 'ERP',
      'projects.othersTitle': 'Other internal Langitnet apps',
      'projects.othersNote': 'Most of them are internal, so there is no public link yet.',
      'projects.othersMore': '+5 more apps',

      /* Keahlian */
      'skills.label': 'Skills',
      'skills.title': 'Technologies I use',
      'skills.desc':
        'A summary of the tools and technologies I use day to day, grouped by area.',
      'skills.frontend': 'Frontend',
      'skills.backend': 'Backend',
      'skills.tools': 'Tools & Others',

      /* Halaman CV (cv.html) */
      'cv.docTitle': 'Resume — Abid Zakaria, FullStack Web Developer',
      'cv.role': 'FullStack Web Developer',
      'cv.location': 'Gresik, East Java, Indonesia',
      'cv.summary': 'Summary',
      'cv.summaryText':
        'FullStack Web Developer building production web applications from interface to API. Works daily with Laravel, PHP, and Redis, and uses Node.js/Bun, Python, and Docker for other needs. Comfortable owning an application from development and VPS deployment through performance monitoring.',
      'cv.skills': 'Skills',
      'cv.skillsLang': 'Languages',
      'cv.skillsBackend': 'Backend',
      'cv.skillsFrontend': 'Frontend',
      'cv.skillsData': 'Data & Infrastructure',
      'cv.skillsTools': 'Operations',
      'cv.experience': 'Experience',
      'cv.expRole': 'FullStack Web Developer',
      'cv.expPeriod': 'Sidoarjo, East Java',
      'cv.expCompany': 'CV. Langitnet Sidoarjo',
      'cv.expB1':
        'Built and maintained Langitnet Shop, an e-commerce application for ordering products and services, using Laravel, Alpine.js, and Redis.',
      'cv.expB2':
        'Developed Langitnet Mitra, a partner ERP application for managing partnerships and daily partner operations.',
      'cv.expB3':
        'Maintained nine internal Langitnet applications, including B2B, Expedition, Ngantor, and RMA.',
      'cv.expB4':
        'Ran deployment and operations on VPS: Docker/Podman, Nginx, Coolify/CloudPanel, Redis caching, and S3 storage.',
      'cv.projects': 'Projects',
      'cv.proj1Name': 'Langitnet Shop — E-Commerce',
      'cv.proj1Desc':
        'E-commerce application for ordering products and services: catalog, cart, and order flow.',
      'cv.proj2Name': 'Langitnet Mitra — Partner ERP',
      'cv.proj2Desc': 'Partner-only ERP for managing partnerships and daily operations.',
      'cv.proj3Name': 'Internal Langitnet Applications',
      'cv.proj3Desc':
        'B2B, Expedition, Ngantor, RMA, and five other applications for internal company operations.',
      'cv.education': 'Education',
      'cv.certifications': 'Certifications & Training',
      'cv.languages': 'Languages',
      'cv.languagesValue': 'Indonesian (native) · English (professional)',
      'cv.updated': 'Updated October 2026',
      'cv.print': 'Print',
      'cv.downloadPdf': 'Download PDF',
      'cv.backToPortfolio': 'Back to portfolio',
      'cv.printHint':
        'Tip: in the print dialog, choose "Save as PDF" and turn off headers and footers.',

      /* Kontak */
      'contact.label': 'Contact',
      'contact.title': "Let's build something together",
      'contact.desc':
        'Have a project, a job offer, or just want to say hi? Send an email or a WhatsApp message and I usually reply within 1–2 business days.',
      'contact.emailLabel': 'Email',
      'contact.whatsappLabel': 'WhatsApp',
      'contact.githubLabel': 'GitHub',
      'contact.linkedinLabel': 'LinkedIn',
      'contact.facebookLabel': 'Facebook',

      /* Form */
      'form.name': 'Name',
      'form.email': 'Email',
      'form.subject': 'Subject',
      'form.message': 'Message',
      'form.required': '(required)',
      'form.namePlaceholder': 'Your name',
      'form.emailPlaceholder': 'you@email.com',
      'form.subjectPlaceholder': 'Project collaboration',
      'form.messagePlaceholder': 'Tell me a bit about your project or question...',
      'form.submit': 'Send Message',
      'form.statusInvalid': 'Please fill in your name, a valid email, and a message first.',
      'form.statusMailto': 'Your email app is opening with the message pre-filled.',
      'form.statusOk': "Thank you! Your message has been sent. I'll get back to you soon.",
      'form.statusFail':
        'The message failed to send. Please email me directly using the address on the side.',

      /* Footer */
      'footer.built': 'Built with',
      'footer.email': 'Send Email',
      'footer.cv': 'Resume',

      /* Metadata */
      'meta.language': 'English',
      'meta.title': 'Abid Zakaria — FullStack Web Developer | Portfolio',
      'meta.siteName': 'Abid Zakaria — Portfolio',
      'meta.description':
        'Personal portfolio of Abid Zakaria, FullStack Web Developer at CV. Langitnet Sidoarjo. See projects, skills, and how to get in touch.',
      'meta.ogAlt': 'Profile card of Abid Zakaria, FullStack Web Developer',
      'jsonld.jobTitle': 'FullStack Web Developer',
      'jsonld.description':
        'FullStack Web Developer at CV. Langitnet Sidoarjo building modern, fast, and easy to use web applications.',
      'img.avatarAlt': 'Profile photo of Abid Zakaria'
    }
  };

  /* ======================================================================
     UTILITAS
     ====================================================================== */
  function normalize(lang) {
    if (!lang) return null;
    var value = String(lang).toLowerCase();
    if (value.indexOf('id') === 0) return 'id';
    if (value.indexOf('en') === 0) return 'en';
    return null;
  }

  function getStored() {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (error) {
      return null;
    }
  }

  function setStored(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (error) {
      /* localStorage tidak tersedia (mode privat) - abaikan */
    }
  }

  function detect() {
    var stored = normalize(getStored());
    if (stored) return stored;

    var browser = normalize(navigator.language || (navigator.languages && navigator.languages[0]));
    return browser || DEFAULT_LANG;
  }

  function translate(lang, key) {
    var table = DICT[lang] || DICT[DEFAULT_LANG];
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    if (Object.prototype.hasOwnProperty.call(DICT[DEFAULT_LANG], key)) {
      return DICT[DEFAULT_LANG][key];
    }
    return key;
  }

  function applyAttributes(root, lang) {
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(',').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length < 2) return;
        var attr = parts[0].trim();
        var key = parts.slice(1).join(':').trim();
        if (!attr || !key) return;
        el.setAttribute(attr, translate(lang, key));
      });
    });
  }

  function applyJsonLd(lang) {
    var node = document.getElementById('jsonld-person');
    if (!node) return;

    try {
      var data = JSON.parse(node.textContent);
      data.jobTitle = translate(lang, 'jsonld.jobTitle');
      data.description = translate(lang, 'jsonld.description');
      data.inLanguage = lang;
      node.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      /* JSON-LD rusak - biarkan apa adanya */
    }
  }

  function apply(lang) {
    var active = SUPPORTED.indexOf(lang) >= 0 ? lang : DEFAULT_LANG;
    var root = document.documentElement;

    root.setAttribute('lang', active);
    root.setAttribute('data-lang', active);

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = translate(active, el.getAttribute('data-i18n'));
    });

    applyAttributes(document, active);
    applyJsonLd(active);

    // og:locale harus mengikuti bahasa aktif (id_ID / en_US)
    var ogLocale = document.getElementById('og-locale');
    if (ogLocale) ogLocale.setAttribute('content', active === 'id' ? 'id_ID' : 'en_US');

    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      var code = btn.getAttribute('data-lang-btn');
      var isActive = code === active;
      btn.setAttribute('aria-pressed', String(isActive));
      btn.setAttribute(
        'title',
        translate(active, isActive ? 'lang.current' : 'lang.switch') + ' ' + code.toUpperCase()
      );
    });

    window.__LANG__ = active;
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: active } }));
  }

  function set(lang) {
    var active = normalize(lang) || DEFAULT_LANG;
    setStored(active);
    apply(active);
    return active;
  }

  window.I18N = {
    apply: apply,
    set: set,
    detect: detect,
    current: function () {
      return window.__LANG__ || DEFAULT_LANG;
    },
    get: function (key, lang) {
      return translate(lang || window.__LANG__ || DEFAULT_LANG, key);
    }
  };

  /* Terapkan segera setelah markup selesai di-parse */
  apply(detect());
})();
