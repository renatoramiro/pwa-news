(function () {
    'use strict';

    var category = null;
    var search = null;

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
        //setTopNews( data.articles[0]);
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

    $("#headline").click(function () {
        category = null;
        activeMenu($(this));
    });
    $("#health").click(function () {
        category = 'health';
        activeMenu($(this));
    });
    $("#sports").click(function () {
        category = 'sports';
        activeMenu($(this));
    });
    $("#entertainment").click(function () {
        category = 'entertainment';
        activeMenu($(this));
    });
    $("#technology").click(function () {
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
        $('li.active').removeClass('active');
        menu.addClass('active');
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

        var card = $('<div>').addClass('card row col-xs-12 col-md-6');

        //card = addImage(card);
        card = addBodyTitle(card);
        card = addDescription(card);
        card = addBodyActions(card);

        return card;

        function addImage(card) {
            if (article.urlToImage) {
                return card.append(
                    $('<img>')
                        .attr('src', article.urlToImage)
                        .attr('alt', article.title)
                        .addClass('card-img-top')
                );
            }
            return card;
        }

        function addBodyTitle(card) {
            return card
                .append(
                    $('<div>')
                        .addClass('col-xs-8 col-md-8')
                        .append($('<h4>').addClass('card-title').append(article.title))
                )
                .append(
                    $('<div>')
                        .addClass('col-xs-4 col-md-4')
                        .append(
                            $('<img>')
                                .attr('src', article.urlToImage? article.urlToImage: 'image/placeholder-image.png')
                                .attr('alt', article.title)
                                .addClass('card-img-top')
                        )
                );
        }

        function addDescription(card) {
            return card
                .append(
                    $('<div>')
                        .addClass('col-xs-12 hide-xs')
                        .append($('<p>').addClass('card-text').append(article.description))
                );
        }

        function addBodyActions(card) {
            return card.append(
                $('<div>')
                    .addClass('col-xs-12 col-md-12')
                    .append($('<h6>').addClass('col-6 card-date')
                        .append(moment(article.publishedAt).fromNow()))
                    .append($('<button>')
                        .append('<i class="material-icons">keyboard_arrow_down</i>')
                        .append('Show more')
                        .addClass('card-button float-right hide-md')
                        .attr('type', 'button'))
                    .click(function () {
                        window.open(article.url, '_blank');
                    })
            );
        }
    }

})();