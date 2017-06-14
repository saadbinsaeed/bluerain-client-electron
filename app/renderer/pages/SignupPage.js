import React from 'react';
import { withSystemNav } from 'bluerain-client-services';
import AbsoluteCenterLayout from '../layouts/AbsoluteCenterLayout';
import Signup from '../components/Signup';

class SignupPage extends React.Component {

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
    let onSuccessRedirectPath = '/login';

    if (location && location.state && location.state.nextPathname) {
      onSuccessRedirectPath = location.state.nextPathname;
    }

    return (
      <AbsoluteCenterLayout>
        <div style={{ width: 330 }}>
          <Signup onSuccessRedirectPath={onSuccessRedirectPath} />
        </div>
      </AbsoluteCenterLayout>
    );
  }
}

SignupPage.propTypes = {
  location: React.PropTypes.object.isRequired,
  systemLayout: React.PropTypes.object
};

export default withSystemNav(SignupPage);
