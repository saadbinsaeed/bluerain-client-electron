/**
 * @author Haris
 */
import React, { PropTypes } from 'react';
// import { withNotifications } from 'bluerain-client-services';
import { withNotifications } from '../Notifications/withNotifications';
import ForGotComponent from './Forgot.component';
import axios from 'axios';
import { resetPasswordURL } from '../../server/config';
class ForgotContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Next',
      disabled: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(credentials) {
    const { addNotification } = this.props.notification;
    const my = this;
    axios.post(resetPasswordURL, {
      email: credentials.email.toLowerCase(),
    })
    .then(function (response) {
      // console.log('Reset password response ',response);
      if(response.status === 204) {
        my.setState({ 'message': 'Check your email...', 'disabled': true });
        addNotification({
          title: 'Missing',
          message: 'Please check your email, and follow the steps',
          position: 'br',
          level: 'success'
        });
      }
    })
    .catch(function (error) {
      if(error){
        // console.log('Reset password error ', error);
        my.setState({ 'message': 'Try again...', 'disabled': false });
        addNotification({
          title: 'Missing',
          message: 'Email is not registered, please enter your correct email ID',
          position: 'br',
          level: 'error'
        });
      }
    });

  }

  render() {
    return (
      <ForGotComponent
        message={this.state.message}
        disabled={this.state.disabled}
        onSubmit={credentials => this.handleSubmit(credentials)}
      />
    );
  }
}

export default withNotifications(ForgotContainer);
