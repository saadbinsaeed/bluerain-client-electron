import React from 'react';

import 'bluerain-bootstrap-theme/dist/css/layouts/absolute-center-layout.css';

export default function Layout({ children }) {
  return (
    <div className="absolute-center-layout">
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.object
};
