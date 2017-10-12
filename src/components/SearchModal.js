import React, { Component } from 'react';

class SearchModal extends Component {
    constructor(props){
        super(props);
        this.state={
            modalObject: {
                "calories": "",
                "total_fat": "",
                "sodium": '',
                "carbs":'',
                "sugar":'',
                "protein":''
            },
            nutritionOptions:[
                "calories",
                "carbs",
                "protein",
                "sodium",
                "sugar",
                "total_fat",
            ],
            calorieOptions:[
                "less than 400 cal",
                "400 - 600 cal",
                "600 - 800 cal",
                "800 - 1000 cal",
                "more than 1000 cal"
            ],
            gramOptions:[
                "< 10g",
                "10g - 20g",
                "20g - 30g",
                "30g - 40g",
                "40g - 50g",
                "50g - 60g",
                "60g - 70g",
                "70g+"
            ],
            selected: 'calories',
            amount: ""
      }
        this.submitAdd=this.submitAdd.bind(this)
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



    submitAdd(){
    this.props.handleGetFilters(this.state.selected, this.state.amount)
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
                        {/* <button id='SearchModalCloseButton'onClick={this.props.handleFilter}>
                            X
                        </button> */}
                        <select className='nutritionselect' onChange={(e) => {this.handleSelectNutrition(e.target.value)}}>
                            {nutritionOptionsMap}
                        </select>
                        <select className='calorieSelect' onChange={(e) => {this.handleSelectCal(e.target.value)}}>
                            {calorieOptionsMap}
                        </select>
                    </div>
                    <div className='SearchModalTwoButtons'>    
                    <button id='SearchModalCloseButton'onClick={this.props.handleFilter}>
                            X
                        </button>
                    <button id='searchmodalbutton' onClick={this.submitAdd}>Submit</button>
                    
                        </div>
                </div>
            </div>
        );
    }
}

export default SearchModal;