class UserItemsController < ApplicationController


    def index
      render json: UserItem.show_items(user_id: session[:user_id])
    end
    
    def create
      render json: UserItem.create!(user_id: session[:user_id], item_id: params[:item_id])
    end

    def destroy
      user = User.find(session[:user_id])
      item = user.items.find(params[:item_id])
      item.delete
      head :no_content
    end

end