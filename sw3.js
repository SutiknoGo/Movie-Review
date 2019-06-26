var CACHE_NAME = 'test_cache';
var urlToCache = [
  '/',
  '/index.html',
  '/src/css/app.css',
  '/src/js/app.js',
  '/pj.png'
];

var CACHE_DYNAMIC_NAME ='test_dynamic_cache';


self.addEventListener('install', event => {
  event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
          // addAll() hits all the URIs in the array and caches 
          // the results, with the URIs as the keys.
          cache.addAll(
            [
              'contact.html']
            // urlToCache
            )
              .then(() => console.log('Assets added to cache'))
              .catch(err => console.log('Error while fetching assets', err));
          })
  );
});

self.addEventListener('activate', event => {
  // Delete all caches except for CURRENT_CACHE, thus deleting the previous cache
  event.waitUntil(
      caches.keys().then(cacheNames => {
          return Promise.all(
              cacheNames.map(cacheName => {
                  if (cacheName !== CACHE_NAME&& key !== CACHE_DYNAMIC_NAME) {
                      console.log('Deleting out of date cache:', cacheName);
                      return caches.delete(cacheName);
                  }
              })
          );
      })
  );
});


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        } else {
          return fetch(event.request)
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());
                  return res;
                })
            })
            .catch(function(err) {

            });
        }
      })
  );
});

