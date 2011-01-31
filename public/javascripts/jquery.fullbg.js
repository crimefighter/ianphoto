/**
 * jQuery.fullBg
 * Copyright (c) 2010 c.bavota - http://bavotasan.com
 * Dual licensed under MIT and GPL.
 * Date: 02/23/2010
**/

(function($) {
  $.fn.fullBg = function(){
    var bgImg = $(this);		
 
    function resizeImg() {
      var img = {
        width: bgImg.width(),
        height: bgImg.height()
      }
      var win = {
        width: $(window).width(),
        height: $(window).height()
      }
      var ratio = {
        width: (win.width / img.width),
        height: (win.height / img.height)
      }
      var diff = {
        width: (ratio.height * img.width),
        height: (ratio.width * img.height)
      }
      if(diff.height > win.height) {
        bgImg.css({
          width: win.width + 'px',
          height: '',
          left: -(img.width-win.width)/2+'px',
          top: -(img.height-win.height)/2+'px'
        });
      } else {
        bgImg.css({
          height: win.height + 'px',
          width: '',
          left: -(img.width-win.width)/2+'px',
          top: -(img.height-win.height)/2+'px'
        });		
      }
    } 
    resizeImg();
    $(window).resize(function() {
      resizeImg();
    }); 
  };
})(jQuery)
