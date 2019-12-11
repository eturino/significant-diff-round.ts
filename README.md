# `@eturino/significant-diff-round`

[![npm version](https://badge.fury.io/js/%40eturino%2Fsignificant-diff-round.svg)](https://badge.fury.io/js/%40eturino%2Fsignificant-diff-round)
[![Build Status](https://travis-ci.org/eturino/significant-diff-round.ts.svg?branch=master)](https://travis-ci.org/eturino/significant-diff-round.ts)
[![Maintainability](https://api.codeclimate.com/v1/badges/39bd6a0a6c69ffaeb6b5/maintainability)](https://codeclimate.com/github/eturino/significant-diff-round.ts/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/39bd6a0a6c69ffaeb6b5/test_coverage)](https://codeclimate.com/github/eturino/significant-diff-round.ts/test_coverage)

[TypeDoc generated docs in here](https://eturino.github.io/significant-diff-round.ts)

[Github repo here](https://github.com/eturino/significant-diff-round.ts)

util to round 2 numbers to the enough number of decimals to show the difference between them

## Installation

`yarn add @eturino/significant-diff-round` or `npm install @eturino/significant-diff-round`.

## Usage

Given 2 numbers, an an optional minimum precision, `significantDiffRound()` will round them to the precision needed to be significantly different, so that the 2 rounded numbers are not equal.

The idea is to avoid rounding `1.123` and `1.124` to `1.12` in both cases, loosing the ability to spot the difference.

If the given numbers are the same, they will be returned rounded to the minimum precision specified (default 0).

The results are returned in an object of the form `{ a: roundedFirstNumber, b: roundedSecondNumber, precision: numberOfDecimals }`

e.g.

```typescript
import significantDiffRound from "@eturino/significant-diff-round";

// same number
significantDiffRound(1.123, 1.123); // => { a: 1, b: 1, precision: 0 }
significantDiffRound(1.123, 1.123, 2); // => { a: 1.12, b: 1.12, precision: 2 }

// numbers diff in int part
significantDiffRound(1.123, 2.321); // => { a: 1, b: 2, precision: 0 }
significantDiffRound(1.123, 2.321, 1); // => { a: 1.1, b: 2.3, precision: 1 }

// numbers diff in decimal part
significantDiffRound(1.123, 1.21); // => { a: 1.1, b: 1.2, precision: 1 }
significantDiffRound(1.123, 1.21, 2); // => { a: 1.12, b: 1.21, precision: 2 }
significantDiffRound(1.1234111, 1.12323313); // => { a: 1.1234, b: 1.1232, precision: 4 }
significantDiffRound(1.12321414, 1.1236531541); // => { a: 1.123, b: 1.124, precision: 3 }

// max precision (depends on Number.EPSILON)
significantDiffRound(1, 0.9999999999999998); // => { a: 1, b: 0.9999999999999998, precision: 16 }
```

## Development, Commits, versioning and publishing

<details><summary>See documentation for development</summary>
<p>

See [The Typescript-Starter docs](https://github.com/bitjson/typescript-starter#bump-version-update-changelog-commit--tag-release).

### Commits and CHANGELOG

For commits, you should use [`commitizen`](https://github.com/commitizen/cz-cli)

```sh
yarn global add commitizen

#commit your changes:
git cz
```

As typescript-starter docs state:

This project is tooled for [conventional changelog](https://github.com/conventional-changelog/conventional-changelog) to make managing releases easier. See the [standard-version](https://github.com/conventional-changelog/standard-version) documentation for more information on the workflow, or [`CHANGELOG.md`](CHANGELOG.md) for an example.

```sh
# bump package.json version, update CHANGELOG.md, git tag the release
yarn run version
```

You may find a tool like [**`wip`**](https://github.com/bitjson/wip) helpful for managing work in progress before you're ready to create a meaningful commit.

### Creating the first version

Once you are ready to create the first version, run the following (note that `reset` is destructive and will remove all files not in the git repo from the directory).

```sh
# Reset the repo to the latest commit and build everything
yarn run reset && yarn run test && yarn run doc:html

# Then version it with standard-version options. e.g.:
# don't bump package.json version
yarn run version -- --first-release

# Other popular options include:

# PGP sign it:
# $ yarn run version -- --sign

# alpha release:
# $ yarn run version -- --prerelease alpha
```

And after that, remember to [publish the docs](#publish-the-docs).

And finally push the new tags to github and publish the package to npm.

```sh
# Push to git
git push --follow-tags origin master

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

### Publish the Docs

```sh
yarn run doc:html && yarn run doc:publish
```

This will generate the docs and publish them in github pages.

### Generate a version

There is a single yarn command for preparing a new release. See [One-step publish preparation script in TypeScript-Starter](https://github.com/bitjson/typescript-starter#one-step-publish-preparation-script)

```sh
# Prepare a standard release
yarn prepare-release

# Push to git
git push --follow-tags origin master

# Publish to NPM (allowing public access, required if the package name is namespaced like `@somewhere/some-lib`)
yarn publish --access public
```

</p>
</details>
