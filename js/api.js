(function () {
	'use strict';

	var category = null;
	var search = null;

	// var API = 'http://localhost:3000/';
	var API = 'https://newsapi.org/v2/';
	// var ENDPOINT_HEADLINES = 'news?';
	var ENDPOINT_HEADLINES = 'top-headlines?';
	var ENDPOINT_EVERYTHING = 'everything?';
	var API_KEY = 'apiKey=c5a59e6e745f45849e2e56af4efad07d';

	console.log($('#splitterMenu'));
	getNews();

	function getNews() {
		var url = API + ENDPOINT_HEADLINES + 'country=br&' + API_KEY + getCategory();
		// var url = API + ENDPOINT_HEADLINES;
		$.get(url, success);
	}

	function getNewsWithSearch() {
		var url = API + ENDPOINT_EVERYTHING + API_KEY + getSearch();
		$.get(url, success);
	}

	function success(data) {
		var divNews = $('#news');
		divNews.empty();

		// setTopNews(data.articles[0]);
		for (var i = 0; i < data.articles.length; ++i) {
			divNews.append(getNewsHtml(data.articles[i]));
		}
	}

	function setTopNews(article) {
		if (article) {
			$('#top-news-title').text(article.title);
			$('#top-news-description').text(article.description);
			$('#top-news-image').attr('src', article.urlToImage).attr('alt', article.title);
			$('#top-news-link').attr('href', article.url);
		}
	}

	$(".menu-headline").click(function () {
		category = null;
		activeMenu($(this));
	});
	$(".menu-health").click(function () {
		category = 'health';
		activeMenu($(this));
	});
	$(".menu-sports").click(function () {
		category = 'sports';
		activeMenu($(this));
	});
	$(".menu-entertainment").click(function () {
		category = 'entertainment';
		activeMenu($(this));
	});
	$(".menu-technology").click(function () {
		category = 'technology';
		activeMenu($(this));
	});
	$("#search").keypress(function (ev) {
		if (ev.which == 13) {
			search = $(this).val();
			if (search) {
				getNewsWithSearch();
			} else {
				getNews();
			}
		}
	});

	function activeMenu(menu) {
		search = null;
		$("#search").val('');
		$('span.active').removeClass('active');
		menu.addClass('active');
		var menuLateral = document.getElementById('menu').close();
		getNews();
	}

	function getCategory() {
		if (category) {
			return '&category=' + category
		}
		return '';
	}

	function getSearch() {
		if (search) {
			return '&q=' + search
		}
		return '';
	}

	$('#splitterMenu').click(function() {
		var menu = document.getElementById('menu');
		menu.open();
	});

	function getNewsHtml(article) {
		var card = $('#news');
		card = addListItem(card);

		return card;

		function addListItem(card) {
			var item = $('<div class="card">');
			item = addImage(item);
			item = addBodyTitle(item);
			item = addBodyDescription(item);
			return card.append(item);
		}

		function addImage(item) {
			return item.append(
				$('<img>').attr('src', article.urlToImage).addClass('hide-xs')
			);
		}

		function addBodyTitle(item) {
			return item.append(
				$('<h4>').addClass('card__title').append(article.title)
			);
		}

		function addBodyDescription(item) {
			return item.append(
				$('<div>').addClass('card__content').append(
					$('<p>').addClass('hide-xs').append(article.description)
				).append(
					$('<button>').addClass('button button--quiet').append('Read more')
					.click(function () {
						window.open(article.url, '_blank');
					})
				)
			);
		}
	}

})();