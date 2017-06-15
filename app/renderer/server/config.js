// 'ws://35.161.95.236:10005'
const SERVER_IP = process.env.SERVER_IP || 'localhost';
const WS_PORT = process.env.WS_PORT || '5000';
const GRAPHQL_PORT = process.env.GRAPHQL_PORT || '8000';

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 9000;
export const GRAPHQL_PATH = process.env.GRAPHQL_PATH || `http://${SERVER_IP}:${GRAPHQL_PORT}/graphql`;
export const WS_PATH = process.env.WS_PATH || `ws://${SERVER_IP}:${WS_PORT}`;
export const resetPasswordURL = `http://${SERVER_IP}:${GRAPHQL_PORT}/api/Accounts/reset`;
export const DEV = false;
