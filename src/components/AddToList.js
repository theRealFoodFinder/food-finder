import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar'

class AddToList extends Component {
    componentWillMount() {
        axios.get('api/getprofile').then((res) => {
            if (!res.data.first || !res.data.last || !res.data.id || !res.data.email) {
                this.props.history.push('/')
                // console.log('successful redirect...')
            }
            // console.log(this.props.recipe[0].ingredients.length)
            // console.log(this.props.recipe[0])
            if (this.props.recipe && this.props.recipe.length > 0 && this.props.recipe[0].ingredients && this.props.recipe[0].ingredients.length > 0) {
                let ingredients = this.props.recipe[0].ingredients;
                let recipe = this.props.recipe[0];
                this.setState({
                    recipe: recipe,
                    addIngredients: ingredients
                })
                // console.log(this.state.addIngredientsBackend)
            }
        })

    }
    constructor() {
        super();
        this.state = {
            addIngredients: [],
            addIngredientsBackend: {},
            recipe: {}
        }
        this.addToList = this.addToList.bind(this)
        this.handleBoxChecked = this.handleBoxChecked.bind(this)
    }

    addToList() {
        // true = shopping list
        // false = add to pantry
        console.log(this.state.addIngredientsBackend);
        axios.post('/api/postShoppingList', this.state.addIngredientsBackend)
            .then((res) => {
                this.props.history.push('/shoppinglist')
                // console.log(res)
            })
            .catch((err)=>console.log(err))
            
    }

    handleBoxChecked(e) {

        let listItem = e.target.className
        // let isChecked = e.target.checked
        let list = this.state.addIngredientsBackend
        list[listItem] = !list[listItem]
        // console.log(list);
        this.setState({
            addIngredientsBackend: list
        })
        console.log(this.state.addIngredientsBackend, 'ingredients added')

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