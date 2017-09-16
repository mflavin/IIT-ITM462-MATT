$.getJSON("hand.json", function(card) {
  var $PossibleRanks = ["ace", "two", "three", "four", "five", "six", 
                        "seven", "eight", "nine", "ten", "jack", "queen", "king"];
  var $ranks;
  var $match = false;
  
  $ranks = hand.map(function (cardRank) {
    return card.rank;
  });
  
  $ranks.forEach(function ($ranks) {
    if(containsNTimes(PossibleRanks, ranks, 2)) {
      $match = true;
    }
    
    console.log("A pair has been found!");
  };
  
});