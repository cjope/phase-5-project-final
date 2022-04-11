class UserItem < ApplicationRecord
    belongs_to :user
    belongs_to :item

    def self.show_items(id)
        user_items = UserItem.where(id)
        items_array = user_items.pluck(:item_id)
        items = Item.where(id: items_array)
    end

    # def timeframe
    #     self.item.timeframe
    # end

end
