require File.expand_path('../boot', __FILE__)

require 'rails/all'

# If you have a Gemfile, require the gems listed there, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env) if defined?(Bundler)

module Ianphoto
  class Application < Rails::Application
    config.encoding = "utf-8"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password]


    SHADOW = YAML.load_file("#{Rails.root}/config/shadow.yml")
    if Rails.env == "production" or true
      config.middleware.use("Rack::GoogleAnalytics", :web_property_id => SHADOW["ga_code"])
    end
  end
end
