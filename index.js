const nodeRed = require('node-red');
const httpServer = require('http-server');

const userSettings = {};
nodeRed.init(httpServer, userSettings);
nodeRed.start();

