// 3rd party modules
var Repository = require('nodegit').Repository

// public
module.exports = getGitLog

// implementation
function getGitLog (options) {
  return Repository.open(options.pathToProjectGit)
    .then(getHistory)
    .then(getCommits)
    .then(getCommitObjects)
    .then(filterUnwantedCommits(options.excludeMerges))
}

function getHistory (repo) {
  return repo.getMasterCommit()
    .then(function (masterCommit) {
      return masterCommit.history()
    })
}

function getCommits (history) {
  return new Promise(function (resolve) {
    history.on('end', resolve)
    history.start()
  })
}

function getCommitObjects (commits) {
  return commits.map(function (commit) {
    return {
      authorEmail: commit.author().email(),
      authorName: commit.author().name(),
      date: commit.date(),
      message: commit.message(),
      sha: commit.sha()
    }
  })
}

function filterUnwantedCommits (excludeMergeCommits) {
  if (excludeMergeCommits) {
    return removeMerges
  }
  return keepMerges
}

function removeMerges (commits) {
  return commits.filter(function (commit) {
    return commit.message.startsWith('Merge ') === false
  })
}

function keepMerges (commits) {
  return commits
}
