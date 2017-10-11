import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar'

class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            shoppingListBackend: {},
            shoppingList: []
        }
        this.sendList = this.sendList.bind(this);
        this.handleBoxChecked = this.handleBoxChecked.bind(this);
    }

    componentWillMount() {
        axios.get('/api/getProfile').then((res) => {
            // console.log(res, 'profile')
            if (!res.data.first || !res.data.last) {
                this.props.history.push('/')
            } else {
                this.setState({
                    profile: res.data
                })
                axios.get('/api/getShoppingList')
                    .then((res) => {
                        console.log(res, 'getshoppinglist')
                        let newObj = {};
                        res = res.data.split(',')
                        this.setState({
                            shoppingList: res
                        })
                        res.forEach((item, i, array) => {
                            newObj[item] = false
                        })
                        this.setState({
                            shoppingListBackend: newObj
                        })
                        console.log(this.state.shoppingListBackend)
                    })
            }
        })
    }
    // console.log(this.state.shoppingListBackend, 'shopping list mounted')



    // /api/updateShoppingList - Accepts an object. 'items' as the key, and a string of comma separated items to replace the current shopping list in shopping_lists. Ex: {items: "chicken, cheese"}
    sendList() {
        let food = this.state.shoppingListBackend;
        let newObj = { items: [] }
        let str = ""
        for (let key in food) {
            if (food[key] === true) {
                str += ',' + key;
            }
        }
        newObj.items = str;
        axios.post('/api/updateShoppingList', newObj).then(
            axios.get('/api/getShoppingList')
                .then((res) => {
                    let newObj = {};
                    res = res.data.split(',')
                    this.setState({
                        shoppingList: res
                    })
                    res.forEach((item, i, array) => {
                        newObj[item] = false
                    })
                    this.setState({
                        shoppingListBackend: newObj
                    })
                })
        ).catch((err) => { console.log(err) })
    }

    handleBoxChecked(e) {

        let listItem = e.target.className
        // let isChecked = e.target.checked
        let list = this.state.shoppingListBackend
        list[listItem] = !list[listItem]
        // console.log(list);
        this.setState({
            shoppingListBackend: list
        })
        console.log(this.state.shoppingListBackend, 'ingredients added')

    }

    render() {

        let recipeItems;
        if (this.state && this.state.shoppingList && this.state.shoppingList.length > 0) {
            let list = this.state.shoppingList;
            recipeItems = list.map((list, i) => {
                return (
                    <div className={list}>{list}<input onChange={this.handleBoxChecked} className={list} type="checkbox" key={i} /></div>
                )
            })

        }
        return (

            <div className='ShoppingListContainer shoppinglistcontainer' >
                <div className='allappbarcomponents'>
                    <AppBar name={this.state.profile} />
                </div>
                <div className='sendList'><p>Check to add to Shopping Cart...</p></div>
                <div className='ShoppingListContainer shoppinglistmap'>
                    {recipeItems}
                </div>
                <div className='sendListbutton'>
                    <button onClick={this.sendList}>remove from cart</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;