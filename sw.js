/* SAMA service worker.
   Bumped from sama-1.0.1 — the old cache would keep serving the previous
   index.html forever, so the redesigned UI would never reach anyone who had
   already opened the app.

   The previous precache list named two files that do not exist
   (SAMA-CONSOLE-HOME-UI-BASE-PANEL.png, SAMA-CONSOLE-VIZ-UI-BASE-PANEL.png).
   cache.addAll() is atomic: one 404 rejects the whole install, so the worker
   never activated and there was no offline support at all. The list below is
   verified against the repo, and install no longer fails on a single miss. */
const CACHE = 'sama-1.0.2';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.ico',
  './SAMA PARTS/sama-logo.png',
  './SAMA PARTS/icon-192.png',
  './SAMA PARTS/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      // per-asset so one bad entry cannot abort the whole install
      .then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Never cache audio streams or the radio API — they are live, often huge,
  // and would evict the app shell.
  if (url.origin !== self.location.origin) return;
  if (req.destination === 'audio' || req.destination === 'video') return;

  // Network-first for the document so a new build is picked up immediately,
  // falling back to cache when offline.
  if (req.mode === 'navigate' || req.destination === 'document') {
    e.respondWith(
      fetch(req)
        .then(r => { const copy = r.clone();
                     caches.open(CACHE).then(c => c.put(req, copy)); return r; })
        .catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  // Cache-first for static assets, filling the cache as they are requested.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r && r.status === 200 && r.type === 'basic') {
        const copy = r.clone();
        caches.open(CACHE).then(c => c.put(req, copy));
      }
      return r;
    }).catch(() => hit))
  );
});
