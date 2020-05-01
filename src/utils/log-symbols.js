'use strict';
const chalk = require('chalk');

const isSupported = process.platform !== 'win32' || process.env.CI || process.env.TERM === 'xterm-256color';

const main = {
	info: chalk.blueBright('ℹ'),
	success: chalk.greenBright('✔'),
	warning: chalk.yellowBright('⚠'),
	error: chalk.red('✖')
};

const fallbacks = {
	info: chalk.blueBright('i'),
	success: chalk.greenBright('√'),
	warning: chalk.yellowBright('‼'),
	error: chalk.redBright('×')
};

module.exports = isSupported ? main : fallbacks;