import React, { Component } from 'react';
import Sidebar from './Sidebar'


class ShoppingList extends Component {

    
    
    
    constructor() {
        super();
        this.state = {
            shoppingcart:{
                
            },
            
            shoppingListBackend:{
                
            },
            
            shoppingLists:[]
        }
        this.addtoCart=this.addtoCart.bind(this)
        this.handleBoxChecked=this.handleBoxChecked.bind(this)
    }
    
    componentDidMount() {
        console.log('shopping list will mounted')
        let recipe = this.props.recipe;
        this.setState({
            shoppingLists: recipe
        })
        console.log(this.state.shoppingLists, 'shopping list mounted')
    }
    
    
    addtoCart(){
        
    }

    handleBoxChecked(e){
    let listItem = e.target.className
    // let isChecked = e.target.checked
    let list = this.state.shoppingLists
    list[listItem]=!list[listItem]
    console.log(list);
    this.setState({
        shoppingListBackend: list
    })
    console.log(this.state.shoppingListBackend, 'shopping list to backend sent')
    
}

    render() {

        let recipeItems;
    if (this.state && this.state.shoppingLists && this.state.shoppingLists.length>0){
        let recipe = this.state.shoppingLists[0];
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
            
            <div className='shoppinglistcontainer'>
                <Sidebar />
                <div className='addtocartq'><p>Add to Shopping Cart?</p></div>

                <div className='shoppinglistmap'>
                    {recipeItems}
                    {/* {shoppinglistsMap()} */}
                </div>


                <div className='addtocartbutton'>
                    <button onSubmit={this.addtoCart}>Add to Cart</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;