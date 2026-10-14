/**
 * Motion for the personal portfolio page (/tinsae/).
 * Everything degrades: reduced motion gets a static page, coarse pointers skip cursor/magnetic/tilt.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ------------------------------------------------------------------ */
/* Smooth scroll                                                       */
/* ------------------------------------------------------------------ */
let lenis: Lenis | null = null;

function initLenis() {
  if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function scrollTo(target: string | HTMLElement, offset = 0) {
  if (lenis) lenis.scrollTo(target, { offset, duration: 1.4 });
  else {
    const el = typeof target === 'string' ? $(target) : target;
    el?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }
}

/* ------------------------------------------------------------------ */
/* Preloader + hero intro                                              */
/* ------------------------------------------------------------------ */
function initIntro() {
  const loader = $('#tm-loader');
  const counter = $('#tm-loader-count');
  const hero = $('#hero');
  if (!hero) return;

  const titleLines = $$('.hero-title .line', hero);
  const splits = titleLines.map((line) => new SplitText(line, { type: 'chars', charsClass: 'ch' }));
  const chars = splits.flatMap((s) => s.chars);
  const sub = $$('[data-hero-sub]', hero);
  const side = $$('[data-hero-side]', hero);
  const navItems = $$('.tm-nav [data-nav-item]');

  if (reduced) {
    loader?.remove();
    gsap.set([chars, sub, side, navItems], { clearProps: 'all' });
    document.documentElement.classList.add('is-ready');
    return;
  }

  gsap.set(chars, { yPercent: 110, rotateX: -40, opacity: 0 });
  gsap.set(sub, { y: 24, opacity: 0 });
  gsap.set(side, { y: 20, opacity: 0 });
  gsap.set(navItems, { y: -12, opacity: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'power4.out' },
    onComplete: () => {
      document.documentElement.classList.add('is-ready');
      loader?.remove();
      ScrollTrigger.refresh();
    },
  });

  if (loader && counter) {
    const num = { v: 0 };
    tl.to(num, {
      v: 100,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        counter.textContent = String(Math.round(num.v)).padStart(3, '0');
      },
    })
      .to('#tm-loader-word', { yPercent: -100, duration: 0.5, ease: 'power3.in' }, '-=0.15')
      .to(loader, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '-=0.25');
  }

  tl.to(chars, { yPercent: 0, rotateX: 0, opacity: 1, duration: 1.1, stagger: 0.028 }, '-=0.5')
    .to(sub, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, '-=0.7')
    .to(side, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, '-=0.7')
    .to(navItems, { y: 0, opacity: 1, duration: 0.6, stagger: 0.05 }, '-=0.7');
}

/* ------------------------------------------------------------------ */
/* Hero canvas: a dot lattice that bends toward the cursor             */
/* ------------------------------------------------------------------ */
function initHeroCanvas() {
  const canvas = $<HTMLCanvasElement>('#hero-canvas');
  const hero = $('#hero');
  if (!canvas || !hero || reduced) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0;
  let h = 0;
  let dpr = 1;
  let cols = 0;
  let rows = 0;
  let gap = 28;
  const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
  let raf = 0;
  let running = false;
  let t = 0;

  const accent = getComputedStyle(document.documentElement).getPropertyValue('--tm-accent').trim() || '#d9f94c';

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = hero!.clientWidth;
    h = hero!.clientHeight;
    canvas!.width = w * dpr;
    canvas!.height = h * dpr;
    canvas!.style.width = `${w}px`;
    canvas!.style.height = `${h}px`;
    gap = w < 640 ? 24 : 30;
    cols = Math.ceil(w / gap) + 1;
    rows = Math.ceil(h / gap) + 1;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    t += 0.008;
    mouse.x += (mouse.tx - mouse.x) * 0.08;
    mouse.y += (mouse.ty - mouse.y) * 0.08;
    ctx!.clearRect(0, 0, w, h);

    const radius = Math.min(w, h) * 0.32;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const bx = i * gap;
        const by = j * gap;
        const dx = bx - mouse.x;
        const dy = by - mouse.y;
        const d = Math.hypot(dx, dy);
        const wave = Math.sin(i * 0.35 + t * 2) * Math.cos(j * 0.3 + t * 1.6);
        let x = bx + wave * 2;
        let y = by + wave * 2;
        let a = 0.14 + (wave + 1) * 0.05;
        let r = 1;
        if (d < radius) {
          const f = (1 - d / radius) ** 2;
          x -= (dx / (d || 1)) * f * 26;
          y -= (dy / (d || 1)) * f * 26;
          a = Math.min(1, a + f * 0.9);
          r = 1 + f * 1.6;
        }
        ctx!.beginPath();
        ctx!.arc(x, y, r, 0, Math.PI * 2);
        ctx!.fillStyle = d < radius ? hexToRgba(accent, a) : `rgba(242,239,232,${a})`;
        ctx!.fill();
      }
    }
    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    raf = requestAnimationFrame(draw);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  hero.addEventListener('pointermove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.tx = e.clientX - rect.left;
    mouse.ty = e.clientY - rect.top;
  });
  hero.addEventListener('pointerleave', () => {
    mouse.tx = -9999;
    mouse.ty = -9999;
  });
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0.05 }).observe(hero);
}

function hexToRgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/* ------------------------------------------------------------------ */
/* Custom cursor                                                       */
/* ------------------------------------------------------------------ */
function initCursor() {
  const cursor = $('#tm-cursor');
  if (!cursor || !finePointer || reduced) return;
  const label = $('.tm-cursor__label', cursor);
  document.documentElement.classList.add('has-cursor');

  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const target = { x: pos.x, y: pos.y };
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3' });

  window.addEventListener('pointermove', (e) => {
    target.x = e.clientX;
    target.y = e.clientY;
    xTo(target.x);
    yTo(target.y);
    cursor.classList.add('is-visible');
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));

  const setState = (state: string, text = '') => {
    cursor.dataset.state = state;
    if (label) label.textContent = text;
  };

  $$('[data-cursor]').forEach((el) => {
    el.addEventListener('pointerenter', () => setState(el.dataset.cursor || 'hover', el.dataset.cursorLabel || ''));
    el.addEventListener('pointerleave', () => setState(''));
  });
  $$('a, button').forEach((el) => {
    if (el.hasAttribute('data-cursor')) return;
    el.addEventListener('pointerenter', () => setState('link'));
    el.addEventListener('pointerleave', () => setState(''));
  });
}

/* ------------------------------------------------------------------ */
/* Magnetic buttons                                                    */
/* ------------------------------------------------------------------ */
function initMagnetic() {
  if (!finePointer || reduced) return;
  $$('[data-magnetic]').forEach((el) => {
    const strength = Number(el.dataset.magnetic) || 0.35;
    const inner = $('[data-magnetic-inner]', el) || el;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
    const ixTo = gsap.quickTo(inner, 'x', { duration: 0.6, ease: 'power3' });
    const iyTo = gsap.quickTo(inner, 'y', { duration: 0.6, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength);
      yTo(dy * strength);
      ixTo(dx * strength * 0.4);
      iyTo(dy * strength * 0.4);
    });
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
      ixTo(0);
      iyTo(0);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Nav: hide on scroll down, show on scroll up, highlight section      */
/* ------------------------------------------------------------------ */
function initNav() {
  const nav = $('.tm-nav');
  if (!nav) return;

  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onUpdate: (self) => {
      nav.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 200);
      nav.classList.toggle('is-scrolled', self.scroll() > 80);
    },
  });

  const links = $$<HTMLAnchorElement>('.tm-nav a[href^="#"]');
  const sections = links.map((l) => $(l.getAttribute('href')!)).filter(Boolean) as HTMLElement[];
  sections.forEach((section, i) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => links[i].classList.toggle('is-active', self.isActive),
    });
  });

  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      scrollTo(target, 0);
      $('.tm-nav')?.classList.remove('is-open');
      document.documentElement.classList.remove('menu-open');
    });
  });

  const toggle = $('#tm-menu-toggle');
  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    document.documentElement.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
}

