/**
 * @author Muhammad Atif
 */
import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import SignupMutation from './mutation.graphql';
import ViewerQuery from './query.graphql';
import SignupContainer from './Signup.container';

export default graphql(ViewerQuery)(graphql(SignupMutation)(withRouter(SignupContainer)));
