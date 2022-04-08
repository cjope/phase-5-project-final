class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :perishable, :extension, :ext_type, :timeframe, :storage, :storage_type, :category, :users

end