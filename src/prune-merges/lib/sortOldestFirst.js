// 3rd party modules
var sortBy = require('lodash.sortby')

// public
module.exports = sortOldestFirst

// implementation
function sortOldestFirst (commits) {
  return sortBy(commits, function (commit) {
    return new Date(commit.date)
  })
}
