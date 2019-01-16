const chalk = require('chalk');

const log = {
  info: text => console.log(chalk.greenBright(text)),
  error: text => console.log(chalk.redBright(text)),
}

module.exports = log;
