import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Reveal elements on scroll
  gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Stagger children reveal
  gsap.utils.toArray<HTMLElement>('.stagger-children').forEach((parent) => {
    const children = parent.children;
    gsap.fromTo(
      children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Slide in from left
  gsap.utils.toArray<HTMLElement>('.reveal-left').forEach((el) => {
    gsap.fromTo(
      el,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Slide in from right
  gsap.utils.toArray<HTMLElement>('.reveal-right').forEach((el) => {
    gsap.fromTo(
      el,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Scale in
  gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Clip-path reveal (structural)
  gsap.utils.toArray<HTMLElement>('.clip-reveal').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1,
        ease: 'power4.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          once: true,
        },
      }
    );
  });

  // Parallax elements
  gsap.utils.toArray<HTMLElement>('.parallax').forEach((el) => {
    const speed = parseFloat(el.dataset.speed || '0.2');
    gsap.to(el, {
      yPercent: -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Horizontal line grow
  gsap.utils.toArray<HTMLElement>('.line-grow').forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });
}

export function initCountUp() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      el.textContent = el.dataset.count || '';
    });
    return;
  }

  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const target = el.dataset.count || '0';
    const isPercentage = target.includes('%');
    const hasPlus = target.includes('+');
    const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          { val: 0 },
          { val: numericValue },
          {
            val: numericValue,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              const current = Math.round(this.targets()[0].val);
              el.textContent = `${current}${isPercentage ? '%' : ''}${hasPlus ? '+' : ''}`;
            },
          }
        );
      },
    });
  });
}

export function initHeroAnimations() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobileHero = window.matchMedia('(max-width: 1023px)').matches;

  if (reduced) {
    gsap.set('.hero-badge, .hero-description, .hero-ctas, .hero-trust', { opacity: 1 });
    gsap.set('.hero-title-line', { clipPath: 'inset(0 0% 0 0)' });
    gsap.set('.hero-devices-lg .hero-device', { opacity: 1 });
    document.querySelectorAll('.hero-devices-lg .hero-device').forEach(el =>
      (el as HTMLElement).classList.add('is-floating')
    );
    return;
  }

  const heroContent = document.querySelector('.hero-content');

  /* Mobile / tablet: static hero — no GSAP entrance, no scroll-parallax fade */
  if (isMobileHero) {
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.fromTo('.hero-badge',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6 },
    0.3,
  )
  .fromTo('.hero-title-line',
    { clipPath: 'inset(0 100% 0 0)' },
    { clipPath: 'inset(0 0% 0 0)', duration: 1, stagger: 0.2, ease: 'power4.inOut' },
    0.5,
  )
  .fromTo('.hero-description',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.7 },
    1.1,
  )
  .fromTo('.hero-ctas',
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 0.6 },
    1.3,
  )
  .fromTo('.hero-trust',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.6 },
    1.5,
  )
  .fromTo('.hero-devices-lg .hero-device',
    { opacity: 0, scale: 0.85, y: 40 },
    {
      opacity: 1, scale: 1, y: 0, duration: 1.2, stagger: 0.15,
      ease: 'power3.out',
      onComplete: () => {
        document.querySelectorAll('.hero-devices-lg .hero-device').forEach(el =>
          (el as HTMLElement).classList.add('is-floating')
        );
      },
    },
    0.8,
  );

  if (heroContent) {
    gsap.to(heroContent, {
      y: -100,
      opacity: 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }
}

export function initMagneticButtons() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  document.querySelectorAll<HTMLElement>('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

export function initTiltCards() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if ('ontouchstart' in window) return;

  document.querySelectorAll<HTMLElement>('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      gsap.to(card, {
        rotateX: (0.5 - y) * 8,
        rotateY: (x - 0.5) * 8,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0, rotateY: 0, scale: 1,
        duration: 0.5, ease: 'power3.out',
      });
    });
  });
}
