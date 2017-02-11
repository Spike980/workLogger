class Api::LogsController < ApiController
  respond_to :json
  before_filter :set_user

  def index
    respond_with :api, @user.logs.all.as_json(include: :project)
  end

  def create
    @logs = @user.logs.build(log_params)
    @project = Project.create(project_name: params[:project][:project_name])
    @logs.project_id = @project.id
    @logs.save 
    respond_with :api, @logs.as_json(include: :project), :location => nil
  end

  def update
    @logs = @user.logs.update(params[:id], log_params)
    @project = Project.find(params[:project_id])
    @project.project_name = params[:project][:project_name]
    @project.save
    respond_with :api, @logs
  end

  def destroy
    respond_with :api, @user.logs.destroy(params[:id])
  end

  private

    def set_user
      @user = User.find(params[:user_id])
    end

    def log_params
      params.require(:log).permit(:start_time, :user_id, :earning_in_rs, :time_in_hours)
    end
end
