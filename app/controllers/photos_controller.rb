class PhotosController < ApplicationController
  def index
  end

  def show
    @photo = Photo.find(params[:id])
    @next_photo = @photo.next(:cycle => true)
    @previous_photo = @photo.previous(:cycle => true)
    @json_collection = Photo.to_json_collection(:current => @photo)
  end

end
