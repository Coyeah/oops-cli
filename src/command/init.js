const shell = require('shelljs');
const ora = require('ora');

const log = require('../utils/log');
const clone = require('../utils/clone');
const gitRepo = require('../template.js');

function createProject(project, {ts = false, install = false }) {
  let pwd = shell.pwd();
  let branch = ts ? 'init-ts' : 'init';
  log.info(`Simple app ( ${project} ) is being created. location: ${pwd}\\${project}`);

  const spinner = ora('Trust me, I\'m working!').start();

  clone(gitRepo.location, `${pwd}/${project}`, {
    checkout: branch,
  }).then(() => {
    shell.rm('-rf', `${pwd}/${project}/.git`);
    shell.cd(project);
    spinner.succeed('Oops! Succeed!')
    if (install) {
      log.info('Installing dependency packages. Please wait a moment...');
      if (shell.exec('npm install --registry=https://registry.npm.taobao.org').code !== 0) {
        log.error('× Something is wrong in install.');
        shell.exit(1);
        return;
      }
    }
    log.success(`√ Generation completed!`);
  }).catch(() => {
    spinner.fail('Oops! Fail!');
    log.error('× Something is wrong.');
  });
}

module.exports = createProject;
