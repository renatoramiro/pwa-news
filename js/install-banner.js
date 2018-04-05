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
    
          eventInstall.userChoice.then(function (choice) {
            if (choice.outcome == "dismissed") {
              alert("deu zebra");
            } else {
              alert("valeu broder");
            }
    
            $('#installButton').hide();
            eventInstall = null;
          });
        }
      });
    }
  });
})();