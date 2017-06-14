import React from 'react';

import RequireAuthentication from '../helpers/RequireAuthentication';
import AboutComponent from '../components/About/AboutComponent';

const Page = () => (
  <RequireAuthentication>
    <AboutComponent />
  </RequireAuthentication>
);

export default Page;
