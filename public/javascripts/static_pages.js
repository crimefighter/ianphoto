$(document).ready(function() {
  $("ul.static_pages_menu li a").click(function() {
    $static_page_container = $(".static_page:first");
    desired_id = "#"+$(this).attr("id");
    desired_href = $(this).attr("href");
    desired_name = $(this).html();
    $static_page_container.find(".subcontainer").hide();
    if($static_page_container.find(desired_id).size()) {
      $static_page_container.find(desired_id).show();
    } else {
      startLoading();
      $.get(desired_href, {format: "js"}, function(data, textStatus) {
        $(data).appendTo($static_page_container).show();
        stopLoading();
      });
    }
    if($static_page_container.hasClass("solid")) {
      window.history.pushState({}, desired_name, desired_href);
      document.title = desired_name;
    }
    $static_page_container.removeClass("obscure", "fast");
    return false;
  });

  $(".current, .paginate").click(function(event) {
    $(".static_page:first").addClass("obscure", "fast");
    event.preventDefault();
  });
});
