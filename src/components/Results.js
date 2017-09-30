import React, { Component } from 'react';
import axios from 'axios';
import Details from './Details'


class Results extends Component {
    constructor(props){
        super(props);
        this.state={
            search:{},
            results: [{sample:'data'},{sample:'data'}],
            showDetailedView: 'false',
            recipePicked: {}
      }
      this.handleFavIcon = this.handleFavIcon.bind(this);
      this.toggleDetailedView = this.toggleDetailedView.bind(this);
    }


componentWillMount() {
    // console.log(this.state.search, 'profile');
    let profile = this.props.search
    axios.post('http://localhost:3005/api/getRecipe', profile).then((res)=>{
        this.setState({
            results: res.data
        })
    })
}

    handleFavIcon(id){
        axios.get('http://localhost/3005/api/favoriteRecipe/' + id).then(console.log('Recipe added to favorites'));
    }

    toggleDetailedView(recipeId){
        // console.log(recipeId);
        // console.log('clicked');
        // console.log(this.state.showDetailedView);
        this.setState((prevState)=>{
            return {showDetailedView: !prevState.showDetailedView}
        })
        let temparray = this.state.results;
        let foundRecipe = temparray.filter((recipe, i)=>{
            return recipe.recipe_id === recipeId;
        })
        this.setState({
            recipePicked: foundRecipe
        })
    }

    
    render() {

//render details modal
        let renderModal =this.state.showDetailedView === true ? <Details  recipe={this.state.recipePicked} toggleDetailedView={this.toggleDetailedView}/> : "";
            
    
//render search results 
        const renderResults = this.state.results.map((el, i)=> {
            return  <div key={i}>
                <div key={i} className='imgDiv' >
                    <div onClick={(e)=> {this.handleFavIcon(el.recipe_id)}} className='favicon' >&#9829;</div>
                    <img alt={i}  key={el.recipe_id} onClick={()=>this.toggleDetailedView(el.recipe_id)} src={el.hero_photo_url}></img>
                </div>
                <h3 className='resultsTitle'>{el.title}</h3>
            </div>
        })
        
        return (
            <div className='resultsContainer'>
                <div>You have {this.state.results.length} results...</div>
                <header id='resultsTitle'> Recipes</header>
                <div id='resultsGrid' className='gridContainer' >
                    {renderModal}
                    {renderResults}
                </div>

            </div>
        );
    }
}

export default Results;