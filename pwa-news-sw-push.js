'use strict';

self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log('[Service Worker] Push had this data:', event.data.text());

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/android-chrome-192x192.png',
    badge: 'images/android-chrome-192x192.png'
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});