class Project < ActiveRecord::Base
	has_many :logs
	belongs_to :user

	validates_presence_of :project_name
	validates_uniqueness_of :project_name
end
