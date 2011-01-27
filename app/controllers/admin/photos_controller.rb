class Admin::PhotosController < ApplicationController
  def new
    @photo = Photo.new
    @category_id = params[:category_id]
    if @category_id
      @category = Category.find(@category_id)
    end
  end

  def create
    @photo = Photo.new(params[:photo])
    if @photo.save
      redirect_to admin_category_path(@photo.category_id)
    else
      render "new"
    end
  end

  def edit
    @photo = Photo.find(params[:id])
  end

  def update
    @photo = Photo.find(params[:id])
    if @photo.update_attributes(params[:photo])
      redirect_to admin_category_path(@photo.category_id)
    else
      render "edit"
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @category_id = @photo.category_id
    @photo.destroy
    redirect_to admin_category_path(@category_id)
  end

end
