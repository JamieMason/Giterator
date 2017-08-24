#!/usr/bin/env node

import program from 'commander';
import pkg from '../package.json';

program
  .version(pkg.version)
  .command('ungraph', 'rewrite history as a single stream, without merge commits')
  .parse(process.argv);
