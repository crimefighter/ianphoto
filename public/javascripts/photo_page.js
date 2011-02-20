$(document).ready(function() {
  var $curtain = $(".curtain");
  startLoading();
  $(".current:first").load(function() {
    $(this).fullBg();
    $(this).siblings(".fullBg").each(function() {
      $(this).fullBg({animated: false});
    });
    if($(this).width() < $(this).height()) {
      $curtain.show();
    }
    stopLoading();
  });

  var $next_thumbnail = $("#next_thumbnail");
  var $prev_thumbnail = $("#prev_thumbnail");
  var $next_link = $("#next_link");
  var $prev_link = $("#prev_link");

  $next_link.bind("mouseenter", function() {
    $("#next_thumbnail").fadeIn();
  }).bind("mouseleave", function() {
    $("#next_thumbnail").fadeOut();
  });

  $prev_link.bind("mouseenter", function() {
    $("#prev_thumbnail").fadeIn("fast");
  }).bind("mouseleave", function() {
    $("#prev_thumbnail").fadeOut("fast");
  });

  $next_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) {
      startLoading();
      $this.addClass("clicked");
      return false;
    }
    $(".paginate").addClass("waiting");
    var $current_photo = $(".current:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    var $previous_photo = $(".previous:first:not(.changed)");
    $(".paginate").addClass("waiting");
    $curtain.hide();
    $current_photo.fadeOut(function() {
      $next_photo.fullBg();
      $.ajax({
        type: "GET",
        dataType: "json",
        url: $this.attr("href"), 
        success: function(data) {
          $previous_photo.attr("src", data.next_photo.original_picture);
          $next_photo.addClass("current changed").removeClass("next");
          $previous_photo.addClass("next changed").removeClass("previous");
          $current_photo.addClass("previous changed").removeClass("current").show();
          $this.attr("href", data.next_photo.path);
          $("#prev_link").attr("href", data.previous_photo.path);
          $next_thumbnail.attr("src", data.next_photo.small_picture);
          $prev_thumbnail.attr("src", data.previous_photo.small_picture);
          $(".changed").removeClass("changed");
          $curtain.show();
          window.history.pushState({}, data.next_photo.name, data.next_photo.html_path);
          document.title = data.next_photo.name;
          $(".paginate").removeClass("waiting");
          if($this.hasClass("clicked")) {
            stopLoading();
            $this.removeClass("clicked");
            $this.click();
          }
        }
      });
    });
    return false;
  });

  $prev_link.click(function() {
    var $this = $(this);
    if($this.hasClass("waiting")) {
      startLoading();
      $this.addClass("clicked");
      return false;
    }
    $(".paginate").addClass("waiting");
    var $current_photo = $(".current:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    var $previous_photo = $(".previous:first:not(.changed)");
    $next_photo.addClass("previous").removeClass("next");
    $previous_photo.addClass("next").removeClass("previous");
    $next_photo = $(".next:first:not(.changed)");
    $previous_photo = $(".previous:first:not(.changed)");
    $curtain.hide();
    $current_photo.fadeOut(function() {
      $next_photo.fullBg();
      $.ajax({
        type: "GET",
        dataType: "json",
        url: $this.attr("href"), 
        success: function(data) {
          $previous_photo.attr("src", data.previous_photo.original_picture);
          $next_photo.addClass("current changed").removeClass("next");
          $current_photo.addClass("next changed").removeClass("current").show();
          $this.attr("href", data.previous_photo.path);
          $("#next_link").attr("href", data.next_photo.path);
          $next_thumbnail.attr("src", data.next_photo.small_picture);
          $prev_thumbnail.attr("src", data.previous_photo.small_picture);
          $(".changed").removeClass("changed");
          $curtain.show();
          window.history.pushState({}, data.previous_photo.name, data.previous_photo.html_path)
          document.title = data.previous_photo.name;
          $(".paginate").removeClass("waiting");
          if($this.hasClass("clicked")) {
            stopLoading();
            $this.removeClass("clicked");
            $this.click();
          }
        }
      });
    });
    return false;
  });
});
