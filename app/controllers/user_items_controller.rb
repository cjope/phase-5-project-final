class UserItemsController < ApplicationController

    def index
        render json: UserItem.all
    end

    def show
      cart = UserItem.where(user_id: session[:user_id])
      render json: cart
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