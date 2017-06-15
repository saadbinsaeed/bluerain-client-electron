import React, { PropTypes } from 'react';
import AbsoluteCenterLayout from '../layouts/AbsoluteCenterLayout';
import axios from 'axios';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Query from '../components/ForGotPassword/query.graphql';
import NewPassword from './NewPassword';

class Verify extends React.Component {
  componentWillMount() {
    if (this.props.params.token) {
      this.vComponent = graphql(Query, {
        options: {
          variables: {
            filter: {
              where: {
                id: this.props.params.token
              }
            }
          }
        },
      })(NewPassword);
    }
  }
  render() {
    const NewPasswordPage = this.vComponent;
    return (
        <NewPasswordPage />

    );
  }
}

export default Verify;
