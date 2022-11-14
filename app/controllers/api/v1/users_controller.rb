class Api::V1::UsersController < ApplicationController

  protect_from_forgery with: :null_session
  before_action :set_user, only: [:update, :destroy]

  def index
    @users = User.order(:id)
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: { data: @user, message: 'User created successfully.', status: 'success' }, status: :created
    else
      render json: { message: @user.errors.full_messages.join(', '), status: 'failure' }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: { data: @user, message: 'User updated successfully.', status: 'success' }, status: :ok
    else
      render json: { message: @user.errors.full_messages.join(', '), status: 'failure' }, status: :unprocessable_entity
    end
  end

  def destroy
    if @user.destroy
      render json: { data: @user, message: 'User destroy successfully.', status: 'success' }, status: :ok
    else
      render json: { message: @user.errors.full_messages.join(', '), status: 'failure' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :name, :email, :gender, :birthday, :age, :preferred_os, :enable
    )
  end

  def set_user
    @user = User.find_by_id(params[:id])
    render json: { message: 'User not found', status: 'failure' }, status: :not_found if @user.blank?
  end
end
