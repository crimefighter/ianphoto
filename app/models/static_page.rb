class StaticPage < ActiveRecord::Base
  validates_presence_of :name
  validates_presence_of :body
  validates_presence_of :slug
  validates_uniqueness_of :slug
  
  before_save :parameterize_slug

  def to_s
    name
  end

  private
    def parameterize_slug
      self.slug = self.slug.parameterize.underscore
    end
end
