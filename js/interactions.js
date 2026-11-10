/* ==========================================================================
   interactions.js — reveals, timeline, skills, case studies, lightbox,
   capstone gallery, copy buttons and a small easter egg
   ========================================================================== */

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/* ---- Toast -------------------------------------------------------------- */
const toast = (() => {
  const el = $('#toast');
  let t;
  return (html, ms = 2600) => {
    if (!el) return;
    el.innerHTML = html;
    el.classList.add('is-on');
    clearTimeout(t);
    t = setTimeout(() => el.classList.remove('is-on'), ms);
  };
})();

/* ---- Scroll reveal (content is visible before JS; this only animates) --- */
(function reveal() {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const siblings = $$('.reveal', en.target.parentElement);
      en.target.style.animationDelay = Math.min(siblings.indexOf(en.target), 5) * 70 + 'ms';
      en.target.classList.add('is-in');
      io.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach((el) => {
    // Skip anything already on screen at load so the first frame never flickers
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    io.observe(el);
  });
})();

/* ---- Timeline expanders ------------------------------------------------- */
$$('.tl-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    const open = btn.getAttribute('aria-expanded') !== 'true';
    btn.setAttribute('aria-expanded', String(open));
    panel.classList.toggle('is-open', open);
  });
});

/* ---- Skills: interactive categories ------------------------------------ */
(function skills() {
  const tabs = $('#skill-tabs');
  const panel = $('#skill-panel');
  if (!tabs || !panel) return;

  const A = 'Academic', P = 'Practical';
  const data = [
    { id: 'dev', name: 'Development', icon: 'code', blurb: 'Web fundamentals from BSIT coursework, used to build the Events Place Booking System.',
      items: [['PHP', A, 'Events Place Booking System'], ['HTML', A, 'Coursework and web projects'], ['CSS', A, 'Coursework and web projects'], ['JavaScript', A, 'Coursework and web projects'], ['SQL', A, 'Booking system database'], ['Programming fundamentals', A, 'BSIT core courses']] },
    { id: 'game', name: 'Game Development', icon: 'gamepad', blurb: 'My major. Applied in ArcadeCode, our group capstone, and in Blender coursework.',
      items: [['Unity', A, 'ArcadeCode capstone builds'], ['C# fundamentals', A, 'Unity scripting — Start(), Update(), FixedUpdate()'], ['Game design', A, 'Challenge design tied to player actions'], ['Game mechanics', A, 'Throw, carry/place, movement course'], ['Blender', A, 'Lantern scene: modeling, lighting, smoke']] },
    { id: 'db', name: 'Database & Web', icon: 'database', blurb: 'The local stack behind the booking system.',
      items: [['MySQL', A, 'Users, bookings and schedule tables'], ['phpMyAdmin', A, 'Managing the booking database'], ['XAMPP', A, 'Local PHP/MySQL server'], ['Database management', A, 'Relational design and CRUD']] },
    { id: 'qa', name: 'Quality Assurance', icon: 'search', blurb: 'Learned on the job at CloudSwyft, on a live learning platform.',
      items: [['Website testing', P, 'CloudSwyft LMS website'], ['LMS evaluation', P, 'Feature and UI evaluation'], ['Test case documentation', P, 'QA Audit Form — front-end & back-end'], ['Technical documentation', P, 'LMS tech doc outline, CRM docs']] },
    { id: 'creative', name: 'Creative Tools', icon: 'palette', blurb: 'Used for real audiences: SK residents and CloudSwyft.',
      items: [['Canva', P, 'SK pubmats, CloudSwyft greeting graphic'], ['CapCut', P, 'SK program videos'], ['Microsoft Office', P, 'Records, reports and school work']] },
    { id: 'pro', name: 'Professional Competencies', icon: 'briefcase', blurb: 'Built across customer service, SK work and the internship.',
      items: [['Customer service', P, 'Concentrix and iQor'], ['Data entry', P, 'Bookings and account records'], ['Records management', P, 'SK minutes and resolutions'], ['Quality assurance', P, 'CloudSwyft LMS audit'], ['Communication', P, 'Customer calls, SK sessions'], ['Project management', P, 'Capstone and SK programs'], ['Leadership', P, 'SK Secretary, class officer'], ['Team collaboration', P, 'Capstone group, CCS volleyball']] }
  ];

  tabs.innerHTML = data.map((d, i) =>
    `<button class="skill-tab" role="tab" type="button" id="tab-${d.id}" aria-controls="skill-panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}">
       <span>${d.name}</span><span class="count">${String(d.items.length).padStart(2, '0')}</span></button>`).join('');

  const render = (i) => {
    const d = data[i];
    panel.setAttribute('aria-labelledby', 'tab-' + d.id);
    panel.innerHTML = `<h3>${d.name}</h3><p>${d.blurb}</p>
      <ul class="skill-cards">${d.items.map(([n, lvl, where], k) => `
        <li class="skill-card" style="animation-delay:${k * 40}ms">
          <span class="skill-card__name"><svg aria-hidden="true"><use href="#i-${d.icon}"/></svg>${n}</span>
          <span class="where">${where}</span>
          <span class="chip ${lvl === P ? 'chip--teal' : 'chip--blue'}">${lvl}</span>
        </li>`).join('')}</ul>
      <p class="skill-legend"><span><span class="chip chip--teal">Practical</span> used at work or for real audiences</span><span><span class="chip chip--blue">Academic</span> coursework and capstone</span></p>`;
  };
  const select = (i, focus) => {
    $$('.skill-tab', tabs).forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
    if (focus) tabs.children[i].focus();
    render(i);
  };
  tabs.addEventListener('click', (e) => { const b = e.target.closest('.skill-tab'); if (b) select(+b.dataset.i); });
  tabs.addEventListener('keydown', (e) => {
    const cur = $$('.skill-tab', tabs).findIndex((t) => t.getAttribute('aria-selected') === 'true');
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    if (e.key in keys) { e.preventDefault(); select((cur + keys[e.key] + data.length) % data.length, true); }
  });
  render(0);
})();

