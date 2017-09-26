import React, { Component } from 'react'
import Landing from './Landing'
import SearchPage from './SearchPage'
import '../sass/main.css'
import { Switch, Route } from 'react-router-dom'

export default class App extends Component {
	render(){
		return (
			<div className='App'>
				<Switch>
				<Route component= {Landing} exact path='/'/>
				<Route component= {SearchPage} path='/search'/>
				</Switch>
			</div>
		)
	}
}