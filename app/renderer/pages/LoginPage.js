import React from 'react';
import { withSystemNav } from 'bluerain-client-services';

import AbsoluteCenterLayout from '../layouts/AbsoluteCenterLayout';
import Login from '../components/Login';


class LoginPage extends React.Component {

  componentWillMount() {
    try {
      this.props.systemNav.actions.disable();
    } catch (e) {

    }
  }

  componentWillUnmount() {
    try {
      this.props.systemNav.actions.enable();
    } catch (e) {

    }
  }

  render() {
    const { location } = this.props;
    let onSuccessRedirectPath = '/app';
    if (location && location.state && location.state.nextPathname) {
      onSuccessRedirectPath = location.state.nextPathname;
    }
    return (
      <Login onSuccessRedirectPath={onSuccessRedirectPath} />
    );
  }
}
LoginPage.propTypes = {
  location: React.PropTypes.object.isRequired,
  systemLayout: React.PropTypes.object
};

export default withSystemNav(LoginPage);
