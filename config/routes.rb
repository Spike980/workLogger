Rails.application.routes.draw do

  namespace :api do
  get 'projects/index'
  end

  namespace :api do
  get 'projects/create'
  end

  namespace :api do
  get 'projects/update'
  end

  namespace :api do
  get 'projects/destroy'
  end

  namespace :api do
    resources :users, only: [:create] do
      resources :logs, only: [:index, :create, :update, :destroy]
      resources :projects, only: [:index, :create, :update, :destroy]
    end
    post 'api_tokens', to: 'api_tokens#create'
    delete 'api_tokens', to: 'api_tokens#destroy'
  end

  root 'welcome#angular'

end
