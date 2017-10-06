import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar'

class AddToList extends Component {
    componentWillMount() {
        axios.get('/auth/me').then((res)=>{
            if (!res.data.first || !res.data.last || !res.data.id || !res.data.email){
                this.props.history.push('/')
            }
            // console.log('shopping list will mounted')
            let recipe = this.props.recipe;
            this.setState({
                recipe: recipe
            })
            // console.log(this.props.recipets, 'shopping list mounted')
            console.log(this.props.recipe, 'shopping list mounted')
        })
    }
   constructor() {
        super();
        this.state = {
            shoppingListBackend:{},
            shoppingList:[],
            recipe: {}
        }
        this.addtoCart=this.addtoCart.bind(this)
        this.handleBoxChecked=this.handleBoxChecked.bind(this)
    }
       
    addtoCart(){
        // true = shopping list
        // false = add to pantry
        console.log(this.state.shoppingListBackend);
(axios.post('/api/postShoppingList', this.state.shoppingListBackend).then(_=>console.log('items added to shopping list'))).then(()=>{
    this.props.history.push('/shoppinglist')
})
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
                    <div key={i} className={list.Name}>{list.Name}<input onChange={this.handleBoxChecked} className={list.Name} type="checkbox" key={i} />
                        </div>
                    )
                })
            }
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
                    <a href='/recipe'><button onClick={this.addtoCart}>Add to List</button></a>
                </div>
            </div>
        );
    }
}

export default AddToList;