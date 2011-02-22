class AddPromoteToFrontPageToPhotos < ActiveRecord::Migration
  def self.up
    add_column :photos, :promote_to_front_page, :boolean, :nil => false, :default => true
  end

  def self.down
    remove_column :photos, :promote_to_front_page
  end
end
