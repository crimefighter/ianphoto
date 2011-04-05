jQuery(function($) {
  var position = photos_collection.start;
  var interval = 5000;
  var $curtain = $(".curtain");

  startLoading();
  $(".title:first").baked(function() {
    $(this).fullBg();
    $(this).removeClass("invisible");
    $curtain.show();
    stopLoading();
    initRotation();
  });

  function initRotation() {
    window.setTimeout(rotate, interval);
  }

  function step() {
    position++; if(position >= photos_collection.items.length) { position = 0 }
  }

  function rotate() {
    step();
    var photo = photos_collection.items[position];
    var $title_photo = $(".title:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    $next_photo.removeClass("invisible");
    $title_photo.fadeOut("slow", function() {
      $next_photo.fullBg({
        callback: function() {
          $curtain.fadeOut("slow", function() {
            $next_photo.addClass("title changed").removeClass("next");
            $title_photo.addClass("next changed").removeClass("title").addClass("invisible").show();
            $title_photo.baked(function() {
              $(this).fullBg({animated: false, reinitialize_image: true});
              $(this).unbind("load");
            }).attr("src", photo.original_picture);
            $(".changed").removeClass("changed");
            $curtain.show();
            initRotation();
          });
        }
      });
    });
  }
});

