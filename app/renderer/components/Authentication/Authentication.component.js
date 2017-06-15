/**
 * Created by amna on 1/25/17.
 */

import React from 'react';

import RequireAuthentication from '../../helpers/RequireAuthentication';

const AuthenticationWrapper = (props) => {
  return (
    <RequireAuthentication>
      {props.children}
    </RequireAuthentication>
  );
};

export default AuthenticationWrapper;
