import React, { Component } from 'react';
import Sidebar from '../components/Sidebar'
import {withRouter} from 'react-router-dom'

class AppBar extends Component {
    render() {
        console.log(this.props);
        return (
            <div className='appbarcontainer'>
                <Sidebar />
                <div className='Appbarserchtitle'>
                    {this.props.location.pathname==='/search' && <span>Search</span>}
                    {this.props.location.pathname==='/add' &&
                    <span>Add</span>}
                    {this.props.location.pathname==='/shoppinglist' &&
                    <span>Shopping Lists</span>}
                    {this.props.location.pathname==='/recipe' &&
                    <span>Recipe</span>}
                    {this.props.location.pathname==='/history' &&
                    <span>History</span>}
                    {this.props.location.pathname==='/results' &&
                    <span>Recipes</span>}
                    {this.props.location.pathname==='/details' &&
                    <span>Title of Recipe</span>}


                </div>
            </div>
        );
    }
}

export default withRouter(AppBar);