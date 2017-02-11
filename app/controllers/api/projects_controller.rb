class Api::ProjectsController < ApiController
  respond_to :json
  before_filter :set_user

  def index
    respond_with :api, @user.projects.all
  end

  def create
  	@projects = @user.projects.create(project_params)
    respond_with :api, @projects, :location => nil
  end

  def update
    respond_with :api, @user.projects.update(params[:id], project_params)
  end

  def destroy
    respond_with :api, @user.projects.destroy(params[:id])
  end

  private

    def set_user
      @user = User.find(params[:user_id])
    end

    def project_params
      params.require(:project).permit(:project_name, :user_id)
    end
end
