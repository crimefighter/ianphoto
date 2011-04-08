jQuery(function($) {
  var $curtain = $(".curtain");
  var position = photos_collection.start;
  var current_photo = ".current:first";

  var $next_thumbnail = $("#next_thumbnail");
  var $prev_thumbnail = $("#prev_thumbnail");
  var $next_link = $("#next_link");
  var $prev_link = $("#prev_link");

  $.preloadImage(photos_collection, position, function() {
    rotateTo(position, afterRotation);
    if(photos_collection.items.length <= 1) {
      $(".next_link, .prev_link").hide();
    }
  });
  
  function cycle(number, array) {
    if(number >= array.length-1) {
      return 0;
    } else {
      return number+1;
    }
  }

  function cycleBack(number, array) {
    if(number <= 0) {
      return array.length-1;
    } else {
      return number-1;
    }
  }

  function summonThumbnail() {
    $(this).parent().find(".paginate").trigger("mouseenter");
  }

  function rotateTo(desired_position, rotation_callback) {
    $curtain.fadeIn("slow", function() {
      $.preloadImage(photos_collection, desired_position, function() {
        $(current_photo).replaceWith($(this).addClass("current fullBg"));
        $(current_photo).fullBg(function() {
          $curtain.fadeOut("slow");
          if(typeof rotation_callback == "function") rotation_callback();
        });
      });
    });
  }

  function afterRotation(direction) {
    var data = {
      previous_photo: photos_collection.items[previous_position = cycleBack(position, photos_collection.items)],
      next_photo: photos_collection.items[next_position = cycle(position, photos_collection.items)],
      current_photo: photos_collection.items[position]
    };
    $next_link.attr("href", data.next_photo.path);
    $prev_link.attr("href", data.previous_photo.path);
    switch(direction) {
      case "forward":
        $next_thumbnail.baked(summonThumbnail)
        break;
      case "backward":
        $prev_thumbnail.baked(summonThumbnail);
        break;
    }
    $next_thumbnail.attr("src", data.next_photo.small_picture);
    $prev_thumbnail.attr("src", data.previous_photo.small_picture);
    if(window.history.pushState) {
      window.history.pushState({position: position}, data.current_photo.name, data.current_photo.path);
    }
    document.title = data.current_photo.name;
    $(".paginate").removeClass("waiting");

    if(data.current_photo.description.length) {
      $(".description_container .subcontainer").text(data.current_photo.description);
      $(".description_trigger").show();
    } else {
      $(".description_trigger").hide();
      if($(".description_trigger").hasClass("pushed_down")) {
        $(".description_trigger").removeClass("pushed_down");
        $(".description_container").addClass("obscure");
      }
    }

    $.preloadImage(photos_collection, next_position);
    $.preloadImage(photos_collection, previous_position);
  }

  if(!Modernizr.touch) {
    $next_link.bind("mouseenter", function() {
      $("#next_thumbnail").fadeIn();
    });
    $prev_link.bind("mouseenter", function() {
      $("#prev_thumbnail").fadeIn();
    });
    $(".current:first").live("mousemove", function() {
      $(".thumbnail").hide();
    });
  }

  $(".description_trigger").click(function() {
    $(".description_container").toggleClass("obscure", "fast");
    $(this).toggleClass("pushed_down", "fast");
    return false;
  });

  $(".current, .curtain, .backup_curtain").live("click", function(event) {
    if($(".description_trigger").hasClass("pushed_down")) {
      $(".description_trigger").click();
      event.preventDefault();
    }
  });

  $next_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) { return false }
    $(".paginate").addClass("waiting");
    $(".thumbnail").hide();
    position = cycle(position, photos_collection.items);
    rotateTo(position, function() {
      afterRotation("forward");
    });
    return false;
  });

  $prev_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) { return false }
    $(".paginate").addClass("waiting");
    $(".thumbnail").hide();
    position = cycleBack(position, photos_collection.items);
    rotateTo(position, function() {
      afterRotation("backward");
    });
    return false;
  });

});
