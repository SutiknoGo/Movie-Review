var CACHE_STATIC_NAME = "static-test";
var CACHE_DYNAMIC_NAME = "dynamic-test";

const STATIC_ASSETS = [
  './',
  './offline.html',
  './js/jqm-demos.js',
  './js/jquery.js',
  './js/jquery.mobile-1.4.5.js',
  './js/jquery.mobile-1.4.5.min.js',
  './js/jquery.mobile-1.4.5.min.map',
  './js/pwa.js',
  './js/view-source.js',

  './css/jquery.mobile-1.4.5.min.css',
  './css/jqm-demos.css',
  './css/style.css',
  './css/responsive.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'http://fonts.googleapis.com/css?family=Open+Sans:300,400,700',

  './images/social/dribbble.png',
  './images/social/facebook.png',
  './images/social/google.png',
  './images/social/pinterest.png',
  './images/social/twitter.png',
  './images/favicon.ico',
  './images/apple-touch-icon.png',
  './images/logoW.png'
];

const STATIC_CACHE_NAME = 'static-test';
const DYNAMIC_CACHE_NAME = 'dynamic-test';

self.addEventListener('install', async evt => {
  const cache = await caches.open(STATIC_CACHE_NAME);
  cache.addAll(STATIC_ASSETS);
});

self.addEventListener('fetch', evt => {
  const req = evt.request;
  const url = new URL(req.url);

  // check where to fetch. from our own cache or network.
  if (url.origin == location.origin) {
    evt.respondWith(cacheFirst(req));
  } else {
    evt.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}

async function networkFirst(req) {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    // try go to network and fetch data 
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (error) {
    // look something on cache. 
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
}

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== STATIC_CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});