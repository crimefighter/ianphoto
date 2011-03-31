class PhotosController < ApplicationController
  def index
    redirect_to :root
  end

  def show
    @photo = Photo.find(params[:id])
    @next_photo = @photo.next(:cycle => true)
    @previous_photo = @photo.previous(:cycle => true)
    @json_collection = @photo.category.photos.to_json_collection(:current => @photo) do |photo|
      photo[:path] = photo_path(photo[:id])
    end
  end

end
