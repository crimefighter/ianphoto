ActionController::Routing::Routes.draw do |map|
  map.resources :photos
  map.resources :categories

  map.namespace :admin do |admin|
    admin.resources :photos, :collection => {:bulk_edit => :get, :bulk_update => :put}
    admin.resources :categories
  end
end
