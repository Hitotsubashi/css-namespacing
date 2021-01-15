exports.flow = function flow(fns = []) {
  return function implement(...args) {
    return fns.reduce((pre, fn, index) => {
      if (index) {
        return fn.call(this, pre);
      }
      return fn.apply(this, pre);
    }, args);
  };
};
