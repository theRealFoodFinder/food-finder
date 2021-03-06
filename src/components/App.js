import React, { Component } from 'react'
import '../sass/main.css'
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing'
import SearchPage from './SearchPage'
import ShoppingList from './ShoppingList';
import Results from './Results';
import ProfilePage from './ProfilePage';
import Details from './Details';
import SuperDetails from './SuperDetails';
import History from './History';
import AddToList from './AddToList';
import Initialize from './Initialize';
import EasterEgg from './EasterEgg';



export default class App extends Component {
	constructor(props){
		super(props)
		this.state={
			profile: {},
			recipes: {},
			search:{},
			recipe: {},
			history: []
		}
this.setUserInfo = this.setUserInfo.bind(this);
this.passRecipes = this.passRecipes.bind(this);
this.passSearchParams = this.passSearchParams.bind(this);
this.getRecipe = this.getRecipe.bind(this);
this.passHistory = this.passHistory.bind(this);
	}
//function passing history for routing
	passHistory(historyObj){
		this.setState({
			history: historyObj
		})
	}

	setUserInfo (info) {
		// alert(info);
		this.setState({
		  profile: info
		})
		}
//function passing search results to props on App
	passRecipes(searchedRecipes){
		this.setState({
			recipes: searchedRecipes
		})
	}	
	//search info passed from search 
	passSearchParams(info){
		this.setState({
			search: info
		})
	}
//function putting searched recipe to props
	getRecipe(recipe){
		this.setState({
			recipe: recipe
		})
	}
	



	render(){
		// console.log(this.state.recipes)
		return (
			<div className='App'>
				
				<Switch>
					<Route component= { props => <ShoppingList {...props} recipe={this.state.recipe}/>} path='/shoppinglist'/>
					
					<Route component= { props => <AddToList {...props} recipe={this.state.recipe}/>} path='/add'/>
					
					<Route render= { props => <SearchPage {...props} passSearchParams={this.passSearchParams}passRecipes={this.passRecipes} setUserInfo={this.setUserInfo}/>} path='/search'/>
					
					<Route component= { props => <Details {...props} recipe={this.state.recipe}/>} path='/details'/>
					
					<Route component= { props => <Results historyLog={this.state.history} passHistory={this.passHistory} getRecipe={this.getRecipe} search={this.state.search} recipes={this.state.recipes} {...props} />} path='/results'/>
					
					<Route component= { props => <SuperDetails {...props} recipe={this.state.recipe} />} path='/recipe'/>

					<Route component= { props => <Initialize {...props} recipe={this.state.recipe} />} path='/initialsetup'/>

					<Route component= { props => <History historyLog={this.state.history} {...props} profile={this.state.profile}/>} path='/history'/>
					
					<Route component= { props => <ProfilePage {...props} profile={this.state.profile}/>} path='/profile'/>
					
					<Route component={EasterEgg} path='/secret'/>
					
					<Route component= {Landing} path='/'/>


				</Switch>
			</div>
			)
		}
	}