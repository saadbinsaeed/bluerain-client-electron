import React from 'react';
var NotificationSystem = require('react-notification-system');
// import NotificationSystem from 'react-notification-system';


// This function takes a component...
export const withNotifications = (WrappedComponent) => {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        notification: null
      }
    }

    componentDidMount(){
      this.setState({notification: this.refs.notificationSystem});
    }

    render() {
      return (
        <div>
          <NotificationSystem ref="notificationSystem" />
          <WrappedComponent  {...this.props} notification={this.state.notification} />
        </div>
        );
    }
  };
}
