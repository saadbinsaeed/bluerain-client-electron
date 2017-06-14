/**
 * Created by Haris on 3/29/17.
 */
import React, { PropTypes } from 'react';
import  { browserHistory, Link } from 'react-router';
import 'bluerain-bootstrap-theme/dist/css/components/login.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/flexbox-layout.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/absolute-center-layout.css';
import { withNotifications } from '../Notifications/withNotifications';
import './ForGot.css';

const propTypes = {
  email: PropTypes.string,
  message: PropTypes.string,
  disabled: PropTypes.bool,
  onEmailInput: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  message: '',
  email:'',
  disabled: false,
  onEmailInput: () => {},
  onSubmit: () => {}
};
class ForgotComponent extends React.Component {

  static validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onPressKey = this.onPressKey.bind(this);
  }

  handleChange(event) {
    const state = this.state;
    const target = event.target;
    if (target.name === 'email') {
      state.email = target.value;
      this.props.onEmailInput(state.email);
    }
    this.setState(state);
  }


  handleSubmit() {
    const { addNotification } = this.props.notification;

    if (this.state.email === '') {
      addNotification({
        title: 'Missing',
        message: 'Please provide Email',
        status: 'error',
        dismissible: true,
        dismissAfter: 3000,
        position: 'br',
        level: 'error'
      });
    } else if (!ForgotComponent.validateEmail(this.state.email)) {
      addNotification({
        title: 'Missing',
        message: 'Invalid',
        status: 'error',
        dismissible: true,
        dismissAfter: 6000,
        position: 'br',
        level: 'error'
      });
    } else {
      this.props.onSubmit(this.state);
    }
  }
  onPressKey(e)
  {
    const { addNotification } = this.props;
    if (e.key === 'Enter') {
      this.props.onSubmit(this.state);
    }
  }

  render() {
    const { disabled, message } = this.props;
    return (
      <div className="flexbox-layout login">
        <div className="absolute-center-layout">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="form-login">
                  <img src="Mevris Logo-01.svg" style={{margin: "auto auto 30px"}}/>
                  <div className="top-title">
                    <p>FORGOT YOUR PASSWORD?</p>
                  </div>
                  <input
                    type="text"
                    id="inputemail"
                    className="form-control input-username input-control"
                    placeholder="Email"
                    name="email"
                    required
                    autoFocus
                    value={this.state.email}
                    onChange={this.handleChange}
                    onKeyPress={this.onPressKey}
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

ForgotComponent.propTypes = propTypes;
ForgotComponent.defaultProps = defaultProps;

export default withNotifications(ForgotComponent);
