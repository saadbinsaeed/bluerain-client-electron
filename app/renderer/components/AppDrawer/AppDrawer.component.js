/**
 * Created by saad bin saeed on 3/2/17.
 */
import React, { PropTypes } from 'react';
// import SearchBarComponent from 'bluerain-ui/lib/searchBar/SearchBar.component';
import IconComponent from 'bluerain-ui/lib/Icon/Icon.component';
import { Link } from 'react-router';
import includes from 'lodash/includes';
import lowerCase from 'lodash/lowerCase';
import filter from 'lodash/filter';
import { showFlashBanner, socketConnected, withSocket } from 'bluerain-client-services';
import store from '../../redux/store';
import apps from '../../server/appLoader';
import './AppDrawer.css';
import { DEV } from '../../server/config';
// redux store
import { setViewAs, setFilter, setSearch } from '../../redux/actions';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const propTypes = {
};

const defaultProps = {
};

class AppDrawer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      apps: [],
      allApps: [],
      searchQuery: store.getState().launcher.searchQuery,
      categories: [],
      // filter: store.getState().launcher.filter ? store.getState().launcher.filter : 'None',
      filter: 'None',
      viewAsGrid: store.getState().launcher.view.viewAsGrid,
      viewAsList: store.getState().launcher.view.viewAsList,
    };
    this.printGridView = this.printGridView.bind(this);
    this.printListView = this.printListView.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleViewAsGrid = this.handleViewAsGrid.bind(this);
    this.handleViewAsList = this.handleViewAsList.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.printIcons = this.printIcons.bind(this);
  }

  componentWillMount() {
    // do long running stuff
    const appsDynamicCategories = [];
    let appsArray = [];
    const categoryList = [];
    if (DEV) {
      const appNames = ['Things', 'Places', 'Groups', 'Reports', 'Dashboards', 'Developers', 'Leaderboard', 'Fleet', 'Schedules', 'Scenes', 'Rules', 'App Store', 'Subscription', 'Settings'];
      const appIcons = ['bluetooth', 'book', 'users', 'flag', 'tachometer', 'laptop', 'graduation-cap', 'calendar', 'commenting', 'compass', 'camera', 'bolt', 'bomb', 'coffee'];
      const appCategories = ['assets', 'assets', 'assets', 'analytics', 'analytics', 'configuration', 'analytics', 'apps', 'automation', 'automation', 'automation', 'apps', 'configuration', 'configuration'];
      const appColors = ['#F20000', '#F9006B', '#D100D0', '#9D00D2', '#6C59CE', '#785AFE', '#00B4FB', '#00D9E8', '#00AD9A', '#00CB34', '#CFF745', '#FFC500', '#FF7229', '#676767'];
      for (let i = 0; i < appNames.length; i += 1) {
        const obj = {
          name: appNames[i],
          category: appCategories[i],
          icons: {
            name: appIcons[i],
            backgroundColors: [appColors[i], '#f2f2f2'],
          },
          routes: {
            path: i % 2 === 0 ? 'device-explorer' : 'hello-world',
          },
        };
        appsArray.push(obj);
      }
    }
    // Assigning categories to original apps
    apps.forEach(app => {
      const newApp = app;
      newApp.category = 'apps';
      if (newApp.name === 'Flows') {
        // console.log('going to change the icon src');
        newApp.png = '/icon-flow-app.svg';
      }
      appsArray.push(newApp);
    });
    // Finding unique categories
    appsArray.forEach(app => {
      appsDynamicCategories.push(app.category);
    });
    appsDynamicCategories.forEach(category => {
      if (!includes(categoryList, category)) {
        categoryList.push(category);
      }
    });
    // Handling Filters
    const allAppsArray = appsArray;
    const filterValue = store.getState().launcher.filter;
    if (filterValue && filterValue !== 'none') {
      appsArray = filter(appsArray, { category: filterValue });
    }
    this.setState({
      apps: appsArray,
      allApps: allAppsArray,
      categories: categoryList,
      filter: filterValue || 'None',
    });
  }

  handleSearch(event) {
    this.setState({ searchQuery: lowerCase(event.target.value) });
    store.dispatch(setSearch(event.target.value));
  }

  handleViewAsGrid() {
    const { viewAsGrid, viewAsList } = this.state;
    if (!viewAsGrid) {
      this.setState(prevState => ({
        viewAsGrid: !prevState.viewAsGrid,
        viewAsList: !prevState.viewAsList,
      }));
      store.dispatch(setViewAs(!viewAsGrid, !viewAsList));
    }
  }

  handleViewAsList() {
    const { viewAsList, viewAsGrid } = this.state;
    if (!viewAsList) {
      this.setState(prevState => ({
        viewAsList: !prevState.viewAsList,
        viewAsGrid: !prevState.viewAsGrid,
      }));
      store.dispatch(setViewAs(!viewAsGrid, !viewAsList));
    }
    // store.dispatch(socketConnected());
    // this.props.showLoading();
    // console.log('Props in index page is : ', this.props);
  }

  handleFilter(value) {
    const { allApps } = this.state;
    if (value === 'none') {
      this.setState({ apps: allApps });
    } else {
      const appsArray = filter(allApps, { category: value });
      this.setState({ apps: appsArray });
    }
    store.dispatch(setFilter(value));
    this.setState({ filter: value });
  }

  printIcons() {
    const { apps, searchQuery, viewAsList } = this.state;
    const appsArray = [];
    if (searchQuery.length !== 0) {
      apps.forEach(app => {
        if (includes(lowerCase(app.name), searchQuery)) {
          appsArray.push(app);
        }
      });
    } else {
      apps.forEach(app => appsArray.push(app));
    }
    if (viewAsList) {
      return (
        <div className="row app-drawer-icons-row">
          {this.printListView(appsArray)}
        </div>
      );
    }
    return (
      <div className="row app-drawer-icons-row">
        <div className="col-lg-10 offset-lg-1">
          {this.printGridView(appsArray)}
        </div>
      </div>
    );
  }

  printListView(appsArray) {
    return this.state.categories.map(category => {
      const filteredArray = filter(appsArray, { category });
      if (filteredArray.length !== 0) {
        return (
          <div className="col-lg-10 offset-lg-1" key={category}>
            <div className="category"><strong>{capitalizeFirstLetter(category)}</strong></div>
            {
              this.printGridView(filteredArray)
            }
          </div>
        );
      }
      return null;
    });
  }

  printGridView(appsArray) {
    const windowWidth = document.body.clientWidth;
    return appsArray.map(app => {
      return (
        <div className="app-drawer-icon" key={app.name}>
          <Link to={ this.props.isConnected ? `app/${app.routes.path}` : null } >
            <IconComponent
              name={app.icons.name}
              shadow={'20px'}
              text={app.name} textColor="white"
              backgroundColors={app.icons.backgroundColors}
              png={app.png}
              size={windowWidth < 500 ? '100px' : '120px'}
            />
          </Link>
        </div>
      );
    });
  }

  render() {
    const { viewAsGrid, viewAsList, filter, searchQuery } = this.state;
    const windowWidth =document.body.clientWidth;;
    const viewAsStyle = {
      backgroundColor: 'rgba(0,0,0,0.2)',
    };
    return (
      <div className="container-fluid">
        <div className="row top-bar">
          <div className={`col-lg-5 offset-lg-1 col-xs-${windowWidth < 500 ? '12' : '6'} col-sm-6 top-bar-filters`}>
            View As:&nbsp;
            <button className="view-as" style={viewAsList ? viewAsStyle : null} onClick={this.handleViewAsList}>List</button>
            <button className="view-as" style={viewAsGrid ? viewAsStyle : null} onClick={this.handleViewAsGrid}>Grid</button> &nbsp;&nbsp;&nbsp;&nbsp;
            <div className="dropdown">
              <span>Filters: &nbsp;{capitalizeFirstLetter(filter)}</span>
              <div className="dropdown-content">
                <button onClick={() => this.handleFilter('none')}>None</button>
                <button onClick={() => this.handleFilter('assets')}>Assets</button>
                <button onClick={() => this.handleFilter('analytics')}>Analytics</button>
                <button onClick={() => this.handleFilter('configuration')}>Configuration</button>
                <button onClick={() => this.handleFilter('apps')}>Apps</button>
                <button onClick={() => this.handleFilter('automation')}>Automation</button>
              </div>
            </div>
          </div>
          <div className={`col-lg-3 offset-lg-1 col-xs-${windowWidth < 500 ? '12' : '6'} col-sm-5`}>
            <div className="form-group">
              <input className="form-control search" type="text" name="name" onChange={this.handleSearch} value={searchQuery || ''} placeholder="Search here..." />
            </div>
          </div>
        </div>
        {
          this.printIcons()
        }
      </div>
    );
  }
}

AppDrawer.propTypes = propTypes;
AppDrawer.defautProps = defaultProps;

export default withSocket(AppDrawer);
