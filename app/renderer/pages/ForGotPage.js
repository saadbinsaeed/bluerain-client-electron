/**
 * Created by Haris on 3/29/17.
 */
import React from 'react';
import { withSystemNav } from 'bluerain-client-services';
import AbsoluteCenterLayout from '../layouts/AbsoluteCenterLayout';
import ForgotPassword from '../components/ForGotPassword';

class ForGotPage extends React.Component {

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
          <ForgotPassword />
        </div>
    );
  }
}

ForGotPage.propTypes = {
  location: React.PropTypes.object.isRequired,
  systemLayout: React.PropTypes.object
};

export default withSystemNav(ForGotPage);
