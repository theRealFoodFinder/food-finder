SELECT * FROM recipes
WHERE (ingredients LIKE '%' || $1 || '%');