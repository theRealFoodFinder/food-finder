const express = require('express'),
			session = require('express-session'),
			bodyParser = require('body-parser'),
			cors = require('cors'),
			passport = require('passport'),
			axios = require('axios'),
			Auth0Strategy = require('passport-auth0'),
			massive = require('massive'),
			config = require('./config.js');

const app = express();

massive({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  ssl: true
}).then( db => {
  app.set('db', db);
})

app.use(bodyParser.json());
app.use(cors());
app.use(session({
	secret: config.sessionSecret,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain: config.AUTH_DOMAIN,
  clientID: config.AUTH_CLIENT_ID,
  clientSecret: config.AUTH_CLIENT_SECRET,
  callbackURL: config.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

	const db = app.get('db');
	db.find_session_user([ profile._json.email ])
  .then( user => {
   if ( user[0] ) {
     return done( null, user[0]);
   }
    else {
        if (profile.provider === 'auth0') {
            db.create_user([ profile._json.user_metadata.first_name, profile._json.user_metadata.last_name, profile._json.email, profile.identities[0].user_id])
            .then( user => {
                return done( null, user[0]);
            })
        } else {
            db.create_user([ profile._json.given_name, profile._json.family_name, profile._json.email, profile.identities[0].user_id ])
            .then( user => {
                return done( null, user[0]);
            })
        }
    }
  })

}));

passport.serializeUser(function(user, done){

    let sessionUser = {id: user.user_id, first: user.first_name, last: user.last_name, email: user.user_email}
    done(null, sessionUser);
})

passport.deserializeUser(function(user, done){
		if (user) {
			return done(null, user)
		}
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/search',
    failureRedirect: 'http://localhost:3000/#/failed'
}));

app.get('/auth/me', (req, res, next) => {

    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req,res) => {
    console.log(`user ${req.user.id} has logged out`)
    req.logOut();
    return res.redirect(302, '/#/')
})

app.get('/getProfile', (req, res) => {
	res.status(200).send(db.profile)
})

