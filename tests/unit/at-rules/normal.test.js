/* eslint-disable import/no-unresolved */
const ns = require('@/index.js');

describe('at-rules', () => {
  test('normal use', () => {
    const before = `
    @namespacing prefix('my-') not([/box2/])
    .box{}
    .box2{}
    `;
    const after = `
    .my-box{}
    .box2{}
    `;
    expect(ns(before)).toEqual(after);
  });

  test('at-rules without option', () => {
    const before = `
    .box{
      font-weight:500;
    }
    @namespacing
    .box[title=W3School]
    {
      border:5px solid blue;
    }
    `;
    const after = `
    .cst-box{
      font-weight:500;
    }
    .cst-box[title=W3School]
    {
      border:5px solid blue;
    }
    `;
    expect(ns(before)).toEqual(after);
  });

  test('with prefix', () => {
    const before = `
    .box[title=W3School]
    {
      border:5px solid blue;
    }
    @namespacing prefix('my1-')
    .box1{
      font-size:1.5em;
    }
    @namespacing prefix('my2-')
    .box2{
      line-height:1.5;
    }
    `;
    const after = `
    .my-box[title=W3School]
    {
      border:5px solid blue;
    }
    .my1-box1{
      font-size:1.5em;
    }
    .my2-box2{
      line-height:1.5;
    }
    `;
    expect(ns(before, { namespace: 'my-' })).toEqual(after);
  });

  test('with not', () => {
    const before = `
    .box{}
    .box2{}
    @namespacing not([/box./])
    .box3{}
    .box{}
    @namespacing
    .box3{}
    .box{}
    `;
    const after = `
    .cst-box{}
    .box2{}
    .box3{}
    .cst-box{}
    .cst-box3{}
    .cst-box{}
    `;
    expect(ns(before, { not: [/box2/] })).toEqual(after);
  });

  test('only', () => {
    const before = `
    .box{}
    .box2{}
    @namespacing only([/box2/])
    .box{}
    .box2{}
    `;
    const after = `
    .cst-box{}
    .box2{}
    .cst-box{}
    .cst-box2{}
    `;
    expect(ns(before, { only: [/^box$/] })).toEqual(after);
  });

  test('with not and only', () => {
    const before = `
    .form{}
    .form1{}
    .control-form{}
    @namespacing not([/control-form1/]) only([/control-.*/])
    .form2{}
    .control-form1{}
    .control-row{}
    @namespacing only([/main/])
    .main{}
    .control-form1{}
    .control-row{}
    `;
    const after = `
    .cst-form{}
    .cst-form1{}
    .control-form{}
    .form2{}
    .cst-control-form1{}
    .cst-control-row{}
    .cst-main{}
    .control-form1{}
    .control-row{}
    `;
    expect(ns(before, { not: [/control-.*/] })).toEqual(after);
  });
});
