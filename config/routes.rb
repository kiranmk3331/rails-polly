Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  # get "/polls", to: "polls#index"
  # get "/polls/:id", to: "polls#show"
  # post "/polls", to: "polls#create"
  # delete "/polls/:id", to: "polls#destroy"

  resources :polls
end
