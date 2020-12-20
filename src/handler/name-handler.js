const { restoreLastIndex } = require('@/utils');

function NameHandler() {
  this.NAME_REG = /\.([\w-]+)/gm;

  this.processName = function processName(classname, option) {
    const { namespace, not, only } = option;
    const isOnly = Array.isArray(only) && only.length;
    return classname.replace(this.NAME_REG, (object, name) => {
      if (only) restoreLastIndex(only);
      if (not) restoreLastIndex(not);
      if (isOnly) {
        const onlyContainsName = only.some((el) => el.test(name));
        if (onlyContainsName) {
          return object.replace(/\./, `.${namespace}`);
        }
        return object;
      }
      const notContainsName = Array.isArray(not) && not.some((el) => el.test(name));
      if (notContainsName) {
        return object;
      }
      return object.replace(/\./, `.${namespace}`);
    });
  };
}

module.exports = new NameHandler();
