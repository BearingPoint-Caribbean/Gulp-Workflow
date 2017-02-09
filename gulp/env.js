const argv = require('yargs').argv;
const DEVELOPMENT = 'dev';
const PRODUCTION = 'prod';
const isDevelopment = argv.dev || false;

module.exports = {
    type: isDevelopment ? DEVELOPMENT : PRODUCTION,
    isDevelopment,
    isProduction: !isDevelopment
};