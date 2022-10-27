Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :questions, only: [:index, :create] do
        member do
          put :update_counter, :answer
        end
      end
    end
  end

  match '*path', to: 'home#index', via: :all
end
