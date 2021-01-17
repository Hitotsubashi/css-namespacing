export default class AttributeselectorHandler {
  private recordIndex:number = 0;
  private record:HandlerRecord = {};

  private ATTR_SELECTOR_REG:RegExp = new RegExp(/(\s*\[[^=\]]+(=("[^"]*")?('[^']*')?([^\]]*)?)?\]\s*)/, 'gm');
  private ATTR_MARK_REG:RegExp = new RegExp(`(${AttributeselectorHandler.ATTR_MARK})`, 'gm');
  static ATTR_MARK:string = '\\^\\d+';

  collectAttr:Function = (content:string):string => content.replace(this.ATTR_SELECTOR_REG, (attr) => {
    const mark = `^${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = attr;
    return mark;
  });


  resetAttr:Function = (content:string, option:Option):string => {
    const { namespace, not, only } = option;
    const isOnly = only.length;
    return content.replace(this.ATTR_MARK_REG,
      (mark) => this.record[mark].replace(
        /\[(class.?=)['"]?([^'"\]]*?)['"]?\]/gm,
        (object, left, right) => {
          const classnames = <Array<string>>right.split(/\s+/);
          const modifiedRight = classnames.map((classname) => {
            if (isOnly) {
              const onlyContainsClassname = only&&only.some((val) => val.test(classname));
              if (onlyContainsClassname) {
                return `${namespace}${classname}`;
              }
              return classname;
            }
            const notContainsClassname = not.some((val) => val.test(classname));
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
