class Api::LogsController < ApiController
  respond_to :json
  before_filter :set_user

  def index
    respond_with :api, @user.logs.all
  end

  def create
    respond_with :api, @user.logs.create(log_params), :location => nil
  end

  def update
    respond_with :api, @user.logs.update(params[:id], log_params)
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
