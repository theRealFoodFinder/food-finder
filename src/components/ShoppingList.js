import React, { Component } from 'react';
import Sidebar from './Sidebar'


class ShoppingList extends Component {
    constructor() {
        super();
        this.state = {
            shoppingcart:'',
            shoppingLists:[
                "Milk",
                "Bread",
                "Cheese",
                "Flour",
                "Sugar",
                "Banana",
                "Apple"
        ]
      }
      this.addtoCart=this.addtoCart.bind(this)
    }



addtoCart(){

}


    render() {

        const shoppinglistsMap =
            this.state.shoppingLists.map((list, i) => {
                console.log(list)
                return(
                   <div>{list}<input className='event.target.className'id="checkBox" type="checkbox" key={i}/>
                    </div>
                )
            })

        return (
            <div className='shoppinglistcontainer'>
            <Sidebar />
                <div className='addtocartq'><p>Add to Shopping Cart?</p></div>

                <div className='shoppinglistmap'>
                    {/* <div>Milk<input id="checkBox" type="checkbox" /></div>
                    <div>Bread<input id="checkBox" type="checkbox" /></div>
                    <div>Cheese<input id="checkBox" type="checkbox" /></div>
                    <div>Flour<input id="checkBox" type="checkbox" /></div>
                    <div>Sugar<input id="checkBox" type="checkbox" /></div>
                    <div>Eggs<input id="checkBox" type="checkbox" /></div> */}
                    {shoppinglistsMap}
                </div>


                <div className='addtocartbutton'>
                    <button onSubmit={this.addtoCart}>Add to Cart</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;