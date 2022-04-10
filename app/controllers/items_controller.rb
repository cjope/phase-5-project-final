class ItemsController < ApplicationController

    def index
        render json: Item.all
    end

    def show
        render json: Item.find(params[:id])
    end

    def create
        item = Item.create!(item_params)
        render json: item
    end

    def destroy
        item = Item.find(params[:id])
        item.destroy
        head :no_content
    end

    private

    def item_params
        params.permit(:name, :perishable, :storage, :extension, :ext_type, :category_id)
    end

        # name: "test", perishable: true, storage: 1, extension: 3, category_id: 2, ext_type:3

end