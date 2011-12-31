jQuery(function($) {
  if(!Modernizr.touch) return;

  $("body").addClass("forced");

  $(".touch body:not(.forced), .touch_enforcer").click(function() {
    if(!$("body").hasClass("forced")) {
      $("body").addClass("forced");
      $(".bottom_menu").addClass("super_elevated");
      $(".curtain").hide();
      $(window).resize();
      return false;
    }
  });

  $(".touch .forced .current").live("click", function(e) {
    if($("body").hasClass("forced")) {
      $("body").removeClass("forced");
      $(".bottom_menu").removeClass("super_elevated");
      $(window).resize();
      e.stopPropagation();
    }
  });
});
