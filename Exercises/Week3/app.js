$(".comment-input button").on("click", function() {
  var $comment_text = $(".comment-input input");
  
    if($comment_text.val() !== "") {
      var $new_comment = $("<p>");
      $new_comment.text($comment_text.val());
      $new_comment.fadeIn();
      $(".comments").append($new_comment);
      $comment_text.val("");
    }
});