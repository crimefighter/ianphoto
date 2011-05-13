module MainHelper
  def error_messages_for(object)
    if object.errors.any?
      content_tag(:ul, object.errors.full_messages.map {|msg| content_tag(:li, msg)}.join.html_safe, :class => :error_messages)
    end
  end
end
