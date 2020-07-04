module.exports = class {
  static camelToSentenceCase(words) {
    const regex = /([A-Z])(?=[a-z][A-Z])|([a-z])(?=[A-Z])/g;
    return words
        .replace(regex, '$& ')[0]
        .toUpperCase() +
      words
        .replace(regex, '$& ')
        .slice(1);
  }

  static getAbbreviation(words) {
    return words
      .toUpperCase()
      .split(' ')
      .map(w => w[0])
      .join('')
  }  
}