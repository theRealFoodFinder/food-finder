import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar'

class AddToList extends Component {
    componentWillMount() {
        axios.get('api/getprofile').then((res) => {
            if (!res.data.first || !res.data.last || !res.data.id || !res.data.email) {
                this.props.history.push('/');
            } else 
            
            // console.log(this.props)
            if (
                this.props.recipe &&
                this.props.recipe.length > 0 &&
                this.props.recipe[0].ingredients &&
                this.props.recipe[0].ingredients.length > 0) {
                let ingredients = this.props.recipe[0].ingredients;
                let recipe = this.props.recipe[0];
                let tempObj = {}
                ingredients.map((e,i,a)=>{
                    return tempObj[e.Name]=false;
                })
                console.log(tempObj, 'tempobj')
                this.setState({
                    recipe: recipe,
                    addIngredients: ingredients,
                    addIngredientsBackend:tempObj
                })
            }else console.log('props on state aren\'t as expected')
        })
        .catch((err)=>console.log(err))
    }

    constructor(props) {
        super(props);
        this.state = {
            addIngredients: [],
            addIngredientsBackend: {},
            recipe: {}
        }
        this.addToList = this.addToList.bind(this);
        this.handleBoxChecked = this.handleBoxChecked.bind(this);
    }

    addToList() {
        // true = shopping list
        // false = add to pantry
        let tempObj = this.state.addIngredientsBackend;
        let tempObj2 = {};
        //str can be used to add items using string method
        let str = "";
        for(let key in tempObj){
            if(tempObj[key]===true){
                str +="," + key
            }
        }
        tempObj2.items = str;
        // console.log(tempObj, '#1');
        // console.log(tempObj2, '#2');
        //api/postShoppingList - Accepts an object with key value pair, ingredient: true/false. True values get put on shopping list. False go to the pantry in the users table. Ex: {chicken: true, cheese: false}
        axios.post('api/postShoppingList', tempObj)
            .then((res) => {
                this.props.history.push('/shoppinglist')
            })
            .catch((err) => console.log(err))
    }

    handleBoxChecked(e) {
        let listItem = e.target.className;
        let list = this.state.addIngredientsBackend;
        list[listItem] = !list[listItem];
        this.setState({
            addIngredientsBackend: list
        })
    }

    render() {

        let recipeItems = "No Ingredients";
        if (this.state && this.state.recipe && this.state.recipe.ingredients && this.state.recipe.ingredients.length > 0) {

            let ingredients = this.state.recipe.ingredients

            recipeItems = ingredients.map((list, i) => {
                // console.log(list)
                return (
                    <div key={i} className={list.Name}>{list.Name}<input onChange={this.handleBoxChecked} className={list.Name} type="checkbox" key={i} />
                    </div>
                )
            })
        }

        return (

            <div className='addToListContainer shoppinglistcontainer'>
                <div className='allappbarcomponents'>
                    <AppBar />
                </div>
                <div className='addtocart'><p>Check to add to Shopping Cart...</p></div>
                <div className='addToListContainer shoppinglistmap'>
                    {recipeItems}
                </div>
                <div className='addtocartbutton'>
                    <button onClick={this.addToList}>Add to List</button>
                </div>
            </div>
        );
    }
}

export default AddToList;