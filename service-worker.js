(function () {
  'use strict';
  
  var API = 'https://newsapi.org/v2/';
  var cacheName = 'pwa_news_cache_v1';
  var cacheData = 'pwa_news_cache_data_v1';
  var filesToCache = [
    '/',
    '/build/build.css',
    '/build/build.js',
    '/library/jquery-3.3.1.min.js',
    '/pages/news.html',
    '/pages/push.html'
  ];

  self.addEventListener('install', function (e) {
    console.log('Installing service Worker');
    e.waitUntil(
      self.caches.open(cacheName)
        .then(function (cache) {
          return cache.addAll(filesToCache);
        })
    );
  });

  self.addEventListener('activate', function (event) {
    console.log('Activating service Worker');
    var cacheList = [cacheName, cacheData];
    return event.waitUntil(
      self.caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cacheName) {
          if (cacheList.indexOf(cacheName) === -1) {
            self.caches.delete(cacheName);
          }
        }));
      })
    );
  });

  self.addEventListener('fetch', function (e) {
    console.log('Fetchando service Worker');
    if (e.request.url.indexOf(API) === -1) {
      e.respondWith(
        self.caches.match(e.request)
        .then(function (response) {
          if (response) {
            return response;
          }
          return fetch(e.request);
        })
      );
    } else {
      e.respondWith(
        self.fetch(e.request)
          .then(function (response) {
            return caches.open(cacheData)
              .then(function (cache) {
                cache.put(e.request.url, response.clone());
                return response;
              })
          }).catch(function () {
            return caches.match(e.request);
          })
      );
    }
  });  
})();