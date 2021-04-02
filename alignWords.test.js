/* eslint-disable
  func-names,
  max-nested-callbacks,
  prefer-arrow-callback,
*/

import alignWords                 from './alignWords.js';
import expect                     from 'expect.js';
import { fileURLToPath }          from 'url';
import { promises as fsPromises } from 'fs';

import {
  dirname as getDirname,
  join as joinPath,
} from 'path';

const { readFile } = fsPromises;

const currentDir = getDirname(fileURLToPath(import.meta.url));

describe(`alignWords`, function() {

  it(`vertically aligns words`, function() {

    const lines = [
      `waxdungu qasi`,
      `waxt-qungu qasi`,
      `day-one man`,
    ];

    const expectedResult = [
      `waxdungu   qasi`,
      `waxt-qungu qasi`,
      `day-one    man`,
    ];

    const aligned = alignWords(lines);

    aligned.forEach((line, i) => {

      expect(line).to.be(expectedResult[i]);

    });

  });

  it(`aligns by character length`, function() {

    const lines = [
      `cafȩ́ word t̓aatn̓a ʔunaakʔaɬ`,
      `a word children they.have`,
    ];

    const expectedResult = [
      `cafȩ́ word t̓aatn̓a   ʔunaakʔaɬ`,
      `a    word children they.have`,
    ];

    const aligned = alignWords(lines);

    aligned.forEach((line, i) => {

      expect(line).to.be(expectedResult[i]);

    });

  });

  it(`groups words with [brackets]`, function() {

    const lines = [
      `word word [word word] [stem]-suffix prefix-[word word] [word word],`,
      `m-m m [m m-m] [m]-m m-[m m] [m m]`,
      `gl-gl gl gl gl-gl gl-[gl gl] gl`,
    ];

    const expectedResult = [
      `word  word [word word] [stem]-suffix prefix-[word word] [word word],`,
      `m-m   m    [m m-m]     [m]-m         m-[m m]            [m m]`,
      `gl-gl gl   gl          gl-gl         gl-[gl gl]         gl`,
    ];

    const aligned = alignWords(lines);

    aligned.forEach((line, i) => {

      expect(line).to.be(expectedResult[i]);

    });

  });

  it(`option: alignmentError`, function() {

    const lines = [
      `waxdungu qasi qap cuyi`,
      `waxt-qungu qasi`,
      `day-one man`,
    ];

    const runTest = () => alignWords(lines, { alignmentError: true });

    expect(runTest).to.throwError(`AlignmentError`);

  });

  it(`option: groupWith`, function() {

    const lines = [
      `waxdungu qasi {qapx cuyi}`,
      `waxt-qungu qasi {qapx cuy-i}`,
      `day-one man he.came`,
    ];

    const expectedResult = [
      `waxdungu   qasi {qapx cuyi}`,
      `waxt-qungu qasi {qapx cuy-i}`,
      `day-one    man  he.came`,
    ];

    const aligned = alignWords(lines, { groupWith: `{}` });

    aligned.forEach((line, i) => {

      expect(line).to.be(expectedResult[i]);

    });

  });

  it(`option: separator`, function() {

    const lines = [
      `waxdungu qasi`,
      `waxt-qungu qasi`,
      `day-one man`,
    ];

    const expectedResult = [
      `waxdungu\tqasi`,
      `waxt-qungu\tqasi`,
      `day-one\tman`,
    ];

    const aligned = alignWords(lines, { separator: `tabs` });

    aligned.forEach((line, i) => {

      expect(line).to.be(expectedResult[i]);

    });

  });

});

describe(`package`, () => {

  it(`has the correct year in the license`, async function() {
    const licensePath = joinPath(currentDir, `./LICENSE`);
    const licenseText = await readFile(licensePath, `utf8`);
    const [year]      = licenseText.match(/2[0-9]{3}/u);
    const currentYear = new Date().getFullYear();
    expect(year).to.eql(currentYear);
  });

});
