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
            
            shoppingLists:{ingredients:'none'}
        }
        this.addtoCart=this.addtoCart.bind(this)
        this.handleBoxChecked=this.handleBoxChecked.bind(this)
    }
    
    componentDidMount() {
        console.log('shopping list mounted')
        let recipe = this.props.recipe[0];
        this.setState({
            shoppingLists: recipe
        })
        console.log(this.state.shoppingLists)
    }
    
    
    addtoCart(){
        
    }
    
    handleBoxChecked(e){
    // let listItem = e.target.className
    // // let isChecked = e.target.checked
    // let list = this.state.shoppingLists
    // list[listItem]=!list[listItem]
    // console.log(list);
    // this.setState({
    //     shoppingListBackend: list
    // })
    
}




    render() {

        // const shoppinglistsMap = ()=>{
        //     let list = this.state.shoppingLists
        //     let map= []
        //     for(let item in list){
        //         map.push (
        //             <div>{item}<input onChange={this.handleBoxChecked} className={item} type="checkbox" key={item} />
        //             </div>
        //         )
        //     } return map
        // }


        // const shoppinglistsMap2 = this.state.shoppingLists
        //  this.state.shoppingLists.ingredients.map((list, i) => {
        //         console.log(list)
        //         return(
        //            <div className={list}>{list}<input onChange={this.handleBoxChecked} className={list} type="checkbox" key={i} />
        //             </div>
        //         )
        //     })

        return (
            <div className='shoppinglistcontainer'>
                <Sidebar />
                <div className='addtocartq'><p>Add to Shopping Cart?</p></div>

                <div className='shoppinglistmap'>
                    {/* {shoppinglistsMap2} */}
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