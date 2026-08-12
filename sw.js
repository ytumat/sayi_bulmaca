const CACHE_NAME = 'sayi-tahmin-v2';
const assets = [
  '/sayi_bulmaca/',
  '/sayi_bulmaca/index.html',
  '/sayi_bulmaca/manifest.json',
  '/sayi_bulmaca/icon.png'
];

// Kurulum aşaması
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Eski önbellekleri temizleme
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// İstekleri yakalama
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});