import React, { PropTypes } from 'react';
import  { browserHistory, Link } from 'react-router';

import 'bluerain-bootstrap-theme/dist/css/components/login.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/flexbox-layout.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/absolute-center-layout.css';
// import { withNotifications } from 'bluerain-client-services';
import { withNotifications } from '../Notifications/withNotifications';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import SignUp from '../Signup';

const propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  remember: PropTypes.bool,
  message: PropTypes.string,
  disabled: PropTypes.bool,
  onUsernameInput: PropTypes.func,
  onPasswordInput: PropTypes.func,
  onSubmit: PropTypes.func
};

const defaultProps = {
  email: '',
  password: '',
  remember: false,
  message: '',
  disabled: false,
  onSubmit: () => {}
};

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: props.remember,
      message: props.message,
      disable: props.disable,
      activeTab: '1'
    };
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle(event, tab) {
    event.preventDefault();
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab});
    }
  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  render() {
    const {message, disabled} = this.props;
    const navStyle = {
      cursor : 'pointer'
    };
    const marginBottom = {
      marginBottom: '5px'
    }
    return (
      <div className="flexbox-layout login">
        <div className="absolute-center-layout">
          <div className="container login-xs">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="form-login">
                  <img src="Mevris Logo-01.svg" style={{margin: "auto auto 30px"}}/>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        style={navStyle}
                        className={this.state.activeTab === '1' ? 'active' : ''}
                        onClick={() => { this.toggle(event , '1'); }}
                      >
                        Login
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={navStyle}
                        className={this.state.activeTab === '2' ? 'active' : ''}
                        onClick={() => { this.toggle(event, '2'); }}
                      >Sign Up
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Col sm="12">
                          <div style={{width:280,padding:20}}>
                            <label htmlFor="inputEmail" className="sr-only">Username</label>
                            <form onSubmit={this.handleSubmit}>
                              <input
                                type="email"
                                id="inputEmail"
                                className="form-control input-email"
                                placeholder="Email"
                                name="email"
                                required
                                autoFocus
                                onChange={this.handleEmailChange}
                                style={marginBottom}
                              />
                              <label htmlFor="inputPassword" className="sr-only">Password</label>
                              <input
                                type="password"
                                id="inputPassword"
                                className="form-control input-password"
                                placeholder="Password"
                                name="password"
                                required
                                value={this.state.password}
                                onChange={this.handlePasswordChange}
                                style={marginBottom}
                              />
                              <div className="checkbox">
                                <label htmlFor="inputRememberMe" style={{color:'black'}}>
                                  <input id="inputRememberMe" type="checkbox" value="remember-me" /> Remember me
                                </label>
                              </div>
                              <button
                                className="btn btn-lg btn-primary btn-block"
                                type="submit"
                                disabled={disabled}
                              >{message}
                              </button>
                            </form>
                            <div className="text-lg-center mt-2">
                              <Link to="/forgot">Forgot password?</Link>
                              {/*<Link to="/resetpassword?email=orient@blueeast.com">Reset password?</Link>*/}
                              {/*<p style={{color:'black'}} className="mt-2">Don't have an account yet? <br /> <Link to="/signup">Create an account</Link> </p>*/}
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Col sm="12">
                          <SignUp login={this.props.onSubmit} />
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = propTypes;
LoginComponent.defaultProps = defaultProps;

export default withNotifications(LoginComponent);
