import React, { Component } from 'react';
import Sidebar from './Sidebar';

class ProfilePage extends Component {
    render() {
        return (
            <div className='profilePageContainer'>
            <Sidebar />
                Profile Page
            </div>
        );
    }
}

export default ProfilePage;