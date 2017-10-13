import React, { Component } from 'react';
import axios from 'axios';
import AppBar from './AppBar';

class Initialize extends Component {
    
    componentWillMount() {
        this.setState({
            userCupboard: this.state.defaultCupboard
    })
    }
    
    constructor(props) {
        super(props);
        //initCupboard is ingredients that user chooses on click
        //defaultCupboard is everyone has no matter what
        //userCupboard is sent to 
        this.state = {
            initCupboard:["eggs","peanut butter","milk","bread","pasta","oatmeal","tuna","mayonaise", "cheese","olive oil","cinnamon","mustard","garlic"],

            defaultCupboard:["salt","pepper","vegetable oil","flour","rice","butter","ketchup","vinegar","sugar"],

            userCupboard:[]
        }
        this.handleBoxChecked=this.handleBoxChecked.bind(this);
        this.addtoCupboard = this.addtoCupboard.bind(this);
        
    }

    addtoCupboard(){
        axios.post('/api/pantrySetup', this.state.userCupboard).then(console.log('pantry setup'))
    }

    handleBoxChecked(e){
            let listItem = e.target.className
            let list = this.state.initCupboard
            list[listItem]=!list[listItem]
            console.log(listItem)
            // console.log(list);
            this.setState({
                initCupboard: list
            })
            console.log(this.state.initCupboard, 'ingredients added') 
        }
         
    render() {
    
        let recipeItems = this.state.initCupboard.map((list, i) => {
            // console.log(list)
            return(
                <div key={list} className={list}><input onChange={this.handleBoxChecked} className={list} type="checkbox" key={i} />{list}
                    </div>
                )
            })
        return (
            <div className='initializeContainer'>
                <div className='allappbarcomponents'>
                    <AppBar />
                </div>
                <div className='top'>Select Ingredients You have Currently at Home</div>
                <div className='addtocartbutton'>
                    <a href='/recipe'><button onClick={this.addtoCupboard}>add to Cupboard and search</button></a>
                </div>
                <div className='addToListContainer initCupboardmap'>
                    {recipeItems}
                </div>
            </div>
        );
    }
}

export default Initialize;