'use strict';
const chalk = require('chalk');
const symbols = require('./log-symbols');

const prefix = chalk.whiteBright('[oops-cli]');
const defaultConfig = {
  info: 'blueBright',
  success: 'greenBright',
  warning: 'yellowBright',
  error: 'redBright',
};

let log = {};
Object.keys(defaultConfig).forEach(k => {
  log[k] = text => 
    console.log(prefix, symbols[k], chalk[defaultConfig[k]](text));
});

module.exports = log;