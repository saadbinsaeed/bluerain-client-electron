/**
 * Created by Haris on 3/27/17.
 */
import React, { PropTypes } from 'react';
import 'bluerain-bootstrap-theme/dist/css/components/login.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/flexbox-layout.css';
import 'bluerain-bootstrap-theme/dist/css/layouts/absolute-center-layout.css';
// import {  } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,NavDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import './AppBar.css';

const propTypes = {
  visible: PropTypes.bool,
};

const defaultProps = {
  visible: false,
};

class AppBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  render() {
    const { visible } = this.props;
    return (
        <div hidden={ visible }>
          <Navbar color="faded" light >
            {/*<NavbarToggler className="nav-toggle" right onClick={this.toggle} />*/}
            <NavbarBrand href="/">Mevris</NavbarBrand>
            {/*<Collapse isOpen={this.state.isOpen} navbar>*/}
              <Nav className="ml-auto" navbar>
                {/*<NavItem>
                  <NavLink href="/">Device Explorer</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/">Hello World</NavLink>
                </NavItem>*/}
                  <div className="row">
                    <div className="nav-search-align">
                      <input className="form-control nav-search" type="text" name="name" placeholder="Search" />
                    </div>
                  <div className="">
                   <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                    <DropdownToggle nav caret>
                      More
                    </DropdownToggle>
                   <DropdownMenu>
                      <DropdownItem>View Profile</DropdownItem>
                      <DropdownItem>Settings</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>Logout</DropdownItem>
                    </DropdownMenu>
                  </NavDropdown>
                  </div>
                  </div>
              </Nav>
            {/*</Collapse>*/}
          </Navbar>
        </div>
    );
  }
}

AppBarComponent.propTypes = propTypes;
AppBarComponent.defaultProps = defaultProps;

export default AppBarComponent;
