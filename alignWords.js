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
        if (!line[i]) return len;
        if (line[i].length > len) return line[i].length;
        return len;
      }, 0);

      lines.forEach(words => {
        if (!words[i]) return;
        words[i] = words[i].padEnd(longestWordLength);
      });

    });

    lines = lines.map(line => line.join(` `).trim());

  }

  return lines;

}

export default alignWords;
