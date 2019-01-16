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
    shell.exec('npm i');
    log.info(`\n √ Generation completed! -- Friday \n`);
  });
}

module.exports = createProject;
