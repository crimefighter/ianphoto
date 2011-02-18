ActionController::Routing::Routes.draw do |map|
  map.resources :photos
  map.resources :categories

  map.static_page '/:slug.html', :controller => :static_pages, :action => :show

  map.namespace :admin do |admin|
    admin.resources :photos, :collection => {:bulk_edit => :get, :bulk_update => :put}
    admin.resources :categories
    admin.resources :static_pages
  end
end
