jQuery(function($) {
  var $curtain = $(".curtain");
  var position = photos_collection.start;

  startLoading();
  $.preloadImage(photos_collection, position, function() {
    stopLoading();
    rotateTo(position);
  });
  
  var $next_thumbnail = $("#next_thumbnail");
  var $prev_thumbnail = $("#prev_thumbnail");
  var $next_link = $("#next_link");
  var $prev_link = $("#prev_link");

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

  function rotateTo(desired_position, callback) {
    var current_photo = $(".current:first");
    $curtain.fadeIn("slow", function() {
      $.preloadImage(photos_collection, desired_position, function() {
        $(current_photo).replaceWith($(this).addClass("current fullBg"));
        $(current_photo).fullBg(function() {
          $curtain.fadeOut("slow");
          if(typeof callback == "function") callback();
        });
      });
    });
  }

  if(!Modernizr.touch) {
    $next_link.bind("mouseenter", function() {
      $("#next_thumbnail").fadeIn();
    }).bind("mouseleave", function() {
      $("#next_thumbnail").fadeOut();
    });

    $prev_link.bind("mouseenter", function() {
      $("#prev_thumbnail").fadeIn("fast");
    }).bind("mouseleave", function() {
      $("#prev_thumbnail").hide();
    });
    $(".current:first").bind("mousemove", function() {
      $(".thumbnail").hide();
    });
  }

  $next_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) { return false }
    $(".paginate").addClass("waiting");
    $(".thumbnail").hide();
    new_position = cycle(position, photos_collection);
    rotateTo(new_position, function() {
      var data = {
        previous_photo: photos_collection.items[previous_position = cycleBack(new_position, photos_collection.items)],
        next_photo: photos_collection.items[next_position = cycle(new_position, photos_collection.items)],
        current_photo: photos_collection.items[new_position]
      };
      $this.attr("href", data.next_photo.path);
      $("#prev_link").attr("href", data.previous_photo.path);
      $next_thumbnail.baked(function() {
        $this.trigger("mouseenter");
        $(this).unbind("load");
      }).attr("src", data.next_photo.small_picture);
      $prev_thumbnail.attr("src", data.previous_photo.small_picture);
      position = new_position;
      if(window.history.pushState) {
        window.history.pushState({position: position}, data.current_photo.name, data.current_photo.path);
      }
      document.title = data.current_photo.name;
      $(".paginate").removeClass("waiting");
      $.preloadImage(next_position, photos_collection);
    });
    return false;
  });

  $prev_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) { return false }
    $(".paginate").addClass("waiting");
    $(".thumbnail").hide();
    new_position = cycleBack(position, photos_collection);
    rotateTo(new_position, function() {
      var data = {
        previous_photo: photos_collection.items[previous_position = cycleBack(new_position, photos_collection.items)],
        next_photo: photos_collection.items[next_position = cycle(new_position, photos_collection.items)],
        current_photo: photos_collection.items[new_position]
      };
      $("#prev_link").attr("href", data.next_photo.path);
      $this.attr("href", data.previous_photo.path);
      $prev_thumbnail.baked(function() {
        $this.trigger("mouseenter");
        $(this).unbind("load");
      }).attr("src", data.previous_photo.small_picture);
      $next_thumbnail.attr("src", data.previous_photo.small_picture);
      position = new_position;
      if(window.history.pushState) {
        window.history.pushState({position: position}, data.current_photo.name, data.current_photo.path);
      }
      document.title = data.current_photo.name;
      $(".paginate").removeClass("waiting");
      $.preloadImage(previous_position, photos_collection);
    });
    return false;
  });
});
