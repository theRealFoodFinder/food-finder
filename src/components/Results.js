import React, { Component } from 'react';
import axios from 'axios';
import Details from './Details'


class Results extends Component {
    constructor(){
        super();
        this.state={
             results: [{
                title:"Salad1",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                recipe_id:1
             }, {
                title:"Quinoa Salad2",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                recipe_id:2
             }, {
                title:"Mediterranean Edamame Quinoa Salad3",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                recipe_id:3
             }, {
                title:"Mediterranean Edamame Quinoa Salad4",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                recipe_id:4
             }, {
                title:"Mediterranean Edamame Quinoa Salad5",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                recipe_id:5
             }, {
                title:"Mediterranean Edamame Quinoa Salad6",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
             }, {
                title:"Mediterranean Edamame Quinoa Salad7",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
             }, {
                title:"Mediterranean Edamame Quinoa Salad8",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
             }, {
                title:"Mediterranean Edamame Quinoa Salad9",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                recipe_id:2
             }, {
                title:"Mediterranean Edamame Quinoa Salad10",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                recipe_id:2
             }],
             showDetailedView: 'false'
      }
      this.handleFavIcon = this.handleFavIcon.bind(this);
      this.toggleDetailedView = this.toggleDetailedView.bind(this);
    }
    handleFavIcon(id){
        axios.get('http://localhost/3005/api/favoriteRecipe/' + id).then(console.log('Recipe added to favorites')).catch((error)=>{
            console.log(error)
        });

    }
    toggleDetailedView(){
        let detailedview = this.state.showDetailedView;
        this.setState((prevState)=>{
            return {showDetailedView: !prevState.showDetailedView}
        })
        console.log(detailedview)
    }
    componentWillMount() {
        let renderModal = this.state.showDetailedView === true ? <Details toggleDetailedView={this.toggleDetailedView}/> : "";
    }
    
    render() {
        // let renderModal = this.state.toggleDetailedView===true ? <Details toggleDetailedView={this.toggleDetailedView}/> : {renderResults};
        let renderModal = this.state.showDetailedView === true ? <Details toggleDetailedView={this.toggleDetailedView}/> : "";
        
      
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
                <div className='gridContainer' >
                    {renderModal}
                    {renderResults}
                </div>

            </div>
        );
    }
}

export default Results;