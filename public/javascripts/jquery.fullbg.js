/**
 * jQuery.fullBg
 * Copyright (c) 2010 c.bavota - http://bavotasan.com
 * Dual licensed under MIT and GPL.
 * Date: 02/23/2010
**/

(function($) {
  $.fn.fullBg = function(options){
    var defaults = {
      animated: true,
      reinitialize_image: false,
      callback: false
    }
    options = $.extend(defaults, options);
    var bgImg = $(this);		
    if(bgImg.data("bgImgInitialized") && !options.reinitialize_image) {
    } else {
      var original_img = {
        width: bgImg.width(),
        height: bgImg.height()
      }
      var img_ratio = original_img.width / original_img.height;
      bgImg.data("img_ratio", img_ratio);
      if(!options.reinitialize_image) {
        bgImg.data("bgImgInitialized", true);
        bgImg_count = $(window).data("bgImg_count")*1;
        if(!bgImg_count) {bgImg_count = 0}
        $(window).data("bgImg_count", bgImg_count+1);
        var uid = "bgImg_"+(bgImg_count+1);
        bgImg.attr("id", uid);
      }
    }

    var rtime = new Date(1, 1, 2000, 12,00,00);
    var timeout = false;
    var delta = 200;
    function resizeEnd() {
      if(new Date() - rtime < delta) {
        setTimeout(resizeEnd, delta);
      } else {
        timeout = false;
        var backgroundBgImgResources = $(window).data("backgroundBgImgResources");
        for(var i in backgroundBgImgResources) {
          $(backgroundBgImgResources[i]).fitToWindow();
        }
      }    
    }

    if($(window).data("bgImgInitialized")) {
    } else {
      $.fn.fitToWindow = function() {
        bgImg = $(this);
        var img = {
          width: bgImg.width(),
          height: bgImg.height()
        }
        var img_ratio = img.width/img.height;
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
        if((diff.height > win.height) && img_ratio > 1) {
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

      $(window).resize(function() {
        var animatedBgImgResources = $(window).data("animatedBgImgResources");
        for(var i in animatedBgImgResources) {
          $(animatedBgImgResources[i]).fitToWindow();
        }
        rtime = new Date();
        if (timeout === false) {
          timeout = true;
          setTimeout(resizeEnd, delta);
        }
      }); 
    }

    var animatedBgImgResources = $(window).data("animatedBgImgResources") || [];
    var backgroundBgImgResources = $(window).data("backgroundBgImgResources") || [];
    if(options.animated) {
      animatedBgImgResources.push("#"+bgImg.attr("id"));
      $(window).data("animatedBgImgResources", $.unique(animatedBgImgResources));
      unwanted_index = $.inArray("#"+bgImg.attr("id"), backgroundBgImgResources);
      if(unwanted_index != -1) {
        delete backgroundBgImgResources[unwanted_index];
        $(window).data("backgroundBgImgResources", backgroundBgImgResources);
      }
    } else {
      backgroundBgImgResources.push("#"+bgImg.attr("id"));
      $(window).data("backgroundBgImgResources", $.unique(backgroundBgImgResources));
      unwanted_index = $.inArray("#"+bgImg.attr("id"), animatedBgImgResources);
      if(unwanted_index != -1) {
        delete animatedBgImgResources[unwanted_index];
        $(window).data("animatedBgImgResources", animatedBgImgResources);
      }
    }

    bgImg.fitToWindow();
    if(typeof options.callback == "function") options.callback();
  };
})(jQuery);
