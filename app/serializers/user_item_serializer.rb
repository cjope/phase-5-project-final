class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :item_id, :test

  def test
    object.items.first.name
  end

end
