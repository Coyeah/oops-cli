const chalk = require('chalk');

const prefix = chalk.whiteBright('[oops-cli]');
const logMaker = fn => text => console.log(`\n${prefix} ${fn(text)}`)

module.exports = {
  info: logMaker(chalk.blueBright),
  success: logMaker(chalk.greenBright),
  warn: logMaker(chalk.yellowBright),
  error: logMaker(chalk.redBright),
};