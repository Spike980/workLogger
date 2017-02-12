class ChangeColumnEarningInRsOfLogs < ActiveRecord::Migration
  def change
  	change_column :logs, :earning_in_rs, :decimal, :precision => 11, :scale => 2
  end
end
