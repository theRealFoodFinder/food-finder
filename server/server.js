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
}).then(db => {
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
    db.find_session_user([profile._json.email])
        .then(user => {
            if (user[0]) {

                return done(null, user[0]);
            } else {

                if (profile.provider === 'auth0') {
                    db.create_user([profile._json.user_metadata.first_name, profile._json.user_metadata.last_name, profile._json.email, profile.identities[0].user_id, true])
                        .then(user => {
                            return done(null, user[0]);
                        })
                } else {

                    db.create_user([profile._json.given_name, profile._json.family_name, profile._json.email, profile.identities[0].user_id, true])
                        .then(user => {

                            return done(null, user[0]);
                        })
                }
            }
        })

}));

passport.serializeUser(function(user, done) {

    let sessionUser = { id: user.user_id, first: user.first_name, last: user.last_name, email: user.user_email, initLogin: user.init_login }
    done(null, sessionUser);
})

passport.deserializeUser(function(user, done) {
    app.set('user', user)
    if (user) {
        return done(null, user)
    }
})

app.get('/auth', passport.authenticate('auth0'));


app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3005/atla40',
    failureRedirect: 'http://localhost:3000/#/failed'
}));

app.get('/auth/me', (req, res, next) => {
    return res.status(200).send(req.user);
})

app.get('/atla40', (req, res) => {
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id
    app.get('db').user_lookup([userInfoID])
        .then(response => {
            if (response[0].init_login) {
                app.get('db').update_init_login([userInfoID])
                    .then(() => {
                        res.redirect('http://localhost:3000/#/initialSetup')
                    }),
                    () => {
                        console.log("Couldnt update init setup.  Passing to search page")
                        res.status('500').redirect('http://localhost:3000/#/search')
                    }
            } else {
                res.status('200').redirect('http://localhost:3000/#/search')
            }
        })
})


app.get('/auth/logout', (req, res) => {
    console.log(`user ${req.user.id} has logged out`)
    req.logOut();
    return res.redirect(302, '/#/')
})


app.get('/api/getProfile', (req, res) => {
    res.status(200).send(req.user)
})


app.get('/api/getPreferences', (req, res) => {
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id
    app.get('db').get_preferences([userInfoID]).then(response => {
        return res.status(200).send(response);
    })
})


app.get('/api/favoriteRecipe/:id', (req, res) => {
    let { recipe_id } = req.params.id;
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id

    app.get('db').get_favorites([userInfoID]).then((response) => {
        response = response[0].user_favorites
        if (!response.includes(`,${recipe_id},`)) {
            response += recipe_id + ','
            app.get('db').add_to_favorites([response, 1]).then((responseTwo) => {
                res.status(200).send(responseTwo);
            })
        } else res.status(200).send(response);
    })
})

app.get('/api/getFavorites', (req, res) => {
    userID = app.get('user')
    if (userID) {
        userID = userID.id
    }
    app.get('db').get_favorites([userID])
        .then(response => {
            let favorites = response[0].user_favorites
            favorites = favorites.slice(0, favorites.length - 1)
            let queryString = `SELECT recipe_id, title, image_url from recipes WHERE recipe_id IN (${favorites});`
            app.get('db').run(queryString)
                .then(response => {
                    res.status('200').send(response);
                })
        })
})


