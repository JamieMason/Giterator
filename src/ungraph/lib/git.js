import fs from 'fs';
import path from 'path';
import Bluebird from 'bluebird';
import execa from 'execa';
import rimraf from 'rimraf';
import extractTar from './extract-tar';

const replicate = (directory, commit) => ({
  cwd: directory,
  env: {
    ...process.env,
    GIT_AUTHOR_DATE: commit.authorDate,
    GIT_AUTHOR_EMAIL: commit.authorEmail,
    GIT_AUTHOR_NAME: commit.authorName,
    GIT_COMMITTER_DATE: commit.committerDate,
    GIT_COMMITTER_EMAIL: commit.committerEmail,
    GIT_COMMITTER_NAME: commit.committerName
  }
});

export const add = directory => execa('git', ['add', '.', '--all'], { cwd: directory });

export const archive = (directory, commit) =>
  execa('git', ['archive', '--format=tar', commit.commitHash], { cwd: directory });

export const commit = (directory, commit) =>
  execa(
    'git',
    ['commit', '-m', `${commit.subject}\n\n${commit.body || ''}`.trim()],
    replicate(directory, commit)
  );

export const empty = directory =>
  Bluebird.resolve(
    fs
      .readdirSync(directory)
      .filter(basename => basename !== '.git')
      .map(basename => path.resolve(directory, basename))
      .forEach(location => rimraf.sync(location))
  );

export const init = directory => execa('git', ['init'], { cwd: directory });

export const recreate = directory => {
  rimraf.sync(directory);
  fs.mkdirSync(directory);
  return init(directory);
};

export const isDirty = directory =>
  execa('git', ['status', '--short'], { cwd: directory }).then(({ stdout }) => Boolean(stdout));

export const tag = (directory, tagName, commit) =>
  execa('git', ['tag', '--force', tagName, commit.commitHash], replicate(directory, commit));

export const copyCommit = async (sourceDirectory, targetDirectory, _commit) => {
  const readStream = archive(sourceDirectory, _commit);
  await empty(targetDirectory);
  await extractTar(targetDirectory, readStream);
  if (await isDirty(targetDirectory)) {
    await add(targetDirectory);
    await commit(targetDirectory, _commit);
  }
};
