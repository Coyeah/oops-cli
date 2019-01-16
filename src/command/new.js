const clone = require('git-clone');
const shell = require('shelljs');

const log = require('../utils/log');
const git = require('../template.js');

function createProject(project) {
  log.info(`\nproject ( ${project} ) is being created. -- Friday`);
  let pwd = shell.pwd();
  log.info(`location: ${pwd}\\${project} \n`);
  clone(git.project, pwd + `/${project}`, null, function() {
    shell.rm('-rf', pwd + `/${project}/.git`);
    shell.cd(project);
    log.info('Installing dependency packages. -- Friday');
    // shell.exec('npm install --registry=https://registry.npm.taobao.org');
    if (shell.exec('npm install --registry=https://registry.npm.taobao.org').code !== 0) {
      log.error('\n × Something is wrong. -- Friday \n');
      shell.exit(1);
    }
    log.info(`\n √ Generation completed! -- Friday \n`);
  });
}

module.exports = createProject;
