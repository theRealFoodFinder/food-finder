UPDATE users
    SET blacklist = $1
    WHERE user_id = $2
    RETURNING blacklist;