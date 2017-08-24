import chalk from 'chalk';

const isVerbose = process.env.NODE_ENV === 'development';
const { blue, green, grey, red, underline } = chalk;
const purple = chalk.hex('#5D67FF');

export const bug = (value, err) =>
  console.error(
    red('! %s\n\n! Please raise an issue at %s\n\n%s'),
    value,
    underline('https://github.com/JamieMason/giterator/issues'),
    String(err.stack).replace(/^/gm, '    ')
  );

export const commit = ({ authorDateRelative, authorName, commitHash, subject }) => {
  console.info(
    `* %s - %s %s %s`,
    red(commitHash.slice(0, 7)),
    subject,
    green(`(${authorDateRelative})`),
    purple(`<${authorName}>`)
  );
};

export const error = value => console.error(red('! %s'), value);
export const info = value => console.info(blue('i %s'), value);
export const success = value => console.info(green('✓ %s'), value);
export const verbose = value => isVerbose && console.info(grey('? %s'), value);