app.post('/api/postShoppingList', (req, res) => {
    function formatIngredients(ingArr) {
        let regex = /\(.*\)|\(.*|\'|;|\*|^ | or .*| in .*| for .*| to taste .*|=/g
        for (var x = ingArr.length - 1; x >= 0; x--) {
            ingArr[x] = ingArr[x].toLowerCase();
            ingArr[x] = ingArr[x].replace(regex, '');
            ingArr[x] = ingArr[x].replace(/^ |\s$/g, '');
            if (/ and |[0-9]|[-!$%^&*()_+|~=`{}\[\]:<>?,.\/]/.test(ingArr[x])) {
                ingArr.splice(x, 1);
            }
        }
        return ingArr;
    }

    var ingredients = [];
    var shoppingList = [];
    for (let i in req.body) {

        if (req.body[i]) {
            shoppingList.push(i);
        } else {
            ingredients.push(i)
        }
    }

    app.get('db').get_pantry_list([req.body.id])
        .then((currentIngredients) => {
            app.get('db').post_ingredient_list([req.body.id, formatIngredients(ingredients).join(', ') + ',' + currentIngredients[0].items])
        })

    app.get('db').get_shopping_list([req.body.id])
        .then((currentShoppingList) => {
            app.get('db').post_shopping_list([req.body.id, shoppingList.join(', ') + ',' + currentShoppingList[0].items])
        })
    res.status('200').send("success");
})


app.post('/api/hitBigOven', (req, res) => {
    let search = req.body;
    console.log('endpoint hit')
    let url = `http://api2.bigoven.com/recipes/random?api_key=${config.bigOvenKey}`

    for (let i = 0; i < 500; i++) {
        let randy = (Math.random() * (8 - 3) + 3)
        setTimeout(() => {
            console.log(~~randy + ' seconds')
            axios.get(url).then((respond) => {
                let { Title, Description, Cuisine, Category, Subcategory, PrimaryIngredient, WebURL, ImageURL, Ingredients, Instructions, YieldNumber, TotalMinutes, ActiveMinutes, NutritionInfo, AllCategoriesText, HeroPhotoUrl } = respond.data

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
app.post('/api/getRecipe', (req, res) => {
    //req.user is not being defined in this instance. its stupid and needs to be fixed
    console.log('/getRecipe hit')
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id

    let search = req.body
    let searchParams = []

    console.log('userInfoID', userInfoID)

    function filterBlacklist(oldRecipes) {
        let myRecipeList = []
        console.log('user info id', userInfoID)
        return app.get('db').get_blacklist([userInfoID]).then((blacklist) => {
            //does the response from database contain anything (blacklisted items)?
            if (blacklist.length < 0) {
                blacklist = blacklist[0].blacklist.split(', ')
                let newRecipes = []

                let list = oldRecipes.map((recipe, i, a) => {
                    let willPush = true

                    if (newRecipes.length >= 25) return newRecipes

                    let insideList = recipe.ingredients.map((ingr, i, a) => {
                        for (var bli = 0; bli < blacklist.length; bli++) {
                            if (ingr.Name && ingr.Name.includes(blacklist[bli])) {
                                willPush = false
                            }
                        }
                    })

                    if (willPush) {
                        newRecipes.push(recipe)
                    }
                })
                return newRecipes
            } else {
                return oldRecipes
            }
            return list
        }).catch(err => { console.log('Error!', err) })
    }

    function ingredientPercentage(recipes) {
        let percentage = 0;
        let pantryIngredients = undefined;

        return app.get('db').get_pantry_list([userInfoID]).then((response) => {
            pantryIngredients = response;
            // console.log(pantry)
            pantryIngredients = pantryIngredients[0].items.split(',')

            let newRecipeList = []

            recipes.map((e, i, a) => {
                let ingCounter = 0;
                e.ingredients.map((ele, ind, arr) => {
                    for (var cou = 0; cou <= pantryIngredients.length; cou++) {
                        if (ele.Name && ele.Name.includes(pantryIngredients[cou])) {
                            ingCounter += 1
                        }
                    }
                })
                if ((ingCounter / e.ingredients.length * 100) >= percentage) {
                    newRecipeList.push(e)
                }
            })

            console.log('final list:', newRecipeList.length)
            return newRecipeList
        })
    }

    // ========================================================================================================================================================================================

    if (search) {
        console.log('request has body!')
        if (search.cuisine) {
            console.log('cuisine searching')
        }
        if (search.ingredients) {
            let ingList = search.ingredients
            console.log('ingr', ingList)
            if (ingList.length === 1) {
                searchParams = ingList;
                console.log('1 ingredient')
                app.get('db').get_recipe_1(searchParams).then((response) => {



                    let filters = { min: {}, max: {} }
                    let nutInf = search.nutrition_info;
                    for (let ing in nutInf) {

                        switch (ing) {
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

                    for (var prop in nutInf) {
                        if (nutInf[prop]) {
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
                    for (var go = 0; go < response.length; go++) {

                        response[go].ingredients = JSON.parse(response[go].ingredients)
                        response[go].nutrition_info = JSON.parse(response[go].nutrition_info)
                        recipeList.push(response[go])
                    }

                    let filteredRecipes = response.filter((recipe, i, a) => {
                        let result = true
                        for (var type in filters.min) {
                            if (recipe.nutrition_info[type] <= filters.min[type] || recipe.nutrition_info[type] >= filters.max[type]) {
                                result = false
                            }
                        }
                        if (result) return recipe
                    })

                    let finalList = filterBlacklist(filteredRecipes)
                    finalList.then((response) => {
                        // console.log('final list:', response)
                        let another = ingredientPercentage(response)
                        another.then((gogogo) => {
                            res.status(200).send(gogogo);
                        })
                    })

                })
            } else if (ingList.length === 2) {
                searchParams = ingList;
                console.log('2 ingredient')
                app.get('db').get_recipe_2(searchParams).then((response) => {

                    let filters = { min: {}, max: {} }
                    let nutInf = search.nutrition_info;
                    for (let ing in nutInf) {

                        switch (ing) {
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

                    for (var prop in nutInf) {
                        if (nutInf[prop]) {
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
                    for (var go = 0; go < response.length; go++) {

                        response[go].ingredients = JSON.parse(response[go].ingredients)
                        response[go].nutrition_info = JSON.parse(response[go].nutrition_info)
                        recipeList.push(response[go])
                    }

                    let filteredRecipes = response.filter((recipe, i, a) => {
                        let result = true
                        for (var type in filters.min) {
                            if (recipe.nutrition_info[type] <= filters.min[type] || recipe.nutrition_info[type] >= filters.max[type]) {
                                result = false
                            }
                        }
                        if (result) return recipe
                    })

                    let finalList = filterBlacklist(filteredRecipes)
                    finalList.then((response) => {
                        // console.log('final list:', response)
                        let another = ingredientPercentage(response)
                        another.then((gogogo) => {
                            res.status(200).send(gogogo);
                        })
                    })
                })
            } else if (ingList.length === 3) {
                searchParams = ingList;
                console.log('3 ingredient')
                app.get('db').get_recipe_3(searchParams).then((response) => {

                    let filters = { min: {}, max: {} }
                    let nutInf = search.nutrition_info;
                    for (let ing in nutInf) {

                        switch (ing) {
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

                    for (var prop in nutInf) {
                        if (nutInf[prop]) {
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
                    for (var go = 0; go < response.length; go++) {

                        response[go].ingredients = JSON.parse(response[go].ingredients)
                        response[go].nutrition_info = JSON.parse(response[go].nutrition_info)
                        recipeList.push(response[go])
                    }

                    let filteredRecipes = response.filter((recipe, i, a) => {
                        let result = true
                        for (var type in filters.min) {
                            if (recipe.nutrition_info[type] <= filters.min[type] || recipe.nutrition_info[type] >= filters.max[type]) {
                                result = false
                            }
                        }
                        if (result) return recipe
                    })

                    let finalList = filterBlacklist(filteredRecipes)
                    finalList.then((response) => {
                        // console.log('final list:', response)
                        let another = ingredientPercentage(response)
                        another.then((gogogo) => {
                            res.status(200).send(gogogo);
                        })
                    })
                })
            }
        }
        if (search.category) {
            console.log('category searching')
        }
        if (search.title) {
            console.log('title searching')
        }
    }
})

// app.put('/api/addToBlacklist', (req, res)=> {
//     let {items} = req.body
//     app.get('db').get_blacklist([req.user.id]).then((response)=>{
//          response = response[0]
//         if (response){
//             response += ',' + items
//             app.get('db').update_blacklist([response]).then((response)=>{
//                 res.status(200).send(response)
//             })
//         }
//     })
// })

// app.put('/api/removeFromBlacklist', (req, res)=>{
//     let {items} = req.body
//     app.get('db').get_blacklist([req.user.id]).then((response)=>{
//          response = response[0]
//         if (response){
//             let newList = response.split(',').map((e,i,a)=>{
//                 if (!items.includes(e)) return e
//             })
//             newList = newList.filter((e,i,a)=>{
//             return e !== undefined
//             })
//             newList = newList.join(',')
//             app.get('db').update_blacklist([newList]).then((response)=>{
//                 res.status(200).send(response)
//             })
//         }
//     })
// })


app.get('/api/getShoppingList', (req, res) => {
    let user = app.get('user')
    app.get('db').get_shopping_list(user.id)
        .then((response) => {
            res.status(200).send(response[0].items)
        })
})


app.post('/api/updateShoppingList', (req, res) => {
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id
    // let user = app.get('user');
    app.get('db').update_shopping_list([userInfoID, req.body.items])
        .then((response) => {
            res.status('200').send('Cart Successfully Updated')
        })
})

app.post('/api/appendShoppingList', (req, res) => {
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id
    // let user = app.get('user');
    app.get('db').get_shopping_list([userInfoID])
        .then((response) => {
            axios.post('http://localhost:3005/api/updateShoppingList', {
                    items: response[0].items + req.body.items
                })
                .then(() => {
                    res.status(200).send("Appended Cart!")
                })
        })
})


app.post('/api/blacklist', (req, res) => {
    let { ingredients, type } = req.body
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id
    app.get('db').get_blacklist([userInfoID]).then((oldList) => {
        console.log("oldList", oldList)
        oldList = oldList[0].blacklist.split(',')
        let newList = []

        if (type === 'remove') {
            for (var i = 0; i < oldList.length; i++) {
                if (!ingredients.includes(oldList[i])) {
                    newList.push(oldList[i])
                }
            }
        } else if (type === 'add') {
            newList = [];
            newList.push(...oldList)
            ingredients.split(',').map((e, i, a) => {
                if (!oldList.includes(e)) {
                    newList.push(e)
                }
            })
        }

        newList = newList.join(',')
        app.get('db').update_blacklist([newList, userInfoID]).then((response) => {
            return res.status(200).send(response)
        })
    })
})


app.get('/api/getBlacklist', (req, res) => {
    userID = app.get('user')
    if (userID) {
        userID = userID.id
    }
    app.get('db').get_blacklist([userID])
        .then(response => {
            res.status('200').send(response[0].blacklist)
        }), () => { res.status('500').send("Couldn't get blacklist") }
})

app.post('/api/pantrySetup', (req, res) => {
    let userInfoID = app.get('user')
    userInfoID = userInfoID.id
    console.log(req.body)
    var pantryItems = req.body.join(',')
    app.get('db').pantry_setup([userInfoID, pantryItems])
        .then(() => {
            res.status('200').send('Successfully added pantry items!')
        }), error => {
            res.status('500').send(`Encountered errors! ${error}`)
        }
})
app.listen(config.port, () => { console.log(`Success!  Listening on port: ${config.port}`) });