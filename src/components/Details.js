import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from './AppBar'

class Details extends Component {
    constructor(){
        super();
        this.state={
            results: []
      }
    }


componentWillMount() {
    // console.log(this.props.recipe[0], 'props on detailedpage')
    this.setState({
        results: this.props.recipe
    })
}
    render() {
        let ingredients = this.state.results[0].ingredients

       const ingredientsMap = ingredients.map(( ingredient,i ) => {

           return <div key={i} className='oneingredient'> •&nbsp;<div className='unit'>
{ingredient.DisplayQuantity} {ingredient.Unit} </div> &nbsp; {ingredient.Name} </div>
        })


       let titles = this.state.results[0].title
        return (

           <div className='detailsContainer'>
               <div className='allappbarcomponents'>
                    <AppBar />
                </div>

           <a href='#/results'><div className="detailsson">
                    <img src={this.state.results[0].hero_photo_url} alt="photourl"/>
                    <div className='titlebackground'>
                        <div id='foodtitle'>{titles}</div>
                    </div>
                    <div className="detailsson" id='seconddetailsson'>
                        <p id='detailsingredientstitle'>Ingredients</p>
                        <div id='ingredientsmap'>{ingredientsMap}</div>
                        <div className='detailquestion'>
                        <Link to='/add'><button> Add these to your shopping list?? </button></Link>
                        <Link to='/recipe'><button>Go to Recipe</button></Link>

                        </div>
                    </div>
                </div></a>
            </div>
        );
    }
}

export default Details;