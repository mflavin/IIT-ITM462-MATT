var express = require('express');
var app = express();
var fs = require("fs"); 

var port = 5000;
var newhand = {"id" : 17 , "cards" : [
  {"suit" : "hearts", "rank" : "2"},
  {"suit" : "clubs", "rank" : "7"},
  {"suit" : "diamonds", "rank" : "3"},
  {"suit" : "diamonds", "rank" : "8"},
  {"suit" : "hearts", "rank" : "q"}
]}

var updatehand = {"id" : 38, "cards" : [
  {"suit" : "clubs", "rank" : "9"},
  {"suit" : "diamonds", "rank" : "8"},
  {"suit" : "spades", "rank" : "6"},
  {"suit" : "hearts", "rank" : "j"},
  {"suit" : "clubs", "rank" : "7"}
]}

var hand = JSON.parse(fs.readFileSync('morehand.JSON'));
 
app.get('/hands/' + hand.id, function(request, response) {
  if(hand !== ' ') {
    response.status(200).end(JSON.stringify({id: hand.id, cards: hand.cards}, null, ' '));
  }
  else {
    response.status(404).end("Hand Not Found");
  } 
});

app.get('/hands/' + hand.id + '/cards', function(request, response) {
  if(hand !== ' ') {
    response.status(200).end(JSON.stringify({cards: hand.cards}, null, ' '));
  }
  else {
    response.status(404).end("Hand Not Found");
  }
});

app.post('/hands', function(request, response) {
  fs.writeFileSync('./newhand.json', JSON.stringify(newhand));
  response.status(200).end(JSON.stringify({id: 12}, null, '\t'));
});

app.put('/hands/' + hand.id, function(request, response) {
  fs.writeFileSync('./newhand.json', JSON.stringify(updatehand));
  response.status(204).end();
});

app.listen(port, function() {
  console.log('Node app is running on port', port);
});