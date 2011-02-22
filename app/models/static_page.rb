class StaticPage < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :body
  validates_presence_of :slug
  validates_uniqueness_of :slug
  
  before_save :parameterize_slug

  default_scope :order => "static_pages.position ASC"

  def self.set_order_on!(ids, options = nil)
    options ||= {}
    starting_with = options.fetch(:staring_with, 1).to_i.pred
    ids.each do |id|
      StaticPage.update_all({:position => (starting_with = starting_with.next)}, {:id => id})
    end
  end

  def to_s
    name
  end

  private
    def parameterize_slug
      self.slug = self.slug.parameterize.underscore
    end
end
