$(document).ready(function () {
  $.ajax({
    datatype: "json",
    url: '/todos',
    type: 'GET',
    success: function (responseData, textStatus, jqXHR) {
      responseData.result.forEach((x) => { appendCard(x) });
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    }
  });
  // 1 : 'media_todos',
  // 2 : 'restaurant_todos',
  // 3 : 'book_todos',
  // 4 : 'product_todos'
  // This function is for creating cards for each todo
  function createTodoElement(todoObject) {
    console.log(todoObject);
    let is_done_footer = "<label class=\"is_done_label border_red\"></label>";
    console.log(todoObject.is_done);
    if (todoObject.is_done) {
      is_done_footer = "<label class=\"is_done_label border-green\"></label>";
    }
    switch (todoObject.types_id) {
      case 1:
        return card = "<div class=\"card\" id=\"" + todoObject.hash + "\">" +
          "<div class=\"card-imgbox\"><a target=\"_blank\" href=\"https://www.rottentomatoes.com/search/?search=" + todoObject.name + "\"><img class=\"card-img-top\" src=" + todoObject.img + "></a></div>" +
          "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">" + todoObject.name + "</h4>" +
          "<ul class=\"list-group list-group-flush\">" +
          "<li class=\"list-group-item\"> Nearest Location: " + todoObject.address + "</li>" +
          "<li class=\"list-group-item\"> Ratings: " + todoObject.rating + "/10</li>" +
          "</ul>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
          is_done_footer +
          "</div>" +
          "<div>";

      case 2:
        return card = "<div class=\"card\" id=\"" + todoObject.hash + "\">" +
          "<div class=\"card-imgbox\"><a href=\"" + todoObject.website + "\" target=\"_blank\"><img class=\"card-img-top\" src=" + todoObject.img + "></a></div>" +
          "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">" + todoObject.name + "</h4>" +
          "<ul class=\"list-group list-group-flush\">" +
          "<li class=\"list-group-item\"> Nearest Location: " + todoObject.address + "</li>" +
          "<li class=\"list-group-item\"> Ratings: " + todoObject.rating + "/5</li>" +
          "</ul>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
          is_done_footer +
          "</div>" +
          "<div>";

      case 3:
        return card = "<div class=\"card\" id=\"" + todoObject.hash + "\">" +
          "<div class=\"card-imgbox\"><a href=\"https://www.google.com/search?tbm=bks&q=" + todoObject.name + "\" target=\"_blank\"><img class=\"card-img-top\" src=" + todoObject.img + "></a></div>" +
          "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">" + todoObject.name + "</h4>" +
          "<ul class=\"list-group list-group-flush\">" +
          "<li class=\"list-group-item\"> Author: " + todoObject.author + "</li>" +
          "<li class=\"list-group-item\"> Ratings: " + todoObject.rating + "/5.00</li>" +
          "<li class=\"list-group-item\"> Category: Books </li>" +
          "</ul>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
          is_done_footer +
          "</div>" +
          "<div>";

      case 4:
        return card = "<div class=\"card\">" +
          "<div class=\"card-imgbox\"><img class=\"card-img-top\" src=" + todoObject.img + "></div>" +
          "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">" + todoObject.name + "</h4>" +
          "<ul class=\"list-group list-group-flush\">" +
          "<li class=\"list-group-item\"> Price: &#x24;" + todoObject.price + "</li>" +
          "<li class=\"list-group-item\"> Ratings: " + todoObject.rating + "/5.00</li>" +
          "</ul>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
          is_done_footer +
          "</div>" +
          "<div>";

      default:
        return card = "<div class=\"card\">" +
          "<img class=\"card-img-top\" src=\"http://via.placeholder.com/80x60\"/>" +
          "<div class=\"card-body\">" +
          "<h4 class=\"card-title\">Placeholder</h4>" +
          "<p class=\"card-text\">Dummie Text</p>" +
          "<button class=\"btn btn-info btn-info-edit\">Edit</button>" +
          "<button class=\"btn btn-danger btn-danger-edit\">Delete</button>" +
          is_done_footer +
          "</div>" +
          "<div>";
    }
  }


  // 1 : 'media_todos',
  // 2 : 'restaurant_todos',
  // 3 : 'book_todos',
  // 4 : 'product_todos'
  function appendCard(todoObject) {
    switch (todoObject.types_id) {
      case 1: $(".movies").append(createTodoElement(todoObject)); break;
      case 2: $(".food").append(createTodoElement(todoObject)); break;
      case 3: $(".books").append(createTodoElement(todoObject)); break;
      case 4: $(".products").append(createTodoElement(todoObject)); break;
    }
  }

  $('.alert').hide();

  $(".btn_submit").click(function () {
    //perform ajax post request
    var textboxval = $(".new_todo_input").val();
    const usercoordinate = navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      $.ajax({
        datatype: "json",
        url: '/todos',
        data: { text: textboxval, lat: lat, long: long },
        type: 'POST',
        success: function (responseData, textStatus, jqXHR) {
          appendCard(responseData);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
        }
      });


    });

    $('.btn_submit').removeAttr("data-dismiss");
    if (!$(".new_todo_input").val()) {
      $('.alert').show();
    } else {
      $(".alert").hide();
      $(".new_todo_input").val("");
      $('.btn_submit').attr("data-dismiss", "modal");
    }
  })

  var currCardId;
  var currCard;

  function editEvents(cate) {

    // danger/edit button clicked
    $("." + cate).on('click', '.btn-danger-edit', function (e) {
      e.preventDefault();
      $('#myModal_delete').modal();
      var currCardDelete = $(this).closest(".card");
      $(".btn_delete_confirmation").on('click', function (e) {
        currCardDelete.remove();
        console.log(currCardDelete.attr('id'));
        $('#' + currCardDelete.attr('id')).remove();
        $.ajax({
          datatype: "json",
          url: '/todos/' + currCardDelete.attr('id'),
          type: 'DELETE',
          success: function (responseData, textStatus, jqXHR) {
            console.log("Successfully deleted!");
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
      });
    });

    // info/delete button clicked
    $("." + cate).on('click', ".btn-info-edit", function (e) {
      e.preventDefault();
      $('#myModal_card_edit').modal();

      currCardId = e.currentTarget.parentElement.parentElement.id;
      currCard = $('#' + currCardId);

      $('.btn-card-update').click(function (e) {
        // Updating is_done, if its not done default to red
        var btnVal = $('input[name=optradio]:checked').val();
        console.log(btnVal);
        if (Number(btnVal) === 1) {
          $(currCard.find(".is_done_label")).css("border-bottom", "10px lightgreen solid"); //toggleclass
          //currCard.parent().remove(cur);
          console.log(currCardId);
          currCard.parent().append(currCard);
          $.ajax({
            datatype: "json",
            url: '/todos/' + currCardId + "/isdone",
            type: 'POST',
            success: function (responseData, textStatus, jqXHR) {
              console.log("Successfully set done state!");
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
            }
          });
        }
        else if (Number(btnVal) === 2) {
          $(currCard.find(".is_done_label")).css("border-bottom", "10px red solid");
          $.ajax({
            datatype: "json",
            url: '/todos/' + currCardId + "/isdone",
            type: 'POST',
            success: function (responseData, textStatus, jqXHR) {
              console.log("Successfully set done state!");
            },
            error: function (jqXHR, textStatus, errorThrown) {
              console.log(errorThrown);
            }
          });
        }
        else {
        }


        // // Updating new name if its not empty
        // if($(".rename_todo").val()){
        //   currCard.find('.card-title').text($(".rename_todo").val());
        // }

        editEvents('movies');
        editEvents('products');
        editEvents('books');
        editEvents('food');

        // Updating category if it's different from current category
        var menumap = {
          "movies": "movie_sele",
          "products": "product_sele",
          "books": "book_sele",
          "food": "food_sele"
        }

        var inversemap = {
          "movie_sele": "movie_tv",
          "product_sele": "product",
          "book_sele": "book",
          "food_sele": "store"
        }

        var catemap = {
          "movies": "movie_tv",
          "products": "product",
          "books": "book",
          "food": "store"
        }

        if (($('.form-control option:selected').val() != "none" && $('.form-control option:selected').val() && $('.form-control option:selected').val() != menumap[cate]) || $(".rename_todo").val()) {
          console.log("making edit request");
          let newname = $(".rename_todo").val() ? $(".rename_todo").val() : currCard[0].innerText.split('\n')[1];
          let newcate = $('.form-control option:selected').val() != menumap[cate] ? inversemap[$('.form-control option:selected').val()] : catemap[cate];
          console.log("new category and name", newcate, newname);
          const usercoordinate = navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            $.ajax({
              datatype: "json",
              url: "/todos/" + currCard.attr('id'),
              data: { name: newname, category: newcate, lat: lat, long: long },
              type: 'PUT',
              success: function (responseData, textStatus, jqXHR) {
                $(".card").remove();
                $.ajax({
                  datatype: "json",
                  url: '/todos',
                  type: 'GET',
                  success: function (responseData, textStatus, jqXHR) {
                    responseData.result.forEach((x) => { appendCard(x) });
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                  }
                });
              },
              error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
              }
            });
          });
        }

        // Clear out fields
        $(".rename_todo").val("");
        $(".is_done_label").prop('checked', false);
        $('.form-control').val("");
      });

    });

    // hide alert upon click events
    $("." + cate).on('click', ".close", function () {
      $(".alert").hide();
    });

    $("." + cate).on('click', ".btn_add_close", function () {
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
