// 3rd party modules
var execSync = require('child_process').execSync

// public
module.exports = archiveCommits

// implementation
function archiveCommits (options, commits) {
  commits.forEach(function archiveCommit (commit) {
    execSync('git archive -o "' + options.getPathToArchive(commit) + '" ' + commit.sha, {
      cwd: options.pathToProject
    })
  })
  return commits
}