app.post('/api/getRecipe', (req,res) => {
	console.log('/getRecipe hit')
	let search = req.body
	let searchParams = []

	if (search){
		console.log('request has body!')
		if (search.cuisine){
			console.log('cuisine searching')
		}
		if (search.ingredients){
				let ingList = search.ingredients
				console.log('ingr', ingList)
				if (ingList.length === 1) {
					searchParams = ingList;
					console.log('1 ingredient')
					app.get('db').get_recipe_1(searchParams).then((response) => {



						let filters = {min: {}, max: {}}
						let nutInf = search.nutrition_info;
						for (let ing in nutInf){
							
							switch (ing){
								case 'calories':
									nutInf.TotalCalories = nutInf[ing];
									delete nutInf.calories
									break;
								case 'total_fat':
									nutInf.TotalFat = nutInf[ing];
									delete nutInf.total_fat
									break;
								case 'sodium':
									nutInf.Sodium = nutInf[ing];
									delete nutInf.sodium;
									break;
								case 'carbs':
									nutInf.TotalCarbs = nutInf[ing];
									delete nutInf.carbs;
									break;
								case 'sugar':
									nutInf.Sugar = nutInf[ing];
									delete nutInf.sugar;
									break;
								case 'protein':
									nutInf.Protein = nutInf[ing];
									delete nutInf.protein;
									break;
								default:
									break;
							}
						}

						for (var prop in nutInf){
							if (nutInf[prop]){
								if (nutInf[prop].includes('-')) {
									let item = nutInf[prop].replace(/[a-z]/gi, '')
									item = item.split('-')
									filters.min[prop] = +item[0]
									filters.max[prop] = +item[1]
								}
								if (nutInf[prop].includes('<')) {
									let item = nutInf[prop].split(' ')
									filters.min[prop] = 0
									filters.max[prop] = +item[1]
								}
								if (nutInf[prop].includes('+')) {
									let item = nutInf[prop].replace(/\+/g, '')
									filters.min[prop] = +item
									filters.max[prop] = 9999
								}
							}
						}

						let recipeList = [];
						for (var go = 0; go < response.length; go++){

						response[go].ingredients = JSON.parse(response[go].ingredients)
						response[go].nutrition_info = JSON.parse(response[go].nutrition_info)
						recipeList.push(response[go])
						}
							
						let filteredRecipes = response.filter((recipe,i,a)=>{
							let result = true
							for (var type in filters.min){
								if (recipe.nutrition_info[type] <= filters.min[type] || recipe.nutrition_info[type] >= filters.max[type]){
									result = false
								}
							}
							if (result) return recipe
						})

						res.status(200).send(filteredRecipes);
					})
				} else if (ingList.length === 2) {
					// console.log('2 ingredient')
					// searchParams = ingList;
					// app.get('db').get_recipe_2(searchParams).then((response) => {
					// 	res.status(200).send(response);
					// })
					searchParams = ingList;
					console.log('2 ingredient')
					app.get('db').get_recipe_2(searchParams).then((response) => {



						let filters = {min: {}, max: {}}
						let nutInf = search.nutrition_info;
						for (let ing in nutInf){
							
							switch (ing){
								case 'calories':
									nutInf.TotalCalories = nutInf[ing];
									delete nutInf.calories
									break;
								case 'total_fat':
									nutInf.TotalFat = nutInf[ing];
									delete nutInf.total_fat
									break;
								case 'sodium':
									nutInf.Sodium = nutInf[ing];
									delete nutInf.sodium;
									break;
								case 'carbs':
									nutInf.TotalCarbs = nutInf[ing];
									delete nutInf.carbs;
									break;
								case 'sugar':
									nutInf.Sugar = nutInf[ing];
									delete nutInf.sugar;
									break;
								case 'protein':
									nutInf.Protein = nutInf[ing];
									delete nutInf.protein;
									break;
								default:
									break;
							}
						}

						for (var prop in nutInf){
							if (nutInf[prop]){
								if (nutInf[prop].includes('-')) {
									let item = nutInf[prop].replace(/[a-z]/gi, '')
									item = item.split('-')
									filters.min[prop] = +item[0]
									filters.max[prop] = +item[1]
								}
								if (nutInf[prop].includes('<')) {
									let item = nutInf[prop].split(' ')
									filters.min[prop] = 0
									filters.max[prop] = +item[1]
								}
								if (nutInf[prop].includes('+')) {
									let item = nutInf[prop].replace(/\+/g, '')
									filters.min[prop] = +item
									filters.max[prop] = 9999
								}
							}
						}

						let recipeList = [];
						for (var go = 0; go < response.length; go++){

						response[go].ingredients = JSON.parse(response[go].ingredients)
						response[go].nutrition_info = JSON.parse(response[go].nutrition_info)
						recipeList.push(response[go])
						}
							
						let filteredRecipes = response.filter((recipe,i,a)=>{
							let result = true
							for (var type in filters.min){
								if (recipe.nutrition_info[type] <= filters.min[type] || recipe.nutrition_info[type] >= filters.max[type]){
									result = false
								}
							}
							if (result) return recipe
						})

						res.status(200).send(filteredRecipes);
					})
				} else if (ingList.length === 3) {
					// console.log('3 ingredient')
					// searchParams = ingList;
					// app.get('db').get_recipe_3(searchParams).then((response) => {
					// 	res.status(200).send(response);
					// })
					searchParams = ingList;
					console.log('3 ingredient')
					app.get('db').get_recipe_3(searchParams).then((response) => {



						let filters = {min: {}, max: {}}
						let nutInf = search.nutrition_info;
						for (let ing in nutInf){
							
							switch (ing){
								case 'calories':
									nutInf.TotalCalories = nutInf[ing];
									delete nutInf.calories
									break;
								case 'total_fat':
									nutInf.TotalFat = nutInf[ing];
									delete nutInf.total_fat
									break;
								case 'sodium':
									nutInf.Sodium = nutInf[ing];
									delete nutInf.sodium;
									break;
								case 'carbs':
									nutInf.TotalCarbs = nutInf[ing];
									delete nutInf.carbs;
									break;
								case 'sugar':
									nutInf.Sugar = nutInf[ing];
									delete nutInf.sugar;
									break;
								case 'protein':
									nutInf.Protein = nutInf[ing];
									delete nutInf.protein;
									break;
								default:
									break;
							}
						}

						for (var prop in nutInf){
							if (nutInf[prop]){
								if (nutInf[prop].includes('-')) {
									let item = nutInf[prop].replace(/[a-z]/gi, '')
									item = item.split('-')
									filters.min[prop] = +item[0]
									filters.max[prop] = +item[1]
								}
								if (nutInf[prop].includes('<')) {
									let item = nutInf[prop].split(' ')
									filters.min[prop] = 0
									filters.max[prop] = +item[1]
								}
								if (nutInf[prop].includes('+')) {
									let item = nutInf[prop].replace(/\+/g, '')
									filters.min[prop] = +item
									filters.max[prop] = 9999
								}
							}
						}

						let recipeList = [];
						for (var go = 0; go < response.length; go++){

						response[go].ingredients = JSON.parse(response[go].ingredients)
						response[go].nutrition_info = JSON.parse(response[go].nutrition_info)
						recipeList.push(response[go])
						}
							
						let filteredRecipes = response.filter((recipe,i,a)=>{
							let result = true
							for (var type in filters.min){
								if (recipe.nutrition_info[type] <= filters.min[type] || recipe.nutrition_info[type] >= filters.max[type]){
									result = false
								}
							}
							if (result) return recipe
						})

						res.status(200).send(filteredRecipes);
					})
				}
		}
		if (search.category){
			console.log('category searching')
		}
		if (search.title){
			console.log('title searching')
		}
	}
})

