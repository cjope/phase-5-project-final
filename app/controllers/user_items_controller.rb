class UserItemsController < ApplicationController


    def index
      render json: UserItem.show_items(user_id: session[:user_id])
    end
    
    def create
      item = UserItem.where(user_id: session[:user_id], item_id: params[:item_id])
      render json: UserItem.create!(user_id: session[:user_id], item_id: params[:item_id])
    end

    def delete
      user = User.find(session[:user_id])
      item = user.user_items.find_by(item_id: params[:item_id])
      user.user_items.destroy(item.id)
      head :no_content
    end

    # def destroy
    #   user = User.find(session[:user_id])
    #   item = user.items.find(params[:item_id])
    #   item.delete
    #   head :no_content
    # end

end