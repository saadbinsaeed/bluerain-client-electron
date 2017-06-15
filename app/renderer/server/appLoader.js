
// const regex = /bluerain-app\-\w+\/package\.json$/;
// const regex = /bluerain-app\-\w+\/lib\/(index\.js)$/;
// const regex = /bluerain-app-\w+\/lib\/index.js/;
// const req = require.context('../../node_modules', true, regex);

// console.log('found apps', req.keys());

let deviceExplorar = require('bluerain-app-device-explorer');
// let helloWorldApp = require('bluerain-app-hello-world');
// let flowApp = require('bluerain-app-flows');

if (deviceExplorar.default) {
  deviceExplorar = deviceExplorar.default;
}
// if (helloWorldApp.default) {
//   helloWorldApp = helloWorldApp.default;
// }
// if (flowApp.default) {npm
//   flowApp = flowApp.default;
// }

const apps = [
  deviceExplorar,
  // helloWorldApp
];

module.exports = apps;
