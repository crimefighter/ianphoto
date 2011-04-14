$.preloadImage = function(photos_collection, position, callback) {
  if(photos_collection.items[position] == undefined) return false;
  if(photos_collection.items[position].preloaded_image == undefined) {
    photos_collection.items[position].preloaded_image = new Image();
    $(photos_collection.items[position].preloaded_image).baked(function() {
      $(this).attr("data-alignment", photos_collection.items[position].alignment);
      if(typeof callback == "function") callback();
    }).attr("src", photos_collection.items[position].processed_picture);
  } else {
    if(typeof callback == "function")
      $(photos_collection.items[position].preloaded_image).baked(callback);
  }
}
