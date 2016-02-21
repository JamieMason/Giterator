// modules
var archiveCommits = require('./lib/archiveCommits')
var getGitLog = require('./lib/getGitLog')
var getOptions = require('./lib/getOptions')
var init = require('./lib/init')
var replayCommits = require('./lib/replayCommits')
var sortOldestFirst = require('./lib/sortOldestFirst')

// public
module.exports = pruneMerges

// implementation
function pruneMerges (config) {
  var options = getOptions(config.projectRoot)
  init(options)
    .then(getGitLog.bind(null, options))
    .then(archiveCommits.bind(null, options))
    .then(sortOldestFirst)
    .then(replayCommits.bind(null, options))
    .catch(function (err) {
      console.error(err.stack)
      process.exit(1)
    })
}
