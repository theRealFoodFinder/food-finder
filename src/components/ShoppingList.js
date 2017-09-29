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
            
            shoppingLists:{}
        }
        this.addtoCart=this.addtoCart.bind(this)
        this.handleBoxChecked=this.handleBoxChecked.bind(this)
    }
    
    componentDidMount() {
        this.setState({
            shoppingLists:{
                mooMilk: false,
                Bread: false,
                Cheese: false,
                Flour: false,
                Sugar: false,
                Banana: false,
                Apple: false
            }
        })
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
    
}




    render() {

        const shoppinglistsMap = ()=>{
            let list = this.state.shoppingLists
            let map= []
            for(let item in list){
                map.push (
                    <div>{item}<input onChange={this.handleBoxChecked} className={item} type="checkbox" key={item} />
                    </div>
                )
            } return map
        }


        // const shoppinglistsMap =
        //     this.state.shoppingLists.map((list, i) => {
        //         console.log(list)
        //         return(
        //            <div>{list}<input onChange={this.handleBoxChecked} className={list} type="checkbox" key={i} />
        //             </div>
        //         )
        //     })

        return (
            <div className='shoppinglistcontainer'>
            <Sidebar />
                <div className='addtocartq'><p>Add to Shopping Cart?</p></div>

                <div className='shoppinglistmap'>
                    {shoppinglistsMap()}
                </div>


                <div className='addtocartbutton'>
                    <button onSubmit={this.addtoCart}>Add to Cart</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;