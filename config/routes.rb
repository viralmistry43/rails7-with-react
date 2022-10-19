Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :questions, only: :index do
        member do
          put :update_counter
        end
      end
    end
  end
end
