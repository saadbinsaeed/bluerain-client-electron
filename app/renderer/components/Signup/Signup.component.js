/**
 * @author Muhammad Atif
 */
import React, { PropTypes } from 'react';
import Input from 'reactstrap/lib/Input';
import { Link } from 'react-router';
import 'bluerain-bootstrap-theme/dist/css/components/login.css';
// import { withNotifications } from 'bluerain-client-services';
import { withNotifications } from '../Notifications/withNotifications';


const propTypes = {
  fullName: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  message: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func
};

const defaultProps = {
  fullName:'',
  email: '',
  password: '',
  message: '',
  phoneNumber: '',
  disabled: false,
};
class SignupComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: props.fullName,
      email: props.email,
      password: props.password,
      confirmPassword: props.confirmPassword,
      phoneNumber: props.phoneNumber,
      termsAndConditions: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFullNameChange = this.handleFullNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
    this.handlePhoneNumChange = this.handlePhoneNumChange.bind(this);
    this.handleTermsChange = this.handleTermsChange.bind(this);
    this.validatePhoneNumber = this.validatePhoneNumber.bind(this);
  }
  validatePhoneNumber(phoneNumber) {
    const re = /^[\s()+-]*([0-9][\s()+-]*){11,11}$/;
    return re.test(phoneNumber);
  }
  handleSubmit(event){
    event.preventDefault();
    const { phoneNumber, password, confirmPassword } = this.state;
    const { addNotification } = this.props.notification;
    if(password.length < 6){
      addNotification({
        title: 'Password',
        message: 'Password must be 6 characters long',
        position: 'br',
        level: 'error'
      });
    }else{
      if (password !== confirmPassword) {
        addNotification({
          title: 'Confirm Password',
          message: 'Password Do not match',
          position: 'br',
          level: 'error'
        });
      }else {
        if (phoneNumber && !this.validatePhoneNumber(phoneNumber)) {
          addNotification({
            title: 'Missing',
            message: 'Invalid Phone Number',
            position: 'br',
            level: 'error'
          });
        }else{
          this.props.onSubmit(this.state);
        }
      }
    }
    }
  handleFullNameChange(event){
    this.setState({
      fullName: event.target.value,
    })
  }
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });

  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }
  handlePasswordConfirm(event) {
    this.setState({
      confirmPassword: event.target.value
    });
  }
  handlePhoneNumChange(event) {
    this.setState({
      phoneNumber: event.target.value
    });
  }
  handleTermsChange(event) {
    this.setState({
      termsAndConditions: event.target
    });
  }
  render() {
    const style = {
      verticalAlign : 'middle',
      padding: {
        padding: 5
      }
    };
    const marginBottom = {
      marginBottom: '5px'
    }
    const { message, disabled } = this.props;
    return (
      <div style={{width:280,padding:20}}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            required
            autoFocus
            onChange={this.handleFullNameChange}
            value={this.state.fullName}
            style={marginBottom}
          />
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            style={marginBottom}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            style={marginBottom}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            required
            onChange={this.handlePasswordConfirm}
            style={marginBottom}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Mobile Number"
            value={this.state.phoneNumber}
            onChange={this.handlePhoneNumChange}
            style={marginBottom}
          />
          <div>
            <span>
              <Input
                addon
                type="checkbox"
                aria-label="Checkbox for following text input"
                checked={this.state.termsAndConditions}
                style={style}
                required
                onChange={this.handleTermsChange}
              />
            </span>
            <span style={style.padding}><Link to="/terms" target="_blank">I agree to MEVRIS home software and services agreement!</Link></span>
          </div>
          <br />
          <button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            disabled={disabled}
          >{message}
          </button>
        </form>
      </div>
    );
  }
}

SignupComponent.propTypes = propTypes;
SignupComponent.defaultProps = defaultProps;

export default withNotifications(SignupComponent);
