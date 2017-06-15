/**
 * Created by Haris on 3/29/17.
 */
import React, { PropTypes } from 'react';
import  { browserHistory, Link } from 'react-router';
import 'bluerain-bootstrap-theme/dist/css/components/login.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/flexbox-layout.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/absolute-center-layout.css';
import { withNotifications } from 'bluerain-client-services';
import './ResetPassword.css';

const propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  message: PropTypes.string,
  disabled: PropTypes.bool,
  onEmailInput: PropTypes.func,
  onPasswordInput: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  email: '',
  password: '',
  message: '',
  disabled: false,
  onEmailInput: () => {},
  onPasswordInput: () => {},
  onSubmit: () => {}
};
class ResetPasswordComponent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      password: props.password,
      remember: props.remember,
      message: props.message,
      disable: props.disable,
    };
    this.email = this.props.email;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const state = this.state;
   if (event.target.name === 'password') {
      state.password = event.target.value;
      this.props.onPasswordInput(state.password);
    }
    this.setState(state);
  }


  handleSubmit() {
    const { addNotification } = this.props;
    if (this.state.password === '') {
      addNotification({
        title: 'Missing',
        message: 'Please provide Password',
        status: 'error',
        dismissible: true,
        dismissAfter: 3000,
        position: 'br'
      });
    }else {
      this.props.onSubmit(this.state);
    }
  }


  render() {
    const { disabled, message, email,...props } = this.props;
    return (
      <div className="flexbox-layout login">
        <div className="absolute-center-layout">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="form-login">
                  <img src="Mevris Logo-01.svg" style={{margin: "auto auto 30px"}}/>
                 <div className="top-title">
                  <p>RESET YOUR PASSWORD?</p>
                 </div>
                  <label className="label-field"> {email} </label>

                  <label htmlFor="inputPassword" className="sr-only">Password</label>
                  <input
                    type="password"
                    id="inputPassword"
                    className="form-control input-password"
                    placeholder="Password"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-lg btn-primary btn-block align-btn"
                    type="submit"
                    onClick={this.handleSubmit}
                    disabled={disabled}
                  > {message}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ResetPasswordComponent.propTypes = propTypes;
ResetPasswordComponent.defaultProps = defaultProps;

export default withNotifications(ResetPasswordComponent);
