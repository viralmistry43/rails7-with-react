class User < ApplicationRecord
  validates :name, :gender, presence: true
  validates :email, presence: true, uniqueness: true
end
