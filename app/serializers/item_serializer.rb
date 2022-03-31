class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :perishable, :storage, :extension, :ext_type
end
