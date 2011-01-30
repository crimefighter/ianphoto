class Photo < ActiveRecord::Base
  belongs_to :category
  has_attached_file :picture, :styles => {:small => "200x200>"}

  validates_presence_of :name
  validates_presence_of :category_id
  validates_attachment_presence :picture
  validates_attachment_content_type :picture, :content_type => ['image/jpeg', 'image/png', 'image/gif']

  default_scope :order => "photos.position ASC"

  def self.set_order_on!(photo_ids, options = nil)
    options ||= {}
    starting_with = options.fetch(:staring_with, 1).to_i.pred
    photo_ids.each do |photo_id|
      Photo.update_all({:position => (starting_with = starting_with.next)}, {:id => photo_id})
    end
  end
end
