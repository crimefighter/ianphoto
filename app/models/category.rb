class Category < ActiveRecord::Base
  validates_presence_of :name
  has_many :photos

  default_scope :order => "categories.position ASC"

  def self.set_order_on!(ids, options = nil)
    options ||= {}
    starting_with = options.fetch(:staring_with, 1).to_i.pred
    ids.each do |id|
      Category.update_all({:position => (starting_with = starting_with.next)}, {:id => id})
    end
  end

  def to_s; name end
  def to_i; id end
end
