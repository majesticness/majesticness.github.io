$(function () {
  var lastScrollTop = 0;
  var $navbar = $('.navbar');
  $(window).scroll(function(event){
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
      $navbar.addClass("fade-out");
      $navbar.removeClass("fade-in");
    } else { 
      $navbar.addClass("fade-in");
      $navbar.removeClass("fade-out");
    }
    lastScrollTop = st;
  });
});