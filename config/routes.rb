Rails.application.routes.draw do

  resources :polls, except: %i[new edit]
  resources :users, only: %i[create]
  resources :sessions, only: %i[create destroy]
  put "polls/:poll_id/options/:id", to: "options#count"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
