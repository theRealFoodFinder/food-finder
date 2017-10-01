import React, { Component } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';


class ShoppingList extends Component {
    constructor() {
        super();
        this.state = {
            shoppingcart:{},
            shoppingListBackend:{},
            shoppingLists:[]
        }
        this.removeFromCart=this.removeFromCart.bind(this)
        this.handleBoxChecked=this.handleBoxChecked.bind(this)
    }
    
    componentDidMount() {
        //get user id?
        // axios.get('/api/getShoppingList')

        let recipe = this.props.recipe;
        this.setState({
            shoppingLists: recipe
        })
    }
    
    
    removeFromCart(){
        // axios.get('/auth/me').then
//remove items from cart
    }

    handleBoxChecked(e){
    let listItem = e.target.className
    // let isChecked = e.target.checked
    let list = this.state.shoppingLists
    list[listItem]=!list[listItem]
    // console.log(list);
    this.setState({
        shoppingListBackend: list
    })
    console.log(this.state.shoppingListBackend, 'ingredients added')
    
}

    render() {

    //     let recipeItems;
    // if (this.state && this.state.shoppingLists && this.state.shoppingLists.length>0){
    //     let recipe = this.state.shoppingLists[0];
    //     if(recipe.ingredients && recipe.ingredients.length>0){

    //         recipeItems = recipe.ingredients.map((list, i) => {
    //             // console.log(list)
    //             return(
    //                 <div className={list.Name}>{list.Name}<input onChange={this.handleBoxChecked} className={list.Name} type="checkbox" key={i} />
    //                     </div>
    //                 )
    //             })
    //         }
    // }
        return (
            
            <div className='shoppinglistcontainer'>
                <Sidebar />
                <div className='removeFromCart'><p>Your Shopping Cart</p></div>

                <div className='removeFromCartbutton'>
                    <button onSubmit={this.removeFromCart}>Purchased(added to Pantry)</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;