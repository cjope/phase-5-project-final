class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :items

  def items

    items = Item.where(category_id: object.id)
    # user = unless current_user.blank? then return current_user.id end
    items.map { |item| {
        id: item.id,
        name: item.name,
        perishable: item.perishable,
        storage: item.storage,
        storage_type: item.storage_type,
        extension: item.extension,
        ext_type: item.ext_type,
        timeframe: item.timeframe,
        # liked: !item.users.where(id: current_user.id).blank?,
        # liked: user
        user_blank: current_user == nil   ? "yes" : !item.users.where(id: current_user.id).blank?
    }}
  end

end