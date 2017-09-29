SELECT * FROM recipes
WHERE (ingredients LIKE '%' || $1 || '%' AND ingredients LIKE '%' || $2 || '%');