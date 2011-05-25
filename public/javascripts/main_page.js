jQuery(function($) {
  var position = photos_collection.start;
  var interval = 5000;
  var $curtain = $(".curtain");
  var title_photo = ".title:first";

  $.preloadImage(photos_collection, position, function() {
    rotate();
  });

  function initRotation() {
    window.setTimeout(rotate, interval);
  }

  function step() {
    if(position+1 >= photos_collection.items.length) { return 0 }
    return position+1; 
  }

  function rotate() {
    if($("body").hasClass("forced")) {
      return initRotation();
    }
    $curtain.fadeIn("slow", function() {
      $.preloadImage(photos_collection, position, function() {
        $(title_photo).replaceWith($(this).addClass("title fullBg"));
        $(title_photo).fullBg(function() {
          $curtain.fadeOut("slow");
          if(photos_collection.items.length > 1) {
            position = step();
            initRotation();
            $.preloadImage(photos_collection, position);
          }
        });
      });
    });
  }
});
