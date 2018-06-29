$(document).ready(function() {

  // Smooth scrolling on anchor
  $(document).on('click', 'a[href^="#"]', function (event){
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top}
      , 500);
  });

  // Sending alerts upon empty input
  $('.alert').hide();

  $(".btn_submit").click(function() {
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
    $('#myModal_delete').modal()
    // .one('click', '#delete', function(e){
    //   $('form').trigger('submit');
    //  })
  });

  $(".btn-info-edit").click(function(e) {
    e.preventDefault();
    $('#myModal_card_edit').modal();
  });

  // hide alert upon click events
  $(".close").click(function() {
    $(".alert").hide();
  });

  $(".btn_add_close").click(function() {
    $(".alert").hide();
  });
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



