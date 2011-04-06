jQuery(function($) {
  var position = photos_collection.start;
  var interval = 5000;
  var $curtain = $(".curtain");

  startLoading();
  $.preloadImage(photos_collection, position, function() {
    stopLoading();
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
    var title_photo = ".title:first";
    $curtain.fadeIn("slow", function() {
      $.preloadImage(photos_collection, position, function() {
        $(title_photo).replaceWith($(this).addClass("title fullBg"));
        $(title_photo).fullBg(function() {
          $curtain.fadeOut("slow");
          position = step();
          initRotation();
          $.preloadImage(photos_collection, position);
        });
      });
    });
  }
});
