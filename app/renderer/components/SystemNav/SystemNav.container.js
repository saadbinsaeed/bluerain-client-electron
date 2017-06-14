import React, { Component } from 'react';
import Sidebar from 'react-sidebar';

import SystemNavComponent from './SystemNav.component';
import apps from '../../server/appLoader';

const propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
    React.PropTypes.func
  ]),
  systemNav: React.PropTypes.shape({
    actions: React.PropTypes.object,
    state: React.PropTypes.object
  }).isRequired
};

export default class SystemNav extends Component {
  constructor(props) {
    super(props);

    this.onSetopen = this.onSetopen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 800px)');
    mql.addListener(this.mediaQueryChanged);

    this.setState({ mql });
    const docked = mql.matches;
    const { dock, undock } = this.props.systemNav.actions;

    if (docked) {
      dock();
    } else {
      undock();
    }
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
  }

  onSetopen(isOpen) {
    const { open, close } = this.props.systemNav.actions;

    if (isOpen) {
      open();
    } else {
      close();
    }
  }

  mediaQueryChanged() {
    const docked = this.state.mql.matches;
    const { dock, undock } = this.props.systemNav.actions;

    if (docked) {
      dock();
    } else {
      undock();
    }
  }

  render() {
    const { open, docked } = this.props.systemNav.state;

    const sidebarItems = apps.map((app) => {

      const item = {
        title: app.name,
        slug: app.slug,
        to: app.getRootPath()
      };

      try {
        item.icon = app.icons.taskbar.value;
      } catch (error) {
        item.icon = 'window-maximize';
      }

      return item;
    });
    const styles = {
      sidebar: {
        overflow: 'visible'
      }
    };

    const sidebarContent = <SystemNavComponent items={sidebarItems} style={{ height: '100%' }} />;

    return (
      <Sidebar
        styles={styles}
        sidebar={sidebarContent}
        open={open}
        docked={docked}
        shadow={!docked && open}
        onSetOpen={this.onSetopen}
      >
        {this.props.children}
      </Sidebar>
    );
  }
}

SystemNav.propTypes = propTypes;
