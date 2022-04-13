class ApplicationController < ActionController::Base
    include ActionController::Cookies
    skip_before_action :verify_authenticity_token
    before_action :current_user

    private
    def current_user
        return unless session[:user_id]
        @current_user ||= User.find(session[:user_id])
    end

end