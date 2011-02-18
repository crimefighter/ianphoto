# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  def static_page_path(static_page)
    "/#{static_page.slug}.html"
  end
end
