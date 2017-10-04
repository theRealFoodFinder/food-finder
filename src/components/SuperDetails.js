import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import AppBar from './AppBar'
import _ from 'underscore'

class SuperDetails extends Component {
    constructor(){
        super();
        this.state={
            results: []
      }
      this.prettify=this.prettify.bind(this)
    }


componentWillMount() {
    // console.log(this.props.recipe[0], 'props on detailedpage')
    this.setState({
        results: this.props.recipe
    })
}

    prettify(str){
        return str.split(' split ').map(x=>{
            x === '' && (x='<br>')
            || x !== '' && (x=`<p>${x}</p>`)
        })
       }
    render() {
        let ingredients = this.state.results[0].ingredients

       const ingredientsMap = ingredients.map(( ingredient,i ) => {
           return <div key={i} className='oneingredient'> •&nbsp;<div className='unit'>
{ingredient.DisplayQuantity} {ingredient.Unit} </div> &nbsp; {ingredient.Name} </div>
        })


        let nutritioninfo = this.state.results[0].nutrition_info;

        let nutritionrender = Object.entries(nutritioninfo).map((c,i)=>{
            return <li key={i}>{`${c[0]} : ${Math.ceil(c[1])}`} </li>
        })
        
   

       let titles = this.state.results[0].title
    //    console.log(this.state.results);
    let instruction = this.prettify(this.state.results[0].instructions.replace(/(\n+)/g, ' split '))
        console.log(instruction);







       let category = this.state.results[0].category
    //    let cuisine = this.state.results[0].cuisine
    //    let description = this.state.results[0].description
    //some description data is null
       let totalminutes = this.state.results[0].total_minutes



        return (
           <div className='detailsContainer'>
               <div className='allappbarcomponents'>
                    <AppBar />
                </div>

           <a href='#/results'>
                <div className="detailsson">
                    <img src={this.state.results[0].hero_photo_url} alt="photourl"/>
                    
                    <div className='titlebackground'>
                        <div id='foodtitle'>{titles}</div>
                    </div>


                    <div className="detailsson" id='seconddetailsson'>
                        {/* <p id='detailsingredientstitle'>Ingredients</p> */}
                        

                        <div className='superdetailcategory'>
                            Category: {category}
                        </div>


                        <div id='ingredientsmap'>
                            <div className='ingredientTitle'>Ingredients:</div>
                            <div>{ingredientsMap}</div>
                        </div>

                        <div id='instruction'>
                            <div className='instructionTitle'>Instruction:</div>
                            <div>{instruction}</div>
                        </div>


                        <div className='totalminutes'>
                            Total minutes: {totalminutes}
                        </div>

                        <div className='nutritioninfo'>
                            <div className='nutritionInfoTitle'>Nutrition Information (g):</div>
                            <ol>
                                {nutritionrender}
                            </ol>
                        </div>


                        <div className='superdetailquestion'>
                        <Link to='/search'><button> Back to Search </button></Link>
                        </div>
                    </div>
                </div>
            </a>
            </div>
        );
    }
}

export default SuperDetails;