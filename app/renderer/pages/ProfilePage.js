import React from 'react';

import ProfileComponent from '../components/Profile/Profile.component';
// import $ from 'jquery';

const ProfilePage = () => ({

  render() {
    const background = {
      background: 'url(/app-drawer-background.jpg)',
      backgroundRepeat: 'no-repeat',
      height: '1400px',
      width: '100%'
    };

    return (
      <div style={background}>
        <ProfileComponent />
      </div>
    );
  }
});

export default ProfilePage;
