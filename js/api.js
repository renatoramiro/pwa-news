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
        for (var i = 0; i < data.articles.length; ++i) {
            divNews.append(getNewsHtml(data.articles[i]));
        }
    }

    $("#headline").click(function () {
        category = null;
        search = null;
        $("#search").val('');
        getNews();
    });
    $("#health").click(function () {
        category = 'health';
        search = null;
        getNews();
    });
    $("#sports").click(function () {
        category = 'sports';
        search = null;
        getNews();
    });
    $("#entertainment").click(function () {
        category = 'entertainment';
        search = null;
        getNews();
    });
    $("#technology").click(function () {
        category = 'technology';
        search = null;
        getNews();
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

    function setMenuTitle(text) {
        $('#menu-title').text(text);
    }

    function getCategory() {
        if (category) {
            setMenuTitle(category);
            return '&category=' + category
        }
        setMenuTitle('headline');
        return '';
    }

    function getSearch() {
        if (search) {
            setMenuTitle('Search');
            return '&q=' + search
        }
        return '';
    }

    function getNewsHtml(article) {
        return $('<div>')
            .addClass('card')
            .append(
                $('<div>')
                    .append(
                        $('<div>')
                            .append($('<img>').attr('src', article.urlToImage))
                            .append(
                                $('<div>')
                                    .append($('<p>').append(article.title))
                                    .append(
                                        $('<div>')
                                            .append($('<p>').append(article.author))
                                            .append(
                                                $('<div>').append(
                                                    $('<p>').append(moment(article.publishedAt).fromNow())
                                                )
                                            )
                                    )
                            )
                    )
                    .append(
                        $('<div>')
                            .append($('<button>').append('Read Article'))
                            .click(function () {
                                window.open(article.url, '_blank');
                            })
                    )
                    .append($('<p>').append(article.description))
            );
    }

})();