/* ---- Case study dialog -------------------------------------------------- */
(function cases() {
  const dlg = $('#case-dialog');
  const body = $('#case-body');
  if (!dlg || !body) return;
  let opener = null;
  document.addEventListener('click', (e) => {
    const trg = e.target.closest('[data-case]');
    if (!trg) return;
    const tpl = document.getElementById(trg.dataset.case);
    if (!tpl) return;
    e.preventDefault();
    opener = trg;
    body.replaceChildren(tpl.content.cloneNode(true));
    body.scrollTop = 0;
    dlg.showModal();
  });
  dlg.addEventListener('click', (e) => { if (e.target === dlg || e.target.closest('[data-close]')) dlg.close(); });
  dlg.addEventListener('close', () => { if (opener) opener.focus(); });
})();

/* ---- Certificates: switch on a card once data-cert has a path ---------- */
$$('.award[data-cert]').forEach((card) => {
  const src = card.dataset.cert.trim();
  if (!src) return;
  const doc = $('.award__doc', card);
  const title = $('h3', card).textContent;
  doc.innerHTML = `<img src="${src}" alt="Certificate: ${title}" loading="lazy">`;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'text-link';
  btn.textContent = 'View certificate';
  btn.dataset.lightbox = 'certs';
  btn.dataset.src = src;
  btn.dataset.caption = title + ' — ' + $('p', card).textContent;
  card.insertBefore(btn, $('.award__year', card));
});

