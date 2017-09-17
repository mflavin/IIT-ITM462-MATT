$.getJSON("hand.json", function(cards) {
  var PossibleRanks = ["ace", "two", "three", "four", "five", "six", 
                        "seven", "eight", "nine", "ten", "jack", "queen", "king"];
                        
  var PossibleSuits = ["Diamonds", "Hearts", "Spades", "Clubs"];
  
  //Maps the hand into new variable
  var inHandRanks = cards.map(function (hand) {
    return hand.rank;
  });
  
  //Maps the hand into new variable
  var inHandSuits = cards.map(function (hand) {
    return hand.suit;
  });
  
  //Checks it there is a pair or a three of a kind
  var lengthThree = 0;
  var lengthPair = 0;
  
  //Compares the inHandRanks to PossibleRanks to see if there is a match
  for(var i = 0; i < PossibleRanks.length; i++) {
    var pairs = 0;
    var checkingRanks = [];
    var spot = PossibleRanks[i];
    var holder = inHandRanks.indexOf(spot);
    while(holder !== -1){
       checkingRanks.push(holder);
       holder = inHandRanks.indexOf(spot, holder + 1);
    }
    
    //Checks for pairs
    if(checkingRanks.length == 2) {
      pairs++;
      lengthPair += pairs;
      if(lengthPair == 2) {
        console.log("A Two Pair was Found!");
      }
    }
    
    //Checks for Three of a Kind
    if(checkingRanks.length === 3) {
      console.log("A Three of a Kind Found!");
      lengthThree = checkingRanks.length;
    }
    //Checks for Four of a Kind
    if(checkingRanks.length === 4) {
      console.log("A Four of a Kind Found!");
    }
    //Checks for a Full House
    if((lengthPair === 1) && (lengthThree === 3)) {
      console.log("A Full House was Found!");
      lengthPair = 0;
      lengthThree = 0;
    }
  }
  
  //Checks for a Flush
  for(var i = 0; i < PossibleSuits.length; i++) {
    var checkingSuits = [];
    var spot = PossibleSuits[i];
    var holder = inHandSuits.indexOf(spot);
    while(holder !== -1) {
      checkingSuits.push(holder);
      holder = inHandSuits.indexOf(spot, holder + 1);
    }
    
    //Checks to see if all of the cards in hand are the same suit
    if(checkingSuits.length - 1 === PossibleSuits.length) {
      console.log("A Flush was Found!");
    }
  }
});