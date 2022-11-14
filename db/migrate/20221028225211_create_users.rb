class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string  :name
      t.string  :email
      t.string  :gender
      t.string  :preferred_os
      t.date    :birthday
      t.integer :age
      t.boolean :enable, default: false

      t.timestamps
    end
  end
end
