class Admin::StaticPagesController < ApplicationController
  def index
    @static_pages = StaticPage.all
  end

  def new
    @static_page = StaticPage.new
  end

  def create
    @static_page = StaticPage.new(params[:static_page])
    if @static_page.save
      redirect_to admin_static_pages_path
    else
      render :new
    end
  end

  def edit
    @static_page = StaticPage.find(params[:id])
  end

  def update
    @static_page = StaticPage.find(params[:id])
    if @static_page.update_attributes
      redirect_to admin_static_pages_path
    else
      render :edit
    end
  end

  def destroy
    @static_page = StaticPage.find(params[:id])
    @static_page.destroy
    redirect_to admin_static_pages_path
  end

end
