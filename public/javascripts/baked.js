/**
  triggers load callback on images including those loaded from cache
**/

(function($) {
  $.fn.baked = function(callback) {
    $this = $(this);
    $this.each(function() {
      if (this.complete || this.complete === undefined) {
        $(this).each(callback);
      } else {
        $this.one("load", callback);
      }
    });
    return $this;
  }
})(jQuery);
