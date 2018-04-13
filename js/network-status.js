(function () {
  'use strict';

  function onOnline() {
    $('#online').removeClass('hide');
		$('#offline').addClass('hide');
  }

  function onOffline() {
    $('#online').addClass('hide');
		$('#offline').removeClass('hide');
  }

  window.addEventListener('online', onOnline);

	window.addEventListener('offline', onOffline);
  
  $(document)[0].addEventListener("init",function(event){
		if(event.target.id == "settings"){
			if (navigator.onLine) {
				onOnline();
			} else {
				onOffline();
      }
    }
  });
})();