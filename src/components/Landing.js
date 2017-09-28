import React, { Component } from 'react';
import bgvid from '../videos/landingvideo - converted.mp4'
import logo from '../img/logobigsize.png'
import bgfullscreenvid from '../videos/landingvideo - fullscreen.mp4'

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
                <img alt='' src={logo} className='logo'></img>
                {/* <div className='logo'></div> */}
                <a href='http://localhost:3005/auth'>
                <div className='signin' onClick={this.handleClick}><p id='signintext'>SIGN IN</p></div>
                </a>

                <video id='landingvidapp' autoPlay muted loop className="css-background-video" data-state="play">
                     <source src={bgvid} type="video/mp4"/>
                 </video>

                 <video  id='landingvidfullscreen' autoPlay muted loop className="css-background-video" data-state="play">
                     <source src={bgfullscreenvid} type="video/mp4"/>
                 </video>


            </div>
        );
    }
}

export default Landing;