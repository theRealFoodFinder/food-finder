import React, { Component } from 'react';
import bgvid from '../videos/landingvideo - converted.mp4'
import logo from '../img/Logo.png'
// import axios from 'axios'

class Landing extends Component {
    constructor(){
        super();
        this.state={
             
      }
      this.handleClick=this.handleClick.bind(this)
    }


handleClick(){
    // axios.get('/auth')
}
    render() {
        return (
            <div className='landing'>
                <div className='logo'><img src={logo} alt=""/></div>
                
                <a href='http://localhost:3005/auth'>
                <div className='signin' onClick={this.handleClick}><p id='signintext'>SIGN IN</p></div>
                </a>

                <video  id='landingvid' autoPlay muted loop className="css-background-video" data-state="play">
                     <source src={bgvid} type="video/mp4"/>
                 </video>

            </div>
        );
    }
}

export default Landing;