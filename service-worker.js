var cacheName = "petstore-v1";
var cacheFiles = [
    'index.html',
    'products.js',
    'style.css',
    'petstore.webmanifest',
    'images/yarn.jpg',
    'images/cat-litter.jpg',
    'images/laser-pointer.jpg',
    'images/cat-house.jpg',
    'images/icon-store-512.png'
];

self.addEventListener('install', (e) => {
    console.log('[Service worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cachee) => {
            console.log('[Service worker] caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
});

self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheName).then(function(cachee) {
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});