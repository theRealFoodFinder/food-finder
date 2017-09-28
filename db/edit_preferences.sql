UPDATE users SET user_preferences = $2
WHERE user_id = $1
RETURNING *;