import React, { PropTypes } from 'react';

import AppBarComponent from './AppBar.component';

 class AppBarContainer extends React.Component {

   constructor(props){
     super(props);
     this.state={
       visible:true
     }
   }
  render() {
    return (
        <AppBarComponent
          visible={this.state.visible}
        />
    );
  }
}

export default AppBarContainer;
