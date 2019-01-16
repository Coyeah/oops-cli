const chalk = require('chalk');

const log = {
  info: text => console.log(chalk.greenBright(text)),
  error: text => console.log(chalk.redBright(text)),
  row: number => {
  if (!number) number = 1;
    for (let i = 0; i < number; i++) {
      console.log('');
    }
  }
}

module.exports = log;
