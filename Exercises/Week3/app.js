$(".comment-input button").on("click",  function () {
      var $newP = $("<p>");
      $newP.text("My New Element");
      $(".comments").append($newP);
});