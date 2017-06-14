/**
 * Created by Haris on 3/30/17.
 */
import React from 'react';
import { withSystemNav } from 'bluerain-client-services';
import AbsoluteCenterLayout from '../layouts/AbsoluteCenterLayout';
import ResetPassword from '../components/ResetPasswrod';

class ResetPage extends React.Component {

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
    // const { location } = this.props;
    // let onSuccessRedirectPath = '/login';
    //
    // if (location && location.state && location.state.nextPathname) {
    //   onSuccessRedirectPath = location.state.nextPathname;
    // }

    return (
        <div>
          <ResetPassword />
        </div>
    );
  }
}

ResetPage.propTypes = {
  location: React.PropTypes.object.isRequired,
  systemLayout: React.PropTypes.object
};

export default withSystemNav(ResetPage);
