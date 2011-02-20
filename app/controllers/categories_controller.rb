class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    redirect_to @category.photos.first
  end
end
