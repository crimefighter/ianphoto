class StaticPagesController < ApplicationController
  def show
    @static_page = StaticPage.find_by_slug(params[:slug])
    respond_to do |format|
      format.html { @photo = Photo.random }
      format.js {render :partial => "static_pages/content"}
    end
  end

end
