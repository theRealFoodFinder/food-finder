import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu'
import {Link} from 'react-router-dom'

class Sidebar extends Component {
    

    showSettings (event) {
        
      }

    render() {
        return (
            <div>
                <Menu>
                    <Link to={'/search'} id="msearch" className="menu-item">Search</Link>
                    <Link to={'/shoppinglist'} id="mshoppinglists" className="menu-item" href="/about">Shopping Lists</Link>
                    <Link to={'/history'} id="mhistory" className="menu-item" href="/contact">History</Link>
                    <Link to={'/profile'} id="mprofile" className="menu-item" href="/contact">Profile</Link>
                    <Link to={'/logout'} id="mlogout" className="menu-item" href="/contact">Log out</Link>
                    {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                </Menu>
            </div>
        );
    }
}

export default Sidebar;