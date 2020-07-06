# word-aligner

_word-aligner_ is a small JavaScript utility (Node / browser) for vertically aligning words in an interlinear gloss (or any multi-line format).

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/digitallinguistics/word-aligner)][releases]
[![npm](https://img.shields.io/npm/dt/@digitallinguistics/word-aligner)][npm]
[![GitHub issues](https://img.shields.io/github/issues/digitallinguistics/word-aligner)][issues]
[![test status](https://github.com/digitallinguistics/word-aligner/workflows/test/badge.svg)][actions]
[![GitHub](https://img.shields.io/github/license/digitallinguistics/word-aligner)][license]
[![GitHub stars](https://img.shields.io/github/stars/digitallinguistics/word-aligner?style=social)][GitHub]

[Click here to open an issue on GitHub.][new-issue]

## Basic Usage

Install the library using npm or yarn:

```cmd
npm i @digitallinguistics/word-aligner
yarn add @digitallinguistics/word-aligner
```

Import the module:

```js
import alignWords from '@digitallinguistics/word-aligner';
```

Run the utility on an array of the lines you'd like to vertically align:

```js
const lines = [
  `waxdungu qasi`,
  `waxt-qungu qasi`,
  `day-one man`,
];

const aligned = alignWords(lines);
```

The value of the `aligned` variable will be:

```txt
[
  "waxdungu   qasi",
  "waxt-qungu qasi",
  "day-one    man"
]
```

**Note:** _word-aligner_ does _not_ do automatic line detection. It will not know what type of line you are handing it (morphemes, glosses, translation, etc.). Only provide the lines you actually want aligned. Usually this means you will not provide a free translation line.

## Options

Option           | Default  | Description
-----------------|----------|-------------------------------------------------------------------------------------------------------
`alignmentError` | `false`  | Specifies whether the library should throw an error if all lines do not have the same number of words.
`separator`      | `spaces` | Specifies whether words should be aligned using spaces or tabs. Allowed values: `spaces`, `tabs`.

[actions]:   https://github.com/digitallinguistics/word-aligner/actions?query=workflow%3Atest
[GitHub]:    https://github.com/digitallinguistics/word-aligner
[issues]:    https://github.com/digitallinguistics/word-aligner/issues
[license]:   https://github.com/digitallinguistics/word-aligner/blob/master/LICENSE
[new-issue]: https://github.com/digitallinguistics/word-aligner/issues/new
[npm]:       https://www.npmjs.com/package/@digitallinguistics/word-aligner
[releases]:  https://github.com/digitallinguistics/word-aligner/releases
