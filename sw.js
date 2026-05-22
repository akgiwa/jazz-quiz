// Jazz Guitar Study — Service Worker v30
// Clears ALL previous caches on activation
const CACHE = "jazz-study-v31";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())  // force immediate activation
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    // Delete ALL caches regardless of name
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => caches.open(CACHE))
      .then(c => c.addAll(ASSETS))
      .then(() => self.clients.claim())  // take control of all open tabs
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(cached => cached || fetch(e.request))
  );
});
