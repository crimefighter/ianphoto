$(document).ready(function() {
  $(document).mousemove(function(event) {
    if(event.pageY > $(window).height()-100) {
      $(".bottom_menu").addClass("elevated");
    } else {
      $(".bottom_menu").removeClass("elevated");
    }
  });
});
