import React from 'react';
import { Notifications, withSystemNav, FlashBanner, LoadingBar } from 'bluerain-client-services';
import { connect } from 'react-redux';
import './system.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/system-layout.css';
import SystemNav from '../components/SystemNav';
import store from '../redux/store';

import AppBar from '../components/AppBar';

const loadingBarStyle = {
  zIndex: '999999999',
  backgroundColor: '#B11492', // light
  // backgroundColor: '#8C006E', // dark
};

class Layout extends React.Component {
  constructor(props) {
    super(props);
    // console.log('System Layout :: Props :: ', props);
    // Set the state of the flash banner passed by store
    this.state = {
      show: props.showFlashBanner,
    }
  }
  // If any change made to flash banner, It will change the state of the flash banner
  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.showFlashBanner
    });
  }

  render() {
    const { show } = this.state;

    // const disableSystemNav = this.props.systemNav.state.disabled;
    const location = this.props.location.pathname;
    const re = new RegExp("^/forgot", "i");
    if ( location === '/login' || location === '/forgot' || re.test(location) || location === '/terms' ) {
      return (
        <div className="system-layout">
          <LoadingBar style={loadingBarStyle} showFastActions progressIncrease={3} />
          <Notifications />
          <div className="system-body">
            {this.props.children}
          </div>
        </div>
      );
    }
    return (
      <div className="system-layout">
        <LoadingBar style={loadingBarStyle} showFastActions progressIncrease={3} />
        <SystemNav>
          <div className="system-body">
            <FlashBanner show={show} showClose store={store} />
            <AppBar />
            <Notifications />
            {this.props.children}
          </div>
        </SystemNav>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.object,
  showNav: React.PropTypes.bool,
  showFlashBanner: React.PropTypes.bool,
  showAppBar: React.PropTypes.bool
};

Layout.defaultProps = {
  showNav: true,
  showFlashBanner: false,
  showAppBar: false,
};


// make a connection of your component with the store
const mapStateToProps = (state) => {
  return {
    showFlashBanner: state.flashBanner.show
  };
};
const FilterLayout = connect(
  mapStateToProps,
)(Layout);

export default withSystemNav(FilterLayout);
