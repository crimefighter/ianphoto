class MainController < ApplicationController
  def index
    @photo = Photo.random
    @next_photo = Photo.random(:exclude_ids => @photo.id)
  end
end
