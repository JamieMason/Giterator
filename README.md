# giterator

> Rewrite Git history.

[![NPM version](http://img.shields.io/npm/v/giterator.svg?style=flat-square)](https://www.npmjs.com/package/giterator)
[![NPM downloads](http://img.shields.io/npm/dm/giterator.svg?style=flat-square)](https://www.npmjs.com/package/giterator)
[![Dependency Status](http://img.shields.io/david/JamieMason/giterator.svg?style=flat-square)](https://david-dm.org/JamieMason/giterator)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## 🙋🏽 Status

This is a new, experimental project which works but is still under early
development. Use at your own risk.

## 🌩 Installation

```
npm install --global giterator
```

## 🕹 Usage

### `giterator`

```
Usage: giterator [options] [command]

Options:

  -V, --version  output the version number
  -h, --help     output usage information

Commands:

  ungraph     rewrite history as a single stream, without merge commits
  help [cmd]  display help for [cmd]
```

### `giterator ungraph`

```
Usage: giterator ungraph [options]

Options:

  -d, --directory <dir>  path to a clone of a git repository
  -o, --output <dir>     a safe place to generate a rewritten copy of the repository
  -h, --help             output usage information
```

`giterator ungraph` takes a git log that looks like this:

```
* 94941cb - Lorem ipsum dolor sit amet (2 years, 2 months ago) <Jamie Mason>
* 45ca3d7 - consectetur adipisicing elit. (2 years, 2 months ago) <Jamie Mason>
*   fd09598 - Merge pull request #17 from guybrush/patch-1 (2 years, 2 months ago) <Jamie Mason>
|\
| * cab62a0 - Ea facilis voluptate sunt ab (2 years, 2 months ago) <Guybrush Threepwood>
|/
* 96b01a2 - eos ad error rerum quidem delectus (2 years, 4 months ago) <Jamie Mason>
* 0850f8e - numquam omnis nam recusandae (2 years, 4 months ago) <Jamie Mason>
* 59698a9 - perspiciatis eum fugit nemo (2 years, 4 months ago) <Jamie Mason>
*   83a4ae4 - Merge branch 'develop' (2 years, 4 months ago) <Jamie Mason>
```

And rewrites it in a continuous sequence:

```
* b665943 - Lorem ipsum dolor sit amet (2 years, 2 months ago) <Jamie Mason>
* 456de9c - consectetur adipisicing elit. (2 years, 2 months ago) <Jamie Mason>
* c2e6200 - Ea facilis voluptate sunt ab (2 years, 2 months ago) <Guybrush Threepwood>
* c1c24fc - eos ad error rerum quidem delectus (2 years, 4 months ago) <Jamie Mason>
* 35e9aba - numquam omnis nam recusandae (2 years, 4 months ago) <Jamie Mason>
* 70fc8f5 - perspiciatis eum fugit nemo (2 years, 4 months ago) <Jamie Mason>
```

From there, check over the generated git repository and if you are happy with
it:

```
git remote add origin https://github.com/User/project.git
```

## 🙋🏾‍♀️ Getting Help

- Get help with issues by creating a
  [Bug Report](https://github.com/JamieMason/giterator/issues/new?template=bug_report.md).
- Discuss ideas by opening a
  [Feature Request](https://github.com/JamieMason/giterator/issues/new?template=feature_request.md).
