import React from 'react';
import { graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.props.mutate({
      variables: {
        "access_token":localStorage.getItem('sessionToken')
      }
    })
    .then(({ data }) => {
      this.redirect();
    }).catch((error) => {
      this.redirect();
    });
  }

  redirect() {
    localStorage.clear();
    this.props.client.resetStore();
    this.props.router.replace('/login');
  }
  render() {
    return (
      <div>Logging out...</div>
    );
  }
}

const LogoutMutation = gql`mutation LogoutMutation($access_token:String) {
  Account{
    AccountLogout(input:{access_token:$access_token}) {
      obj
    }
  }
}`;

export default withApollo(graphql(LogoutMutation)(withRouter(Page)));
