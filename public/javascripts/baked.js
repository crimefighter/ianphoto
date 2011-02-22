/**
  triggers load callback on images including those loaded from cache
**/

(function($) {
  $.fn.baked = function(callback) {
    $this = $(this);
    $this.bind("load", callback).each(function() {
      if (this.complete || this.complete === undefined) {
        $(this).each(callback);
      }
    });
    return $this;
  }
})(jQuery);
