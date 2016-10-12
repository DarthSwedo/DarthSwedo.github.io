/**
 * Created by DarthSwedo on 18/11/2015.
 */

    /* Api Keys:
    * Yelp: consumerSecret : "6h7W-csoKgMZhnebAKoJq-gKr20",
            accessToken : "nwg-3w9d41D7Sdc25kAJ9jMEnJszaBD2",
            accessTokenSecret : "WMO9_0jGlK4otGT2lJbx_uFHWbU"
    * Google Calendar: AIzaSyCI-puzZPTFKAyi9UMnFzKW1fp3Quuz_24
    *        Client ID: 960904636490-naocur43jquhnpekdkt1q28d6p81luk0.apps.googleusercontent.com
    *        Client Secret: 9MhJUqYL3KOYxwpT2ZcOFYGk
    *
    * Facebook API: App ID: 440975616103185
           *        App secret: 7328e40588e43202cf7e12a70a7e765b
           *        version: v2.5
    * */


var url = "https://api.yelp.com/v2/search?";
var term;
var location;
var name, address, phone, rating, review, imageUrl;
function createURL(location, term){

    var search = url + "term=" + term + "&" + "location=" + location;
    toonData(search);
}



$("#searchButton").click(function(){
   var location = $("#location").val();
    var term = $("#term").val();


    createURL(location,term);
    searchThis(location,term);
    return false;
});
function toonData(url){
    var x = document.getElementById("search");
    console.log(location,term);
console.log(url);
}
function searchThis(location, term){
    if($('#resultaat').children() != null){
        $('#resultaat').children().remove();
    }
    var auth = {
        //
        // Update with your auth tokens.
        //
        consumerKey : "rUq15iyObKN3zMTdAcfc3Q",
        consumerSecret : "M405cc8Vp2kHYBD-Zx5VLG1KziQ",
        accessToken : "IlLdbbmZhYE0HohWrqVcxslTp8eefsfb",
        // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
        // You wouldn't actually want to expose your access token secret like this in a real application.
        accessTokenSecret : "d8a-LWts8NORMYlz6zOQqdQQ6Pk",
        serviceProvider : {
            signatureMethod : "HMAC-SHA1"
        }
    };

    var terms = term;
    var near = location;

    var accessor = {
        consumerSecret : auth.consumerSecret,
        tokenSecret : auth.accessTokenSecret
    };
    parameters = [];
    parameters.push(['term', terms]);
    parameters.push(['location', near]);
    parameters.push(['callback', 'cb']);
    parameters.push(['oauth_consumer_key', auth.consumerKey]);
    parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
    parameters.push(['oauth_token', auth.accessToken]);
    parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

    var message = {
        'action' : 'https://api.yelp.com/v2/search',
        'method' : 'GET',
        'parameters' : parameters
    };
    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);


    var parameterMap = OAuth.getParameterMap(message.parameters);
    console.log(parameterMap);

    $.ajax({
        'url' : message.action,
        'data' : parameterMap,
        'dataType' : 'jsonp',
        'jsonpCallback' : 'cb',
        'success' : function(data, textStats, XMLHttpRequest) {
            console.log(data);
            //$("body").append(output);
            var i = 0;
            $.each(data.businesses, function(key,value){
                i += 1;
                name = value.name;
                imageUrl = value.image_url;
                phone = value.phone;
                rating = value.rating;
                address = value.location.address;
                review = value.review_count;
               listMaker(location, term, name, imageUrl,i, phone, rating, address, review);
            });
        }
    });
}
function listMaker(location, term, name , img,i, phone, rating, address, review){

    var noimage = 'https://www.jordansjobs.com/~/media/Jordans%20Redesign/No-image-found.ashx';
    var content = '<div class="container" id="divList"  onclick="Popupmaker('+i+')">';
    content += '<div class="textList">';
    if(img == null){

        content += '<img class="imageYelp" id="Basisinfo'+i+'" for="' + i + '" src="' + noimage + '">';

    }
    else {

        content += '<img class="imageYelp" src="' + img + '">';

    }
    content += '<h3 class="list" >Name of the venue: '+name+'</h3>';
    content += '<p class="list" name="term" >Type of the venue: '+term+'</p>';
    content += '<p class="list" name="location" >Location of the venue:'+location+'</p>';
    content += '<p class="list" id="Address' + i + '"name="address">Address venue:' + address + '</p>';
    content += '<p class="list" id="Telefoon' + i + '"name="phone">Phone venue:' + phone + '</p>';
    content += '</div>';
    content += '</div>';
        var x = document.getElementById('resultaat');
    x.style.display = 'block';
    $('#resultaat').append(content);
}
function Popupmaker(i){

    $('.popupContainer').show();
    var phoneInfo = $('#phoneInfo' + i).val();
    var ratingInfo = $('#ratingInfo' + i).val();
    var nameInfo = $('#nameInfo' + i).val();
    var reviewInfo = $('#reviewInfo' + i).val();
    var addressInfo = $('#addressInfo' + i).val();
    var termInfo = $('#termInfo' + i).val();
    var locationInfo = $('#locationInfo' + i).val();
    $('.popupContainer').css('display', 'block');
   var popupContent = '<div id="popupDiv" class="popupTest">';
    popupContent += '<div><input type="submit" value="Go back" id="goback" onclick="removePopup();"></div>';
    popupContent += '<h1 class="popupHeader">Name Venue: ' + nameInfo +'</h1>';
    popupContent += '<p>Type of venue: ' + termInfo +'</p>';
    popupContent += '<p>Location: ' + locationInfo +'</p>';
    popupContent += '<p>Phone: ' + phoneInfo +'</p>';
    popupContent += '<p>Rating: '+ ratingInfo +'/5</p>';
    popupContent += '<p>Review: ' + reviewInfo +'/5</p>';
    popupContent += '<p>Address: ' + addressInfo +'</p>';
    popupContent += '<label for="titleEvent">Title event: </label>';
    popupContent += '<input type="text" id="title"></br>';
    popupContent += '<label for="description">Description event: </label>';
    popupContent += '<input type="text" id="description"></br>';
    popupContent += '<label for="meeting"">Meeting Date: </label></br>';
    popupContent += ' From: <input id="meeting1" type="date" value="2015-08-07"><input value="08:00" type="time" name="time" id="time1" maxlength="8"></br>';
    popupContent += ' Till: <input id="meeting2" type="date" value="2015-08-09"><input value="08:00" type="time" id="time2" name="time" maxlength="8"></br>';
    popupContent += '<input type="submit" class="addToCalendar" value="Get info ready" onclick="addToCalendar();">';
    popupContent += '<div title="Add to Calendar" class="addeventatc" data-direct="google">';
    popupContent += '<span class="start"></span>';
    popupContent += '<span class="end"></span>';
    popupContent += '<span class="timezone">Europe/Brussels</span>';
    popupContent += '<span class="title"></span>';
    popupContent += '<span class="description"></span>';
    popupContent += '<span class="location"></span>';
    popupContent += '<span class="date_format">MM/DD/YYYY</span>';
    popupContent += '<div>' + addeventatc.settings({
        license: "AIzaSyCI-puzZPTFKAyi9UMnFzKW1fp3Quuz_24",
        css : false,
    });
    + '</div>';
        popupContent += '</div>';


    $('.popupContainer').append(popupContent);
}

