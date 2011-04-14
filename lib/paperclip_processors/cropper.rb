module Paperclip
  class Cropper < Thumbnail
    def transformation_command
      if crop_command
        if super.is_a?(Array)
          crop_command + super.join(" ").sub(/ -crop \S+/, '')
        else
          crop_command + super.sub(/ -crop \S+/, '')
        end
      else
        super
      end
    end
    
    def crop_command
      target = @attachment.instance
      if target.cropping_attributes_supplied?
        " -crop '#{target.crop_w.to_i}x#{target.crop_h.to_i}+#{target.crop_x.to_i}+#{target.crop_y.to_i}' "
      end
    end
  end
end
