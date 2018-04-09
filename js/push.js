'use strict';

window.addEventListener('load', function () {
  var applicationServerPublicKey = 'BE67hAUY5A1CyW6Hyc0O-2bIpc4a7BIhaDaA1qToBYBbvqmrIuzB7tvfMvBq4rMIpzJ458TZWsBO_SGVDa45jAs';

  var pushButtonEnabled = $('#push-enabled');
  var pushButtonDisabled = $('#push-disabled');

  var isSubscribed = false;
  var swRegistration = null;

  function initializeUI() {
    $('#push-enabled').on('click', function (event) {
      disableButton();

      if (isSubscribed) {
        unsubscribeUser();
      } else {
        subscribeUser();
      }
    });

    swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      isSubscribed = !(subscription === null);

      updateSubscriptionOnServer(subscription);

      if (isSubscribed) {
        console.log('User IS subscribed.');
      } else {
        console.log('User is NOT subscribed.');
      }
  
      updateButtons();
    });
  }

  function subscribeUser() {
    var applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed.');
  
      updateSubscriptionOnServer(subscription);
  
      isSubscribed = true;
  
      updateButtons();
    })
    .catch(function(err) {
      console.log('Failed to subscribe the user: ', err);
      updateButtons();
    });
  }

  function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
    .then(function (subscription) {
      if (subscription) {
        return subscription.unsubscribe();
      }
    })
    .catch(function (error) {
      console.log('Error unsubscribing', error);
    }).then(function() {
      updateSubscriptionOnServer(null);
  
      console.log('User is unsubscribed.');
      isSubscribed = false;
  
      updateButtons();
    });  
  }
  
  function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server
    console.log(JSON.stringify(subscription));
  }  

  function updateButtons(params) {
    if (Notification.permission === 'denied') {
      $('#push-enabled').addClass('hide');
      $('#push-disabled').removeClass('hide');
      updateSubscriptionOnServer(null);
      return;
    }

    $('#push-disabled').addClass('hide');

    if (isSubscribed) {
      $('#push-enabled').removeClass('hide').css('color', 'rgb(112, 7, 7)');
    } else {
      $('#push-enabled').removeClass('hide').css('color', '');
    }
  }

  function disableButton() {
    $('#push-enabled').addClass('hide');
    $('#push-disabled').removeClass('hide');
  }

  function urlB64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
  
    navigator.serviceWorker.getRegistration('service-worker.js')
    .then(function (swReg) {
      console.log('Service Worker is registered', swReg);
      swRegistration = swReg;
      initializeUI();
    })
    .catch(function (error) {
      console.error('Service Worker Error', error);
    });
  } else {
    console.warn('Push messaging is not supported');
  }
});