jQuery(function($) {
  var $curtain = $(".curtain");
  var position = photos_collection.start;
  startLoading();

  $(".current:first").baked(function() {
    $(this).fullBg();
    $(".fullBg:not(.current)").each(function() {
      $(this).fullBg({animated: false});
    });
    if($(this).width() < $(this).height()) {
      $curtain.show();
    }
    stopLoading();
    $(this).unbind("load");
  });

  var $next_thumbnail = $("#next_thumbnail");
  var $prev_thumbnail = $("#prev_thumbnail");
  var $next_link = $("#next_link");
  var $prev_link = $("#prev_link");

  function step() {
    position++; if(position > photos_collection.items.length-1) { position = 0 }
  }

  function stepBack() {
    position--; if(position < 0) { position = photos_collection.items.length-1 }
  }
  
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

  $next_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) { return false }
    var $current_photo = $(".current:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    var $previous_photo = $(".previous:first:not(.changed)");
    $(".paginate").addClass("waiting");
    $(".thumbnail").hide();
    $curtain.hide();
    $current_photo.fadeOut(function() {
      $next_photo.fullBg();
      $current_photo.fullBg({animated: false});
      step();
      var data = {
        previous_photo: photos_collection.items[cycleBack(position, photos_collection.items)],
        next_photo: photos_collection.items[cycle(position, photos_collection.items)],
        current_photo: photos_collection.items[position]
      };
      $previous_photo.bind("load", function() {
        $(this).fullBg({animated: false, reinitialize_image: true});
        $(this).unbind("load");
      }).attr("src", data.next_photo.original_picture);
      $next_photo.addClass("current changed").removeClass("next");
      $previous_photo.addClass("next changed").removeClass("previous");
      $current_photo.addClass("previous changed").removeClass("current").show();
      $this.attr("href", data.next_photo.path);
      $("#prev_link").attr("href", data.previous_photo.path);
      $next_thumbnail.baked(function() {
        $this.trigger("mouseenter");
        $(this).unbind("load");
      }).attr("src", data.next_photo.small_picture);
      $prev_thumbnail.attr("src", data.previous_photo.small_picture);
      $(".changed").removeClass("changed");
      $curtain.show();
      if(window.history.pushState) {
        window.history.pushState({position: position}, data.current_photo.name, data.current_photo.path);
      }
      document.title = data.current_photo.name;
      $(".paginate").removeClass("waiting");
    });
    return false;
  });

  $prev_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) { return false }
    var $current_photo = $(".current:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    var $previous_photo = $(".previous:first:not(.changed)");
    $(".paginate").addClass("waiting");
    $(".thumbnail").hide();
    $next_photo.addClass("previous").removeClass("next");
    $previous_photo.addClass("next").removeClass("previous");
    $next_photo = $(".next:first:not(.changed)");
    $previous_photo = $(".previous:first:not(.changed)");
    $curtain.hide();
    $current_photo.fadeOut(function() {
      $next_photo.fullBg();
      $current_photo.fullBg({animated: false});
      stepBack();
      var data = {
        previous_photo: photos_collection.items[cycleBack(position, photos_collection.items)],
        next_photo: photos_collection.items[cycle(position, photos_collection.items)],
        current_photo: photos_collection.items[position]
      };
      $previous_photo.baked(function() {
        $this.trigger("mouseenter");
        $(this).unbind("load");
      }).attr("src", data.previous_photo.original_picture);
      $next_photo.addClass("current changed").removeClass("next");
      $current_photo.addClass("next changed").removeClass("current").show();
      $this.attr("href", data.previous_photo.path);
      $("#next_link").attr("href", data.next_photo.path);
      $next_thumbnail.attr("src", data.next_photo.small_picture);
      $prev_thumbnail.bind("load", function() {
      }).attr("src", data.previous_photo.small_picture);
        $this.trigger("mouseenter");
        $(this).unbind("load");
      $(".changed").removeClass("changed");
      $curtain.show();
      if(window.history.pushState) {
        window.history.pushState({position: position}, data.current_photo.name, data.current_photo.path);
      }
      document.title = data.current_photo.name;
      $(".paginate").removeClass("waiting");
    });
    return false;
  });
});
