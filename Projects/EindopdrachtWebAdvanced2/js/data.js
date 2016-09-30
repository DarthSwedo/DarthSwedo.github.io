/**
 * Created by DarthSwedo on 23/01/2016.
 */
var apiKey = 'NO_API_KEY';
var amount;
jQuery.ajaxSettings.traditional = true;
function fetchNews(artist, highRelevance) {
    var url = 'http://developer.echonest.com/api/v4/artist/news';
    $("#results").hide();
    var args = {
        format:'json',
        api_key: apiKey,
        name: artist,
        results: amount
    };
    info("Fetching the news for " + artist);
    $.getJSON(url, args,
        function(data) {
            $("#results").empty();
            if (! ('news' in data.response)) {
                error("Can't find any news for " + artist);
            } else {
                $("#results").show();
                var titles = {}
                $.each(data.response.news, function(index, news) {
                    if (! (news.name in titles)) {
                        var div = formatNews(news);
                        $("#results").append(div);
                        titles[news.name] = 1;
                    }
                });
                info("Showing " + data.response.news.length + " of " + data.response.total + " news items for " + artist);
            }
        },
        function() {
            error("Trouble getting news for " + artist);
        }
    );
}
function formatNews(news) {
    var div = $("<div class='news well'>");
    div.append($("<h4>").html(news.name));
    var date = "";
    if ('date_posted' in news) {
        date = "<i>" + news.date_posted.substring(0,10) + '</i> ';
    }
    div.append($("<p>").html(date + news.summary + " ..." ));
    var link = $("<a>");
    link.attr('href', news.url);
    link.text("full story on " + getSource(news.url));
    div.append(link);
    return div;
}
function go() {
    var artist = $.trim($("#artist").val());
    amount = document.getElementById('result').value;
    if (artist.length > 0 && amount <= 100) {
        var relevance = $("#relevant").is(':checked');
        fetchNews(artist, relevance);
    } else {
        info("Type an artist name first");
        info("Please choose between 0-100 results");
    }
}
function getSource(url) {
    var path = url.split('/');
    return path[2]	;
}
function info(s) {
    $("#info").removeClass();
    if (s.length > 0) {
        $("#info").addClass("alert alert-info");
    }
    $("#info").text(s);
}
function error(s) {
    $("#info").removeClass();
    if (s.length > 0) {
        $("#info").addClass("alert alert-error");
    }
    $("#info").text(s);
}

$(document).ready(function() {
    // fetchApiKey will fetch the Echo Nest demo key for demos
    // hosted on The Echo Nest, otherwise it fetch an empty key
    api_key = 'RUUIRW2QSRYZYMDIV';
    apiKey = api_key;
    $.ajaxSetup({ cache: false });
    $("#all_results").hide();
    $("#go").click(go);
    $("#artist").change(go);
});
