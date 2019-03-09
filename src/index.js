'use strict'

// 定义脚手架的文件路径
process.env.NODE_PATH = __dirname + '/../node_modules/';

const program = require('commander');
const log = require('./utils/log');

// 定义当前版本
program
  .version(require('../package').version );

// 定义使用方法
program
  .usage('<command>');
// 脚手架支持用户输入4种不同的命令,处理这4种命令的方法：
// commander的具体使用方法在这里就不展开了，可以直接到官网https://github.com/tj/commander.js/去看详细的文档。

program
  .command('new')
  .arguments('<project>')
  .option('-i, --install', 'Install dependency packages')
  .description('Generate a new project from a existing architecture.')
  .action((project, command) => {
    if (typeof project === 'string') {
      // log.info(project);
      require('./command/new')(project, {
        ...command
      });
    } else {
      log.error('× Please do not ignore the file name.');
    }
  });

// 处理参数和提供帮助信息
program.parse(process.argv)

if(!program.args.length){
  program.help()
}
