UPDATE users
SET user_favorites = $1
WHERE user_id = $2
RETURNING user_favorites, user_id;