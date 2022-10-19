json.array! @questions do |question|
  json.id question.id
  json.title question.title
  json.tag question.tag
  json.likes_count question.likes_count
  json.dislikes_count question.dislikes_count
end
