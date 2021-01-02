/* eslint-disable import/no-unresolved */
const namespace = require('@/namespacing');

describe('class-selector', () => {
  test('normal class selector', () => {
    const before = `
    .box {
      line-height:1.5;
      font-size:1.5em;
      font-weight:bold;
      margin-left: 33.333333%;
    }
    `;
    const after = `
    .cst-box {
      line-height:1.5;
      font-size:1.5em;
      font-weight:bold;
      margin-left: 33.333333%;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('multi class selector', () => {
    const before = `
    .box,.box1 {
      line-height:1.5;
      font-size:1.5em;
      font-weight:bold;
      margin-left: 33.333333%;
    }
    `;
    const after = `
    .cst-box,.cst-box1 {
      line-height:1.5;
      font-size:1.5em;
      font-weight:bold;
      margin-left: 33.333333%;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('multi symbol selector', () => {
    const before = 'h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem}p{margin-top:0;margin-bottom:1rem}';
    expect(namespace(before)).toEqual(before);
  });

  test('descendant selector', () => {
    const before = `
    .box .box1 {
      line-height:1.5;
      font-size:.5em;
    }
    `;
    const after = `
    .cst-box .cst-box1 {
      line-height:1.5;
      font-size:.5em;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('Child selectors', () => {
    const before = `
    .box>.box1 {
      line-height:1.5;
      font-size:.5em;
    }
    `;
    const after = `
    .cst-box>.cst-box1 {
      line-height:1.5;
      font-size:.5em;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('Adjacent sibling selector', () => {
    const before = `
    .box1 + .box2 {
      line-height:1.5;
      font-size:.5em;
    }
    `;
    const after = `
    .cst-box1 + .cst-box2 {
      line-height:1.5;
      font-size:.5em;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});
