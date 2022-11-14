json.array! @users do |user|
  json.id user.id
  json.name user.name
  json.email user.email
  json.gender user.gender
  json.birthday user.birthday
  json.display_birthday user.birthday.present? ? user.birthday.strftime("%b %d, %Y") : ''
  json.preferred_os user.preferred_os
  json.age user.age
  json.enable user.enable
end
