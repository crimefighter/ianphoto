class AddVerticalAlignmentToPhotos < ActiveRecord::Migration
  def self.up
    add_column :photos, :vertical_alignment, :string
  end

  def self.down
    remove_column :photos, :vertical_alignment
  end
end
