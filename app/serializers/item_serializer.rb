class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :perishable, :extension, :ext_type, :timeframe, :storage, :storage_type, :likes, :alt_id,  :category_id, :category_name, :sort_by_category,

  # Causes traceback error and direct calls to /items... but still adds to item - need to make into a class method but having issues with current_user
  #shows if CURRENT user hass this item liked - probably a better way to do this but it is working at the moment 
  def likes
    i = object.users.where(id: current_user.id).count
    i == 1 ? true : false
  end

  def category_name
    object.category.name
  end

  def sort_by_category
    object.category.items
  end

  def alt_id
    i = object.user_items.where(user_id: current_user.id).ids
    i.first
  end

end