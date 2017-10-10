var express = require('express');
var app = express();

var port = 5000;
var id = 1;
var test = [
{"suit" : "spades", "rank" : "3"},
{"suit" : "hearts", "rank" : "ace"},
{"suit" : "diamonds", "rank" : "10"},
{"suit" : "clubs", "rank" : "7"}
]
var fs = require("fs");
 
app.get('/', function(request, response) {
  response.end("id: " + id);
});

app.get('/hands/cards', function(request, response) {
  response.status(200);
  response.end("id: " + id + "\n\n" + "cards: " + fs.readFileSync('moretest.JSON'));
});

app.listen(port, function() {
  console.log('Node app is running on port', port);
});
