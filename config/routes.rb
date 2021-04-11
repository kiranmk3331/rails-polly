Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get "/polls", to: "polls#index"
  # get "/polls/:id", to: "polls#show"
  # post "/polls", to: "polls#create"
  # delete "/polls/:id", to: "polls#destroy"
  resources :users
  resources :polls
  put "/polls/:poll_id/options/:option_id", to: "options#count"

  root "home#index"
  get "*path", to: "home#index", via: :all
end
