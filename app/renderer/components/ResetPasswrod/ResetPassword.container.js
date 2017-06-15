/**
 * @author Haris
 */
import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { withNotifications } from 'bluerain-client-services';
import ResetPasswordComponent from './ResetPassword.component';

class ResetPasswordContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Next',
      disabled: false,
      email:'',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(credentials) {
    const my = this;
    const { addNotification } = this.props;
    this.setState({'message':'Reset Your Password...','disabled': true});
    // this.props.mutate({
    //   variables: {
    //     password: credentials.password
    //   }
    // })
    //   .then(({ data }) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     this.setState({'message':'Failed! Retry','disabled': false});
    //   });
  }
  render() {
    const { location, ...props } = this.props;
    return (
      <ResetPasswordComponent
        message={this.state.message}
        disabled={this.state.disabled}
        email={this.props.location.query.email}
        onSubmit={credentials => this.handleSubmit(credentials)}
      />
    );
  }
}
// ResetPasswordContainer.propTypes = {
//   mutate: PropTypes.func.isRequired
// };

export default withNotifications(ResetPasswordContainer);
