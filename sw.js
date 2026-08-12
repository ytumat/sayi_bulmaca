const CACHE_NAME = 'sayi-tahmin-v1'; // Versiyonu artırarak her güncellemede taze kalmasını sağlar
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' 
];

// Kurulum aşaması
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Yeni versiyonun hemen aktif olmasını sağlar
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