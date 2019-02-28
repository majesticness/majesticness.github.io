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


  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchorToTop = $(this);
    console.log($anchorToTop)
    $('html, body').stop().animate({
      scrollTop: ($($anchorToTop.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  $(document).on('click', 'a.scroll-to', function(event) {
    var $anchorTo = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchorTo.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
});