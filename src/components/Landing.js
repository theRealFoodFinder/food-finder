import React, { Component } from 'react';
import bgvid from '../videos/landingvideo - converted.mp4'
import logo from '../img/Logo.png'
// import signin from '../img/SignInBotton.png'

class Landing extends Component {
    render() {
        return (
            <div className='landing'>
                <div className='logo'><img src={logo} alt=""/></div>
                <div className='signin' onClick={this.handleClick}><p id='signintext'>SIGN IN</p></div>
                <video  id='landingvid' autoPlay muted loop className="css-background-video" data-state="play">
                     <source src={bgvid} type="video/mp4"/>
                 </video>
                 
                 {/* <video id='landingvid' autoplay muted loop data-state="play">
			        <source src={bgvid} type="video/mp4" />
			        <source src={bgvid} type="video/webm" />
		        </video> */}

            </div>
        );
    }
}

export default Landing;