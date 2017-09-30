import React, { Component } from 'react';


class Details extends Component {
    constructor(){
        super();
        this.state={
            results: []
             
      }
      this.yesHandleClick=this.yesHandleClick.bind(this);
    }

yesHandleClick(){
 //shoppinglist comes up
    
    }

componentWillMount() {
    console.log(this.props, 'props on detailedpage')
    this.setState({
        results: this.props.recipe
    })
    
}

    render() {
        // const ingredients = {this.state.results.ingredients[0]['name']}

        let ingredients = this.state.results[0].ingredients

        const ingredientsMap = ingredients.map(( ingredient,i ) => {
            // console.log(ingredient);

            return <div key={i} className='oneingredient'> •&nbsp;<div className='unit'>
{ingredient.DisplayQuantity} {ingredient.Unit} </div> &nbsp; {ingredient.Name} </div>
            // console.log(ingredient);
        })


        let titles = this.state.results[0].title
        console.log(titles);
        // const foodtitleMap = titles.map((foodtitle,i)=>{
        //     console.log(foodtitle);
        //     return<div>{foodtitle.title}</div>
        // })

        // console.log(this.state.results[0].ingredients[0].Name);
        console.log('details state', this.state)
        return (

            <div className='detailsContainer'>

                <div className="detailsson">
                    <img src={this.state.results[0].hero_photo_url} alt="photourl"/>
                    <div className='titlebackground'>
                        <div id='foodtitle'>{titles}</div>
                    </div>

                    <div className="detailsson" id='seconddetailsson'>
                        <p id='detailsingredientstitle'>🥗 Ingredients 🥗</p>
                        <div id='ingredientsmap'>{ingredientsMap}</div>
                        <div className='detailquestion'> 
                            <button onClick={this.yesHandleClick}>Yes</button> 
                            Do you want to try this recipe? 
                            <button onClick={this.props.toggleDetailedView}>No</button>  
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

                </div>

                {/* <div className="detailsson" id='seconddetailsson'>
                    <p id='detailsingredientstitle'>🥗  Ingredients🥗</p>
                    <div id='ingredientsmap'>{ingredientsMap}</div>
                </div> */}

            </div>
        );
    }
}

export default Details;



