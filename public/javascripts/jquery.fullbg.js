/**
 * jQuery.fullBg
 * Copyright (c) 2010 c.bavota - http://bavotasan.com
 * Dual licensed under MIT and GPL.
 * Date: 02/23/2010
**/

(function($) {

  $.fn.fitToWindow = function(callback) {
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
    var alignment = bgImg.attr("data-alignment");
    var desired_css = {
      left: -(bgImg.width()-win.width)/2+'px',
    }
    switch(alignment) {
      case "top":
        desired_css.top = 0;
        break; 
      case "bottom":
        desired_css.bottom = 0;
      default:
        desired_css.top = -(bgImg.height()-win.height)/2+'px';
    }
    bgImg.css(desired_css);
    if(typeof callback == "function") callback();
  } 

  $.fn.fullBg = function(callback){
    var bgImg = $(this);		
    var first_time = !bgImg.data("bgImgInitialized");

    if(first_time) {
      bgImg.data("bgImgInitialized", true);
      bgImg_count = $(window).data("bgImg_count")*1;
      if(!bgImg_count) {bgImg_count = 0}
      $(window).data("bgImg_count", bgImg_count+1);
      var uid = "bgImg_"+(bgImg_count+1);
      bgImg.attr("id", uid);
      var animatedBgImgResources = $(window).data("animatedBgImgResources") || [];
      animatedBgImgResources.push("#"+bgImg.attr("id"));
      $(window).data("animatedBgImgResources", $.unique(animatedBgImgResources));
    }

    var original_img = {
      width: bgImg.width(),
      height: bgImg.height()
    }
    var img_ratio = original_img.width / original_img.height;
    bgImg.data("img_ratio", img_ratio);

    if($(window).data("bgImgInitialized")) {
    } else {
      $(window).resize(function() {
        var animatedBgImgResources = $(window).data("animatedBgImgResources");
        for(var i in animatedBgImgResources) {
          $(animatedBgImgResources[i]).fitToWindow();
        }
      }); 
    }

    if(first_time) bgImg.fitToWindow(callback);
  };
})(jQuery);
