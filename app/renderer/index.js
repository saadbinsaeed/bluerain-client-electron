import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from 'react-apollo';
import { browserHistory, Router } from 'react-router';
import { AppContainer } from "react-hot-loader";
import 'bluerain-bootstrap-theme/dist/css/bluerain-bootstrap-theme.css';
import 'bluerain-client-services/dist/style.css';
import { client, wsClient } from './client';
import rootRoute from './routes';
import { showLoading, hideLoading, socketConnected, socketDisconnected } from 'bluerain-client-services';
// importing store
import store from './redux/store';

wsClient.on('connect', () => {
  // console.log('Socket Connected : ');
  store.dispatch(socketConnected());
});

wsClient.on('reconnect', () => {
  // console.log('Socket reconnect : ');
  store.dispatch(socketConnected());
});

wsClient.on('disconnect', () => {
  // console.log('Socket Disconnected : ');
  store.dispatch(socketDisconnected());
});
const rootNode = document.createElement('div'); // eslint-disable-line no-undef
document.body.appendChild(rootNode); // eslint-disable-line no-undef


function hideLoadingBar(nextState, replace) {
  // store.dispatch(showLoading());
  // setTimeout(function () {
  //   store.dispatch(hideLoading());
  // }, 300);
}

// import App from "./app";

ReactDOM.render(
  <AppContainer>
    <ApolloProvider store={store} client={client}>
      <Router
        history={browserHistory}
        routes={rootRoute}
        onUpdate={hideLoadingBar}
      />
    </ApolloProvider>
  </AppContainer>,
  rootNode
);
if(module.hot) {
  module.hot.accept();
}


// function render() {
//   ReactDOM.render(
//     <AppContainer>
//       <App />
//     </AppContainer>,
//     document.getElementById("root")
//   );
// }
//
// render(App);
//
// if (module.hot) {
//   module.hot.accept("./app", () => { render(); });
// }
