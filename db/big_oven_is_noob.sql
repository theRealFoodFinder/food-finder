INSERT INTO recipes (title, description, cuisine, category, sub_category, primary_ingredient, web_url, image_url, ingredients, instructions, yield, total_minutes, active_minutes, nutrition_info, all_categories_text, hero_photo_url)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
RETURNING *;