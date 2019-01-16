const clone = require('git-clone');
const shell = require('shelljs');

const log = require('../utils/log');
const git = require('../template.js');

function createProject(project) {
  let pwd = shell.pwd();
  clone(git.project, pwd + `/${project}`, null, function() {
    shell.rm('-rf', pwd + `/${project}/.git`);
    log.info(`\n √ Generation completed! -- Friday \n`);
  });
}

module.exports = createProject;
