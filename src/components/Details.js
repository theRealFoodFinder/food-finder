import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Details extends Component {
    constructor(){
        super();
        this.state={
            results: []
      }
    }



componentWillMount() {
    console.log(this.props.recipe[0], 'props on detailedpage')
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
        // console.log(titles);
        // const foodtitleMap = titles.map((foodtitle,i)=>{
        //     console.log(foodtitle);
        //     return<div>{foodtitle.title}</div>
        // })

        // console.log(this.state.results[0].ingredients[0].Name);
        // console.log('details state', this.state)
        return (

            <div className='detailsContainer'>

            <a href='#/results'><div className="detailsson">
                    <img src={this.state.results[0].hero_photo_url} alt="photourl"/>
                    <div className='titlebackground'>
                        <div id='foodtitle'>{titles}</div>
                    </div>

                    <div className="detailsson" id='seconddetailsson'>
                        <p id='detailsingredientstitle'>🥗 Ingredients 🥗</p>
                        <div id='ingredientsmap'>{ingredientsMap}</div>
                        <div className='detailquestion'> 
                        <Link to='/add'><button> Add these to your shopping list?? </button></Link>
                            
                              
                        </div>
                    </div>
{/*comment field below was attempting to eliminate error from emojis*/}
                    {/* <div className="detailsson" id='seconddetailsson'>
                        <p id='detailsingredientstitle'><span role="img">🥗</span>  Ingredients<span role="img">🥗</span></p>
                        <div id='ingredientsmap'>{ingredientsMap}</div>
                        <div className='detailquestion'> 
                            <button onClick={this.yesHandleClick}>Yes</button> 
                            Do you want to try this recipe? 
                            <button onClick={this.props.toggleDetailedView}>No</button>  
                        </div>
                    </div> */}

                </div></a>

                {/* <div className="detailsson" id='seconddetailsson'>
                    <p id='detailsingredientstitle'>🥗  Ingredients🥗</p>
                    <div id='ingredientsmap'>{ingredientsMap}</div>
                </div> */}

            </div>
        );
    }
}

export default Details;



