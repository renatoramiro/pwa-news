// (function () {
  'use strict';

  var swPush;
  var isSubscribed = false;
  var publicKey = 'BGVZehzT2GoxH-hq638WnovJML0uW62UTmOVCocIeQ4_Bx_6MU2mA3wIkvH8gP1jJqcfB_mtUBAjzoVhgHwG_Jo';
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('pwa-news-sw-push.js').then(function (swRegister) {
        console.log('Service Worker Push: Registered', swRegister);
        swPush = swRegister;
        getSubscription();
      })
    });
  }

  function getSubscription() {
    if (swPush) {
      swPush.pushManager.getSubscription().then(function (subscription) {
        isSubscribed = !(subscription === null);

        if (isSubscribed) {
          console.log('Você está inscrito.');
        } else {
          console.log('Você não está inscrito.');
          registerUser();
        }
      });
    }
  }

  function registerUser() {
    const applicationServerKey = urlB64ToUint8Array(publicKey);
    swPush.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    }).then(function (subscription) {
      console.log('Você está inscrito.');
      console.log(JSON.stringify(subscription));
    });
  }

  function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
// })();