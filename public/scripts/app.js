// $(document).ready(function() {

  // This function is for creating cards for each todo
  function createTodoElement(todoObject) {

    return card = "<div class=\"card\" id=\"" + todoObject.todo_name + "\">" +
                    "<img class=\"card-img-top\" src=\"" + "http://via.placeholder.com/80x60" + "\"/>" +
                    "<div class=\"card-body\">" +
                      "<h4 class=\"card-title\">" + todoObject.todo_name + "</h4>" +
                      "<p class=\"card-text\">Dummie Text</p>" +
                      "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
                      "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
                      "<label class=\"is_done_label\"> </label>"
                    "</div>" +
                  "<div>" ;


  }

  function appendCard(text) {
    console.log($(".new_todo_input").val());
    if(text){
      console.log(text);
      $(".movies").append(createTodoElement({}));
    } else {
      console.log("there");
    }
  }


   $('.alert').hide();

  $(".btn_submit").click(function() {
    //perform ajax post request
    console.log($(".new_todo_input").val());
    var textboxval = $(".new_todo_input").val();
    appendCard(textboxval);

    const usercoordinate = navigator.geolocation.getCurrentPosition((position) => {
      const lat  = position.coords.latitude;
      const long = position.coords.longitude;
      $.ajax({datatype: "json",
      url: '/todos',
      data: {text: textboxval,lat: lat , long: long},
      type: 'POST',
      success: function(responseData, textStatus, jqXHR) {
          appendCard(textboxval);
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
      }
    });

    $('.btn_submit').removeAttr("data-dismiss");
      if(!$(".new_todo_input").val()){
        $('.alert').show();
      } else {
        $(".alert").hide();
        $(".new_todo_input").val("");
        $('.btn_submit').attr("data-dismiss", "modal");
      }
  });
    switch (todoObject.type_id){
      case 1:
        return card = "<div class=\"card\">" +
        "<img class=\"card-img-top\" src=\"http://via.placeholder.com/80x60\"/>" +
        "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">Placeholder</h4>" +
          "<p class=\"card-text\">Dummie Text</p>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
        "</div>" +
      "<div>" ;

      case 2:
        return card = "<div class=\"card\">" +
        "<img class=\"card-img-top\" src=\"http://via.placeholder.com/80x60\"/>" +
        "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">Placeholder</h4>" +
          "<p class=\"card-text\">Dummie Text</p>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
        "</div>" +
      "<div>" ;

      case 3:
        return card = "<div class=\"card\">" +
        "<img class=\"card-img-top\" src=\"http://via.placeholder.com/80x60\"/>" +
        "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">Placeholder</h4>" +
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
    }
  }

  function appendCard(todoObject) {
    $(".movies").append(createTodoElement(todoObject));
  }

  // $(".btn_submit").click(function() {
  //   appendCard();
  // });

  var currCardId;
  var currCard;
  function editEvents(cate) {

    // danger/delete button clicked
    $("." + cate).on('click', '.btn-danger-edit', function(e) {
      e.preventDefault();
      $('#myModal_delete').modal();
      var currCardDelete = $(this).closest(".card");
      $(".btn_delete_confirmation").on('click', function(e) {
        currCardDelete.remove();
        //$('#' + cardId).remove();
      });
    });

    // info/edit button clicked
    $("." + cate).on('click', ".btn-info-edit", function(e) {
      e.preventDefault();
      $('#myModal_card_edit').modal();

      currCardId = '#' + e.currentTarget.parentElement.parentElement.id;
      currCard = $(currCardId);

        $('.btn-card-update').click(function(e) {
        // Updating new name if its not empty
        if($(".rename_todo").val()){
          currCard.find('.card-title').text($(".rename_todo").val());
        }

        // Updating is_done, if its not done default to red
        var btnVal = $('input[name=optradio]:checked').val();
        console.log(btnVal);
        if(Number(btnVal) === 1){
          $(currCard.find(".is_done_label")).css("border-bottom", "10px lightgreen solid");//toggleclass
          //currCard.parent().remove(cur);
          currCard.parent().append(currCard);
        } else if(Number(btnVal) === 2) {
          $(currCard.find(".is_done_label")).css("border-bottom", "10px red solid");
        } else {
        }

        // Updating category
        var selectionResult = $('.form-control option:selected').val();
        switch(selectionResult){
          case "movie_sele":
            $("div.movies").append(currCard);
            break;
          case "product_sele":
            $("div.products").append(currCard);
            break;
          case "book_sele":
            $("div.books").append(currCard);
            break;
          case "food_sele":
            $("div.food").append(currCard);
            break;
          default:
            break;
        }

        // Clear out fields
        $(".rename_todo").val("");
        $(".is_done_label").prop('checked', false);
        $('.form-control').val("");
      });

    });

      // hide alert upon click events
    $("." + cate).on('click', ".close", function() {
      $(".alert").hide();
    });

    $("." + cate).on('click', ".btn_add_close", function() {
      $(".alert").hide();
    });

  }

  editEvents('movies');
  editEvents('products');
  editEvents('books');
  editEvents('food');


  // $('.movies').on('click', ".card", function(e) {
  //   e.preventDefault();

  //   editEvents('movies', $(this).attr("id"));
  // })
  // $('.products').on('click', function(e) {
  //   e.preventDefault();

  //   editEvents($(this).attr("class"), $(this).children().attr("id"));
  // })
  // $('.books').on('click', function(e) {
  //   e.preventDefault();

  //   editEvents($(this).attr("class"), $(this).children().attr("id"));
  // })
  // $('.food').on('click', function(e) {
  //   e.preventDefault();

  //   editEvents($(this).attr("class"), $(this).children().attr("id"));
  // })

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
