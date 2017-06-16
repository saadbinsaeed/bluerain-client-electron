/**
 * Created by SAAD on 3/29/17.
 */
import React, { PropTypes } from 'react';
import  { hashHistory, Link } from 'react-router';
import 'bluerain-bootstrap-theme/dist/css/components/login.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/flexbox-layout.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/absolute-center-layout.css';
import { withNotifications } from '../components/Notifications/withNotifications';
import { graphql } from 'react-apollo';
import UpdatePasswordMutation from '../components/ForGotPassword/mutation.graphql';
const propTypes = {
};

const defaultProps = {
};

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      disabled: false,
      message: 'Change Password'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

  }
  handlePasswordChange(event) {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { password } = this.state;
    const { addNotification } = this.props.notification;
    const self = this;
    if(password.length < 6){
      addNotification({
        title: 'Password',
        message: 'Password must be 6 characters long',
        position: 'br',
        level: 'error'
      });
    }else{
      const edges = this.props.data.CustomAccessToken.CustomAccessTokenFind.edges;
      const userId = edges.length !== 0 ? edges[0].node.userId : null;
      if(!userId){
        addNotification({
          title: 'Forgot Password',
          message: 'There is an error with server or your token has been expired',
          position: 'br',
          level: 'error'
        });
        return;
      }
      this.setState({
        disabled: true,
        message: 'Please Wait...'
      })
      // console.log('User Id , password: ', userId, password);
      this.props.mutate({
        variables : {
          where: {
            id: userId
          },
          data: {
            password: password
          }
        }
      })
      .then((result) => {
        // console.log('Mutattion result : ', result);
        addNotification({
          title: 'Congrats',
          message: 'Your password have been changed',
          position: 'br',
          level: 'success'
        });
        setTimeout(function () {
          hashHistory.push('/login');
        }, 1000);
      })
      .catch((e) => {
        // console.log('Mutattion Error : ', e)
        addNotification({
          title: 'Oopsss..',
          message: 'there is an error, please try again',
          position: 'br',
          level: 'error'
        });
        this.setState({
          disabled: true,
          message: 'Try Again'
        })
      });
      if (this.state.password === '') {
        addNotification({
          title: 'Missing',
          message: 'Please provide Password',
          position: 'br',
          level: 'error'
        });
      }
    }
  }
  render() {
    const { disabled, message } = this.state;
    return (
      <div className="flexbox-layout login">
        <div className="absolute-center-layout">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-12">
                <div className="form-login">
                  <img src="Mevris Logo-01.svg" style={{margin: "auto auto 30px"}}/>
                  <div className="top-title">
                    <p>ENTER YOUR NEW PASSWORD</p>
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control input-password"
                      placeholder="Password"
                      name="password"
                      required
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                    />
                    <button
                      className="btn btn-lg btn-primary btn-block align-btn"
                      type="submit"
                      disabled={disabled}
                    > {message}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

NewPassword.propTypes = propTypes;
NewPassword.defaultProps = defaultProps;

export default graphql(UpdatePasswordMutation)(withNotifications(NewPassword));
