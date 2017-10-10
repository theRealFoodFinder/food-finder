import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar'

class ShoppingList extends Component {
    
   constructor(props) {
        super(props);
        this.state = {
            shoppingListBackend:{},
            shoppingList:[]
        }
        this.sendList=this.sendList.bind(this)
        this.handleBoxChecked=this.handleBoxChecked.bind(this)
    }
    
   componentWillMount() {
    axios.get('/api/getShoppingList')
    .then((res)=>{
        console.log(res)
        this.setState({
            shoppingListBackend: res
        })
    })
        // console.log(this.state.shoppingListBackend, 'shopping list mounted')
    }

    
    sendList(){
        // true = shopping list
        // false = add to pantry
        console.log(this.state.shoppingListBackend);
        axios.post('/api/postShoppingList', this.state.shoppingListBackend)
            .then((res)=>{
                console.log(res)
            })
    }

    handleBoxChecked(e){

    let listItem = e.target.className
    // let isChecked = e.target.checked
    let list = this.state.shoppingListBackend
    list[listItem]=!list[listItem]
    // console.log(list);
    this.setState({
        shoppingListBackend: list
    })
    console.log(this.state.shoppingListBackend, 'ingredients added')
    
}

   render() {

       let recipeItems;
    if (this.state && this.state.shoppingListBackend && this.state.shoppingListBackend.length>0){
        let recipe = this.state.shoppingListBackend[0];
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