function max() {
  var maximum = [829, 1235, 1738, 404, 697];
  var length = maximum.length;
  var first = maximum[0];
  
  for(var i= (length-1); i >= 0; i--) {
    if(maximum[i] > first) {
      first = maximum[i];
    }
  }
  
  console.log(first);
}