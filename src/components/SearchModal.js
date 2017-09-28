import React, { Component } from 'react';

class SearchModal extends Component {
    constructor(){
        super();
        this.state={
            modalObject: [],
            nutritionOptions:[
                "calories",
                "total_fat",
                "sodium",
                "carbs",
                "sugar",
                "protein"
            ],
            calorieOptions:[
                "< 400 cal",
                "400 - 600 cal",
                "600 - 800 cal",
                "800 - 1000 cal",
                "1000 cal - R U SURE?"
            ],
            gramOptions:[
                "< 10g",
                "10g - 20g",
                "20g - 30g",
                "30g - 40g",
                "40g - 50g",
                "50g - 60g",
                "60g - 70g",
                "70g - >70g"
            ],
            selected: 'calories',
            amount: "< 400 cal"
      }
        this.submitModal=this.submitModal.bind(this)
        this.handleSelectNutrition = this.handleSelectNutrition.bind(this);
        this.handleSelectCal = this.handleSelectCal.bind(this);

    }



handleSelectNutrition(value){
    this.setState({
        selected: value
    })
}



handleSelectCal(value){
    this.setState({
        amount: value
    })
    // console.log(this.state.selected, 'selected');
}



submitModal(){
    // console.log(this.state.amount, "amount");
 let tempModalObject=this.state.modalObject;
 let tempModalAdd = {
     selected : this.state.selected,
     amount : this.state.amount
 };
 console.log(tempModalObject);
 tempModalObject = tempModalObject.push(tempModalAdd)
 console.log(tempModalObject, 'tempModalObject');
                                                                                        //set to state on modalobject
}




    render() {

        const nutritionOptionsMap = this.state.nutritionOptions.map((nutrition, i)=>{
            return(
                <option value ={nutrition} key={i}>
                    {nutrition}
                </option>
            )
        })


        const calorieOptionsMap = (this.state.selected ===this.state.nutritionOptions[0])? this.state.calorieOptions.map((calorie,i)=>{
            return(
                <option value = {calorie} key={i}>
                    {calorie}
                    </option>
            )
        }):this.state.gramOptions.map((gram,i)=>{
            return(
                <option value = {gram} key={i}>
                    {gram}
                    </option>
            )
        })
    

        return (
            <div className='modalcontainer'>
                <div className='buttonfamily'>
                    <div className='selectfamily'>
                    <select className='nutritionselect' onChange={(e) => {this.handleSelectNutrition(e.target.value)}}>
                    {nutritionOptionsMap}
                    </select>
                    <select className='calorieSelect' onChange={(e) => {this.handleSelectCal(e.target.value)}}>
                    {calorieOptionsMap}
                    </select>
                </div>
                <button id='searchmodalbutton' onClick={this.submitModal}>Submit</button>
                </div>
            </div>
        );
    }
}

export default SearchModal;