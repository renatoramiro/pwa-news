(function () {
  'use strict';

  var eventInstall;

  window.addEventListener('beforeinstallprompt', function (event) {
    eventInstall = event;
    $('#installButton').show();
    event.preventDefault();
  });

  $(document)[0].addEventListener("init",function(event) {
    if(event.target.id == "home"){
      $('#installButton').click(function () {
        if (eventInstall) {
          eventInstall.prompt();
          $('#installButton').hide();
    
          eventInstall.userChoice.then(function (choice) {
            if (choice.outcome == "accepted") {
              var toast = $('<ons-toast>').append('Thanks for having installed our app.');
              $("body").append(toast);
              toast.show();
              setTimeout(function () {
                toast.hide();
                toast = null;
              }, 2500);
            }

            eventInstall = null;
          });
        }
      });
    }
  });
})();