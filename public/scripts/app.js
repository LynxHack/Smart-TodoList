// $(document).ready(function() {

  // 1 : 'media_todos',
  // 2 : 'restaurant_todos',
  // 3 : 'book_todos',
  // 4 : 'product_todos'
  // This function is for creating cards for each todo
  function createTodoElement(todoObject) {
    switch (todoObject.type_id){
      case 1: 
        return card = "<div class=\"card\">" +
        "<div class=\"card-imgbox\"><img class=\"card-img-top\" src=" + todoObject.img +"></div>" +
        "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">Placeholder</h4>" +
          "<p class=\"card-text\">Dummie Text</p>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
        "</div>" +
      "<div>" ;
      
      case 2:
        return card = "<div class=\"card\">" +
        "<div class=\"card-imgbox\"><img class=\"card-img-top\" src=" + todoObject.defaultimage +"></div>" +
        "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">" + todoObject.name + "</h4>" +
          "<p class=\"card-text\">" + todoObject.location + "</p>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
        "</div>" +
      "<div>" ;

      case 3:
        return card = "<div class=\"card\">" +
        "<div class=\"card-imgbox\"><img class=\"card-img-top\" src=" + todoObject.img +"></div>" +
        "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">" + todoObject.name + "</h4>" +
          "<p class=\"card-text\">Dummie Text</p>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
        "</div>" +
      "<div>" ;

      case 4:
      return card = "<div class=\"card\">" +
      "<img class=\"card-img-top\" src=\"http://via.placeholder.com/80x60\"/>" +
      "<div class=\"card-body\">" +
        "<h4 class=\"card-title\">Placeholder</h4>" +
        "<p class=\"card-text\">Dummie Text</p>" +
        "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
        "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
      "</div>" +
    "<div>" ;

      default:
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
  }

  // 1 : 'media_todos',
  // 2 : 'restaurant_todos',
  // 3 : 'book_todos',
  // 4 : 'product_todos'
  function appendCard(todoObject) {
    switch (todoObject.type_id){
      case 1: $(".movies").append(createTodoElement(todoObject)); break;
      case 2: $(".food").append(createTodoElement(todoObject)); break;
      case 3: $(".books").append(createTodoElement(todoObject)); break;
      case 4: $(".products").append(createTodoElement(todoObject)); break;
    
    }
  }

  // $(".btn_submit").click(function() {
  //   appendCard();
  // });


  //console.log(createTodoElement({}));
  // End of createTodoElement
// });




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
