const program = require('commander');
const clone = require('git-clone');
const shell = require('shelljs');

// const log = require('./utils/log.js');
const log = console.log;

program
  .version('0.0.1')
  .description('Friday Here!');

program
  .command('new <filename>')
  .action(function(filename) {
    if (filename) {
      let pwd = shell.pwd();
      log('Friday is being created.');
      // log(`正在生成代码，位置：${pwd}\\${filename}\\`);
      // clone(`https://github.com/Coyeah/wherever.git`, pwd + `/${filename}`, null, function() {
      //   shell.rm('-rf', pwd + `/${filename}/.git`);
      //   log(`${filename} is has been created successfully.`);
      //   log('Jarvis is here at your service');
      // });
    } else {
      log('please：friday-cli new <filename> / jarvis-cli new <filename> <tpl>');
    }
  });

program.parse(process.argv);
