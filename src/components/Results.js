import React, { Component } from 'react';
import axios from 'axios';
// import Details from './Details'
import { Link } from 'react-router-dom';
import AppBar from './AppBar'

class Results extends Component {
    constructor(props){
        super(props);
        this.state={
            search:{},
            results: [],
            showDetailedView: false,
            recipePicked: {},
            history: []
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
        let id = foundRecipe[0].recipe_id;
        let newtitle = foundRecipe[0].title;
        let newObj = {name:newtitle, id:id}
        let tempHistory = this.props.historyLog;
        tempHistory.unshift(newObj);
        if (tempHistory.length>10){tempHistory = tempHistory.splice(9)}
        this.setState({
            recipePicked: foundRecipe,
            history: tempHistory
        })
        this.props.getRecipe(foundRecipe);
        this.props.passHistory(tempHistory);
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
                 <div className='allappbarcomponents'>
                  <AppBar />
                </div>
                <div>You have {this.state.results.length} results...</div>
                {/* <header id='resultsTitle'> Recipes</header> */}
                <div id='resultsGrid' className='gridContainer' >
                    {renderResults}
                </div>

            </div>
        );
    }
}

export default Results;