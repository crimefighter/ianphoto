# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  layout "application"

  # Scrub sensitive parameters from your log
  filter_parameter_logging :password

  before_filter :load_static_pages, :require_authentication_for_admin

  protected
    def load_static_pages
      @static_pages = StaticPage.all
    end

    def require_authentication_for_admin
      if self.class.name.split("::").first.eql?("Admin")
        authenticate_or_request_with_http_basic do |username, password|
          username == "foo" && password == "bar"
        end
      end
    end
end
