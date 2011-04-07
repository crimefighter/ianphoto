class PhotosController < ApplicationController
  def index
    redirect_to :root
  end

  def show
    @photo = Photo.find(params[:id])
    @json_collection = Photo.from_category(@photo.category_id).to_json_collection(:current => @photo) do |photo|
      photo[:path] = photo_path(photo[:id])
    end
  end

end
