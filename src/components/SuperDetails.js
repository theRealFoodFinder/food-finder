import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import AppBar from './AppBar'
import NewLineFunc from './NewLineFunc'

class SuperDetails extends Component {
    constructor(){
        super();
        this.state={
            results: []
      }
    }


componentWillMount() {
    // console.log(this.props.recipe[0], 'props on detailedpage')
    this.setState({
        csseffect: false,
        results: this.props.recipe
    })
    this.handleSearch=this.handleSearch.bind(this)
}


handleSearch(e) {

    this.setState({csseffect: true});

    console.log(e.target)
    setTimeout(_=> {
        console.log(this)
        this.props.history.push('/results')
    }, 1000);
}



    render() {
        let ingredients = this.state.results[0].ingredients

       const ingredientsMap = ingredients.map(( ingredient,i ) => {
            return (
            <div key={i} className='oneingredient'> •&nbsp;
                <div className='unit'> {ingredient.DisplayQuantity} {ingredient.Unit} </div> &nbsp; {ingredient.Name}
            </div>)
        })


        let nutritioninfo = this.state.results[0].nutrition_info;

        let nutritionrender = Object.entries(nutritioninfo).map((c,i)=>{
            return <li key={i}>{`${c[0]} : ${Math.ceil(c[1])}`} </li>
        })

       let titles = this.state.results[0].title
       let instruction =this.state.results[0].instructions
       let category = this.state.results[0].category
       let totalminutes = this.state.results[0].total_minutes

        return (
           <div className='detailsContainer'>
               <div className='allappbarcomponents'>
                    <AppBar />
                </div>

                <div className="detailsson">
                    <img src={this.state.results[0].hero_photo_url} alt="photourl"/>

                    <div className='titlebackground'>
                        <div id='foodtitle'>{titles}</div>
                    </div>


                    <div className="detailsson" id='seconddetailsson'>


                        <div className='superdetailcategory'>
                            Category: {category}
                        </div>


                        <div id='ingredientsmap'>
                            <div className='ingredientTitle'>Ingredients:</div>
                            <div>{ingredientsMap}</div>
                        </div>

                        <div id='instruction'>
                            <div className='instructionTitle'>Instruction:</div>

                            <div className='instructionBody'><NewLineFunc string={instruction} /></div>
                        </div>


                        <div className='totalminutes'>
                            Total minutes: {totalminutes}
                        </div>

                        <div className='nutritioninfo'>
                            <div className='nutritionInfoTitle'>Nutrition Information (g):</div>
                            <ol>
                               <div className='nutritionRenderBody'> {nutritionrender} </div>
                            </ol>
                        </div>


                        <div className='superdetailquestion'>

                       <button onClick={e => this.handleSearch(e)} className={this.state.csseffect && 'dothateffect'}> Back to Search </button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default SuperDetails;