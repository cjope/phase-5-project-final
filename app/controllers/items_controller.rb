class ItemsController < ApplicationController

    belongs_to :category

    def index
        render json: Item.all
    end

    def show
        render json: Item.find(params[:id])
    end

end