import Bluebird from 'bluebird';
import tar from 'tar';

export default (outputDirectory, readStream) =>
  new Bluebird(resolve => {
    const writeStream = tar.x({ cwd: outputDirectory });
    const task = readStream.stdout.pipe(writeStream);
    task.on('close', () => resolve());
  });
