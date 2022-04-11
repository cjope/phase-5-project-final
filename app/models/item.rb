class Item < ApplicationRecord

    belongs_to :category
    has_many :user_items
    has_many :users, through: :user_items, dependent: :destroy

    def timeframe
        t = self.ext_type
        e = self.extension
        m = ""
        if t == 1
            m = "day".pluralize(e)
        elsif t == 2
            m = "week".pluralize(e)
        elsif t == 3
            m = "month".pluralize(e)
        elsif t == 4
            m = "year".pluralize(e)
        end  
        e.to_s + " " + m
    end

    def storage_type
        t = self.storage
        t == 1 ? "Dry" : t == 2 ? "Fridge" : "Freezer"
    end

end