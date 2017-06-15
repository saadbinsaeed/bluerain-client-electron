import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducers, flashBannerReducers, loadingBarReducer } from 'bluerain-client-services';
import AppBarReduceres from './reducers/AppBar';
import { client } from '../client';
// Importing reducers
import launcherReducers from './reducers/launcher';


const store = createStore(
  combineReducers({
    flashBanner: flashBannerReducers,
    loadingBar: loadingBarReducer,
    launcher: launcherReducers,
    bluerain: reducers,
    appBar: AppBarReduceres,
    apollo: client.reducer(),
  }),
  {}, // initial state
  compose(
      applyMiddleware(thunk),
      applyMiddleware(client.middleware()),
      // If you are using the devToolsExtension, you can add it here also
      window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
