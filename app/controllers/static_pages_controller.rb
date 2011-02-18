class StaticPagesController < ApplicationController
  def show
    @static_page = StaticPage.find_by_slug(params[:slug])
  end

end
