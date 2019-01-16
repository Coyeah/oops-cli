const chalk = require('chalk');

const log = {
  success: text => console.log(chalk.greenBright(text)),
  info: text => console.log(chalk.blueBright(text)),
  error: text => console.log(`${chalk.bgRed.white(' error: ')} ${chalk.red(text)}`),
  warning: text => console.log(`${chalk.bgYellow.white(' warning: ')} ${chalk.yellow(text)}`),
};

module.exports = log;
