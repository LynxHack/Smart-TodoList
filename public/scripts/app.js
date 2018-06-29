$(document).ready(function() {

  // This function is for creating cards for each todo
  function createTodoElement(todoObject) {

    return card = "<div class=\"card\" id=\"" + todoObject.todo_name + "\">" +
                    "<img class=\"card-img-top\" src=\"" + todoObject.img_url + "\"/>" +
                    "<div class=\"card-body\">" +
                      "<h4 class=\"card-title\">" + todoObject.todo_name + "</h4>" +
                      "<p class=\"card-text\">Dummie Text</p>" +
                      "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
                      "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
                    "</div>" +
                  "<div>" ;


  }

  function appendCard() {
    console.log($(".new_todo_input").val());
    if($(".new_todo_input").val()){
      console.log("here");
      $(".movies").append(createTodoElement({}));
    } else {
      console.log("there");
    }
  }

  $(".btn_submit").click(function(e) {
    e.preventDefault();
    appendCard();

    //perform ajax post request
    $.ajax({datatype: "text",
            url: '/todos',
            data: $(".new_todo_input").val(),
            type: 'POST',
            success: function(responseData, textStatus, jqXHR) {
              console.log(responseData);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
    });
  });


  // Delete card
  $(".btn-danger-edit").on('click', function() {
    currCard = ($(this).parent().parent());
    $(".btn_delete_confirmation").click(function(e) {
      currCard.remove();
    });
  });

  $(".btn-info-edit").on('click', function() {
    currCard = ($(this).parent().parent());
    $('.btn-card-update').click(function(e) {
      e.preventDefault();
      // Updating new name if its not empty
      if($("rename_todo").val()){
        currCard.children().children(".card-title").text($("rename_todo").val());
      }

      // Updating is done, if its not done default to red
      var btnVal = $('input[name=optradio]:checked').val();
      if(Number(btnVal) === 1){
        $(currCard.children().children(".is_done_label")).css("border-bottom", "10px lightgreen solid");
      } else {
        $(currCard.children().children(".is_done_label")).css("border-bottom", "10px red solid");
      }
    });
  })


});

































// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
