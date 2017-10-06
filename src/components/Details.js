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
            results: []
        }
        this.handleClick = this.handleClick.bind(this)
    }


    componentWillMount() {
        axios.get('/api/getProfile').then((res) => {
            if (!res.data.first || !res.data.last) {
                this.props.history.push('/')
            }
        })
        if (this.props.recipe) {
                    this.setState({
                        results: this.props.recipe,
                    })
        }
    }

    handleClick(e) {
        this.setState({ csseffect: true });

        console.log(e.target)
        setTimeout(_ => {
            console.log(this)
            this.props.history.push('/recipe')
        }, 1000);
    }


    handleClick2(e) {
        this.setState({ csseffect2: true });

        // console.log(e.target)
        setTimeout(_ => {
            console.log(this)
            this.props.history.push('/add')
        }, 1000);
    }



    render() {
        let ingredients = this.state.results[0].ingredients

        const ingredientsMap = ingredients.map((ingredient, i) => {

            return <div key={i} className='oneingredient'> •&nbsp;<div className='unit'>
                {ingredient.DisplayQuantity} {ingredient.Unit} </div> &nbsp; {ingredient.Name} </div>
        })


        let titles = this.state.results[0].title
        return (

            <div className='detailsContainer'>
                <div className='allappbarcomponents'>
                    <AppBar />
                </div>

                <div id='detailsMainContainer' className="detailsson">
                    <img src={this.state.results[0].hero_photo_url} alt="photourl" />
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