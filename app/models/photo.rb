class Photo < ActiveRecord::Base
  belongs_to :category
  has_attached_file :picture, :styles => {:small => "200x200>"}

  validates_presence_of :name
  validates_presence_of :category_id
  validates_attachment_presence :picture
  validates_attachment_content_type :picture, :content_type => ['image/jpeg', 'image/png', 'image/gif']

  named_scope :previous, lambda { |p| {:order => "photos.position DESC", :conditions => ["photos.position < ? AND photos.category_id = ?", p.position, p.category_id], :limit => 1} }
  named_scope :next, lambda { |p| {:order => "photos.position ASC", :conditions => ["photos.position > ? AND photos.category_id = ?", p.position, p.category_id], :limit => 1} }

  default_scope :order => "photos.position ASC"

  def self.random
    unless (c = count).zero?
      first(:offset => rand(c))
    end
  end

  def self.set_order_on!(photo_ids, options = nil)
    options ||= {}
    starting_with = options.fetch(:staring_with, 1).to_i.pred
    photo_ids.each do |photo_id|
      Photo.update_all({:position => (starting_with = starting_with.next)}, {:id => photo_id})
    end
  end

  def next(options = nil)
    options ||= {}
    next_photo = Photo.next(self).try(:first)
    next_photo ||= self.category.photos.first if options.fetch(:cycle, false)
    next_photo
  end

  def previous(options = nil)
    options ||= {}
    next_photo = Photo.previous(self).try(:first)
    next_photo ||= self.category.photos.last if options.fetch(:cycle, false)
    next_photo
  end
end
