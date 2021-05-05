class Option < ApplicationRecord
  belongs_to :poll
  validates :title, presence: true, length: { maximum: 150 }
end
