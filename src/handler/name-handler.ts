class NameHandler {
  private NAME_REG:RegExp = /\.([\w-]+)/gm;

  processName:Function = (classname:string, option:Option):string=> {
    const { namespace, not, only } = option;
    const isOnly =  only.length;
    return classname.replace(this.NAME_REG, (object, name) => {
      if (isOnly) {
        const onlyContainsName = only&&only.some((el) => el.test(name));
        if (onlyContainsName) {
          return object.replace(/\./, `.${namespace}`);
        }
        return object;
      }
      const notContainsName = not.some((el) => el.test(name));
      if (notContainsName) {
        return object;
      }
      return object.replace(/\./, `.${namespace}`);
    });
  };
}

export default new NameHandler()