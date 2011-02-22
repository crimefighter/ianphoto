class CategoriesController < ApplicationController
  def show
    @category = Category.find(params[:id])
    if @category.photos.present?
      redirect_to @category.photos.first
    else
      redirect_to :root
    end
  end
end
