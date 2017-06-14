// import { withNotifications } from 'bluerain-client-services';
import React, { PropTypes } from 'react';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';
import store from '../../redux/store';
import { withNotifications } from '../Notifications/withNotifications';

import LoginComponent from './Login.component';

 class LoginContainer extends React.Component {
   constructor(props) {
    super(props);
     this.state = {
       message: 'Login',
       disabled: false
     };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(credentials) {
    // store.dispatch(showLoading());
    const my = this;
    const { message } = this.props;
    const { addNotification } = this.props.notification;
    this.setState({'message': 'Logging In...','disabled': true});

    this.props.mutate({
      variables: {
        "credentials":{
          "email":credentials.email.toLowerCase(),
          "password":credentials.password
        }
      }
    })
    .then(({ data }) => {
      const token = data.Account.AccountLogin.obj.id;
      localStorage.setItem('sessionToken', token);
      const { onSuccessRedirectPath } = my.props;
      return my.props.data.refetch();
    })

    .then(({ data }) => {
      const { onSuccessRedirectPath } = my.props;
      if (onSuccessRedirectPath) {
        my.props.router.replace(onSuccessRedirectPath);
      }else {
        my.props.router.replace('/app');
      }
    })
    .catch((error) => {
      addNotification({
        title: 'Oops',
        message: "Wrong email or password",
        level: 'error',
        position: 'br'
      });
      this.setState({
        message: "Failed! Retry",
        disabled: false
      });
    });
  }

  render() {
    const { message, disabled } = this.state;
    return (
      <LoginComponent
        remember={false}
        message={message}
        disabled={disabled}
        onSubmit={credentials => this.handleSubmit(credentials)}
      />
    );
  }
}

LoginContainer.propTypes = {
  mutate: PropTypes.func.isRequired
};

export default withNotifications(LoginContainer);
