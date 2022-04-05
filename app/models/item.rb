class Item < ApplicationRecord

    belongs_to :category
    has_many :user_items
    has_many :users, through: :user_items

    def timeframe
        t = self.ext_type
        e = self.extension.to_s
        if t == 1
            e + " day".pluralize(e)
        elsif t == 2
            e + " week".pluralize(e)
        elsif t == 3
            e + " month".pluralize(e)
        elsif t == 4
            e + " year".pluralize(e)
        end  
    end

    def storage_type
        t = self.storage
        t == 1 ? "Dry" : t == 2 ? "Fridge" : "Freezer"
    end

end