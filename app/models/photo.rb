class Photo < ActiveRecord::Base
  belongs_to :category
  has_attached_file :picture, :styles => {:small => "200x200>"}

  validates_presence_of :name
  validates_presence_of :category_id
  validates_attachment_presence :picture
  validates_attachment_content_type :picture, :content_type => ['image/jpeg', 'image/png', 'image/gif']
end
