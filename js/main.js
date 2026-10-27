/* ==========================================================================
   main.js
   Interaktivitas website profil:
   - Dark / light mode dengan localStorage
   - Menu mobile (hamburger)
   - Scroll reveal animation
   - Highlight link navigasi aktif
   - Tombol back-to-top
   - Tahun copyright otomatis
   - Form kontak via mailto
   - Isi email & link sosial dari satu sumber konfigurasi (SITE)
   - Pemilih bahasa Indonesia / Inggris (memakai js/i18n.js)
   ========================================================================== */

(function () {
  'use strict';

  // Pintasan terjemahan. Bila js/i18n.js tidak termuat, kunci dikembalikan
  // apa adanya sehingga antarmuka tetap berfungsi.
  function t(key) {
    return window.I18N ? window.I18N.get(key) : key;
  }

  /* ======================================================================
     1. KONFIGURASI SITUS
     Ubah nilai di bawah ini untuk memperbarui email, WhatsApp, dan sosial
     media. Ringkasan profil (nama, role, lokasi) ada di index.html dan
     diterjemahkan lewat js/i18n.js.
     ====================================================================== */
  const SITE = {
    email: 'abidzakaria6@gmail.com',
    whatsapp: 'https://wa.me/6283114840702',
    github: 'https://github.com/abidzk01',
    linkedin: 'https://www.linkedin.com/in/abid-zakaria-139b1a112',
    x: 'https://x.com/rxdiag_',
    facebook: 'https://www.facebook.com/abidpoenya',
    formspreeId: '' // opsional: isi ID Formspree, mis. 'xyzabcd' untuk kirim tanpa email client
  };

  /* ======================================================================
     2. DARK / LIGHT MODE
     ====================================================================== */
  const THEME_KEY = 'profile-theme';
  const root = document.documentElement;

  function getStoredTheme() {
    try {
      const value = localStorage.getItem(THEME_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.classList.toggle('dark', isDark);
    root.style.colorScheme = isDark ? 'dark' : 'light';

    // metadata browser (support Android/iOS)
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', isDark ? '#0b1120' : '#ffffff');
    }

    // ikon & label tombol
    document.querySelectorAll('[data-theme-icon]').forEach(function (el) {
      el.classList.toggle('hidden', el.getAttribute('data-theme-icon') !== (isDark ? 'sun' : 'moon'));
    });

    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      const label = t(isDark ? 'a11y.themeLight' : 'a11y.themeDark');
      btn.setAttribute('aria-pressed', String(isDark));
      btn.setAttribute('title', label);
      btn.setAttribute('aria-label', label);
    });
  }

  function toggleTheme() {
    const next = root.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (error) {
      /* localStorage tidak tersedia (private mode) - abaikan */
    }
  }

  applyTheme(getPreferredTheme());

  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', toggleTheme);
  });

  // ikuti perubahan preferensi OS selama user belum memilih manual
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const onSystemThemeChange = function (event) {
    if (!getStoredTheme()) applyTheme(event.matches ? 'dark' : 'light');
  };
  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', onSystemThemeChange);
  } else if (typeof mediaQuery.addListener === 'function') {
    mediaQuery.addListener(onSystemThemeChange);
  }

  /* ======================================================================
     3. MENU MOBILE
     ====================================================================== */
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.querySelector('[data-menu-icon]');

  function closeMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.remove('menu-open');
    menuToggle.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.setAttribute('hidden', '');
  }

  function openMobileMenu() {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.add('menu-open');
    menuToggle.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
    if (menuIcon) menuIcon.removeAttribute('hidden');
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      if (mobileMenu.classList.contains('menu-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileMenu);
    });

    // tutup saat layar diperbesar ke ukuran desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) closeMobileMenu();
    });

    document.addEventListener('click', function (event) {
      const isInsideNav = event.target.closest('#navbar');
      if (!isInsideNav) closeMobileMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMobileMenu();
    });
  }

  /* ======================================================================
     4. SCROLL REVEAL
     ====================================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // tanpa animasi: tampilkan semua langsung
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  } else {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  /* ======================================================================
     5. NAVIGASI AKTIF SAAT SCROLL (scrollspy)
     ====================================================================== */
  const sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[href^="#"]'));

  function updateActiveLink() {
    if (!sections.length) return;

    const offset = window.scrollY + 140;
    let currentId = sections[0].id;

    sections.forEach(function (section) {
      if (section.offsetTop <= offset) currentId = section.id;
    });

    // jika sudah di dasar halaman, tandai section terakhir
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 8) {
      currentId = sections[sections.length - 1].id;
    }

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  /* ======================================================================
     6. TOMBOL BACK TO TOP + NAVBAR SHADOW + COPYRIGHT
     ====================================================================== */
  const backToTop = document.getElementById('back-to-top');
  const navbar = document.getElementById('navbar');
  let ticking = false;

  function onScroll() {
    const scrolled = window.scrollY > 400;

    if (backToTop) backToTop.classList.toggle('is-visible', scrolled);

    if (navbar) {
      // class ini didefinisikan di css/style.css (bagian 14)
      navbar.classList.toggle('nav-scrolled', window.scrollY > 20);
    }

    updateActiveLink();
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(onScroll);
    },
    { passive: true }
  );

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ======================================================================
     7. NAVIGASI SMOOTH SCROLL (dengan offset navbar)
     ====================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;

      window.scrollTo({ top: Math.max(top, 0), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', targetId);
    });
  });

  /* ======================================================================
     8. EMAIL, SOSIAL MEDIA, DAN FORM KONTAK
     ====================================================================== */
  // 8a. Isi otomatis tautan yang memakai data-site="..."
  //     Elemen <a> akan diisi href-nya (mailto: untuk email).
  document.querySelectorAll('[data-site]').forEach(function (el) {
    const key = el.getAttribute('data-site');
    const value = SITE[key];
    if (!value) return;

    if (el.tagName === 'A') {
      el.setAttribute('href', key === 'email' ? 'mailto:' + value : value);
      // hanya isi teks bila tautan tidak punya label sendiri
      if (!el.textContent.trim()) el.textContent = value;
    } else {
      el.textContent = value;
    }
  });

  // 8b. Teks tampilan (label) memakai data-site-text="..."
  //     Berguna untuk menampilkan versi pendek, mis. "@username".
  document.querySelectorAll('[data-site-text]').forEach(function (el) {
    const key = el.getAttribute('data-site-text');
    const value = SITE[key];
    if (!value) return;

    if (key === 'email') {
      el.textContent = value;
      return;
    }

    // buang protokol dan trailing slash agar rapi, mis. github.com/username
    let label = value.replace(/^https?:\/\//, '').replace(/\/$/, '');
    // tampilkan hanya bagian path untuk LinkedIn, atau @username untuk sisanya
    const parts = label.split('/');
    if (/linkedin\.com/i.test(label) && parts.length > 1) {
      label = '/' + parts.slice(1).join('/');
    } else if (parts.length > 1) {
      label = '@' + parts[parts.length - 1];
    }

    el.textContent = label;
  });

  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (form) {
    // bersihkan penanda error saat user mulai mengetik lagi
    form.querySelectorAll('input, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const nameField = form.elements.namedItem('name');
      const emailField = form.elements.namedItem('email');
      const subjectField = form.elements.namedItem('subject');
      const messageField = form.elements.namedItem('message');

      const name = (nameField || {}).value || '';
      const email = (emailField || {}).value || '';
      const subject = (subjectField || {}).value || '';
      const message = (messageField || {}).value || '';

      const showStatus = function (text, ok) {
        if (!formStatus) return;
        formStatus.textContent = text;
        formStatus.className =
          'mt-4 text-sm ' + (ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400');
        formStatus.removeAttribute('hidden');
      };

      // ---- validasi manual (form memakai novalidate) ----
      const invalidFields = [];

      const markInvalid = function (field) {
        if (!field) return;
        field.classList.add('is-invalid');
        field.setAttribute('aria-invalid', 'true');
        invalidFields.push(field);
      };

      form.querySelectorAll('input, textarea').forEach(function (field) {
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
      });

      if (!name.trim()) markInvalid(nameField);
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) markInvalid(emailField);
      if (!message.trim()) markInvalid(messageField);

      if (invalidFields.length) {
        showStatus(t('form.statusInvalid'), false);
        invalidFields[0].focus();
        return;
      }

      // Mode Formspree: kirim lewat fetch tanpa keluar dari halaman
      if (SITE.formspreeId) {
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add('is-busy');
        }

        fetch('https://formspree.io/f/' + SITE.formspreeId, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, subject: subject, message: message })
        })
          .then(function (response) {
            if (!response.ok) throw new Error('Gagal mengirim pesan');
            form.reset();
            showStatus(t('form.statusOk'), true);
          })
          .catch(function () {
            showStatus(t('form.statusFail'), false);
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.classList.remove('is-busy');
            }
          });

        return;
      }

      // Mode default: buka aplikasi email user via mailto
      const body =
        'Nama: ' + name + '\nEmail: ' + email + '\n\n' + message + '\n';
      const mailSubject = subject || 'Pesan dari website profil';
      const mailtoUrl =
        'mailto:' +
        SITE.email +
        '?subject=' +
        encodeURIComponent(mailSubject) +
        '&body=' +
        encodeURIComponent(body);

      window.location.href = mailtoUrl;
      showStatus(t('form.statusMailto'), true);
    });
  }

  /* ======================================================================
     9. PEMILIH BAHASA (Indonesia / Inggris)
     ====================================================================== */
  document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!window.I18N) return;
      window.I18N.set(btn.getAttribute('data-lang-btn'));
    });
  });

  // Saat bahasa berubah, perbarui label yang bergantung pada tema
  // (mis. tombol mode gelap/terang) supaya ikut bahasa yang aktif.
  document.addEventListener('langchange', function () {
    applyTheme(getPreferredTheme());
  });

  // Tombol "Unduh CV" mengikuti bahasa aktif: cv.pdf (ID) / cv-en.pdf (EN).
  function syncCvDownload() {
    const lang = (window.I18N && window.I18N.current && window.I18N.current()) || 'id';
    document.querySelectorAll('[data-cv-download]').forEach(function (link) {
      link.setAttribute('href', lang === 'en' ? 'cv-en.pdf' : 'cv.pdf');
    });
  }

  syncCvDownload();
  document.addEventListener('langchange', syncCvDownload);

  /* ======================================================================
     10. TAHUN DI FOOTER & INISIALISASI AKHIR
     ====================================================================== */
  updateActiveLink();
  onScroll();
})();