function addToCalendar() {
    var location = $('#location').val();
    var description = $('#description').val();
    var title = $('#title').val();

    var datum1 = $('#meeting1').val();
    var datum2 = $('#meeting2').val();

    var time1 =$('#time1').val();
    var time2 =$('#time2').val();

    var date1 = datum1 + " " + time1;
    var date2 = datum2 + " " + time2;
    console.log(date1 + date2);
    $('.start').text(date1);
    $('.end').text(date2);
    $('.title').text(title);
    $('.description').text(description);
    $('.location').text(location);
    $('.addToCalendar').css('display','none');
    $('.addeventatc').css('display','inline-block');
}


function kalenderInfo(i){

    var nameInfo = $('#nameInfo' + i).val();
    var phoneInfo = $('#phoneInfo' + i).val();
    var addressInfo = $('#addressInfo' + i).val();
    var termInfo = $('#termInfo' + i).val();
    var locationInfo = $('#locationInfo' + i).val();


      var kalenderContent = '<div class="calendar">';
    var location = $('#location').val();
    var description = $('#description').val();
    var title = $('#title').val();
    var datum1 = $('#meeting1').val();
    var datum2 = $('#meeting2').val();
    var time1 =$('#time1').val();
    var time2 =$('#time2').val();
        kalenderContent += '<div title="Add to Calendar" class="addeventatc" data-direct="google"></div>';

    //functie voor het toevoegen van een event
    kalenderContent += addeventatc.settings({
       license: "AIzaSyCI-puzZPTFKAyi9UMnFzKW1fp3Quuz_24",
       css : false
    });
    var date1 = datum1 + " " + time1;
    var date2 = datum2 + " " + time2;
    console.log(date1 + " " + date2);

    kalenderContent += '<span class="start">'+date1+'</span>';
    kalenderContent += '<span class="end">'+date2+'</span>';
    kalenderContent += '<span class="timezone">Europe/Brussels</span>';
    kalenderContent += '<span class="title">'+title+'</span>';
    kalenderContent += '<span class="description">'+description+'</span>';
    kalenderContent += '<span class="location">'+location+'</span>';
    kalenderContent += '<span class="date_format">MM/DD/YYYY</span>';
    kalenderContent += '</div>';
    kalenderContent += '</div>';


    $('.popupContainer').css('display', 'none');
    $('.kalenderInfo').css('display', 'block');
   // $('.addeventatc').css('display', 'block');

    $('.kalenderInfo').append(kalenderContent);

}
function removePopup(){
    console.log("ait");
    $('.popupTest').remove();
    $('.popupContainer').hide();
}
$(document).ready(function(){
    $('#goback').click(function () {
        console.log("ait");
        $('.popupContainer').remove();
    });
});
