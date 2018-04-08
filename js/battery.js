(function () {
  'use strict';

  var batteryPromise;

  if ('getBattery' in navigator || ('battery' in navigator && 'Promise' in window)) {
    if ('getBattery' in navigator) {
      batteryPromise = navigator.getBattery();
    } else {
      batteryPromise = Promise.resolve(navigator.battery);
    }

    function changeClassBatteryLevel(battery) {
      if (battery.charging) {
        $('#charging').removeClass('hide');
        $('#full-charged').addClass('hide');
        $('#discharging-2').addClass('hide');
        $('#discharging-1').addClass('hide');
        $('#discharging-0').addClass('hide');
      } else if (battery.level >= 0.75 && battery.level < 1) {
        $('#charging').addClass('hide');
        $('#full-charged').addClass('hide');
        $('#discharging-2').removeClass('hide');
        $('#discharging-1').addClass('hide');
        $('#discharging-0').addClass('hide');
      } else if (battery.level < 0.75 && battery.level >= 0.30) {
        $('#charging').addClass('hide');
        $('#full-charged').addClass('hide');
        $('#discharging-2').addClass('hide');
        $('#discharging-1').removeClass('hide');
        $('#discharging-0').addClass('hide');
      } else if (battery.level < 0.30) {
        $('#full-charged').addClass('hide');
        $('#charging').addClass('hide');
        $('#discharging-2').addClass('hide');
        $('#discharging-1').addClass('hide');
        $('#discharging-0').removeClass('hide');
      } else if (battery.level === 1) {
        $('#full-charged').removeClass('hide');
        $('#charging').addClass('hide');
        $('#discharging-2').addClass('hide');
        $('#discharging-1').addClass('hide');
        $('#discharging-0').addClass('hide');
      }
    }

    function checkLevelBattery(battery) {
      window.addEventListener('init', function () {
        changeClassBatteryLevel(battery);
      });
    }

    batteryPromise.then(function (battery) {
      checkLevelBattery(battery);
      battery.addEventListener('levelchange', function () {
        checkLevelBattery(battery);
      });

      battery.addEventListener('chargingchange', function () {
        changeClassBatteryLevel(battery);
      });
    })
  }
})();