class MainController < ApplicationController
  def index
    @photos = Photo.for_front_page.shuffled
    @json_collection = @photos.throw_back(@photo, @next_photo).to_json_collection
  end
end
