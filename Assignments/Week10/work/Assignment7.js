var main = function (Users) {
  "use strict";
  var i = 0;
  var k = 0;

  function buildItemEl(user) {
    $('input').val('');
    $('.'+user.id).toggle();
    var $viewButton = $("<button>").text("MakeRemFor/Show " + user.name).on("click", function() {
      $.ajax({
        url: '/users/' + user.id,
        type: 'GET',
        success: function(data, status) {
          var $viewName = $("<p>").text("Name: " + data.name).attr("class", "output");
          var $viewEmail = $("<p>").text("Email: " + data.email).attr("class", "output");
          $(".output").remove();
          $("#details").append($viewName);
          $("#details").append($viewEmail);
          $("#details").toggle();
        }
      });
    });
    
    var $deleteButton = $("<button>").text("Delete " + user.name).on("click", function() {
      $('input').val('');
      $("#details").toggle();
      $.ajax({
        url: '/users/' + user.id,
        type: 'DELETE',
        success: function() {
          $("#user-" + user.id).remove();
          i--;
        }
      });
    });
    
    var $getAll = $("<button>").text(user.id + "'s All Reminders").on("click", function() {
      $("#user-"+user.id).append($getAll); 
      
      var soon = '';
      
      $.ajax({
        url: '/users/' + user.id + '/reminders',
        type: 'get',
        success: function(data, status) {
          data.reminder.forEach(function(data){
            soon += "Reminder: " + data;
            soon += '\n';
          });
          alert(soon);
        }
      });
    });
    
    var $ridAll = $("<button>").text("Remove all Reminders").on("click", function() {
      $("#user-"+user.id).append($getAll); 
      
      var soon = '';
      
      $.ajax({
        url: '/users/' + user.id,
        type: 'DELETE',
        success: function(data) {
          alert("No More Reminders!");
        }
      });
    });
    
    
    var $listEl = $("<li>")
      .attr("id", "user-" + user.id)
      .append($viewButton)
      .append($deleteButton)
      .append($getAll)
      .append($ridAll)
      return $listEl; 
  } 

  var $itemList = $("<ul>").attr("id", "users");
  
  Users.forEach(function(user) {
    $itemList.append(buildItemEl(user));
  });
  
  $("#allUsers").html($itemList);
  
  $("#addNewUser").on("click", function() {
    var newName = $("input[name='name']").val();
    var newEmail = $("input[name='email']").val();
    var newUser = {
      id : i,
      name: newName,
      email: newEmail,
      reminder: []
    }
    
    i++;
    k = 0;
    
    $.ajax({
      url: "/users",
      type: "POST",
      data: JSON.stringify(newUser),
      contentType: "application/json",
      success: function(newUser, status) {
        $itemList.append(buildItemEl(newUser));
      }
    });
  
    $("#addRem").on("click", function(user) {
      var newRem = $("input[name='reminder']").val();
      $('input').val('');
      newUser.reminder.push(newRem);
      
      $.ajax({
        url: '/users/' + user.id +'/reminders',
        type: "POST",
        data: JSON.stringify(newUser),
        contentType: "application/json",
        success: function(data, status) {
          var $rem = $('<p>').text(data[i-1].reminder[k-1]).attr("class", user.id);
          $("#div"+newUser.id).append($rem);
        }
      });
      k++;
    });
  });
}

$(document).ready(function () {
  $.getJSON("/users", function (Users) {
    main(Users);
  });
});
