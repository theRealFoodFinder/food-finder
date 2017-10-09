import React, { Component } from 'react';
import AppBar from './AppBar';

class EasterEgg extends Component {

    render() {
    
        return (
            <div className="EasterEgg">
                <AppBar />
                <div className="img_container">
                     <img src="https://i.imgur.com/HzCfP7E.png" alt="background" className="shrine-image easteregg"/> 
                </div>
            </div>
        )
    }
}

export default EasterEgg;