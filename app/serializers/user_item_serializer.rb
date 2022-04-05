class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :user, :item
end
