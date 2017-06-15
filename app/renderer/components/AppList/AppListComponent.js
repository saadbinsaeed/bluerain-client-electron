import React from 'react';
import { Link } from 'react-router';

export default class AppListComponent extends React.Component {

  render() {
    return (
      <div>
        <h2>My Apps</h2>
        <ul>
          <li><Link to="app/device-explorer/">Device Explorer</Link></li>
        </ul>
      </div>
    );
  }
}

AppListComponent.propTypes = {
  children: React.PropTypes.object
};
