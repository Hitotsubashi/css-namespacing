exports.restoreLastIndex = function restoreLastIndex(regexList = []) {
  regexList.forEach((regex) => {
    /* eslint-disable-next-line */
    regex.lastIndex = 0;
  });
};
