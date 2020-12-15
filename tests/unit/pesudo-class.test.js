const namespace = require('@/index');

describe('pesudo-class', () => {
  test(':host ', () => {
    const before = `
    :host(.special-custom-element) {
      font-weight: bold;
    }
    `;
    const after = `
    :host(.cst-special-custom-element) {
      font-weight: bold;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test(':not ', () => {
    const before = `
    body :not(.crazy, .fancy) {
      font-family: sans-serif;
    }
    `;
    const after = `
    body :not(.cst-crazy, .cst-fancy) {
      font-family: sans-serif;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});
