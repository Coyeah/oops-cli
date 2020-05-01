const fs = require('fs');
const shell = require('shelljs');
const ora = require('ora');

const log = require('../utils/log');
const clone = require('../utils/clone');
const gitRepo = require('../template.js');

function fsExistsSync(path) {
  try {
    fs.accessSync(path, fs.F_OK);
  } catch (e) {
    return false;
  }
  return true;
}

function repoCloneFn({
  projectName,
  location,
  install,
  simple,
}) {
  const spinner = ora('downloading.').start();
  
  let opts = {};
  if (simple) opts.checkout = 'simple';

  clone(gitRepo.project, location,opts).then(() => {
    shell.rm('-rf', `${location}/.git`);
    shell.cd(projectName);
    spinner.succeed('Oops! Succeed!');
    if (install) {
      log.info('Installing dependency packages. Please wait a moment...');
      if (shell.exec('npm install --registry=https://registry.npm.taobao.org').code !== 0) {
        log.error('Something is wrong in install.');
        shell.exit(1);
        return;
      }
    }
    log.success(`Generation completed!`);
  }).catch(() => {
    spinner.fail('Oops! Fail!');
    log.error('Something is wrong.');
  });
}

module.exports = function createProject(projectName, {
  install = false,
  simple = false,
}) {
  let pwd = shell.pwd();
  let location = `${pwd}/${projectName}`;
  log.info(`Folder(${projectName}) is being created. \nlocation: ${location}`);
  const isExists = fsExistsSync(location);
  if (isExists) {
    log.error('The folder already exists.');
  } else {
    repoCloneFn({
      projectName,
      location,
      install,
      simple,
    });
  }
}