class Poll < ApplicationRecord
  belongs_to :user
  has_many :options, dependent: :delete_all
  validates :title, presence: true, length: { maximum: 100 }
end
