import React, { Component } from 'react';
import bgvid from '../videos/landingvideo - converted.mp4'
import logo from '../img/logobigsize.png'
import bgfullscreenvid from '../videos/landingvideo - fullscreen.mp4'
// import axios from 'axios';
class Landing extends Component {



    render() {
        return (
            <div className='landing'>
                <img alt='' src={logo} className='logo'></img>
                <a href='/auth'>
                    <div className='signin'><p id='signintext'>SIGN IN</p></div>
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