// 3rd party modules
var execSync = require('child_process').execSync
var fs = require('fs')
var path = require('path')

// public
module.exports = replayCommits

// implementation
function replayCommits (options, commits) {
  var lastIndex = commits.length - 1
  return commits.map(replayCommit)

  function replayCommit (commit, i) {
    applyChanges(commit)
    if (hasChanged()) {
      stageChanges()
      commitChanges(commit)
      amendAuthor(commit)
      amendDate(commit)
    }
    if (i < lastIndex) {
      cleanRepo()
    }
    return commit
  }

  function applyChanges (commit) {
    var archive = options.getPathToArchive(commit)
    execInTemp('unzip "' + archive + '" -d "' + options.pathToTemp + '"')
  }

  function hasChanged () {
    return execInTemp('git status -s').trim().length > 0
  }

  function stageChanges () {
    execInTemp('git add . -A')
  }

  function commitChanges (commit) {
    var escapedMessage = commit.message.replace(/"/g, '\\"')
    execInTemp('git commit -m "' + escapedMessage + '"')
  }

  function amendAuthor (commit) {
    execInTemp('git commit --no-edit --amend --author "' + commit.authorName + ' <' + commit.authorEmail + '>"')
  }

  function amendDate (commit) {
    execInTemp('GIT_COMMITTER_DATE="' + commit.date + '" git commit --no-edit --amend --date="' + commit.date + '"')
  }

  function cleanRepo () {
    fs.readdirSync(options.pathToTemp).forEach(function (file) {
      if (file !== '.git') {
        cleanFile(file)
      }
    })
  }

  function cleanFile (file) {
    var absPath = path.join(options.pathToTemp, file)
    execInTemp('rm -rf "' + absPath + '"')
  }

  function execInTemp (command) {
    return execSync(command, {
      cwd: options.pathToTemp,
      encoding: 'utf8'
    })
  }
}
