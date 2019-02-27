const clone = require('git-clone');
const shell = require('shelljs');
const log = require('../utils/log');
const git = require('../template.js');

function createProject(project, install) {
  let pwd = shell.pwd();
  log.info(`project ( ${project} ) is being created. location: ${pwd}\\${project}`);
  clone(git.single, pwd + `/${project}`, null, function() {
    shell.rm('-rf', pwd + `/${project}/.git`);
    shell.cd(project);
    if (install) {
      log.info('Installing dependency packages.');
      // shell.exec('npm install --registry=https://registry.npm.taobao.org');
      if (shell.exec('npm install --registry=https://registry.npm.taobao.org').code !== 0) {
        log.error('× Something is wrong.');
        shell.exit(1);
      }
    }
    log.info(`√ Generation completed!`);
  });
}

module.exports = createProject;
