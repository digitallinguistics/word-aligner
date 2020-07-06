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
      'waxdungu   qasi',
      'waxt-qungu qasi',
      'day-one    man',
    ];

    const aligned = alignWords(lines);

    aligned.forEach((line, i) => {

      expect(line).to.be(expectedResult[i]);

    });

  });

  it(`option: alignmentError`, function() {

    const lines = [
      `waxdungu qasi qapx cuyi`,
      `waxt-qungu qasi`,
      `day-one man`,
    ];

    const runTest = () => alignWords(lines, { alignmentError: true });

    expect(runTest).to.throwError(`AlignmentError`);

  });

});
