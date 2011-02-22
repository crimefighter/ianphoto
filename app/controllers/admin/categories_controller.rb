class Admin::CategoriesController < ApplicationController
  def index
    @categories = Category.all
    @category = Category.new
  end

  def show
    @category = Category.find(params[:id])
    @photos = @category.photos
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.new(params[:category])
    if @category.save
      redirect_to admin_categories_path
    else
      render :new
    end
  end

  def edit
    @category = Category.find(params[:id])
  end

  def update
    @category = Category.find(params[:id])
    @category.update_attributes(params[:category])
    if @photo_ids = params[:category].fetch(:photo_ids, false)
      Photo.set_order_on!(@photo_ids)
    end
    respond_to do |format|
      if @category.save
        format.html { redirect_to admin_categories_path }
        format.js { head :ok }
      else
        format.html { render :edit }
        format.js { render :nothing }
      end
    end
  end

  def arrange
    respond_to do |format|
      if @category_ids = params[:categories].fetch(:category_id, nil)
        Category.set_order_on!(@category_ids)
        format.js { head :ok }
      else
        format.js { render :nothing }
      end
    end
  end

  def destroy
    @category = Category.find(params[:id])
    if @category.photos.exists?
      return redirect_to bulk_edit_admin_photos_path(:category_id => @category.id, :to_destroy => :true)
    else
      @category.destroy
      redirect_to admin_categories_path
    end
  end
end