/* ---- Lightbox ----------------------------------------------------------- */
(function lightbox() {
  const dlg = $('#lightbox');
  if (!dlg) return;
  const img = $('#lb-img'), cap = $('#lb-cap'), count = $('#lb-count');
  let group = [], idx = 0, opener = null;

  const show = (i) => {
    idx = (i + group.length) % group.length;
    const t = group[idx];
    img.src = t.dataset.src;
    img.alt = t.dataset.caption || '';
    cap.textContent = t.dataset.caption || '';
    count.textContent = group.length > 1 ? `${idx + 1} / ${group.length}` : '';
    $('.lb-prev', dlg).hidden = $('.lb-next', dlg).hidden = group.length < 2;
  };
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-lightbox]');
    if (!t) return;
    e.preventDefault();
    opener = t;
    group = $$(`[data-lightbox="${t.dataset.lightbox}"]`);
    show(group.indexOf(t));
    dlg.showModal();
  });
  $('.lb-prev', dlg).addEventListener('click', () => show(idx - 1));
  $('.lb-next', dlg).addEventListener('click', () => show(idx + 1));
  dlg.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  dlg.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]') || e.target === dlg || e.target.classList.contains('lb-stage')) dlg.close();
  });
  dlg.addEventListener('close', () => { if (opener) opener.focus(); });
})();

/* ---- Capstone screenshot switcher -------------------------------------- */
(function capGallery() {
  const shot = $('#bay-shot'), bigImg = $('#bay-img'), cap = $('#bay-cap');
  const thumbs = $$('.bay__thumb');
  if (!shot || !thumbs.length) return;
  thumbs.forEach((t) => t.addEventListener('click', () => {
    thumbs.forEach((x) => x.setAttribute('aria-current', String(x === t)));
    bigImg.src = t.dataset.src;
    bigImg.alt = t.dataset.alt;
    cap.textContent = t.dataset.cap;
    shot.dataset.src = t.dataset.src;
    shot.dataset.caption = t.dataset.cap;
  }));
})();

/* ---- Copy buttons ------------------------------------------------------- */
document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-copy]');
  if (!b) return;
  try {
    await navigator.clipboard.writeText(b.dataset.copy);
    toast('Copied <span class="n">' + b.dataset.copy + '</span>');
  } catch {
    const sel = b.closest('.c-card')?.querySelector('.sel');
    if (sel) { const r = document.createRange(); r.selectNodeContents(sel); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
    toast('Address selected — press Ctrl/Cmd + C to copy');
  }
});

/* ---- Easter egg: ← → space runs a tiny coder across the screen --------- */
(function egg() {
  const seq = ['ArrowLeft', 'ArrowRight', ' '];
  let pos = 0, busy = false;
  document.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea, [contenteditable]') || document.querySelector('dialog[open]')) return;
    pos = e.key === seq[pos] ? pos + 1 : (e.key === seq[0] ? 1 : 0);
    if (pos < seq.length) return;
    pos = 0;
    e.preventDefault();
    if (busy) return;
    busy = true;
    toast('<span class="k">velocity</span>.x = input * <span class="n">speed</span>; <span style="color:#7ee2cf">// Route restored. +1 Code Star</span>', 3400);
    if (!reduceMotion) {
      const c = document.createElement('canvas');
      c.width = 12; c.height = 12; c.className = 'runner';
      const g = c.getContext('2d');
      // 12×12 pixel coder: hair, face, shirt, legs
      const px = ['....HHHH....', '...HHHHHH...', '...HSSSSH...', '...SSESES...', '....SSSS....', '...WWWWWW...', '..WWBWWBWW..', '..S.WWWW.S..', '....NNNN....', '....N..N....', '....N..N....', '...KK..KK...'];
      const col = { H: '#202938', S: '#f1c7a0', E: '#202938', W: '#ffffff', B: '#2563eb', N: '#1e3a8a', K: '#0f172a' };
      px.forEach((row, y) => [...row].forEach((ch, x) => { if (col[ch]) { g.fillStyle = col[ch]; g.fillRect(x, y, 1, 1); } }));
      c.style.width = c.style.height = '36px';
      document.body.appendChild(c);
      requestAnimationFrame(() => c.classList.add('go'));
      c.addEventListener('animationend', () => { c.remove(); busy = false; });
    } else busy = false;
  });
})();
