/* eslint-disable import/no-unresolved */
const namespace = require('@/namespacing');

describe('class-content', () => {
  test('empty content', () => {
    const before = `.box{}
    .box1 {  }
    `;
    const after = `.cst-box{}
    .cst-box1 {  }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('content with ruleless shift and space', () => {
    const before = `
    .box {
      line-height:1.5;  font-size:1.5em;
      font-weight:bold;
      margin-left          :    33.333333%;
      padding: 12px 12px 56px 24px      ;border-radius:4px;
    }
    `;
    const after = `
    .cst-box {
      line-height:1.5;  font-size:1.5em;
      font-weight:bold;
      margin-left          :    33.333333%;
      padding: 12px 12px 56px 24px      ;border-radius:4px;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  // it can't be resolved at the end
  // have to make sure every property ends with a semicolon
  test('content does not end up with ; ', () => {
    const before = `
    .box {
      line-height:1.5;  font-size:1.5em;
      font-weight:bold;
      margin-left          :    33.333333%;
      padding: 12px 12px 56px 24px
    }
    `;
    const after = `
    .cst-box {
      line-height:1.5;  font-size:1.5em;
      font-weight:bold;
      margin-left          :    33.333333%;
      padding: 12px 12px 56px 24px
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('content being minimized', () => {
    let before = '.container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}';
    let after = '.cst-container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}';
    expect(namespace(before)).toEqual(after);
    before = '@media (min-width:768px){.container{max-width:720px}}';
    after = '@media (min-width:768px){.cst-container{max-width:720px}}';
    expect(namespace(before)).toEqual(after);
    before = '.container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.container{max-width:540px}}';
    after = '.cst-container{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}@media (min-width:576px){.cst-container{max-width:540px}}';
    expect(namespace(before)).toEqual(after);
    before = '@media (min-width:576px){.container{max-width:540px}}@media (min-width:768px){.container{max-width:720px}}@media (min-width:992px){.container{max-width:960px}}.container-fluid,.container-lg,.container-md,.container-sm,.container-xl{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}';
    after = '@media (min-width:576px){.cst-container{max-width:540px}}@media (min-width:768px){.cst-container{max-width:720px}}@media (min-width:992px){.cst-container{max-width:960px}}.cst-container-fluid,.cst-container-lg,.cst-container-md,.cst-container-sm,.cst-container-xl{width:100%;padding-right:15px;padding-left:15px;margin-right:auto;margin-left:auto}';
    expect(namespace(before)).toEqual(after);
    before = '[hidden]{display:none!important}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-bottom:.5rem;font-weight:500;line-height:1.2}';
    after = '[hidden]{display:none!important}.cst-h1,.cst-h2,.cst-h3,.cst-h4,.cst-h5,.cst-h6,h1,h2,h3,h4,h5,h6{margin-bottom:.5rem;font-weight:500;line-height:1.2}';
    expect(namespace(before)).toEqual(after);
  });
});
