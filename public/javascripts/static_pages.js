$(document).ready(function() {
  var $static_page_container = $(".static_page:first");
  $("ul.static_pages_menu li a").click(function() {
    desired_id = "#"+$(this).attr("data-page-id");
    desired_href = $(this).attr("href");
    desired_name = $(this).html();
    $static_page_container.find(".subcontainer").hide();
    if($static_page_container.find(desired_id).size()) {
      $static_page_container.find(desired_id).show();
    } else {
      $.get(desired_href, {format: "js"}, function(data, textStatus) {
        $static_page_container.append(data);
      });
    }
    window.scrollTo(0,1);
    $static_page_container.removeClass("obscure", "fast");
    return false;
  });

  $(".current, .paginate, .close_static_page, .title").live("click", function(event) {
    if($("#link_to_photo").size()) {
      window.location.href = $("#link_to_photo").attr("href");
    } else {
      $(".static_page:first").addClass("obscure", "fast");
    }
    event.stopPropagation();
  });
});
