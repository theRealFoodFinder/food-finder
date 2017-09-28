import React, { Component } from 'react'
import '../sass/main.css'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import SearchPage from './SearchPage'
import ShoppingList from './ShoppingList';
import Results from './Results';

export default class App extends Component {
	constructor(){
		super();
		this.state={
				 
		}
	}

	setUserInfo (info) {
		// alert(info);
		this.setState({
		  auth: info
		})
	  }


	render(){
		return (
			<div className='App'>
				<Switch>
				  <Route component= {Landing} exact path='/'/>
				  <Route component= {SearchPage} path='/search'/>
				  <Route component= {ShoppingList} path='/shoppinglist'/>
				  <Route component= {Results} path='/results'/>
				</Switch>
			</div>
		)
	}
}