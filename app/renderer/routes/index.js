import React from 'react';
import SystemLayout from '../layouts/SystemLayout';
import store from '../redux/store';
import { showLoading, hideLoading } from 'bluerain-client-services';
// import IndexPage from '../pages/IndexPage';
// import AboutPage from '../pages/AboutPage';
// import Login from '../pages/LoginPage';
// import Signup from '../pages/SignupPage';
// import ForGotPassword from '../pages/ForGotPage';
// import ResetPassword from '../pages/ResetPage';
// import Logout from '../pages/LogoutPage';
// import NotFound from '../pages/404';
// import AuthenticationWrapper from '../components/Authentication/Authentication.component';
// import TermsAndCondition from '../pages/TermsAndConditionsPage';
// import ProfilePage from '../pages/ProfilePage';
const appRoutes = [];
require('../server/appLoader').forEach((app) => {
  if (app.routes) {
    appRoutes.push(app.routes());
  }
});

// console.log(appRoutes)
function loggedIn() {
  if (localStorage && localStorage.sessionToken)
    return true;
  return false;
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function handeOnChangeRoute(nextState, replace) {
  store.dispatch(hideLoading());
}

function wrapLoadingBar(WrappedComponent) {
  return (props) => ({
    render() {
      return <WrappedComponent showLoading={() => store.dispatch(showLoading())} hideLoading={() => store.dispatch(hideLoading())} {...props} />;
    }
  });
}

function errorLoading(error) {
  throw new Error(`Dynamic page loading failed: ${error}`);
}

function loadRoute(cb) {
  return module => cb(null, module.default);
}
// export default [{
//   path: '/',
//   component: SystemLayout,
//   indexRoute: { component: IndexPage },
//   // childRoutes: [
//   //   { path: '/about', component: AboutPage, onEnter: requireAuth },
//   //   { path: '/login', component: Login },
//   //   { path: '/profile', component: ProfilePage, onEnter: requireAuth },
//   //   { path: '/signup', component: Signup },
//   //   { path: '/toForGotPassword', component: ForGotPassword },
//   //   { path: '/toResetPassword', component: ResetPassword },
//   //   { path: '/logout', component: Logout },
//   //   { path: '/termsandconditions', component: TermsAndCondition, onEnter: requireAuth },
//   //   {
//   //     path: '/app',
//   //     indexRoute: { component: IndexPage },
//   //     childRoutes: appRoutes,
//   //     // component: AuthenticationWrapper,
//   //     onEnter: requireAuth
//   //   },
//   //   // require('../../apps/ApplicationsRoutes'),
//   //   { path: '*', component: NotFound }// * route should always be the last entry, so that
//   //   // this will be called when no route is found
//   // ]
// }];


export default {
  component: SystemLayout,
  onChange: handeOnChangeRoute,
  childRoutes: [
    {
      path: '/',
      onEnter: requireAuth,
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/IndexPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/about',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/AboutPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/forgot/:token',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/VerifyPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/login',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/LoginPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/profile',
      onEnter: requireAuth,
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/ProfilePage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/signup',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/SignupPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/forgot',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/ForGotPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/reset',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/ResetPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/logout',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/LogoutPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/terms',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/TermsAndConditionsPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
    {
      path: '/app',
      onEnter: requireAuth,
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/IndexPage')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      },
      childRoutes: appRoutes
    },
    {
      path: '*',
      indexRoute: {
        getComponent(location, cb) {
          System.import('../pages/404')
            .then(loadRoute(cb))
            .catch(errorLoading);
        }
      }
    },
  ]
};
