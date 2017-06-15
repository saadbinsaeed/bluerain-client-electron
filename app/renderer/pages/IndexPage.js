import React from 'react';
// import SiteGridWidget from '../components/Site/SitesGrid/SitesGrid.container';
// import AbsoluteCenterLayout from '../layouts/AbsoluteCenterLayout';
import AppDrawer from '../components/AppDrawer/AppDrawer.component';
// import $ from 'jquery';

const IndexPage = () => ({

  render() {
    // console.log('Props in index page is : ', this.props);
    const background = {
      background: 'url(/app-drawer-background.jpg) top right no-repeat fixed',
      height: '500vh',
    };
    return (
      <div style={background} >
        <AppDrawer {...this.props} />
      </div>
    );
  }
});

export default IndexPage;
