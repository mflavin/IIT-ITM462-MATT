$.getJSON("javascripts/aceOfSpades.json", function(card) {
  var $addJSON = $("<p>");
  $addJSON.text(card.rank + " of " + card.suit);
  $("main").append($addJSON);
});

$.getJSON("javascripts/hand.json", function(hand) {
  var $addHand = $('<ul>');

  hand.forEach(function(card) {
    var $cardLi = $("<li>");
    $cardLi.text(card.rank + " of " + card.suit);
    $addHand.append($cardLi);
  });
  $("main").append($addHand);
});

$.getJSON("https://www.flickr.com/services/feeds//photos_public.gne?tags=dogs&format=json&jsoncallback=?", function(flickrResponse) {
  flickrResponse.items.forEach(function(item) {
    var $img = $("<img>").hide();
    $img.attr("src", item.media.m);
    $("main").append($img);
    $img.fadeIn(2000);
  });
});




