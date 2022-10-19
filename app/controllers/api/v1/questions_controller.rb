class Api::V1::QuestionsController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    if params[:tags].present? && params[:tags] != 'All'
      @questions = Question.where(tag: params[:tags]).order(created_at: :asc)
    else
      @questions = Question.all.order(created_at: :asc)
    end
  end

  def update_counter
    @question = Question.find(params[:id])
    if params[:count_for] == 'like'
      @question.update(likes_count: @question.likes_count + 1)
    elsif params[:count_for] == 'dislike'
      @question.update(dislikes_count: @question.dislikes_count + 1)
    end
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render json: { data: @question, status: 'success' }, status: :ok
    else
      render json: { data: @question.errors.full_messages, status: 'failure' }, status: :unprocessable_entity
    end
  end

  def answer
    @question = Question.find(params[:id])
    @question.update(answer: params[:answer])
    render json: @question, status: :ok
  end

  private

  def question_params
    params.require(:question).permit(:title, :tag)
  end

end
