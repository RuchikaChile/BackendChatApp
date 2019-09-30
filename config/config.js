// checking env.
var env = process.env.NODE_ENV || 'development'; // NODE_ENV is an environment variable by Express framework

// fetch env. config data
var config = require('./config.json');
var envConfig = config[env];

// add env. config values to process.env
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);