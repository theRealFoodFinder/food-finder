import React, { Component } from 'react';
import { bubble as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom'
import axios from 'axios'

class Sidebar extends Component {

     constructor(props){
        super(props)

        this.state = {

        }
        this.handleLogout = this.handleLogout.bind(this)
    }


    handleLogout(){
        axios.get('/auth/logout').then((response) => {
            this.props.fixmepls.push('/')
        })
    }


    render() {
        return (
            <div>
                <Menu>
                    <Link to={'/search'} id="msearch" className="menu-item">Search</Link>
                    <Link to={'/shoppinglist'} id="mshoppinglists" className="menu-item" >Shopping Lists</Link>
                    {/* <Link to={'/history'} id="mhistory" className="menu-item" >History</Link> */}
                    <Link to={'/profile'} id="mprofile" className="menu-item" >Profile</Link>
                    <div id='logoutButton' onClick={this.handleLogout}>Log out</div>
                    {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                </Menu>
            </div>
        );
    }
}

export default Sidebar;