/* ------------------------------------------------------------------ */
/* Scroll reveals                                                      */
/* ------------------------------------------------------------------ */
function initReveals() {
  if (reduced) {
    gsap.set('[data-reveal], [data-reveal-group] > *', { clearProps: 'all' });
    return;
  }

  $$('[data-reveal]').forEach((el) => {
    const kind = el.dataset.reveal || 'up';
    const from: gsap.TweenVars =
      kind === 'fade' ? { opacity: 0 } : kind === 'scale' ? { opacity: 0, scale: 0.94 } : { opacity: 0, y: 44 };
    gsap.fromTo(el, from, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });

  $$('[data-reveal-group]').forEach((group) => {
    gsap.fromTo(
      group.children,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: Number(group.dataset.stagger) || 0.08,
        scrollTrigger: { trigger: group, start: 'top 85%', once: true },
      }
    );
  });

  // Section headings: split into lines that slide out of a mask.
  $$('[data-split-lines]').forEach((el) => {
    const split = new SplitText(el, { type: 'lines', linesClass: 'ln', mask: 'lines' });
    gsap.from(split.lines, {
      yPercent: 110,
      duration: 1.1,
      ease: 'power4.out',
      stagger: 0.09,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Manifesto: words brighten as you scroll through                    */
/* ------------------------------------------------------------------ */
function initManifesto() {
  const el = $('#manifesto-text');
  if (!el) return;
  const split = new SplitText(el, { type: 'words', wordsClass: 'w' });
  if (reduced) {
    gsap.set(split.words, { opacity: 1 });
    return;
  }
  gsap.fromTo(
    split.words,
    { opacity: 0.14 },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.04,
      scrollTrigger: { trigger: el, start: 'top 75%', end: 'bottom 45%', scrub: 0.6 },
    }
  );
}

/* ------------------------------------------------------------------ */
/* Count-up numbers                                                    */
/* ------------------------------------------------------------------ */
function initCounters() {
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count) || 0;
    if (reduced) {
      el.textContent = String(end);
      return;
    }
    const obj = { v: 0 };
    gsap.to(obj, {
      v: end,
      duration: 1.6,
      ease: 'power3.out',
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Skill cards: tilt + spotlight                                       */
/* ------------------------------------------------------------------ */
function initTilt() {
  if (!finePointer || reduced) return;
  $$('[data-tilt]').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotateX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotateY', { duration: 0.5, ease: 'power3' });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
      ry((px - 0.5) * 10);
      rx((0.5 - py) * 10);
    });
    card.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

/* ------------------------------------------------------------------ */
/* Work: stacking cards                                                */
/* ------------------------------------------------------------------ */
function initWorkStack() {
  const cards = $$('.work-card');
  if (!cards.length || reduced) return;

  // Sticky stacking only exists at >= 900px (see CSS); below that the cards flow normally.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px)', () => {
    cards.forEach((card, i) => {
      const isLast = i === cards.length - 1;
      if (isLast) return;
      const next = cards[i + 1];
      // Scale down and dim through an overlay (not element opacity) so the card stays opaque
      // and the one beneath never bleeds through.
      gsap.to(card, {
        scale: 0.9,
        '--dim': 0.7,
        ease: 'none',
        scrollTrigger: {
          trigger: next,
          start: 'top 90%',
          end: 'top 10%',
          scrub: true,
        },
      });
    });
  });

  // Big index counter on the side follows the active card.
  const counter = $('#work-counter');
  if (counter) {
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: (self) => {
          if (self.isActive) counter.textContent = String(i + 1).padStart(2, '0');
        },
      });
    });
  }

  // Parallax on media inside each card.
  $$('.work-card__media img, .work-card__media .work-art').forEach((media) => {
    gsap.fromTo(
      media,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: true },
      }
    );
  });
}

/* ------------------------------------------------------------------ */
/* Experience: progress line draws as you scroll                      */
/* ------------------------------------------------------------------ */
function initExperience() {
  const line = $('#xp-line');
  const list = $('#xp-list');
  if (!line || !list || reduced) return;
  gsap.fromTo(
    line,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 70%', end: 'bottom 70%', scrub: 0.4 },
    }
  );
  $$('.xp-item').forEach((item) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 70%',
      end: 'bottom 70%',
      onToggle: (self) => item.classList.toggle('is-active', self.isActive),
    });
  });
}

/* ------------------------------------------------------------------ */
/* Contact: giant heading parallax + local time                        */
/* ------------------------------------------------------------------ */
function initContact() {
  const clock = $('#tm-clock');
  if (clock) {
    const tz = clock.dataset.tz || 'Africa/Addis_Ababa';
    const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: tz, hour12: false });
    const tick = () => (clock.textContent = fmt.format(new Date()));
    tick();
    setInterval(tick, 1000);
  }

  const big = $('#contact-big');
  if (big && !reduced) {
    gsap.fromTo(
      big,
      { xPercent: 8 },
      { xPercent: -8, ease: 'none', scrollTrigger: { trigger: big, start: 'top bottom', end: 'bottom top', scrub: true } }
    );
  }

  // Copy email to clipboard
  $$('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy || '');
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 1800);
      } catch {
        /* clipboard unavailable, link still works */
      }
    });
  });
}

/* ------------------------------------------------------------------ */
/* Marquee speed reacts to scroll velocity                             */
/* ------------------------------------------------------------------ */
function initMarquee() {
  const tracks = $$('.tm-marquee__track');
  if (!tracks.length || reduced) return;
  tracks.forEach((track) => {
    const dir = track.dataset.dir === 'rtl' ? 1 : -1;
    const tween = gsap.to(track, { xPercent: dir * -50, ease: 'none', duration: 28, repeat: -1 });
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()) / 800, 4);
        gsap.to(tween, { timeScale: 1 + v, duration: 0.4, overwrite: true });
        gsap.to(tween, { timeScale: 1, duration: 1.2, delay: 0.4 });
      },
    });
  });
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */
export function initTinsaePortfolio() {
  initLenis();
  initCursor();
  initIntro();
  initHeroCanvas();
  initMagnetic();
  initNav();
  initReveals();
  initManifesto();
  initCounters();
  initTilt();
  initWorkStack();
  initExperience();
  initContact();
  initMarquee();

  // Fonts can shift line heights; refresh once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
