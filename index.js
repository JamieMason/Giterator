#!/usr/bin/env node

// 3rd party modules
var program = require('commander')

// modules
var pkg = require('./package.json')

// implementation
program
  .version(pkg.version)
  .command('prune-merges', 'organise git history into a single stream, without merge commits')
  .parse(process.argv)
