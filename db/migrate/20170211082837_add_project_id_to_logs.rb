class AddProjectIdToLogs < ActiveRecord::Migration
  def change
    add_reference :logs, :project, index: true
  end
end
