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
