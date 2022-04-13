class UserItemsController < ApplicationController


    def index
      render json: UserItem.all
    end
    
    def create
      current_user.user_items.create(item_id: params[:item_id])
    end

    def delete
      user = User.find(session[:user_id])
      item = current_user.user_items.find_by(item_id: params[:item_id]).destroy
      head :no_content
    end

end