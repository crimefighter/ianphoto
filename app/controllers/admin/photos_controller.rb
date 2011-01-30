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
  
  def bulk_edit
    @category = Category.find(params[:category_id])
    @destroy_category = params.fetch(:to_destroy, false)
    @other_categories = Category.all - [@category]
  end

  def bulk_update
    @category = Category.find(params[:category_id])
    case
      when params[:move_to] && @destination_category_id = params[:move_to].fetch(:category_id, false)
        @category.photos.update_all(:category_id => @destination_category_id)
      when params.fetch(:destroy_all, false)
        @category.photos.destroy_all
    end
    if params.fetch(:destroy_category, false)
      @category.destroy
      redirect_to admin_categories_path
    else
      redirect_to admin_category_path(@category)
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    @category_id = @photo.category_id
    @photo.destroy
    redirect_to admin_category_path(@category_id)
  end

end
