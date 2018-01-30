(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 80
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Modal popup$(function () {
  $('.portfolio-item').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#username',
    modal: true
  });
  $(document).on('click', '.portfolio-modal-dismiss', function(e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  // Floating label headings for the contact form
  $(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
      $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
      $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
      $(this).removeClass("floating-label-form-group-with-focus");
    });
  });

})(jQuery); // End of use strict

// Initialize firebase
var config = {
   apiKey: "AIzaSyDjjY5XpaQq-gDskOTbEOcIEoXoguVgdDU",
   authDomain: "contact-form-17248.firebaseapp.com",
   databaseURL: "https://contact-form-17248.firebaseio.com",
   projectId: "contact-form-17248",
   storageBucket: "contact-form-17248.appspot.com",
   messagingSenderId: "1003841198261"
};
firebase.initializeApp(config);

// Reference Messages Collection
var messagesRef = firebase.database().ref("messages");

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
    e.preventDefault();

    // Get values
    var name = getInputVal("name");
    var email = getInputVal("email");
    var phone = getInputVal("phone");
    var message = getInputVal("message");

    saveMessage(name, email, phone, message);

    // Show alert
    document.querySelector('.alert-success').style.display = "block";

    // Hide alert after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert-success').style.display = "none";
    }, 3000);

    // Clear form
    document.getElementById("contactForm").reset();
}

// Function to get for values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save mesage to firebase
function saveMessage(name, email, phone, message){
    let url = "http://localhost:5000/contact";
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            message: message
        })
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
    // var newMessageRef = messagesRef.push();
    // newMessageRef.set({
    //     name: name,
    //     email: email,
    //     phone: phone,
    //     message: message
    // });
}
