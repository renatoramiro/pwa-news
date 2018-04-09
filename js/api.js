globalVariable = {first_new: null, category: null};

(function () {
	'use strict';

	var category = null;
	var search = null;
	var firstNews = "ULALALA";

	var API = 'https://newsapi.org/v2/';
	var ENDPOINT_HEADLINES = 'top-headlines?';
	var ENDPOINT_EVERYTHING = 'everything?';
	var API_KEY = 'apiKey=c5a59e6e745f45849e2e56af4efad07d';

	getNews();

	function getNews() {
		var url = API + ENDPOINT_HEADLINES + 'country=br&' + API_KEY + getCategory();
		$.get(url, success);
	}

	function getNewsWithSearch() {
		var url = API + ENDPOINT_EVERYTHING + API_KEY + getSearch();
		$.get(url, success);
	}

	function success(data) {
		var divNews = $('#news');
		divNews.empty();

		if (data.articles && data.articles.length > 0) {
			globalVariable.first_new = data.articles[0];
		}
		
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

	$(document)[0].addEventListener("init",function(event){
		if(event.target.id == "home"){
			$("#headline").click(function () {
				category = null;
				activeMenu($(this));
			});
			$("#health").bind('click', function () {
				category = 'health';
				globalVariable.category = 'health';
				activeMenu($(this));
			});
			$("#sports").click(function () {
				category = 'sports';
				globalVariable.category = 'sports';
				activeMenu($(this));
			});
			$("#entertainment").click(function () {
				category = 'entertainment';
				globalVariable.category = 'entertainment';
				activeMenu($(this));
			});
			$("#technology").click(function () {
				category = 'technology';
				globalVariable.category = 'technology';
				activeMenu($(this));
			});
		}
	});

	$(".menu-headline").click(function () {
		category = null;
		activeMenu($(this));
	});
	$(".menu-health").click(function () {
		category = 'health';
		globalVariable.category = 'health';
		activeMenu($(this));
	});
	$(".menu-sports").click(function () {
		category = 'sports';
		globalVariable.category = 'sports';
		activeMenu($(this));
	});
	$(".menu-entertainment").click(function () {
		category = 'entertainment';
		globalVariable.category = 'entertainment';
		activeMenu($(this));
	});
	$(".menu-technology").click(function () {
		category = 'technology';
		globalVariable.category = 'technology';
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