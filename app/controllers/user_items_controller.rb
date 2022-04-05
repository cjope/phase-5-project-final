class UserItemsController < ApplicationController

    def index
      items = UserItem.where(user_id: session[:user_id])
      render json: items
    end
    
    def create
      render json: UserItem.create!(user_id: session[:user_id], item_id: params[:item_id])
    end

    def destroy
      item = UserItem.find(params[:id])
      item.delete
      head :no_content
    end

end