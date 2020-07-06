/* eslint-disable
  no-param-reassign,
*/

function alignWords(lines) {

  const whiteSpaceRegExp = /\s+/gu;

  lines = Array.from(lines);
  lines = lines.map(line => line.trim());
  lines = lines.map(line => line.split(whiteSpaceRegExp));

  const indexOfLongestLine = lines.reduce((longestIndex, line, i) => {
    if (!line.length) return longestIndex;
    if (line.length > longestIndex) return i;
    return longestIndex;
  }, 0);

  const longestLine = lines[indexOfLongestLine];

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

  return lines;

}

export default alignWords;
