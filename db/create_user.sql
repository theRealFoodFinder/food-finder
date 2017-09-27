INSERT INTO users
(first_name, last_name, user_favorites, user_email, join_date, user_preferences, auth_id)
VALUES ($1, $2, NULL, $3, current_timestamp, NULL, $4)
RETURNING *;
