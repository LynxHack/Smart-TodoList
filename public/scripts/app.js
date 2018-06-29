$(document).ready(function() {


  // This function is for creating cards for each todo
  function createTodoElement(todoObject) {

    return card = "<div class=\"card\">" +
                  "<img class=\"card-img-top\" src=\"http://via.placeholder.com/80x60\"/>" +
                  "<div class=\"card-body\">" +
                    "<h4 class=\"card-title\">Placeholder</h4>" +
                    "<p class=\"card-text\">Dummie Text</p>" +
                    "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
                    "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
                  "</div>" +
                "<div>" ;


  }

  function appendCard() {
    $(".movies").append(createTodoElement({}));
  }

  $(".btn_submit").click(function() {
    appendCard();
  });


  //console.log(createTodoElement({}));
  // End of createTodoElement
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
