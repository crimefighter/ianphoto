jQuery(function($) {
  if(!Modernizr.touch) return;

  $(".touch body:not(.forced), .touch_enforcer").click(function() {
    if(!$("body").hasClass("forced")) {
      $("body").addClass("forced");
      $(".bottom_menu").addClass("super_elevated");
      $(".curtain").hide();
      $(window).resize();
      return false;
    }
  });

  $(".touch .forced .current, .touch .forced .title").live("click", function(e) {
    if($("body").hasClass("forced")) {
      $("body").removeClass("forced");
      $(".bottom_menu").removeClass("super_elevated");
      $(window).resize();
      e.stopPropagation();
    }
  });
});
