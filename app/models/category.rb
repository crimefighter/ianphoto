class Category < ActiveRecord::Base
  validates_presence_of :name
  has_many :photos

  def to_s; name end
end
