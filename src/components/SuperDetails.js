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


        // let nutritioninfo = this.state.results[0].nutrition_info;

        
        //  for(let key in nutritioninfo) {
        //         if (nutritioninfo.hasOwnProperty(key)) { 
        //             let value = nutritioninfo[key];
        //     }
        //     }


        //use underscore
        // let nutritioninfoMap = _.each(nutritioninfo, (value, key)=>{
        //     return(key + ':' + value)
        // })


        //lodash
        // let nutritioninfoMap = _.forOwn(nutritioninfo, (value, key)=>{
        //         value, key
        // })


        // for (let nutriitem in nutritioninfo){
        //         return <div>{nutriitem}: {nutritioninfo[nutriitem]}</div>
         //     }
        
                                

        // const nutritioninfoMap = nutritioninfo.map((nutrition, i) => {
        //     return <div key={i} className='nutriinfo'>
        //     {nutrition.CaloriesFromFat} 
        //     {nutrition.Cholesterol}
        //     {nutrition.CholesterolPct}
        //     {nutrition.DietaryFiber}
        //     {nutrition.DietaryFiberPct}
        //     {nutrition.MonoFat}
        //     {nutrition.PolyFat}
        //     {nutrition.Potassium}
        //     {nutrition.PotassiumPct}
        //     {nutrition.Protein}

        //     </div>
        // })



       let titles = this.state.results[0].title
       console.log(this.state.results);


       let instruction = this.state.results[0].instructions
       let category = this.state.results[0].category
       let cuisine = this.state.results[0].cuisine
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
                            Ingredients:{ingredientsMap}
                        </div>

                        <div id='instruction'>
                            <div>
                            Instruction:<div>{instruction}</div>
                            </div>
                        </div>

                        <div className='cuisine'>
                            Cuisine:{cuisine}
                        </div>

                        {/* <div className='description'>
                            Description:{description}
                        </div> */}

                        <div className='totalminutes'>
                            Total minutes: {totalminutes}
                        </div>

                        {/* <div className='nutritioninfo'>
                        {nutritioninfo}
                        </div> */}


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