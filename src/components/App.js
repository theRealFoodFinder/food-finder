import React, { Component } from 'react'
import Landing from './Landing'
import '../sass/main.css'

export default class App extends Component {
	render(){
		return (
			<div className='App'>
				<Landing />
			</div>
		)
	}
}