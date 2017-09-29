const express = require('express'),
			session = require('express-session'),
			bodyParser = require('body-parser'),
			cors = require('cors'),
			passport = require('passport'),
			Auth0Strategy = require('passport-auth0'),
			massive = require('massive'),
			axios = require('axios'),
			config = require('./config.js');

const app = express();

//pull in the database
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
		 console.log("db: ", user[0])
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

app.get('/api/getProfile', (req, res) => {
	res.status(200).send(db.profile)
})

app.post('/api/getRecipes', (req, res) => {
	let items = req.body;

})


app.get('/api/getPreferences', (req, res)=> {
    app.get('db').get_preferences([req.user.id]).then(response => {
        return res.status(200).send(response);
    })
})

app.post('/api/recipeFilter', (req, res) => {


})



app.get('/api/getShoppingList', (req, res) => {
	req.user.id, req.body
})


app.post('/api/postShoppingList', (req, res) => {
	function formatIngredients(ingArr){


app.post('/api/favoriteRecipe', (req, res) => {
	let {recipe_id} = req.body;

	app.get('db').get_favorites([1]).then((response) => {
		response = response[0].user_favorites
		if (!response.includes(`,${recipe_id},`)){
			response += recipe_id + ','
			app.get('db').add_to_favorites([response, 1]).then((responseTwo) => {
				res.status(200).send(responseTwo);
			})
		} else res.status(200).send(response);
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

	app.get('db').get_pantry_list([8])
	.then( (currentIngredients) => {
		app.get('db').post_ingredient_list([8, formatIngredients(ingredients).join(', ') + ',' + currentIngredients[0].items])
})

	app.get('db').get_shopping_list([8])
	.then( (currentShoppingList) => {
		app.get('db').post_shopping_list([8, shoppingList.join(', ') + ',' + currentShoppingList[0].items])
	})
	res.status('200').send("success");
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





app.listen(config.port, () => {console.log(`Success!  Listening on port: ${config.port}`)});
