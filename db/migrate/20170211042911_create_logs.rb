class CreateLogs < ActiveRecord::Migration
  def change
    create_table :logs do |t|
      t.integer :user_id
      t.datetime :start_time
      t.decimal :earning_in_rs, :precision => 5, :scale => 2
      t.decimal :time_in_hours, :precision => 5, :scale => 2

      t.timestamps
    end
  end
end
