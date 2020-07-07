/* eslint-disable
  func-names,
  max-nested-callbacks,
  prefer-arrow-callback,
*/

import alignWords from './alignWords.js';
import expect     from 'expect.js';

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

  it.only(`aligns by character length`, function() {

    const lines = [
      `t̓aatn̓a ʔunaakʔaɬ`,
      `children they.have`,
    ];

    const expectedResult = [
      `t̓aatn̓a   ʔunaakʔaɬ`,
      `children they.have`,
    ];

    const aligned = alignWords(lines);

    aligned.forEach((line, i) => {

      expect(line).to.be(expectedResult[i]);

    });

  });

  it(`groups words with [brackets]`, function() {

    const lines = [
      `waxdungu qasi [qapx cuyi]`,
      `waxt-qungu qasi [qapx cuy-i]`,
      `day-one man he.came`,
    ];

    const expectedResult = [
      `waxdungu   qasi [qapx cuyi]`,
      `waxt-qungu qasi [qapx cuy-i]`,
      `day-one    man  he.came`,
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
