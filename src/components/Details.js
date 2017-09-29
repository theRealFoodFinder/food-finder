import React, { Component } from 'react';


class Details extends Component {
    constructor(){
        super();
        this.state={
            results: [{
                active_minutes:30,
                all_categories_text:"collxnf|collxweeknight|collxnrm|collxhealthy|collxveg|collsxpantry|collsxsoy|collsxlight|collsxhealthycheese|collsxhealthycollection5|collsxnrm|vegetarian|collsxvegetarian5|white-meat-free|tree-nut-free|nut-free|gluten-free|red-meat-free|shellfish-free|contains-dairy|pescatarian",
                category:"Salad",
                cuisine:"Mediterranean",
                description:"Light cool dish for a side salad or light lunch",
                hero_photo_url:"https://photos.bigoven.com/recipe/hero/mediterranean-edamame-quinoa-salad.jpg",
                image_url:"http://redirect.bigoven.com/pics/mediterranean-edamame-quinoa-salad.jpg",
                ingredients:
                
                [{"IngredientID":5760452,"DisplayIndex":0,"IsHeading":false,"Name":"White wine vinegar","HTMLName":null,"Quantity":0.25,"DisplayQuantity":"1/4","Unit":"Cup","MetricQuantity":0.25,"MetricDisplayQuantity":"1/4","MetricUnit":"Cup","PreparationNotes":null,"IngredientInfo":null,"IsLinked":true},{"IngredientID":5760453,"DisplayIndex":1,"IsHeading":false,"Name":"Fresh garlic, peeled","HTMLName":null,"Quantity":1,"DisplayQuantity":"1","Unit":"clove","MetricQuantity":1,"MetricDisplayQuantity":"1","MetricUnit":"clove","PreparationNotes":null,"IngredientInfo":null,"IsLinked":true},{"IngredientID":5760454,"DisplayIndex":2,"IsHeading":false,"Name":"Fresh oregano","HTMLName":null,"Quantity":2,"DisplayQuantity":"2 ","Unit":"tablespoons","MetricQuantity":30,"MetricDisplayQuantity":"30","MetricUnit":"ml","PreparationNotes":"finely chopped","IngredientInfo":null,"IsLinked":true},{"IngredientID":5760455,"DisplayIndex":3,"IsHeading":false,"Name":"Extra virgin olive oil","HTMLName":null,"Quantity":0.25,"DisplayQuantity":"1/4","Unit":"cup","MetricQuantity":59,"MetricDisplayQuantity":"59","MetricUnit":"ml","PreparationNotes":null,"IngredientInfo":null,"IsLinked":true},{"IngredientID":5760456,"DisplayIndex":4,"IsHeading":false,"Name":"salt","HTMLName":null,"Quantity":0.25,"DisplayQuantity":"1/4 ","Unit":"teaspoon","MetricQuantity":1.23223039580426,"MetricDisplayQuantity":"1","MetricUnit":"ml","PreparationNotes":null,"IngredientInfo":null,"IsLinked":true},{"IngredientID":5760457,"DisplayIndex":5,"IsHeading":false,"Name":"Freshly ground pepper","HTMLName":null,"Quantity":1,"DisplayQuantity":null,"Unit":null,"MetricQuantity":0,"MetricDisplayQuantity":"","MetricUnit":"","PreparationNotes":null,"IngredientInfo":null,"IsLinked":true},{"IngredientID":5760458,"DisplayIndex":6,"IsHeading":false,"Name":"edamame","HTMLName":null,"Quantity":2,"DisplayQuantity":"2 ","Unit":"cups","MetricQuantity":473,"MetricDisplayQuantity":"473","MetricUnit":"ml","PreparationNotes":"cooked and shelled","IngredientInfo":null,"IsLinked":true},{"IngredientID":5760459,"DisplayIndex":7,"IsHeading":false,"Name":"quinoa","HTMLName":null,"Quantity":3,"DisplayQuantity":"3","Unit":"cups","MetricQuantity":710,"MetricDisplayQuantity":"710","MetricUnit":"ml","PreparationNotes":"cooked","IngredientInfo":null,"IsLinked":true},{"IngredientID":5760460,"DisplayIndex":8,"IsHeading":false,"Name":"sun dried tomatoes","HTMLName":null,"Quantity":0.666666666666667,"DisplayQuantity":"2/3","Unit":"cups","MetricQuantity":158,"MetricDisplayQuantity":"158","MetricUnit":"ml","PreparationNotes":"thinly sliced","IngredientInfo":null,"IsLinked":true},{"IngredientID":5760461,"DisplayIndex":9,"IsHeading":false,"Name":"red onion","HTMLName":null,"Quantity":0.5,"DisplayQuantity":"1/2 ","Unit":"cup","MetricQuantity":118,"MetricDisplayQuantity":"118","MetricUnit":"ml","PreparationNotes":"diced","IngredientInfo":null,"IsLinked":true},{"IngredientID":5760462,"DisplayIndex":10,"IsHeading":false,"Name":"kalamata olives","HTMLName":null,"Quantity":0.5,"DisplayQuantity":"1/2 ","Unit":"cup","MetricQuantity":118,"MetricDisplayQuantity":"118","MetricUnit":"ml","PreparationNotes":"halved","IngredientInfo":null,"IsLinked":true},{"IngredientID":5760463,"DisplayIndex":11,"IsHeading":false,"Name":"Feta cheese","HTMLName":null,"Quantity":0.5,"DisplayQuantity":"1/2 ","Unit":"cup","MetricQuantity":118,"MetricDisplayQuantity":"118","MetricUnit":"ml","PreparationNotes":"crumbled","IngredientInfo":null,"IsLinked":true}],
                instructions:"yadayadayadyadyadyadyya aydaydaydyady",
                nutrition_info :{
                    "SingularYieldUnit":"1 Serving (166g)","TotalCalories":429,"TotalFat":12.887492722371714,"CaloriesFromFat":116,"TotalFatPct":0.17183323629828953,"SatFat":2.6085836171317123,"SatFatPct":0.1304291808565856,"MonoFat":4.846236719221736,"PolyFat":3.3575361528754164,"TransFat":2.0751362331428496,"Cholesterol":8.343750007053393,"CholesterolPct":0.02567307694477967,"Sodium":279.9635701648649,"SodiumPct":0.09653916212581548,"Potassium":810.9537457693517,"PotassiumPct":0.21340888046561887,"TotalCarbs":62.039441161349856,"TotalCarbsPct":0.18246894459220547,"DietaryFiber":8.690514319850749,"DietaryFiberPct":0.34762057279402997,"Sugar":53.34892684149911,"Protein":17.27789653064957,"ProteinPct":0.24682709329499386},
                primary_ingredient:"Quinoa",
                recipe_id:40,
                sub_category:"Grains",
                title:"Mediterranean Edamame Quinoa Salad",
                total_minutes:40,
                web_url:"http://www.bigoven.com/recipe/mediterranean-edamame-quinoa-salad/577698",
                yield:8
             }]
             
      }
      this.yesHandleClick=this.yesHandleClick.bind(this)
      this.noHandleClick=this.noHandleClick.bind(this)
    }

yesHandleClick(){
 //shoppinglist comes up
    
    }

noHandleClick(){
    //go back to results page
    
    }



    render() {
        // const ingredients = {this.state.results.ingredients[0]['name']}

        let ingredients = this.state.results[0].ingredients

        const ingredientsMap = ingredients.map(( ingredient,i ) => {
            // console.log(ingredient);
            return <div className='oneingredient'> •&nbsp;<div className='unit'>
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
        return (
            <div className='detailsContainer'>
                <div className="detailsson">
                    <img src={this.state.results[0].hero_photo_url} alt="photourl"/>
                    <div className='titlebackground'>
                        <div id='foodtitle'>{titles}</div>
                    </div>

                    <div className="detailsson" id='seconddetailsson'>
                        <p id='detailsingredientstitle'>🥗  Ingredients🥗</p>
                        <div id='ingredientsmap'>{ingredientsMap}</div>
                        <div className='detailquestion'> 
                            <button onClick={this.yesHandleClick}>Yes</button> 
                            Do you want to try this recipe? 
                            <button onClick={this.noHandleClick}>No</button>  
                        </div>
                    </div>
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



