jQuery(function($) {

  var $top_bar = $(".top_bar");
  var $bottom_menu = $(".bottom_menu");
  var top_bar_height = 0;
  var bottom_menu_height = 0;
  
  function adjustFontSizes() {
    top_bar_height = $(".top_bar").height();
    bottom_menu_height = $(".bottom_menu").height();
    $top_bar.css("font-size", top_bar_height);
    $bottom_menu.css("font-size", bottom_menu_height);
  }

  $(window).resize(adjustFontSizes);
  adjustFontSizes();
});
