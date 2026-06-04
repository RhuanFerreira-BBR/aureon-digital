/* HORIZON COLLECTIVE — shared interactions */
(function () {
  'use strict';

  /* Header scroll state */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  const animated = document.documentElement.classList.contains('anim');
  const reveals = document.querySelectorAll('[data-reveal]');
  const show = (el) => el.classList.add('in');
  const inView = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0;
  };
  if (animated && 'IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((el) => io.observe(el));
    // Immediately reveal anything already in view (covers IO timing quirks).
    requestAnimationFrame(() => reveals.forEach((el) => { if (inView(el)) show(el); }));

    // Frozen-TRANSITION detection. This environment can advance the document
    // timeline while CSS transitions stay throttled at t=0, so timeline progress
    // is NOT a reliable proxy. Instead, sample the actual computed opacity of an
    // element we've already revealed: with our fast ease, a live transition is
    // well above 0 within ~280ms; if it's still stuck near 0, transitions are
    // frozen — force everything visible with no transition.
    const probe = () => {
      for (let i = 0; i < reveals.length; i++) {
        if (reveals[i].classList.contains('in')) return reveals[i];
      }
      return null;
    };
    const forceStatic = () => document.documentElement.classList.add('reveal-static');
    setTimeout(() => {
      const p = probe();
      if (!p || parseFloat(getComputedStyle(p).opacity) < 0.2) forceStatic();
    }, 300);
    // Belt-and-suspenders: re-check past the full transition duration.
    setTimeout(() => {
      const p = probe();
      if (p && parseFloat(getComputedStyle(p).opacity) < 0.9) forceStatic();
      reveals.forEach(show);
    }, 1200);
  } else {
    reveals.forEach(show);
  }

  /* Mobile menu */
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    const close = () => { menu.classList.remove('open'); document.body.style.overflow = ''; toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }

  /* Count-up stats */
  const nums = document.querySelectorAll('[data-count]');
  const fmt = (v, suffix) => Math.round(v).toLocaleString('pt-BR') + (suffix || '');
  const setFinal = (el) => { el.textContent = fmt(parseFloat(el.dataset.count), el.dataset.suffix || ''); };
  if (animated && 'IntersectionObserver' in window && nums.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1400; const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(target * eased, suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io2.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach((n) => io2.observe(n));
    setTimeout(() => nums.forEach((n) => { if (n.textContent.trim() === '0') setFinal(n); }), 1800);
  } else {
    nums.forEach(setFinal); // frozen timeline / reduced motion: show final immediately
  }

  /* Subtle pointer parallax on [data-parallax] */
  const px = document.querySelectorAll('[data-parallax]');
  if (px.length && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      px.forEach((el) => {
        const d = parseFloat(el.dataset.parallax) || 12;
        el.style.transform = `translate3d(${x * d}px, ${y * d}px, 0)`;
      });
    }, { passive: true });
  }

  /* Simple contact form feedback (no backend) */
  const form = document.querySelector('[data-contact]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const ok = form.querySelector('[data-success]');
      if (btn) { btn.textContent = 'Enviado ✓'; btn.disabled = true; }
      if (ok) ok.style.display = 'block';
    });
  }
})();
