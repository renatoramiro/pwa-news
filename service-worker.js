(function () {
  'use strict';
  
  var API = 'https://newsapi.org/v2/';
  var cacheName = 'pwa_news_cache_v1';
  var cacheData = 'pwa_news_cache_data_v1';
  var filesToCache = [
    '/',
    '/css/main.css',
    '/css/core.css',
    '/css/onsenui.css',
    '/css/onsen-css-components.min.css',
    '/css/ionicons/css/ionicons.min.css',
    '/css/material-design-iconic-font/css/material-design-iconic-font.min.css',
    '/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.ttf',
    '/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff',
    '/css/material-design-iconic-font/fonts/Material-Design-Iconic-Font.woff2',
    '/css/font_awesome/css/font-awesome.min.css',
    '/js/api.js',
    '/library/jquery-3.3.1.min.js',
    '/library/moment.min.js',
    '/library/onsenui.min.js'
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