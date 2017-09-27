import React, { Component } from 'react';

class SearchModal extends Component {
    constructor(){
        super();
        this.state={
            modalObject:{

                },
            nutritionOptions:[
                "calories",
                "total_fat",
                "sodium",
                "carbs",
                "sugar",
                "protein"
            ],
            calorieOptions:[
                "< 400",
                "400 - 600",
                "600 - 800",
                "800 - 1000",
                "1000 - R U SURE?"
            ],
            gramOptions:[
                "< 10",
                "10 - 20",
                "20 - 30",
                "30 - 40",
                "40 - 50",
                "50 - 60",
                "60 - 70",
                "70 - >70"
            ],
            selected: 'calories',
            amount: 0
      }
    //   this.submitModal=this.submitModal.bind(this)
    }



handleSelectNutrition(value){
    this.setState({
        selected: value
    })
    // console.log(this.state.selected);
    // console.log(this.state.selected);
}

x(){
    console.log(this.state.selected);
}

handleSelectCal(value){
    this.setState({
        amount: value
    })
    console.log(this.state.amount);
    // console.log(this.state.selected);
}



// submitModal(){
//  tempobject=this.state.modalObject
// }




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
                    <select className='clalorieselect' onChange={(e) => {this.handleSelectCal(e.target.value)}}>
                    {calorieOptionsMap}
                    </select>
                </div>
                <button id='searchmodalbutton' onClick={this.submitModal}>Submit</button>
                </div>
                <button onClick={_=>this.x()}>oooo</button>
            </div>
        );
    }
}

export default SearchModal;