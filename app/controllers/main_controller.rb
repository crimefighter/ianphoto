class MainController < ApplicationController
  def index
    @photos = Photo.shuffled
    @photo = @photos.first
    @next_photo = @photos.second
    @json_collection = @photos.throw_back(@photo, @next_photo).to_json_collection
  end
end
