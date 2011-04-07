class Photo < ActiveRecord::Base
  belongs_to :category
  has_attached_file :picture, :styles => {:small => "200x200>"}

  validates_presence_of :name
  validates_presence_of :category_id
  validates_attachment_presence :picture
  validates_attachment_content_type :picture, :content_type => ['image/jpeg', 'image/png', 'image/gif']

  named_scope :previous, lambda { |p| {:order => "photos.position DESC", :conditions => ["photos.position < ? AND photos.category_id = ?", p.position, p.category_id], :limit => 1} }
  named_scope :next, lambda { |p| {:order => "photos.position ASC", :conditions => ["photos.position > ? AND photos.category_id = ?", p.position, p.category_id], :limit => 1} }
  named_scope :shuffled, :order => "random()"
  named_scope :exclude, lambda {|photos| {:conditions => ["id NOT IN (?)", photos.to_a.map(&:to_i)]} }
  named_scope :throw_back, lambda {|photos| {:order => "(id NOT IN (#{photos.to_a.map(&:to_i).join(",")})) DESC"}} #ensures that passed photos are at the end of collection
  named_scope :for_front_page, lambda {|photos| {:conditions => {:promote_to_front_page => true}}}
  named_scope :from_category, lambda {|category| {:conditions => {:category_id => category.to_i}}}

  default_scope :order => "photos.position ASC"

  def to_i
    id
  end

  def self.to_json_collection(options = nil, &block)
    options ||= {}
    current_id = options.fetch(:current, 0).to_i
    current_index = incrementoid = 0
    pure_data = scoped({}).map {|photo|
      parameters = [:id, :name, :description, [:picture, :original], [:picture, :small]].map do |parameter|
        [parameter.to_a.reverse.join("_"), photo.send(*parameter.to_a)]
      end
      current_index = incrementoid if current_id == photo.id
      incrementoid+=1
      Hash[*parameters.flatten].symbolize_keys
    }
    if block_given?
      pure_data.each(&block)
    end
    {:items => pure_data, :start => options.fetch(:start_index, current_index)}.to_json
  end

  def self.random(options = nil)
    options ||= {}
    if exclude_ids = options.fetch(:exclude_ids, nil)
      conditions = ["photos.id NOT IN(?)", exclude_ids.to_a]
    end
    unless (c = count).zero?
      first(:offset => rand(c), :conditions => conditions)
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
