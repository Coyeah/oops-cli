let spawn = require('child_process').spawn;

module.exports = function (repo, targetPath, opts = {}) {
  let git = opts.git || 'git';
  let args = ['clone'];

  if (opts.shallow) {
    args.push('--depth');
    args.push('1');
  }

  args.push('--');
  args.push(repo);
  args.push(targetPath);

  return new Promise((resolve, reject) => {
    var process = spawn(git, args);
    process.on('close', function (status) {
      if (status == 0) {
        !!opts.checkout ? _checkout().then(() => {
          resolve();
        }).catch(() => {
          reject();
        }) : resolve();
      } else {
        reject();
      }
    });
  });

  function _checkout () {
    let args = ['checkout', opts.checkout];
    return new Promise((resolve, reject) => {
      let process = spawn(git, args, { cwd: targetPath });
      process.on('close', function (status) {
        if (status == 0) {
          resolve();
        } else {
          reject();
        }
      })
    });
  }
}
