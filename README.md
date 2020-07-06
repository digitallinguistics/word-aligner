# word-aligner

_word-aligner_ is a small JavaScript utility (Node / browser) for vertically aligning words in an interlinear gloss (or any multi-line format).

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

Option           | Default | Description
-----------------|---------|-------------------------------------------------------------------------------------------------------
`alignmentError` | `false` | Specifies whether the library should throw an error if all lines do not have the same number of words.

[new-issue]: https://github.com/digitallinguistics/word-aligner/issues/new
