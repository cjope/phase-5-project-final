class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :render_not_found
    
        def index
          render json: User.all
        end
        
        def show
          user = User.find_by(id: session[:user_id])
          render json: user
        end

        def items
          user = User.find_by(id: session[:user_id])
          items = UserItem.where(user_id: user.id)
          render json: items
        end
        
        def create
          user = User.create!(user_params)
          user.valid?
          session[:user_id] = user.id
          render json: user, status: :created
        end
        
        def update
          user = User.find_by(id: session[:user_id])
          user.update!(user_params)
          render json: user, status: :ok
        end
        
        def destroy
          user = User.find_by(id: params[:id])
          user.destroy!
          head :no_content
        end

        def ext_time
          render json: self.timeframe
        end

        private
        
          def user_params
            params.permit(:username, :password, :password_confirmation, :email)
          end
        
          def user_update_params
            params.permit(:username, :password, :password_confirmation, :email)
          end
    
          def render_not_found(invalid)
            render json: { errors: invalid}
          end
        
    end