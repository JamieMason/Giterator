// 3rd party modules
var nodeGit = require('nodegit')

// public
module.exports = addTags

// implementation
function addTags (options, commits) {
  return nodeGit.Repository.open(options.pathToProjectGit)
    .then(getRefs)
    .then(getTagsBySha)
    .then(bindTagsToCommits)

  function getRefs (repo) {
    return repo.getReferences(nodeGit.Reference.TYPE.OID)
  }

  function getTagsBySha (refs) {
    return refs.reduce(handleRef, {})
  }

  function handleRef (tagsBySha, ref) {
    if (ref.isTag()) {
      tagsBySha[ref.target().toString()] = ref.shorthand()
    }
    return tagsBySha
  }

  function bindTagsToCommits (tagsBySha) {
    return commits.map(function (commit) {
      commit.tag = tagsBySha[commit.sha] || ''
      return commit
    })
  }
}
