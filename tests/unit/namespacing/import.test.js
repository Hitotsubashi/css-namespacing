/* eslint-disable import/no-unresolved */
const namespace = require('@/namespacing');

describe('import', () => {
  test('@import', () => {
    const before = `
    @import url("fineprint.css");
    @import 'custom.css';
    .box1 {  }
    `;
    const after = `
    @import url("fineprint.css");
    @import 'custom.css';
    .cst-box1 {  }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('only @import in content', () => {
    const before = "@import 'custom.css'";
    expect(namespace(before)).toEqual(before);
  });
});
