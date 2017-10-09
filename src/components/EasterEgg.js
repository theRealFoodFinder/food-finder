import React, { Component } from 'react';
import AppBar from './AppBar';

class EasterEgg extends Component {

         
    render() {
    
        return (
            <div className="EasterEgg">
                <AppBar />
                <h1>Hello World!</h1>
                <img src="https://www.fillmurray.com/320/560" alt="background" className="shrine-image"/>
            </div>
        )
    }
}

export default EasterEgg;