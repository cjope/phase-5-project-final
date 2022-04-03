class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :name
      t.boolean :perishable
      t.integer :storage
      t.integer :extension
      t.integer :ext_type
      t.belongs_to :category

      t.timestamps
    end
  end
end
