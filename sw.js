/* ============================================
   SERVICE WORKER
   Two jobs:
   1. Satisfies browser "installability" criteria (Add to Home Screen /
      install prompt works more reliably with one present).
   2. Provides an offline fallback — if a guest has no signal, previously
      visited pages still load from cache instead of showing an error.

   STRATEGY: network-first. Every request tries the real network first;
   only if that fails (offline) does it fall back to the cache. This is
   intentional — since this site gets updated often, a cache-first
   strategy would risk guests seeing a stale, out-of-date version even
   when they have a perfectly good connection. Network-first means live
   edits always show immediately when online; the cache is purely a
   safety net for offline moments.

   BUMP THIS VERSION whenever you want to force old cached files to be
   discarded (rarely necessary with network-first, but harmless to do
   after a big update).
   ============================================ */

const CACHE_VERSION = 'rigodal-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Clean up old cache versions from previous deployments
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests — POSTs (e.g. to third-party services) pass through untouched
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Successful network response — cache a copy for offline use
        // later. Wrapped defensively: cache.put() can throw for a few
        // edge-case response types (e.g. 206 Partial Content, which
        // font files sometimes trigger via range requests) — none of
        // that should ever be allowed to affect the actual page load,
        // which already has its response via the return below.
        const responseClone = response.clone();
        caches.open(CACHE_VERSION)
          .then((cache) => cache.put(event.request, responseClone))
          .catch(() => { /* caching this particular request failed —
                             harmless, the live network response above
                             still reaches the page normally */ });
        return response;
      })
      .catch(() => {
        // Network failed (offline) — serve the last cached version if we have one
        return caches.match(event.request);
      })
  );
});
