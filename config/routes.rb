ActionController::Routing::Routes.draw do |map|
  map.resources :photos
  map.resources :categories

  map.namespace :admin do |admin|
    admin.resources :photos
    admin.resources :categories
  end
end
