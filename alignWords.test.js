/* eslint-disable
  func-names,
  prefer-arrow-callback,
*/

import alignWords from './alignWords.js';
import expect     from 'expect.js';

describe(`alignWords`, function() {

  it(`exports a function`, function() {
    expect(alignWords).to.be.a(`function`);
  });

});
