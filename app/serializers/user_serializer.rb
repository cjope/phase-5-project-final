class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password, :password_confirmation, :items
end