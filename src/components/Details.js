import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import AppBar from './AppBar';
import axios from 'axios';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            csseffect: false,
            csseffect2: false,
            results: [],
            profile: {}
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleFavIcon = this.handleFavIcon.bind(this)
    }

    handleFavIcon() {
        if (this.state.results && this.state.results.length > 0 && this.state.results[0].recipe_id) {
            let id = this.state.results[0].recipe_id
            axios.get('/3005/api/favoriteRecipe/:' + id).then((res)=>{
                if (res && res.data){console.log(res, 'res success')}
            }).catch((err)=>console.log(err))
        }
    }

    componentWillMount() {
        axios.get('/api/getProfile').then((res) => {
            if (!res.data.first || !res.data.last) {
                this.props.history.push('/')
            } else
                this.setState({
                    profile: res.data
                })
            // console.log(this.state.profile)
        })
        if (this.props.recipe) {
            this.setState({
                results: this.props.recipe,
            })
            // console.log(this.props.recipe)
        }
    }

    handleClick(e) {
        this.setState({ csseffect: true });
        setTimeout(_ => {
            console.log(this)
            this.props.history.push('/recipe')
        }, 1000);
    }


    handleClick2(e) {
        this.setState({ csseffect2: true });
        setTimeout(_ => {
            this.props.history.push('/add')
        }, 1000);
    }



    render() {
        // let ingredients = this.state.results[0].ingredients;
        // const ingredientsMap = ingredients.map((ingredient, i) => {
        //     return <div key={i} className='oneingredient'> •&nbsp;<div className='unit'>
        //         {ingredient.DisplayQuantity} {ingredient.Unit} </div> &nbsp; {ingredient.Name} </div>
        // })
        // let titles = this.state.results[0].title;
        // let image = this.state.results[0].hero_photo_url;

        let titles = "Error loading Page";
        let ingredientsMap = "No Ingredients";
        let image = "error loading image";
        if(this.state && this.state.results && this.state.results.length>0 && this.state.results[0].title){
        titles = this.state.results[0].title;
        let ingredients = this.state.results[0].ingredients;
        image= this.state.results[0].hero_photo_url;
        ingredientsMap = ingredients.map((ingredient, i) => {
            return <div key={i} className='oneingredient'> •&nbsp;<div className='unit'>
                {ingredient.DisplayQuantity} {ingredient.Unit} </div> &nbsp; {ingredient.Name} </div>
        })}

        return (

            <div className='detailsContainer'>
                <div className='allappbarcomponents'>
                    <AppBar />
                </div>
                <span onClick={(e) => { this.handleFavIcon(e) }} className='favicon' >&#9829;</span>
                <div id='detailsMainContainer' className="detailsson">
                    <img src={image} alt="photourl" />
                    <div className='titlebackground'>
                        <div id='foodtitle'>{titles}</div>
                    </div>
                    <div className="detailsson" id='seconddetailsson'>
                        <p id='detailsingredientstitle'>Ingredients</p>
                        <div id='ingredientsmap'>{ingredientsMap}</div>
                        <div className='detailquestion'>
                            <button onClick={e => this.handleClick2(e)} className={this.state.csseffect2 && 'dothateffect'}> Add to shopping list?? </button>

                            <button onClick={e => this.handleClick(e)} className={this.state.csseffect && 'dothateffect'}>Go to Recipe</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;