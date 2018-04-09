(function () {
	'use strict';
	
	var API = 'https://newsapi.org/v2/';
	var ENDPOINT_HEADLINES = 'top-headlines?';
	var ENDPOINT_EVERYTHING = 'everything?';
	var API_KEY = 'apiKey=c5a59e6e745f45849e2e56af4efad07d';
	var firstNews;

	function getCategory() {
		if (globalVariable.category) {
			return '&category=' + globalVariable.category;
		}
		return '';
	}

	function getNews() {
		var url = API + ENDPOINT_HEADLINES + 'country=br&' + API_KEY + getCategory();
		$.get(url, success);
	}

	function success(data) {
		if (data.articles && data.articles.length > 0 && globalVariable.category) {
			firstNews = data.articles[0];
		}
	}

	var permissionNotification = false;
	// if ('Notification' in window) {
	// 	permissionNotification = Notification.permission;

	// 	if (permissionNotification) {
	// 		Notification.requestPermission(function (perm) {
	// 			permissionNotification = perm;
	// 		});
	// 	}
	// }

	function onBlur() {
		if (permissionNotification) {
			getNews();

			if (firstNews && (firstNews.title !== globalVariable.first_new.title)) {
				navigator.serviceWorker.getRegistration()
					.then(function (reg) {
						var options = {
							body: firstNews.title,
							icon: '../images/android-chrome-192x192.png',
							badge: '../images/android-chrome-192x192.png'
						};
						reg.showNotification('Novas notícias!', options);
					});
			}
		}
	};

	// window.onblur = onBlur;
})();