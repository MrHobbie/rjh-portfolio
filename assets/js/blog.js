$( document ).ready(function() {

  // fixed footer on small screens is an scroll issue.
  function fixedFooter() {
    if( $(window).width() < 480) {
      setNoFixedFooter();
    } else {
      setFixedFooter();
    }
  }

  function setNoFixedFooter() {
    $('#blog-footer').removeClass('navbar-fixed-bottom');
  }

  function setFixedFooter() {
    $('#blog-footer').addClass('navbar-fixed-bottom');
  }

  fixedFooter();

  $(window).resize( function() {
    fixedFooter();
  });
});
//for the new collapsed menu
$(document).ready(function() {
  var sideslider = $('[data-toggle=collapse-side]');
  var sel = sideslider.attr('data-target');
  sideslider.click(function(event){
    $(sel).toggleClass('in');
  });
});
// hide collapsible menu

$('.navbar-nav li a').click( function() {
  $('.side-collapse').toggleClass('in');
});
