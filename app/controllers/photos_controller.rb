class PhotosController < ApplicationController
  def index
  end

  def show
    @photo = Photo.find(params[:id])
    @next_photo = @photo.next(:cycle => true)
    @previous_photo = @photo.previous(:cycle => true)
    respond_to do |format|
      format.html
      format.json do
        @json_data = {}
        {:current_photo => @photo, :next_photo => @next_photo, :previous_photo => @previous_photo}.each do |key, photo|
          @json_data.merge!(
            key => (Hash[*([:original, :small].map {|k| ["#{k}_picture".to_sym, photo.picture(k)]}).flatten]).merge(
              :path => photo_path(photo, :format => :json)
            )
          )
        end
        render :json => @json_data
      end
    end
  end

end
