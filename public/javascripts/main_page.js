jQuery(function($) {
  var position = photos_collection.start;
  var interval = 5000;
  var $curtain = $(".curtain");

  startLoading();
  $(".title:first").load(function() {
    $(this).fullBg();
    if($(this).width() < $(this).height()) {
      $curtain.show();
    }
    stopLoading();
    initRotation();
  });
  $(".next:first").load(function() {
    $(this).fullBg({animated:false});
  });

  function initRotation() {
    window.setTimeout(rotate, interval);
  }

  function rotate() {
    position++; if(position >= photos_collection.items.length) { position = 0 }
    var photo = photos_collection.items[position];
    var $title_photo = $(".title:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    $curtain.hide();
    $title_photo.fadeOut(function() {
      $next_photo.fullBg();
      $title_photo.attr("src", photo.original_picture);
      $next_photo.addClass("title changed").removeClass("next");
      $title_photo.addClass("next changed").removeClass("title").show();
      $(".changed").removeClass("changed");
      $curtain.show();
      initRotation();
    });
  }
});

