/* ==========================================================================
   main.js — site config, icon sprite, navigation, contact details
   ========================================================================== */

/* ---- 1. EDIT ME: personal links -----------------------------------------
   Leave a value empty ('') and the site shows a clear "[Insert …]" label
   instead of a dead button. Paths are relative to the site root.          */
const SITE = {
  email: 'justinemicosanjose@gmail.com',
  github: 'https://github.com/jstmcn',
  cv: '',                    // e.g. 'assets/Justine-San-Jose-CV.pdf'
  linkedin: 'https://www.linkedin.com/in/justine-mico-san-jose-74b250168/'
};

/* ---- 2. Icon sprite (one source for every page) ------------------------ */
(function injectIcons() {
  const s = (id, body, vb = '0 0 24 24') =>
    `<symbol id="i-${id}" viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</symbol>`;
  const icons = [
    s('arrow', '<path d="M5 12h14M13 6l6 6-6 6"/>'),
    s('up', '<path d="M12 19V5M6 11l6-6 6 6"/>'),
    s('chev-left', '<path d="M15 6l-6 6 6 6"/>'),
    s('chev-right', '<path d="M9 6l6 6-6 6"/>'),
    s('close', '<path d="M6 6l12 12M18 6L6 18"/>'),
    s('plus', '<path d="M12 5v14M5 12h14"/>'),
    s('check', '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.6 2.5L16 9.5"/>'),
    s('info', '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>'),
    s('lock', '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    s('download', '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'),
    s('link', '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
    s('code', '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>'),
    s('headset', '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/><path d="M19 20c0 1-1.5 2-4 2h-2"/>'),
    s('users', '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3.2 3.2 0 0 1 0 6.3M18 14.3c1.8.8 3 2.6 3 4.7"/>'),
    s('palette', '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.7-.8 1.7-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2z"/><circle cx="7.5" cy="11" r="1"/><circle cx="10" cy="7" r="1"/><circle cx="15" cy="7.5" r="1"/>'),
    s('cpu', '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'),
    s('gamepad', '<rect x="2.5" y="7" width="19" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3"/><circle cx="16" cy="11.5" r=".9"/><circle cx="18" cy="13.5" r=".9"/>'),
    s('camera', '<path d="M4 8h3l2-2.5h6L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.5"/>'),
    s('plane', '<path d="M10.5 13.5L3 11l1.5-1.5 8 1 4.5-4.5c.8-.8 2.2-.8 3 0s.8 2.2 0 3L15.5 13.5l1 8L15 23l-2.5-7.5L9 19v2.5L7.5 23l-1-3.5L3 18.5 4.5 17H7l3.5-3.5z"/>'),
    s('ball', '<circle cx="12" cy="12" r="9"/><path d="M12 3c-1 4 0 7 3 9M21 12c-4-1-7 0-9 3M5 18c2-3 2-7 0-10M12 12c-3 1-6 0-8.5-2.5"/>'),
    s('video', '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3"/>'),
    s('award', '<circle cx="12" cy="9" r="5.5"/><path d="M8.5 13.5L7 21l5-2.5 5 2.5-1.5-7.5"/>'),
    s('doc', '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'),
    s('clipboard', '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>'),
    s('megaphone', '<path d="M3 10v4a1 1 0 0 0 1 1h3l8 4V5L7 9H4a1 1 0 0 0-1 1z"/><path d="M18.5 9a4 4 0 0 1 0 6M7 15l1.5 5h2.5L10 15"/>'),
    s('calendar', '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    s('pin', '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    s('mail', '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>'),
    s('database', '<ellipse cx="12" cy="5.5" rx="7.5" ry="2.8"/><path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8"/>'),
    s('cube', '<path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z"/><path d="M4 7.4l8 4.6 8-4.6M12 12v9.2"/>'),
    s('search', '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>'),
    s('briefcase', '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12.5h18"/>'),
    s('linkedin', '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.3v.01M12 17v-3.8c0-1.5 1-2.7 2.4-2.7S16.5 11.6 16.5 13V17M12 10.5V17"/>'),
    s('github', '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>')
  ].join('');
  const holder = document.createElement('div');
  holder.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden">${icons}</svg>`;
  document.body.prepend(holder.firstChild);
})();

/* ---- 3. Navigation ------------------------------------------------------ */
(function nav() {
  const header = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const links = document.getElementById('nav-links');
  if (!header) return;

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (toggle && links) {
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      links.classList.toggle('is-open', open);
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    links.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    document.addEventListener('click', (e) => {
      if (links.classList.contains('is-open') && !e.target.closest('.nav')) setOpen(false);
    });
  }

  /* Active section indicator: the section crossing the upper third wins */
  const navLinks = [...document.querySelectorAll('.nav__links a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!sections.length || !('IntersectionObserver' in window)) return;
  const setActive = (id) => navLinks.forEach((a) => {
    const on = a.getAttribute('href') === '#' + id;
    a.classList.toggle('is-active', on);
    if (on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id); });
  }, { rootMargin: '-35% 0px -60% 0px' });
  sections.forEach((s) => io.observe(s));
  // "Achievements" & "Interests" sit between nav targets; map them to neighbours
  ['achievements', 'interests', 'hero'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    new IntersectionObserver((en) => {
      if (en[0].isIntersecting) setActive(id === 'achievements' ? 'education' : id === 'interests' ? 'community' : '');
    }, { rootMargin: '-35% 0px -60% 0px' }).observe(el);
  });
})();

/* ---- 4. Back to top ----------------------------------------------------- */
(function toTop() {
  const btn = document.querySelector('.to-top');
  if (!btn) return;
  const onScroll = () => btn.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });
})();

/* ---- 5. Contact details, CV link, year --------------------------------- */
(function contact() {
  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  if (SITE.cv) {
    document.querySelectorAll('[data-cv-link]').forEach((a) => { a.href = SITE.cv; a.hidden = false; });
  }

  const email = document.getElementById('contact-email');
  if (email && SITE.email) {
    email.innerHTML = `<svg aria-hidden="true"><use href="#i-mail"/></svg><b>Email</b>
      <span class="sel">${SITE.email}</span>
      <span class="row"><a class="copy-btn" href="mailto:${SITE.email}">Write an email</a>
      <button class="copy-btn" type="button" data-copy="${SITE.email}">Copy address</button></span>`;
  }
  const gh = document.getElementById('contact-github');
  if (gh && SITE.github) {
    const a = document.createElement('a');
    a.className = 'c-card'; a.id = 'contact-github'; a.href = SITE.github; a.target = '_blank'; a.rel = 'noopener';
    a.innerHTML = `<svg aria-hidden="true"><use href="#i-github"/></svg><b>GitHub</b><span>${SITE.github.replace(/^https?:\/\//, '')}</span>`;
    gh.replaceWith(a);
  }
})();
