/* ============================================
   SCROLL ENGINE
   Handles: section reveal-on-scroll, progress bar,
   active tab highlighting, hero parallax, FAB visibility.

   Runs its setup AFTER modules are mounted (listens for
   the 'rigodal:modulesmounted' event) since sections don't
   exist in the DOM until the module registry injects them.
   ============================================ */

(function () {
  const navProgress = document.getElementById('navProgress');
  const rudiFab = document.getElementById('rudiFab');
  let heroScene, heroEl;
  let ticking = false;

  function revealObserverSetup() {
    const sections = document.querySelectorAll('[data-section]');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10% 0px' });

    sections.forEach((s) => revealObserver.observe(s));
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        navProgress.style.width = progress + '%';

        if (heroEl) {
          const heroHeight = heroEl.offsetHeight;
          if (scrollTop > heroHeight * 0.5) {
            rudiFab.classList.add('is-visible');
          } else {
            rudiFab.classList.remove('is-visible');
          }

          if (heroScene && scrollTop < heroHeight) {
            const parallaxAmount = Math.min(scrollTop * 0.2, 60);
            heroScene.style.transform = `translate3d(0, ${parallaxAmount}px, 0)`;
          }
        } else {
          // No hero module enabled — FAB should just always be visible
          rudiFab.classList.add('is-visible');
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  function tabObserverSetup() {
    const tabItems = document.querySelectorAll('[data-tab]');
    const sections = document.querySelectorAll('[data-section]');

    const tabObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabItems.forEach((tab) => {
            const isMatch = tab.getAttribute('href') === '#' + id;
            tab.classList.toggle('is-active', isMatch);
          });
        }
      });
    }, { threshold: 0.5, rootMargin: '-30% 0px -30% 0px' });

    sections.forEach((s) => tabObserver.observe(s));
  }

  function setup() {
    heroEl = document.getElementById('home'); // present only if hero module is enabled
    heroScene = document.getElementById('heroScene');

    revealObserverSetup();
    tabObserverSetup();
    onScroll(); // run once immediately so state is correct before first scroll
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Device tilt parallax (gyroscope) — progressive enhancement
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (!heroScene || window.scrollY > 100) return;
      const tiltX = (e.gamma || 0) * 0.5;
      heroScene.style.setProperty('--tilt-x', tiltX + 'px');
    });
  }

  // Wait until modules have injected their HTML before wiring anything up
  document.addEventListener('rigodal:modulesmounted', setup);
})();
