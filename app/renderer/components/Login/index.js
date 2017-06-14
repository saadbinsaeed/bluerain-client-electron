import { graphql } from 'react-apollo';
import { withRouter } from 'react-router';

import LoginMutation from './mutation.graphql';
import ViewerQuery from './query.graphql';

import LoginContainer from './Login.container';

export default graphql(ViewerQuery)(graphql(LoginMutation)(withRouter(LoginContainer)));
