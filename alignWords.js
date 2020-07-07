/* eslint-disable
  no-param-reassign,
*/

function alignWords(lines, options = {}) {

  const {
    alignmentError = false,
    groupWith      = `[]`,
    separator      = `spaces`,
  } = options;

  const [leftBracket, rightBracket] = groupWith.trim().split(``);

  let wordRegExp = /(?<bracketed>\[.*?\])|(?<unbracketed>[^\s]+)/gu;

  if (groupWith !== `[]`) {

    const pattern = wordRegExp.source
    .replace(`\\[`, `\\${leftBracket}`)
      .replace(`\\]`, `\\${rightBracket}`);

    wordRegExp = new RegExp(pattern, `gu`);

  }

  lines = Array.from(lines);
  lines = lines.map(line => line.trim());
  lines = lines.map(line => [...line.matchAll(wordRegExp)].map(([match]) => match));

  if (alignmentError === true) {

    const sameLength = lines.every(line => line.length === lines[0].length);

    if (!sameLength) throw new Error(`AlignmentError`);

  }

  const indexOfLongestLine = lines.reduce((longestIndex, line, i) => {
    if (!line.length) return longestIndex;
    if (line.length > longestIndex) return i;
    return longestIndex;
  }, 0);

  const longestLine = lines[indexOfLongestLine];

  if (separator === `tabs`) {

    lines = lines.map(line => line.join(`\t`).trim());

  } else {

    longestLine.forEach((word, i) => {

      const longestWordLength = lines.reduce((len, line) => {
        const w = line[i];
        if (!w) return len;
        const charLength = getCharLength(w);
        if (charLength > len) return charLength;
        return len;
      }, 0);

      lines.forEach(words => {
        const w = words[i];
        if (!w) return;
        const charLength = getCharLength(w);
        words[i] = w.padEnd(longestWordLength + (w.length - charLength));
      });

    });

    lines = lines.map(line => line.join(` `).trim());

  }

  return lines;

}

/**
 * Gets the length of a string in characters rather than unicode points
 * @param  {String}  str The string to find the length of
 * @return {Integer}     The character length of the string
 */
function getCharLength(str) {

  // search for non-combining character followed by combining character
  const combiningRegExp = /(?<char>\P{Mark})(?<combiner>\p{Mark}+)/gu;

  // remove combining characters
  str = str.replace(combiningRegExp, `$1`);

  // get length, accounting for surrogate pairs
  return Array.from(str).length;

}

export default alignWords;