app.get('/api/favoriteRecipe/:id', (req, res) => {
	let {recipe_id} = req.params.id;

	app.get('db').get_favorites([req.user.id]).then((response) => {
		response = response[0].user_favorites
		if (!response.includes(`,${recipe_id},`)){
			response += recipe_id + ','
			app.get('db').add_to_favorites([response, 1]).then((responseTwo) => {
				res.status(200).send(responseTwo);
			})
		} else res.status(200).send(response);
	})
})

app.get('/api/getFavorites', (req, res) => {
	app.get('db').get_favorites([req.user.id]).then((response) => {
		res.status(200).send(response);
	})
})

 app.post('/api/postShoppingList', (req, res) => {
    function formatIngredients(ingArr){
        let regex = /\(.*\)|\(.*|\'|;|\*|^ | or .*| in .*| for .*| to taste .*|=/g
        for (var x=ingArr.length-1; x >= 0; x--){
          ingArr[x] = ingArr[x].toLowerCase();
          ingArr[x] = ingArr[x].replace(regex, '');
          ingArr[x] = ingArr[x].replace(/^ |\s$/g, '');
          if(/ and |[0-9]|[-!$%^&*()_+|~=`{}\[\]:<>?,.\/]/.test(ingArr[x])){
            ingArr.splice(x, 1);
          }
        } return ingArr;
      }

    var ingredients = [];
    var shoppingList = [];
    for (let i in req.body){
        if (req.body[i]){
            shoppingList.push(i);
        }
        else {
            ingredients.push(i)
        }
    }
    app.get('db').post_shopping_list([1, shoppingList.join(',')]);
    app.get('db').post_ingredient_list([1, formatIngredients(ingredients).join(',')])
})

app.post('/api/hitBigOven', (req, res)=> {
		let search = req.body;
		console.log('endpoint hit')
		let url = `http://api2.bigoven.com/recipes/random?api_key=${config.bigOvenKey}`

			for (let i = 0; i < 500; i++){
				let randy = (Math.random() * (8 - 3) + 3)
				setTimeout(() => {
				console.log(~~randy + ' seconds')
					axios.get(url).then((respond) => {
						let {Title, Description, Cuisine, Category, Subcategory, PrimaryIngredient, WebURL, ImageURL, Ingredients, Instructions, YieldNumber, TotalMinutes, ActiveMinutes, NutritionInfo, AllCategoriesText, HeroPhotoUrl} = respond.data
						
						Ingredients = JSON.stringify(Ingredients)
						NutritionInfo = JSON.stringify(NutritionInfo)

						app.get('db').big_oven_is_noob([
							Title, 
							Description, 
							Cuisine, 
							Category, 
							Subcategory, 
							PrimaryIngredient, 
							WebURL, 
							ImageURL, 
							Ingredients, 
							Instructions, 
							YieldNumber, 
							TotalMinutes, 
							ActiveMinutes, 
							NutritionInfo, 
							AllCategoriesText, 
							HeroPhotoUrl
						]).then((response) => {
							console.log('recipe added')
						})
					})
				}, (~~randy * 1000) * i)
			}
})

app.get('/api/getPreferences', (req, res)=> {
    app.get('db').get_preferences([req.user.id]).then(response => {
        return res.status(200).send(response);
    })
})


app.listen(config.port, () => {console.log(`Success!  Listening on port: ${config.port}`)});
