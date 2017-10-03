# LIST OF ENDPOINTS

## - GET - 
/auth - Redirects to a login page

/auth/logout - Logs the user out

/api/getprofile - Returns all user data on session

/api/getPreferences - Returns user preferences from the user table

/api/favoriteRecipe/:id' - add a specific recipe id to your favorites list

/api/getShoppingList - Returns the list from the shopping_lists table

/api/getRecipe -  /api/getRecipe - POST - Returns a list of recipes based on the ingredients the user has entered, and the items that have been blacklisted. 
    Client should send an object with a .ingredients property {"ingredients": ['chicken', 'carrot', 'cheese']} and a .nutrition_info object 
    (accepts \`x +\`, \`x - y\`, or \`< y\` values, where x/y are min/max numbers respectively) -- { "calories": "1000+", "carbs": "<50", "protein": "10-70" } 

## - POST -

/api/blacklist - Accepts an object with type: add/remove, and a string of ingredients separated by a comma.  Ex: {type: add, ingredients: "list, of, ingredients")

/api/postShoppingList - Accepts an object with key value pair, ingredient: true/false.  True values get put on shopping list.  False go to the pantry in the users table.  Ex: {chicken: true, cheese: false}

/api/updateShoppingList - Accepts an object. 'items' as the key, and a string of comma separated items to replace the current shopping list in shopping_lists.  Ex: {items: "chicken, cheese"}

/api/appendShoppingList - Accepts an object. 'items' as the key, and a string of comma separated items to append to the current shopping list