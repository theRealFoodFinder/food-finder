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

// app.get('/getRecipe', (req, res) => {
// 	app.get('db').testing().then(response => {

// 		response = JSON.parse(response[0].recipe);

// 		let userData = {
// 			recipeID: response.RecipeID,
// 			title: response.Title,
// 			image: response.ImageURL,
// 			ingredients: response.Ingredients,
// 			directions: response.Instructions,
// 			country: response.Cuisine,
// 			category: response.Category,
// 			serves: response.YeildNumber,
// 		};

// 		res.send(response);
// 	})
// })

app.get('/api/getRecipe').then((req,res) => {
	app.get('db').get_recipe().then((response) => {
		res.status(200).send(response);
	})
})

app.post('/api/getRecipes', (req, res)=> {
		let search = req.body;
		console.log('endpoint hit')
		let url = `http://api2.bigoven.com/recipes/random?api_key=${config.bigOvenKey}`
		
		// if (search){
		// 	console.log('has body')
		// 	if (search.cuisine){
		// 			url += `&cuisine=${search.cuisine}`;
		// 	}
		// 	if (search.ingredients){
		// 			console.log('ingr', search.ingredients)
		// 			let ingList = search.ingredients
		// 			url += `&include_ing=${ingList}`;
		// 	}
		// 	if (search.category){
		// 			url += `&include_cat=${search.category}`;
		// 	}
		// 	if (search.title){
		// 			url += `&title_kw=${search.title}`;
		// 	}

			// console.log('done concat:', url)

			for (let i = 0; i < 51; i++){
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

					// console.log(i)
				}, (~~randy * 1000) * i)
			}



})


app.get('/api/getPreferences', (req, res)=> {
    app.get('db').get_preferences([req.user.id]).then(response => {
        return res.status(200).send(response);
    })
})


app.listen(config.port, () => {console.log(`Success!  Listening on port: ${config.port}`)});
