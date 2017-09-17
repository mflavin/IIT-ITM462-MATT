$.getJSON("hand.json", function(cards) {
  var PossibleRanks = ["ace", "two", "three", "four", "five", "six", 
                        "seven", "eight", "nine", "ten", "jack", "queen", "king"];
                        
  var PossibleSuits = ["Diamonds", "Hearts", "Spades", "Clubs"];
  
  var inHandRanks = cards.map(function (hand) {
    return hand.rank;
  });
  
  var inHandSuits = cards.map(function (hand) {
    return hand.suit;
  });
  
  var temp = 0;
  for(var i = 0; i < PossibleRanks.length; i++) {
    var pairs = 0;
    var checkingRanks = [];
    var spot = PossibleRanks[i];
    var holder = inHandRanks.indexOf(spot);
    while(holder !== -1){
       checkingRanks.push(holder);
       holder = inHandRanks.indexOf(spot, holder + 1);
    }
    console.log(checkingRanks);
    
    if(checkingRanks.length >= 2) {
      pairs++;
      temp += pairs;
      if(temp == 2) {
        console.log("A Two Pair was Found!");
      }
    }
    if(checkingRanks.length === 3) {
      console.log("A Three of a Kind Found!");
    }
    if(checkingRanks.length === 4) {
      console.log("A Four of a Kind Found!");
    }
  }
  
  //Flush
  //Full House
  for(var i = 0; i < PossibleSuits.length; i++) {
    var checkingSuits = [];
    var spot = PossibleSuits[i];
    var holder = inHandSuits.indexOf(spot);
    while(holder !== -1) {
      checkingSuits.push(holder);
      holder = inHandSuits.indexOf(spot, holder + 1);
    }
    
    if(checkingSuits.length - 1 === PossibleSuits.length) {
      console.log("A Flush was Found!");
    }
  }
});