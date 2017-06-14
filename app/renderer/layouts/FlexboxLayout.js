import React from 'react';

import 'bluerain-bootstrap-theme/dist/css/layouts/flexbox-layout.css';

export default function Layout({ children }) {
  return (
    <div className="flexbox-layout">
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.object
};
