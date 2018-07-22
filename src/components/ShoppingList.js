import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar'

class ShoppingList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: {},
            shoppingList: [],
            pantryList: []
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
            }
            axios.get('/api/getShoppingList')
                .then((res) => { //res.data[0].items = string
                    if (res && res.data && res.data.length>0 && res.data[0].items) {
                        // console.log('data going to shoppingcart', res.data[0].items)
                        res = res.data[0].items.split(',');
                        while (!res[0]) {
                            res.shift()
                        }
                        this.setState({
                            shoppingList: res
                        })
                    } else console.log(res, "res from getshoppinglist not compatible")
                }).catch((err) => { console.log(err, 'err in shoppinglist retrieve') })
        }
    )}


    // /api/replaceShoppingList - requires format ['apple', 'pepper', 'cheese']
    sendList() {
        let list = this.state.shoppingList;
        //console.log(list, 'shoppingList on shoppingCart')// list = array of strings
        axios.post('http://localhost:3005/api/replaceShoppingList', list)
            .then(this.props.history.push('search'))
            .catch((err) => { console.log(err) })
    }

    handleBoxChecked(e) {
        let listItem = e.target.className //className is the index of item
        console.log(listItem, '...checked')
        let isChecked = e.target.checked
        let list = this.state.shoppingList
        if (list.indexOf(listItem)>=0){
            this.state.pantryList.push(
                list.splice(
                    list.indexOf(listItem),1)
            );
        }

        this.setState({
            shoppingList: list
        })
    }

    render() {

        let recipeItems;
        if (this.state && this.state.shoppingList && this.state.shoppingList.length > 0) {
            let list = this.state.shoppingList;
            recipeItems = list.map((list, i) => {
                return (
                    <div key={i} className={list}><input onChange={this.handleBoxChecked} className={list} type="checkbox" key={i} />{list}</div>
                )
            })

        }
        return (

            <div className='ShoppingListContainer shoppinglistcontainer' >
                <div className='allappbarcomponents'>
                    <AppBar name={this.state.profile} />
                </div>
                <div className='sendList'><p>Check to add to Shopping Cart...</p></div>
                <div className='shoppinglistmap'>
                    {recipeItems}
                </div>
                <div className='sendListbutton'>
                    <button id='removefromcartbutton' onClick={this.sendList}>return to search page</button>
                </div>
            </div>
        );
    }
}

export default ShoppingList;