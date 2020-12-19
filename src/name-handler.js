function NameHandler() {
  this.NAME_REG = /\.([\w-]+)/gm;

  this.processName = function processName(classname, options) {
    const { prefix, not, only } = options;
    let isOnly;
    if (Array.isArray(only) && only.length !== 0) isOnly = true;
    return classname.replace(this.NAME_REG, (object, name) => {
      if (isOnly) {
        const onlyContainsName = only.some((el) => el.test(name));
        if (onlyContainsName) {
          this.restoreLastIndex(only);
          return object.replace(/\./, `.${prefix}`);
        }
        return object;
      }
      const notContainsName = Array.isArray(not) && not.some((el) => el.test(name));
      if (notContainsName) {
        this.restoreLastIndex(not);
        return object;
      }
      return object.replace(/\./, `.${prefix}`);
    });
  };

  this.restoreLastIndex = function restoreLastIndex(regexList = []) {
    regexList.forEach((regex) => {
      /* eslint-disable-next-line */
      regex.lastIndex = 0;
    });
  };
}

module.exports = new NameHandler();
