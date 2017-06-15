import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

class RequireAuthentication extends React.Component {
  render() {
    const { data, children, router } = this.props;
    if (data.viewer) {
      return children;
    } else if (data.loading) {
      return (<div>Loading, please wait..</div>);
    } else if (data.error) {
      return (<div>An error occured, please try again later.</div>);
    } else {
      router.replace('/logout');
      return (<div />);
    }
  }
}

const ViewerQuery = gql`{
  viewer {
    id
    username
  }
}`;

export default withRouter(graphql(ViewerQuery)(RequireAuthentication));
