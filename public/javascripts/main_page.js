jQuery(function($) {
  var position = photos_collection.start;
  var cached_images = [];
  var interval = 5000;
  var $curtain = $(".curtain");

  startLoading();
  preloadImage(position, function() {
    stopLoading();
    rotate();
  });

  function preloadImage(position, callback) {
    if(photos_collection.items[position] == undefined) return false;
    if(photos_collection.items[position].preloaded_image == undefined) {
      photos_collection.items[position].preloaded_image = new Image();
      $(photos_collection.items[position].preloaded_image).baked(function() {
        if(typeof callback == "function") callback();
      }).attr("src", photos_collection.items[position].original_picture);
    } else {
      if(typeof callback == "function")
        $(photos_collection.items[position].preloaded_image).baked(callback);
    }
  }

  function initRotation() {
    window.setTimeout(rotate, interval);
  }

  function step() {
    if(position+1 >= photos_collection.items.length) { return 0 }
    return position+1; 
  }

  function rotate() {
    var photo = photos_collection.items[position];
    var title_photo = ".title:first";
    $curtain.fadeIn("slow", function() {
      $(title_photo).replaceWith($(photo.preloaded_image).addClass("title fullBg"));
      $(title_photo).fullBg(function() {
        $curtain.fadeOut("slow");
        position = step();
        initRotation();
        preloadImage(position);
      });
    });
  }
});
