import React, { Component } from 'react';
import axios from 'axios';
import Details from './Details'


class Results extends Component {
    constructor(){
        super();
        this.state={
             results: [],
             showDetailedView: 'false',
             recipePicked: {}
      }
      this.handleFavIcon = this.handleFavIcon.bind(this);
      this.toggleDetailedView = this.toggleDetailedView.bind(this);
    }
    handleFavIcon(id){
        axios.get('http://localhost/3005/api/favoriteRecipe/' + id).then(console.log('Recipe added to favorites')).catch((error)=>{
            console.log(error)
        });

    }
    toggleDetailedView(id){
        // let detailedview = this.state.showDetailedView;
        this.setState((prevState)=>{
            return {showDetailedView: !prevState.showDetailedView}
        })
        let temparray = this.state.results;
        let foundRecipe = temparray.filter((recipe, i)=>{
            return recipe.recipe_id === id;
        })
        this.setState({
            recipePicked: foundRecipe
        })
    }

    
    render() {


        // let renderModal = this.state.toggleDetailedView===true ? <Details toggleDetailedView={this.toggleDetailedView}/> : {renderResults};


//render modal when button is clicked and state changes
let renderModal = this.state.showDetailedView === true ? <Details  recipe={this.state.recipePicked} toggleDetailedView={this.toggleDetailedView}/> : "";
console.log(this.state.results[0])


//render search results 
        const renderResults = this.state.results.map((el, i)=> {
            // console.log(el.recipe_id)
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