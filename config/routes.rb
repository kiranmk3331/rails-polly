Rails.application.routes.draw do
  namespace :api do
    resources :polls, except: %i[new edit]
    resources :users, only: %i[create]
    resources :sessions, only: %i[create destroy]
  end
  put "/polls/:poll_id/options/:id", to: "options#update"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
