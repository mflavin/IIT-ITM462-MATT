$.getJSON("hand.json", function(cards) {
  var PossibleRanks = ["ace", "two", "three", "four", "five", "six", 
                        "seven", "eight", "nine", "ten", "jack", "queen", "king"];
  
  var inHand = cards.map(function (hand) {
    return hand.rank;
  });

  var temp = 0;
  for(var i = 0; i < PossibleRanks.length; i++) {
    var pairs = 0;
    var checking = [];
    var kek = PossibleRanks[i];
    var holder = inHand.indexOf(kek);
    while(holder !== -1){
       checking.push(holder);
       holder = inHand.indexOf(kek, holder + 1);
    }
    console.log(checking);
    
    if(checking.length === 2) {
      pairs++;
      temp = temp + pairs;
      if(temp === 2) {
        console.log("You have two pairs");
      }else {
        console.log("Hey, You have a Pair!");
      }
    }
  }
});