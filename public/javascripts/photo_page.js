$(document).ready(function() {
  startLoading();
  $(".current:first").load(function() {
    $(this).fullBg();
    $(this).siblings(".fullBg").each(function() {
      $(this).fullBg({animated: false});
    });
    stopLoading();
  });


  $("#next_link").click(function() {
    var $this = $(this);
    var $current_photo = $(".current:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    var $previous_photo = $(".previous:first:not(.changed)");
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
          $this.find("img:first").attr("src", data.next_photo.small_picture);
          $("#prev_link").attr("href", data.previous_photo.path);
          $("#prev_link").find("img:first").attr("src", data.previous_photo.small_picture);
          $(".changed").removeClass("changed");
        }
      });
    });
    return false;
  });

  $("#prev_link").click(function() {
    var $this = $(this);
    var $current_photo = $(".current:first:not(.changed)");
    var $next_photo = $(".next:first:not(.changed)");
    var $previous_photo = $(".previous:first:not(.changed)");
    $next_photo.addClass("previous").removeClass("next");
    $previous_photo.addClass("next").removeClass("previous");
    $next_photo = $(".next:first:not(.changed)");
    $previous_photo = $(".previous:first:not(.changed)");
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
          $this.find("img:first").attr("src", data.previous_photo.small_picture);
          $("#next_link").attr("href", data.next_photo.path);
          $("#next_link").find("img:first").attr("src", data.next_photo.small_picture);
          $(".changed").removeClass("changed");
        }
      });
    });
    return false;
  });
});
