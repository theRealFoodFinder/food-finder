import React, { Component } from 'react';
import Sidebar from '../components/Sidebar'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

class AppBar extends Component {

    constructor(props){
        super(props)

        this.state = {

        }
        this.handleLogout = this.handleLogout.bind(this)
    }


    handleLogout(){
        axios.get('http://localhost:3005/auth/logout').then((response) => {
            this.props.history.push('/')
        })
    }

    render() {
        // console.log(this.props)
        return (
            <div className='appbarcontainer'>
                <Sidebar fixmepls={this.props.history} />
                <div className='Appbarserchtitle'>
                    {this.props.location.pathname==='/search' && <span>Search</span>}
                    {this.props.location.pathname==='/add' &&
                    <span>Add</span>}
                    {this.props.location.pathname==='/shoppinglist' &&
                    <span>Shopping List</span>}
                    {this.props.location.pathname==='/recipe' &&
                    <span>Recipe</span>}
                    {this.props.location.pathname==='/history' &&
                    <span>History</span>}
                    {this.props.location.pathname==='/results' &&
                    <span>Recipes</span>}
                    {this.props.location.pathname==='/details' &&
                    <span></span>}
                    {this.props.location.pathname==='/profile' &&
                    <span>Profile</span>}


                    <span className='logoutButton' onClick={this.handleLogout}>Log Out</span>
                </div>
            </div>
        );
    }
}

export default withRouter(AppBar);