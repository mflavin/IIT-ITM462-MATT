$.getJSON("hand.json", function(cards) {
  var $PossibleRanks = ["ace", "two", "three", "four", "five", "six", 
                        "seven", "eight", "nine", "ten", "jack", "queen", "king"];
  
  var $inHand = cards.map(function (hand) {
    return hand.rank;
  });
  
  $PossibleRanks.forEach(function(rank) {
    var i = $inHand.length - 1;  
    for(i; i >= 0; i--) {
      var p = $PossibleRanks.length - 1;
      for(p; p >= 0; p--) {
        if($inHand[i] === $PossibleRanks[p]) {
          console.log($inHand[i] + " " + $PossibleRanks[p]);
          console.log("MATCH!");
        }
      }
    }
  });
});
