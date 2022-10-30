function onlyWhitespace(str) {
  if (str === '') {
    return false; // no whitespace!
  }

  let isOnlyWhitespace = true;

  Object.values(str).forEach((val) => {
    if (val !== ' ') {
      isOnlyWhitespace = false;
    }
  });
  return isOnlyWhitespace;
}

module.exports = { onlyWhitespace };
