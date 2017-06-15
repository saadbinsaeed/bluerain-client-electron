import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Icon } from 'react-fa';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { withSocket } from 'bluerain-client-services';

const propTypes = {
  linkToUserProfile: PropTypes.string
};

const defaultProps = {
  linkToUserProfile: '/user'
};

let imgSrc;

class SystemNavComponent extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  getDropDownMenu() {
    if (localStorage.sessionToken) {
      return (
        <Dropdown tag="li" isOpen={this.state.dropdownOpen} toggle={this.toggle} className="nav-item dropup system-dropdown">
          <DropdownToggle tag="a" className="nav-link" id="supportedContentDropdown" aria-haspopup>
            <span className="nav-item-icon">
              <img src={imgSrc} className="rounded-circle" alt="" />
            </span>
            <span className="nav-item-text">
              Abdul Rehman
            </span>
          </DropdownToggle>
          <DropdownMenu className="system-dropdown-menu" aria-labelledby="supportedContentDropdown">
            {/* <DropdownItem tag="a" href="#">My profile</DropdownItem>
            <div className="dropdown-divider" />*/}
            <DropdownItem tag="a" href="/logout">Log out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <li className="nav-item">
        <a className="nav-link" href="/login">
          <img src={imgSrc} className="rounded-circle" alt="" />
        </a>
      </li>
    );
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  static renderItem(item) {
    return (
      <li className="nav-item" key={item.slug} data-tip={item.title} data-for="system-nav" >
        <Link className="nav-link" to={item.to}>
          <span className="nav-item-icon">
            <Icon name={item.icon} aria-hidden="true" />
          </span>
          <span className="nav-item-text">{item.title}</span>
          <span className="hidden-sm-up">{item.title}</span>
        </Link>
      </li>
    );
  }

  render() {

    const { linkToUserProfile, items, ...props } = this.props;
    if (localStorage && localStorage.profilePicture) {
      imgSrc = localStorage.profilePicture;
    } else {
      imgSrc = 'https://pingendo.github.io/pingendo-bootstrap/assets/user_placeholder.png';
    }
    return (
      <div className="system-nav" style={{ height: '100%' }}>
        <div className="navbar navbar-full navbar-dark only-icons system-drawer">
          <Link className="navbar-brand" to="/" >
            <div className="mevris-logo">Mevris</div>
          </Link>
          <ul className="navbar nav navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/app">
                <span className="nav-item-icon">
                  <Icon name="rocket" aria-hidden="true" />
                </span>
                <span className="nav-item-text">Launcher</span>
              </Link>
            </li>
          </ul>
          <div className="nav-separator" />
          <ul className="navbar nav navbar-nav">
            {
              items.map(SystemNavComponent.renderItem)
            }
          </ul>

          <div className="nav-spacer" />

          <ul className="nav navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="">
                <div className="nav-icon">
                  <i className="fa fa-fw fa-plug" />
                  <i className={`status-icon fa fa-circle text-${this.props.isConnected ? 'success' : 'danger' }`} />
                </div>
              </a>
            </li>

            {this.getDropDownMenu()}
          </ul>
        </div>
        <ReactTooltip id="system-nav" place="left" effect="solid" />
      </div>
    );
  }
}

SystemNavComponent.propTypes = propTypes;
SystemNavComponent.defaultProps = defaultProps;

export default withSocket(SystemNavComponent);
