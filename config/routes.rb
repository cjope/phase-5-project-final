Rails.application.routes.draw do
  resources :items
  resources :users

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  put "/update", to: "users#update"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end