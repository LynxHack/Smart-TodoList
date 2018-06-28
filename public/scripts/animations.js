$(document).ready(function() {

  // Smooth scrolling on anchor
  $(document).on('click', 'a[href^="#"]', function (event){
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top}
      , 500);
  });

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



