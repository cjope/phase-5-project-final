class User < ApplicationRecord
    has_secure_password
    has_many :user_items, dependent: :destroy, dependent: :delete_all
    has_many :items, through: :user_items

    before_create :case_names
    before_update :case_names

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

    def case_names
        self.username = username.downcase unless username.blank?    
        self.email = email.downcase unless email.blank?
    end

end