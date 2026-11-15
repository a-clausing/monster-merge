// Offline support for Monster Merge.
// Network-first so updates still arrive as soon as you're online;
// falls back to the cached copy when the network is unavailable.
const CACHE = 'monster-merge-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './vendor/matter.min.js',
  './vendor/jszip.min.js',
  './monster_merge_orbs.zip',
  './dungeon-stage.b64',
  './home-screen.jpg',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const fresh = await fetch(req, { cache: 'no-store' });
      if (fresh.ok) {
        // Store under the URL without its ?v= query so lookups stay stable.
        const url = new URL(req.url); url.search = '';
        cache.put(url.href, fresh.clone());
      }
      return fresh;
    } catch (err) {
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const shell = await cache.match('./index.html');
        if (shell) return shell;
      }
      throw err;
    }
  })());
});
