import React, { Component } from 'react'
import '../sass/main.css'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import SearchPage from './SearchPage'
import ShoppingList from './ShoppingList';
import Results from './Results';
import ProfilePage from './ProfilePage';


export default class App extends Component {
	constructor(props){
		super(props)
		this.state={
			profile: {}
		}
this.setUserInfo = this.setUserInfo.bind(this);
	}

	setUserInfo (info) {
		// alert(info);
		this.setState({
		  profile: info
		})
	  }


	render(){
		return (
			<div className='App'>
				<Switch>
				  <Route component= {Landing} exact path='/'/>
				  <Route component= { props => <SearchPage {...props} setUserInfo={this.setUserInfo}/>} path='/search'/>
				  <Route component= { props => <ShoppingList {...props} profile={this.state.profile}/>} path='/shoppinglist'/>
				  <Route component= {Results} path='/results'/>
				  <Route component= { props => <ProfilePage {...props} profile={this.state.profile}/>} path='/profile'/>
				</Switch>
			</div>
		)
	}
}