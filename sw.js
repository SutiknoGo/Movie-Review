var CACHE_STATIC_NAME = "static-test";
var CACHE_DYNAMIC_NAME = "dynamic-test";

self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open(CACHE_STATIC_NAME)
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll([
          '/',
          '/offline.html',
          '/js/jqm-demos.js',
          '/js/jquery.js',
          '/js/jquery.mobile-1.4.5.js',
          '/js/jquery.mobile-1.4.5.min.js',
          '/js/jquery.mobile-1.4.5.min.map',
          '/js/pwa.js',
          '/js/view-source.js',

          '/css/jquery.mobile-1.4.5.min.css',
          '/css/jqm-demos.css',
          '/css/style.css',
          '/css/responsive.css',
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
          'http://fonts.googleapis.com/css?family=Open+Sans:300,400,700',

          '/images/social/dribbble.png',
          '/images/social/facebook.png',
          '/images/social/google.png',
          '/images/social/pinterest.png',
          '/images/social/twitter.png',
          '/images/favicon.ico',
          '/images/apple-touch-icon.png',
          '/images/logoW.png'
        ]);
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME) {
            console.log('[Service Worker] Removing old cache.', key);
            return caches.delete(key);
          }
        }));
      })
  );
  return self.clients.claim();
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
              return caches.open(CACHE_STATIC_NAME)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });

        }
      })
  );
});