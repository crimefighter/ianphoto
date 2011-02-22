ActionController::Routing::Routes.draw do |map|
  map.resources :photos
  map.resources :categories

  map.static_page '/:slug.html', :controller => :static_pages, :action => :show

  map.namespace :admin do |admin|
    admin.root :controller => :main, :action => :index
    admin.resources :photos, :collection => {:bulk_edit => :get, :bulk_update => :put}
    admin.resources :categories, :collection => {:arrange => :put}
    admin.resources :static_pages, :collection => {:arrange => :put}
  end

  map.root :controller => :main, :action => :index
end
