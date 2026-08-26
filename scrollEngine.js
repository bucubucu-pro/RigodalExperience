/* ============================================
   SCROLL ENGINE
   Handles: section reveal-on-scroll, progress bar,
   active tab highlighting, hero parallax, FAB visibility.
   ============================================ */

(function () {
  const sections = document.querySelectorAll('[data-section]');
  const navProgress = document.getElementById('navProgress');
  const rudiFab = document.getElementById('rudiFab');
  const heroScene = document.getElementById('heroScene');
  const heroEl = document.getElementById('home');

  // --- Reveal sections on scroll (IntersectionObserver = cheap & smooth) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((s) => revealObserver.observe(s));

  // --- Scroll progress bar + FAB visibility (throttled via rAF) ---
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        navProgress.style.width = progress + '%';

        // FAB appears once user scrolls past hero
        const heroHeight = heroEl.offsetHeight;
        if (scrollTop > heroHeight * 0.6) {
          rudiFab.classList.add('is-visible');
        } else {
          rudiFab.classList.remove('is-visible');
        }

        // Subtle parallax on hero scene (only while hero is in view, perf-friendly)
        if (scrollTop < heroEl.offsetHeight) {
          const parallaxAmount = scrollTop * 0.3;
          heroScene.style.transform = `translateY(${parallaxAmount}px)`;
        }

        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Device tilt parallax (gyroscope) — progressive enhancement ---
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (window.scrollY > 100) return; // only when hero is in view
      const tiltX = (e.gamma || 0) * 0.5; // left-right tilt
      heroScene.style.setProperty('--tilt-x', tiltX + 'px');
    });
  }

  // --- Active tab highlighting based on scroll position ---
  const tabItems = document.querySelectorAll('[data-tab]');

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

  document.querySelectorAll('[data-section]').forEach((s) => tabObserver.observe(s));
})();
