class ApplicationController < ActionController::Base
    include ActionController::Cookies

    #fix issues with orgin - thinks it's forgery
    skip_before_action :verify_authenticity_token

end