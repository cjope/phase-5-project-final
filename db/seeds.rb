Category.create!(name: "Produce")
Category.create!(name: "Snack")
Category.create!(name: "Dairy")

User.create!(username: "admin", email: "admin@email.com", password: "123", password_confirmation: "123", is_admin: "true")
User.create!(username: "skroob", email: "skroob@email.com", password: "12345", password_confirmation: "12345", is_admin: "false")

Item.create!(name: "Potatoes", perishable: true, extension: 5, ext_type: 2, storage: 1, category_id: 1)
Item.create!(name: "Bananas", perishable: true, extension: 1, ext_type: 2, storage: 1, category_id: 1)
Item.create!(name: "Cookies", perishable: false, extension: 4, ext_type: 3, storage: 1, category_id: 2)
Item.create!(name: "Milk", perishable: true, extension: 1, ext_type: 2, storage: 2, category_id: 3)
Item.create(name: "Tomatoes", perishable: true, extension: 1, ext_type: 2, storage: 2, category_id: 1)
Item.create(name: "Chips", perishable: false, extension: 3, ext_type: 3, storage: 1, category_id: 2)
Item.create(name: "Soy Milk", perishable: true, extension: 10, ext_type: 1, storage: 1, category_id: 3)