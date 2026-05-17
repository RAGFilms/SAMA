const CACHE = 'sama-1.0.0';
const ASSETS = [
  './index.html',
  './manifest.json',
  './SAMA PARTS/SAMA-CONSOLE-HOME-UI-BASE-PANEL.png',
  './SAMA PARTS/SAMA-CONSOLE-LOCAL-UI-BASE-PANEL.png',
  './SAMA PARTS/SAMA-CONSOLE-radio-mode-background.png',
  './SAMA PARTS/SAMA-CONSOLE-VIZ-UI-BASE-PANEL.png',
  './SAMA PARTS/CROPS/BTN-ELECTRIC.png',
  './SAMA PARTS/CROPS/BTN-EMERALD.png',
  './SAMA PARTS/CROPS/BTN-AMBER.png',
  './SAMA PARTS/CROPS/BTN-PALESTINE-NEW.png',
  './SAMA PARTS/CROPS/BTN-PRESET-1.png',
  './SAMA PARTS/CROPS/BTN-PRESET-2.png',
  './SAMA PARTS/CROPS/BTN-PRESET-3.png',
  './SAMA PARTS/CROPS/BTN-PRESET-4.png',
  './SAMA PARTS/CROPS/BTN-PRESET-5.png',
  './SAMA PARTS/icon-192.png',
  './SAMA PARTS/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
