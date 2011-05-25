jQuery(function($) {
  if(!Modernizr.touch) return;

  function adjustBody() {
    if(screen != "undefined") {
      desired_height = Math.max(480, screen.height);
      $("body").css("height", desired_height);

    }
    setTimeout(function() {
      window.scrollTo(0,1);
      var desired_height = window.innerHeight;
      $("body").css("height", desired_height);
    }, 100);
  }

  $(window).resize(function() {
    adjustBody();
  });
  $(window).resize();
});
