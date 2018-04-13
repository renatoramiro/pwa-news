self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log('[Service Worker] Push had this data:', event.data.text());
  console.log('[Service Worker] ==============================================');

  const title = 'Push PWA News';
  const options = {
    body: event.data.text(),
    icon: '../images/android-chrome-192x192.png',
    badge: '../images/android-chrome-192x192.png'
  };

  const notificationPromise = self.registration.showNotification(title, options);
  event.waitUntil(notificationPromise);
});

self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  // event.waitUntil(
  //   clients.openWindow('https://developers.google.com/web/')
  // );
});