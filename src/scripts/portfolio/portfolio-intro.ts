import { gsap } from 'gsap';

function nextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

async function waitForImage(image: HTMLImageElement | null) {
  if (!image) return;

  if (image.complete && image.naturalWidth > 0) {
    try {
      await image.decode();
    } catch {
      // Ignore decode failures and keep the intro moving.
    }
    return;
  }

  await new Promise<void>((resolve) => {
    const done = () => resolve();
    image.addEventListener('load', done, { once: true });
    image.addEventListener('error', done, { once: true });
  });
}

export async function initPortfolioIntro() {
  const root = document.querySelector<HTMLElement>('[data-portfolio-intro]');
  const slug = root?.dataset.portfolioIntro;
  const stage = root?.querySelector<HTMLElement>('[data-portfolio-stage]');
  const label = root?.querySelector<HTMLElement>('[data-portfolio-label]');
  const cue = root?.querySelector<HTMLElement>('[data-portfolio-scroll-cue]');
  const beam = root?.querySelector<HTMLElement>('[data-portfolio-beam]');
  const grid = root?.querySelector<HTMLElement>('[data-portfolio-grid]');
  const target = slug ? document.querySelector<HTMLElement>(`[data-portfolio-target="${slug}"]`) : null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!root || !slug || !stage || !label || !cue || !beam || !grid || !target) return;
  if (root.dataset.introInitialized === 'true') return;
  if (reducedMotion) return;
  if (window.scrollY > 32 || window.location.hash) return;

  root.dataset.introInitialized = 'true';

  const image = root.querySelector<HTMLImageElement>('img');
  const compactMode = window.matchMedia('(max-width: 767px), (pointer: coarse)').matches;
  const ambientEls = gsap.utils.toArray<HTMLElement>('[data-portfolio-ambient]', root);
  const scrollProxy = { y: window.scrollY };
  const preScrollSettle = compactMode ? 0.35 : 0.5;
  const scrollOverlap = compactMode ? 0.18 : 0.24;

  await waitForImage(image);
  await nextFrame();

  if (window.scrollY > 32) return;

  gsap.set(stage, {
    autoAlpha: 0,
    y: compactMode ? 24 : 56,
    scale: compactMode ? 0.96 : 0.88,
    rotateX: compactMode ? 0 : 10,
    transformOrigin: 'center top',
    transformPerspective: 1800,
  });
  gsap.set([label, cue], { autoAlpha: 0, y: 18 });
  gsap.set(grid, { autoAlpha: 0, scale: 1.05, transformOrigin: 'center center' });
  gsap.set(beam, { autoAlpha: 0, scaleY: 0.2, transformOrigin: 'center top' });
  gsap.set(ambientEls, { autoAlpha: 0, scale: 0.7 });

  let finished = false;

  const restoreStaticState = () => {
    gsap.set([stage, label, cue, beam, grid, ...ambientEls], {
      clearProps: 'all',
    });
    root.classList.remove('is-guiding');
  };

  const teardown = () => {
    window.removeEventListener('wheel', interrupt);
    window.removeEventListener('touchstart', interrupt);
    window.removeEventListener('keydown', interrupt);
  };

  const interrupt = () => {
    if (finished) return;
    finished = true;
    gsap.killTweensOf(window);
    tl.kill();
    teardown();
    restoreStaticState();
  };

  window.addEventListener('wheel', interrupt, { passive: true });
  window.addEventListener('touchstart', interrupt, { passive: true });
  window.addEventListener('keydown', interrupt);

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      finished = true;
      teardown();
      restoreStaticState();
    },
  });

  tl.to(
    ambientEls,
    {
      autoAlpha: 1,
      scale: 1,
      duration: compactMode ? 0.8 : 1.2,
      stagger: 0.12,
    },
    0,
  )
    .to(
      grid,
      {
        autoAlpha: 0.55,
        scale: 1,
        duration: 1,
        ease: 'sine.out',
      },
      0.05,
    )
    .to(
      beam,
      {
        autoAlpha: 0.85,
        scaleY: 1,
        duration: compactMode ? 0.75 : 0.9,
        ease: 'power2.out',
      },
      0.12,
    )
    .to(
      stage,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: compactMode ? 0.9 : 1.25,
        ease: compactMode ? 'power3.out' : 'expo.out',
      },
      0.15,
    )
    .to(
      label,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.5,
      },
      0.35,
    )
    .to(
      cue,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
      },
      0.55,
    )
    .to(stage, {
      y: compactMode ? -6 : -12,
      scale: compactMode ? 1.01 : 1.03,
      duration: preScrollSettle,
      ease: 'sine.inOut',
    })
    .to(
      scrollProxy,
      {
        duration: compactMode ? 1.35 : 1.8,
        ease: 'expo.inOut',
        y: () => Math.max(0, target.getBoundingClientRect().top + window.scrollY - (compactMode ? 88 : 112)),
        onStart: () => {
          scrollProxy.y = window.scrollY;
          root.classList.add('is-guiding');
        },
        onUpdate: () => {
          window.scrollTo({ top: scrollProxy.y, behavior: 'auto' });
        },
      },
      `-=${scrollOverlap}`,
    )
    .to(
      stage,
      {
        y: compactMode ? -14 : -30,
        scale: compactMode ? 0.985 : 0.94,
        duration: compactMode ? 1.35 : 1.8,
        ease: 'power2.inOut',
      },
      '<',
    )
    .to(
      beam,
      {
        autoAlpha: 0,
        scaleY: 0.35,
        duration: 0.95,
      },
      '<+=0.15',
    )
    .to(
      cue,
      {
        autoAlpha: 0,
        y: -16,
        duration: 0.45,
      },
      '<+=0.6',
    )
    .to(
      grid,
      {
        autoAlpha: 0.28,
        duration: 0.8,
      },
      '<',
    );
}
