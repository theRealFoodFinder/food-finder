import React, { Component } from 'react';
// import logo from '../img/Logo.png'

class Results extends Component {
    constructor(){
        super();
        this.state={
             
      }
      this.handleClick=this.handleClick.bind(this)
      this.handlemenu = this.handlemenu.bind(this);
    }

    handlemenu(){
        //menu display here
    }

    handleClick(){
        
    }

    render() {
        return (
            <div className='resultsContainer'>
              <header>
                <div onClick={this.handlemenu} className='menubutton'></div>
              </header>
              <h2 id='resultsTitle'>Recipes</h2>
              <div className='gridContainer' ></div>
            </div>
        );
    }
}

export default Results;