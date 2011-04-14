jQuery(function($) {
  var $croppable = $(".croppable:first");
  var original_size = {
    width: $croppable.width(),
    height: $croppable.height()
  };
  var ratio = 2;
  var smaller_size = {
    width: Math.round(original_size.width/ratio),
    height: Math.round(original_size.height/ratio)
  };
  $croppable.css(smaller_size);

  $croppable.Jcrop({
    onChange: updateCrop,
    onSelect: updateCrop,
    setSelect: [0, 0, smaller_size.width, smaller_size.height]
  });

  function updateCrop(coords) {
    for(var i in coords) {
      $("#crop_"+i).val(coords[i]*ratio);
      $("#crop_needed").val(!(coords.w == smaller_size.width && coords.h == smaller_size.height));
    }
  }

  $(".vertical_alignment").click(function() {
    $(".alignment_preview").removeClass("top bottom center").addClass($(this).val());
  });
});
