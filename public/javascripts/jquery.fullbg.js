/**
 * jQuery.fullBg
 * Copyright (c) 2010 c.bavota - http://bavotasan.com
 * Dual licensed under MIT and GPL.
 * Date: 02/23/2010
**/

(function($) {
  $.fn.fullBg = function(options){
    var defaults = {
      animated: true
    }
    options = $.extend(defaults, options);
    var bgImg = $(this);		
    var original_img = {
      width: bgImg.width(),
      height: bgImg.height()
    }
    var img_ratio = original_img.width / original_img.height;
    bgImg.data("img_ratio", img_ratio);
    bgImg_count = $(window).data("bgImg_count")*1;
    if(!bgImg_count) {bgImg_count = 0}
    $(window).data("bgImg_count", bgImg_count+1);
    var uid = "bgImg_"+(bgImg_count+1);
    bgImg.attr("id", uid);
    
    $.fn.fitToWindow = function() {
      bgImg = $(this);
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
      if((diff.height > win.height) && bgImg.data("img_ratio") > 1) {
        bgImg.css({
          width: win.width + 'px',
          height: ''
        });
      } else {
        bgImg.css({
          height: win.height + 'px',
          width: ''
        });		
      }
      bgImg.css({
        left: -(bgImg.width()-win.width)/2+'px',
        top: -(bgImg.height()-win.height)/2+'px'
      });
    } 

    if(options.animated) {
      $(window).resize(function() {
        $("#"+uid).fitToWindow();
      }); 
    } else {
      var rtime = new Date(1, 1, 2000, 12,00,00);
      var timeout = false;
      var delta = 200;
      
      $(window).resize(function() {
        rtime = new Date();
        if (timeout === false) {
          timeout = true;
          setTimeout(resizeEnd, delta);
        }
      });

      function resizeEnd() {
       if(new Date() - rtime < delta) {
         setTimeout(resizeEnd, delta);
       } else {
         timeout = false;
         $("#"+uid).fitToWindow();
        }    
      }

    }
    bgImg.fitToWindow();
  };
})(jQuery)
