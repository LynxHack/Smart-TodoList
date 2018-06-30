$(document).ready(function() {

  if (!("geolocation" in navigator)) {

  }

  // Smooth scrolling on anchor
  $(document).on('click', 'a[href^="#"]', function (event){
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top}
      , 500);
  });

  // Sending alerts upon empty input
<<<<<<< HEAD
  //$('.alert').hide();

  // $(".btn_submit").click(function() {
  //   //perform ajax post request
  //   console.log($(".new_todo_input").val());
  //   var textboxval =$(".new_todo_input").val();
  //   const usercoordinate = navigator.geolocation.getCurrentPosition((position) => {
  //     const lat  = position.coords.latitude;
  //     const long = position.coords.longitude;
  //     $.ajax({datatype: "json",
  //     url: '/todos',
  //     data: {text: textboxval,lat: lat , long: long},
  //     type: 'POST',
  //     success: function(responseData, textStatus, jqXHR) {
  //         console.log(responseData);
  //     },
  //     error: function(jqXHR, textStatus, errorThrown) {
  //         console.log(errorThrown);
  //     }
  //   });


  // });

  // $('.btn_submit').removeAttr("data-dismiss");
  //   if(!$(".new_todo_input").val()){
  //     $('.alert').show();
  //   } else {
  //     $(".alert").hide();
  //     $(".new_todo_input").val("");
  //     $('.btn_submit').attr("data-dismiss", "modal");
  //   }
  // });

  // $(".btn-danger-edit").click(function(e) {
  //   e.preventDefault();
  //   $('#myModal_delete').modal()
  //   // .one('click', '#delete', function(e){
  //   //   $('form').trigger('submit');
  //   //  })
  // });

  // $(".btn-info-edit").click(function(e) {
  //   e.preventDefault();
  //   $('#myModal_card_edit').modal();
  // });

  // // hide alert upon click events
  // $(".close").click(function() {
  //   $(".alert").hide();
  // });

  // $(".btn_add_close").click(function() {
  //   $(".alert").hide();
  // });
=======
  $('.alert').hide();

  $(".btn_submit").click(function() {
    //perform ajax post request
    console.log($(".new_todo_input").val());
    var textboxval =$(".new_todo_input").val();
    const usercoordinate = navigator.geolocation.getCurrentPosition((position) => {
      const lat  = position.coords.latitude;
      const long = position.coords.longitude;
      console.log(textboxval);
      $.ajax({datatype: "json", 
      url: '/todos', 
      data: {text: textboxval,lat: lat , long: long}, 
      type: 'POST',
      success: function(responseData, textStatus, jqXHR) {
          console.log(responseData);
          appendCard(responseData);
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log(errorThrown);
      }
    });


    });

    $('.btn_submit').removeAttr("data-dismiss");
    if(!$(".new_todo_input").val()){
      $('.alert').show();
    } else {
      $(".alert").hide();
      $(".new_todo_input").val("");
      $('.btn_submit').attr("data-dismiss", "modal");
    }
  })

  $(".btn-danger-edit").click(function(e) {
    e.preventDefault();
    $('#myModal_delete').modal().one('click', '#delete', function(e){
      $form.trigger('submit');
     })
  });

  $(".btn-info-edit").click(function(e) {
    e.preventDefault();
    $('#myModal_card_edit').modal().one('click', '#delete', function(e){
      $.form.trigger('submit');
     })
  });

  $('.btn-card-update').click(function(e) {
    e.preventDefault();
  })

  // hide alert upon click events
  $(".close").click(function() {
    $(".alert").hide();
  });

  $(".btn_add_close").click(function() {
    $(".alert").hide();
  });
>>>>>>> 450a8f40a1721e70f60191e1e25b41f46518082c
  // End of alert hiding events


  // Detecting current page
  $(window).on('scroll', function () {
    if ($(this).scrollTop() >= $('#food_image').position().top) {
      $("#product_menu_link").removeClass("active");
      $("#movie_menu_link").removeClass("active");
      $("#book_menu_link").removeClass("active");
      $("#food_menu_link").addClass("active");
    } else if ($(this).scrollTop() >= $('#books_image').position().top) {
      $("#food_menu_link").removeClass("active");
      $("#product_menu_link").removeClass("active");
      $("#movie_menu_link").removeClass("active");
      $("#book_menu_link").addClass("active");
    } else if($(this).scrollTop() >= $('#products_image').position().top){
      $("#movie_menu_link").removeClass("active");
      $("#book_menu_link").removeClass("active");
      $("#food_menu_link").removeClass("active");
      $("#product_menu_link").addClass("active");
    } else if ($(this).scrollTop() >= $('#movies_image').position().top) {
      $("#book_menu_link").removeClass("active");
      $("#food_menu_link").removeClass("active");
      $("#product_menu_link").removeClass("active");
      $("#movie_menu_link").addClass("active");
    }
  });
});



