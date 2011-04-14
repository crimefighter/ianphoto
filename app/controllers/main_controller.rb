class MainController < ApplicationController
  def index
    @json_collection = Photo.for_front_page.shuffled.to_json_collection
  end
end
