export function flow(fns:Array<Function> = []):Function {
  return function implement(...args:any):any {
    return fns.reduce((pre, fn, index) => {
      if (index) {
        return fn.call(null, pre);
      }
      return fn.apply(null, pre);
    }, args);
  };
}
