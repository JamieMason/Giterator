// 3rd party modules
var os = require('os')
var path = require('path')

// public
module.exports = getOptions

// implementation
function getOptions (repo) {
  var _archives = path.join(os.tmpdir(), 'giterator-archives')
  var _repo = path.resolve(repo)
  var _repoGit = path.join(_repo, '.git')
  var _repoClean = path.join(os.tmpdir(), 'giterator-repo')
  var _repoCleanGit = path.join(_repoClean, '.git')

  return {
    dryRun: true,
    excludeMerges: true,
    pathToArchives: _archives,
    pathToProject: _repo,
    pathToProjectGit: _repoGit,
    pathToTemp: _repoClean,
    pathToTempGit: _repoCleanGit,
    getPathToArchive: function (commit) {
      return _archives + '/' + commit.sha + '.zip'
    }
  }
}
