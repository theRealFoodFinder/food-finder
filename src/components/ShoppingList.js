import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar'

class ShoppingList extends Component {
    
   constructor() {
        super();
        this.state = {
            shoppingListBackend:{},
            shoppingList:[]
        }
        this.sendList=this.sendList.bind(this)
        this.handleBoxChecked=this.handleBoxChecked.bind(this)
    }
    
   componentDidMount() {
        console.log('shopping list will mounted')
        let recipe = this.props.recipe;
        this.setState({
            shoppingList: recipe
        })
        console.log(this.state.shoppingList, 'shopping list mounted')
    }

    
    sendList(){
        // true = shopping list
        // false = add to pantry
        console.log(this.state.shoppingListBackend);
(axios.post('/api/postShoppingList', this.state.shoppingListBackend).then(_=>console.log('items added to shopping list')))
    }

    handleBoxChecked(e){

    let listItem = e.target.className
    // let isChecked = e.target.checked
    let list = this.state.shoppingList
    list[listItem]=!list[listItem]
    // console.log(list);
    this.setState({
        shoppingListBackend: list
    })
    console.log(this.state.shoppingListBackend, 'ingredients added')
    
}

   render() {

       let recipeItems;
    if (this.state && this.state.shoppingList && this.state.shoppingList.length>0){
        let recipe = this.state.shoppingList[0];
        if(recipe.ingredients && recipe.ingredients.length>0){

           recipeItems = recipe.ingredients.map((list, i) => {
                // console.log(list)
                return(
                    <div className={list.Name}>{list.Name}<input onChange={this.handleBoxChecked} className={list.Name} type="checkbox" key={i} />
                        </div>
                    )
                })
            }
    }
        return (
            
           <div className='ShoppingListContainer shoppinglistcontainer'>
                <div className='allappbarcomponents'>
                    <AppBar />
                </div>
                <div className='sendList'><p>Check to add to Shopping Cart...</p></div>
                <div className='ShoppingListContainer shoppinglistmap'>
                    {recipeItems}
                </div>
                <div className='sendListbutton'>
                    <button onClick={this.sendList}>Add to Cart</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;