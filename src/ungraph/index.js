import * as logservable from 'logservable';
import Bluebird from 'bluebird';
import fieldNames from './lib/field-names';
import * as git from './lib/git';
import * as log from './lib/log';

export default async ({ directory, targetDirectory }) => {
  await git.recreate(targetDirectory);
  const collect = (array, value) => array.concat(value);
  const isNotMerge = commit => commit.subject.startsWith('Merge ') === false;
  const commit$ = logservable.commits(directory, fieldNames, true);
  const nonMergeCommit$ = commit$.filter(isNotMerge);
  const allNonMergeCommit$ = nonMergeCommit$.fold(collect, []);

  allNonMergeCommit$.last().addListener({
    next(allNonMergeCommit) {
      Bluebird.each(allNonMergeCommit, commit =>
        Bluebird.resolve()
          .then(() => log.commit(commit))
          .then(() => git.copyCommit(directory, targetDirectory, commit))
          .catch(error => {
            log.bug(`failed to copy commit ${commit.commitHash}`, error);
            process.exit(1);
          })
      ).then(() => console.log('done'));
    }
  });
};
