const chalk = require('chalk');

const log = {
  info: text => console.log(`${chalk.whiteBright('[Oops]')} ${chalk.whiteBright(text)}`),
  success: text => console.log(`${chalk.whiteBright('[Oops]')} ${chalk.greenBright(text)}`),
  error: text => console.log(`${chalk.whiteBright('[Oops]')} ${chalk.redBright(text)}`),
}

module.exports = log;
