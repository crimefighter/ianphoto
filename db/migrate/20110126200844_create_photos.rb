class CreatePhotos < ActiveRecord::Migration
  def self.up
    create_table :photos do |t|
      t.string :name
      t.text :description
      t.references :category
      t.integer :position

      t.timestamps
    end
  end

  def self.down
    drop_table :photos
  end
end