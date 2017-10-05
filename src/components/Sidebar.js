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
                    <Link to={'/shoppinglist'} id="mshoppinglists" className="menu-item" >Shopping Lists</Link>
                    <Link to={'/history'} id="mhistory" className="menu-item" >History</Link>
                    <Link to={'/profile'} id="mprofile" className="menu-item" >Profile</Link>
                    <a href='/auth/logout'><div id='logoutButton'>Log out</div></a>
                    {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
                </Menu>
            </div>
        );
    }
}

export default Sidebar;