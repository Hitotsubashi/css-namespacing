const { restoreLastIndex } = require('@/utils');

function AttributeselectorHandler() {
  this.recordIndex = 0;
  this.record = {};
  this.ATTR_SELECTOR_REG = new RegExp(/(\s*\[[^=\]]+(=("[^"]*")?('[^']*')?([^\]]*)?)?\]\s*)/, 'gm');
  this.ATTR_MARK_REG = new RegExp(`(${AttributeselectorHandler.ATTR_MARK})`, 'gm');
  this.collectAttr = (content) => content.replace(this.ATTR_SELECTOR_REG, (attr) => {
    const mark = `^${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = attr;
    return mark;
  });
  this.resetAttr = (content, option) => {
    const { namespace, not, only } = option;
    const isOnly = Array.isArray(only) && only.length;
    return content.replace(this.ATTR_MARK_REG,
      (mark) => this.record[mark].replace(
        /\[(class.?=)['"]?([^'"\]]*?)['"]?\]/gm,
        (object, left, right) => {
          // let modifiedRight = right;
          // modifiedRight = modifiedRight.split(/\s+/).map((el) => `${prefix}${el}`).join(' ');
          // return `[${left}"${modifiedRight}"]`;

          const classnames = right.split(/\s+/);
          // if (isOnly) {
          //   classnames = classnames.filter((classname) =>
          //  only.some((val) => val.test(classname)));
          // } else if (Array.isArray(not)) {
          //   classnames = classnames.filter(
          //     (classname) => !not.some(
          //       (val) => val.test(classname),
          //     ),
          //   );
          // }
          const modifiedRight = classnames.map((classname) => {
            if (only) restoreLastIndex(only);
            if (not) restoreLastIndex(not);
            if (isOnly) {
              const onlyContainsClassname = only.some((val) => val.test(classname));
              if (onlyContainsClassname) {
                return `${namespace}${classname}`;
              }
              return classname;
            }
            const notContainsClassname = Array.isArray(not)
            && not.some((val) => val.test(classname));
            if (notContainsClassname) {
              return classname;
            }
            return `${namespace}${classname}`;
          }).join(' ');
          return `[${left}"${modifiedRight}"]`;
        },
      ));
  };
}

AttributeselectorHandler.ATTR_MARK = '\\^\\d+';
module.exports = AttributeselectorHandler;
