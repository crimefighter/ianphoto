Ianphoto::Application.routes.draw do
  resources :photos
  resources :categories

  match '/:slug.html' => 'static_pages#show', :as => :static_page

  namespace :admin do
    resources :photos do
      collection do
        get :bulk_edit
        put :bulk_update
      end
    end
    resources :categories do
      collection do
        put :arrange
      end
    end
    resources :static_pages do
      collection do
        put :arrange
      end
    end
    root :to => 'main#index'
  end

  root :to => 'main#index'
end
