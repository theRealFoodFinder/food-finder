import React, { Component } from 'react';
import axios from 'axios';
// import Details from './Details'
import { Link } from 'react-router-dom'

class Results extends Component {
    constructor(props){
        super(props);
        this.state={
            search:{},
            results: [{sample:'data'},{sample:'data'}],
            showDetailedView: false,
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
        // console.log(this.state.showDetailedView);
        let temparray = this.state.results;
        let foundRecipe = temparray.filter((recipe, i)=>{
            return recipe.recipe_id === recipeId;
        })
        this.setState({
            recipePicked: foundRecipe
        })
        this.props.getRecipe(foundRecipe)
    }

    
    render() {
        const renderResults = this.state.results.map((el, i)=> {
            return  <div key={i}>
            <Link to='/details'><div key={i} className='imgDiv' >
                    <div onClick={(e)=> {this.handleFavIcon(el.recipe_id)}} className='favicon' >&#9829;</div>
                    <img alt={i}  key={el.recipe_id} onClick={()=>this.toggleDetailedView(el.recipe_id)} src={el.hero_photo_url}></img>
                </div></Link>
                <h3 className='resultsTitle'>{el.title}</h3>
            </div>
        })
        
        return (
            <div className='resultsContainer'>
                <div>You have {this.state.results.length} results...</div>
                <header id='resultsTitle'> Recipes</header>
                <div id='resultsGrid' className='gridContainer' >
                    {renderResults}
                </div>

            </div>
        );
    }
}

export default Results;