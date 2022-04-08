Rails.application.routes.draw do
  resources :user_items
  resources :categories
  resources :items
  resources :users

  get "/me", to: "users#show"
  post "/signup", to: "users#create"
  put "/update", to: "users#update"
  post "/create-item", to: "items#create"
  get "/user_items", to: "user_items#index"
  delete "/delete_item/:id", to: "user_items#destroy"
  get "/test", to: "user_items#test"


  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end