// 3rd party modules
var execSync = require('child_process').execSync

// public
module.exports = init

// implementation
function init (options) {
  recreate(options.pathToArchives)
  recreate(options.pathToTemp)
  execInTemp('cp -Rf "' + options.pathToProjectGit + '" "' + options.pathToTempGit + '"')
  execInTemp('git checkout --orphan tech-task/prune-merges')
  execInTemp('git reset --hard && git clean -df')
  return Promise.resolve()

  function recreate (dir) {
    execSync('rm -rf "' + dir + '"')
    execSync('mkdir -p "' + dir + '"')
  }

  function execInTemp (command) {
    return execSync(command, {
      cwd: options.pathToTemp,
      encoding: 'utf8'
    })
  }
}
