class Photo < ActiveRecord::Base
  belongs_to :category
  has_attached_file :picture, :styles => {:small => "200x200>", :processed => ""}, :processors => [:cropper]
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h, :crop_x2, :crop_y2, :crop_needed, :reset_cropping
  after_update :reprocess_picture, :if => :cropping_attributes_supplied?

  validates_presence_of :name
  validates_presence_of :category_id
  validates_attachment_presence :picture
  validates_attachment_content_type :picture, :content_type => ['image/jpeg', 'image/png', 'image/gif']
  validate :only_three_types_of_alignment_shall_stand

  named_scope :shuffled, :order => "rand()"
  named_scope :for_front_page, {:conditions => {:promote_to_front_page => true}}
  named_scope :from_category, lambda {|category| {:conditions => {:category_id => category.to_i}}}

  default_scope :order => "photos.position ASC"

  def to_i
    id
  end

  def to_param
    "#{id}-#{name.parameterize}"
  end

  def self.to_json_collection(options = nil, &block)
    options ||= {}
    current_id = options.fetch(:current, 0).to_i
    current_index = incrementoid = 0
    pure_data = scoped({}).map {|photo|
      parameters = [:id, :name, :description, [:picture, :processed], [:picture, :small], :alignment].map do |parameter|
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

  def self.set_order_on!(photo_ids, options = nil)
    options ||= {}
    starting_with = options.fetch(:staring_with, 1).to_i.pred
    photo_ids.each do |photo_id|
      Photo.update_all({:position => (starting_with = starting_with.next)}, {:id => photo_id})
    end
  end

  def cropping_attributes_supplied?
    return false if crop_needed == "false" && reset_cropping != "1"
    return false if crop_w.to_i == 0 || crop_h.to_i == 0
    !crop_x.blank? && !crop_y.blank? && !crop_w.blank? && !crop_h.blank?
  end

  def alignment
    vertical_alignment.blank? ? "center" : vertical_alignment.to_s
  end

  private
    def reprocess_picture
      picture.reprocess!
    end

    def only_three_types_of_alignment_shall_stand
      if vertical_alignment? && !["center", "top", "bottom"].include?(vertical_alignment.to_s)
        errors.add(:vertical_alignment, "should be top, center or bottom")
        return false
      end
      true
    end
end
