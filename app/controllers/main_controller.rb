class MainController < ApplicationController
  def index
    @photo = Photo.random
  end
end
