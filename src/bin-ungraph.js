#!/usr/bin/env node

import path from 'path';
import chalk from 'chalk';
import program from 'commander';
import ungraph from './ungraph';

program
  .option('-d, --directory <dir>', 'path to a clone of a git repository', '')
  .option('-o, --output <dir>', 'a safe place to generate a rewritten copy of the repository', '')
  .parse(process.argv);

if (!program.directory) {
  console.error(
    chalk.red('%s\n%s'),
    '  giterator ungraph --directory ~/path/to/git-repo',
    '                                ^^^^^^^^^^^^^^^^^^'
  );
  program.help();
}

if (!program.output) {
  console.error(
    chalk.red('%s\n%s'),
    '  giterator ungraph --output ~/path/to/rewritten-git-repo',
    '                             ^^^^^^^^^^^^^^^^^^^^^^^^^^^^'
  );
  program.help();
}

ungraph({
  directory: path.resolve(program.directory),
  targetDirectory: path.resolve(program.output)
});
