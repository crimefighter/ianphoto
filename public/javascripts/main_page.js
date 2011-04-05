jQuery(function($) {
  var position = photos_collection.start;
  var interval = 5000;
  var $curtain = $(".curtain");

  startLoading();
  $(".next:first").baked(function() {
    $curtain.show();
    stopLoading();
    rotate();
    position = step();
  }).attr("src", photos_collection.items[position].original_picture);

  function initRotation() {
    console.log("init");
    window.setTimeout(rotate, interval);
  }

  function step() {
    if(position+1 >= photos_collection.items.length) { return 0 }
    return position+1; 
  }

  function swapClasses(class1, class2) {
    $("."+class1).addClass("was_"+class1).removeClass(class1);
    $("."+class2).addClass("was_"+class2).removeClass(class2);
    $(".was_"+class1).addClass(class2);
    $(".was_"+class2).addClass(class1);
    $(".was_"+class1).removeClass("was_"+class1);
    $(".was_"+class2).removeClass("was_"+class2);
  }

  function rotate() {
    position = step();
    console.log("rotation "+position);
    var photo = photos_collection.items[position];
    var title_photo = ".title:first";
    var next_photo = ".next:first";
    $(title_photo).fadeOut("slow", function() {
      $(next_photo).fitToWindow(function() {
        $curtain.fadeOut("slow", function() {
          $(next_photo).addClass("was_next").removeClass("next");
          $(title_photo).addClass("was_title").removeClass("title");
          swapClasses("title", "next");
          $(title_photo).fullBg();
          $(next_photo).attr("src", photo.original_picture);
          $(next_photo).show();
          $curtain.show();
          initRotation();
        });
      });
    });
  }
});

