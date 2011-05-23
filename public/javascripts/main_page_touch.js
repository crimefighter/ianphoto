jQuery(function($) {
  if(!Modernizr.touch) return;

  var position = photos_collection.start;
  var interval = 5000;
  var $curtain = $(".curtain");
  var title_photo = ".title:first";

  $(title_photo).hide();
  $(".backup_curtain").hide();
  $("body").css("background", "url('"+photos_collection.items[position].processed_picture+"')");

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
  adjustBody();
});
