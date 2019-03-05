


$(function () {
  AOS.init({
    duration: 1200,
    delay: 25,
    easing: 'ease-in-out-back'
  });
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


  $("#contact-form").submit(function (event) {
    event.preventDefault();
    console.log("Hello world!");


    var url = "https://nhjf2on317.execute-api.us-east-1.amazonaws.com/api/users"

    var data = {
        name: $("#contact-form input[name='name']").val(),
        email: $("#contact-form input[name='email']").val(),
        message: $("#contact-form textarea[name='message']").val(),
        gRecaptcha: $("#contact-form textarea[name='g-recaptcha-response']").val()
    };

    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function (response) {
            if(response.status){
                $("#contact-form").addClass("d-none");
                $("#contact-message").text("Gracias, pronto nos pondremos en contacto contigo.")
            }
        },
        error: function (xhr, status) {
            console.log(xhr);
            console.log(status);
        }} );
 
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