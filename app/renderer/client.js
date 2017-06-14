import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { SubscriptionClient, Client } from 'subscriptions-transport-ws';

import addGraphQLSubscriptions from './helpers/Subscriptions';
import { GRAPHQL_PATH, WS_PATH } from './server/config';

export const wsClient = new SubscriptionClient(WS_PATH, {
  reconnect: true,
});


const networkInterface = createNetworkInterface({
  uri: GRAPHQL_PATH,
  opts: {
    credentials: 'same-origin'
  }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

export const client = new ApolloClient({
  dataIdFromObject: o => o.id,
  networkInterface: networkInterfaceWithSubscriptions
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('sessionToken');
    req.options.headers.Authorization = token ? `${token}` : null;
    next();
  }
}]);
