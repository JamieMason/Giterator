# giterator

> Clean up your Git history.

## Status

Giterator is a working proof-of-concept experiment.

## Summary

Giterator takes a git log that looks like this:

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

And rewrites it as if you'd been using `git rebase` the whole time:

```
* b665943 - Lorem ipsum dolor sit amet (2 years, 2 months ago) <Jamie Mason>
* 456de9c - consectetur adipisicing elit. (2 years, 2 months ago) <Jamie Mason>
* c2e6200 - Ea facilis voluptate sunt ab (2 years, 2 months ago) <Guybrush Threepwood>
* c1c24fc - eos ad error rerum quidem delectus (2 years, 4 months ago) <Jamie Mason>
* 35e9aba - numquam omnis nam recusandae (2 years, 4 months ago) <Jamie Mason>
* 70fc8f5 - perspiciatis eum fugit nemo (2 years, 4 months ago) <Jamie Mason>
```

## Usage

This project is a few days old so I don't expect anyone to use it, but if you're crazy;

```shell
# install
git clone https://github.com/JamieMason/giterator.git
cd giterator
npm install

# make available globally
npm link .

# run
giterator prune-merges ~/some/project

# inspect the output so far
cd "${TMPDIR}giterator-repo"
git log --pretty=oneline --graph
```
