class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :items

  def items

    items = Item.where(category_id: object.id)
    items.map { |item| {
        id: item.id,
        name: item.name,
        perishable: item.perishable,
        storage: item.storage,
        storage_type: item.storage_type,
        extension: item.extension,
        ext_type: item.ext_type,
        timeframe: item.timeframe,
        liked: current_user == nil   ? nil : !item.users.where(id: current_user.id).blank?
    }}
  end

end