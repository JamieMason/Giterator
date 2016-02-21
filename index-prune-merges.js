#!/usr/bin/env node

// 3rd party modules
var chalk = require('chalk')
var path = require('path')
var program = require('commander')

// modules
var pruneMerges = require('./src/prune-merges')

// implementation
program
  .arguments('<dir>')
  .action(function (dir) {
    program.dir = dir
  })
  .parse(process.argv)

if (!program.dir) {
  console.error(chalk.red('%s\n%s\n%s'),
    'giterator prune-merges ~/path/to/some/repo',
    '                       ^^^^^^^^^^^^^^^^^^^',
    'the missing <dir> argument should point to a clone of the git project you want to update'
  )
  process.exit(1)
}

pruneMerges({
  projectRoot: path.resolve(program.dir),
  dryRun: program.dryRun === true
})
