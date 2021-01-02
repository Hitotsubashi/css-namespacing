/* eslint-disable import/no-unresolved */
const ns = require('@/index.js');

describe('at-rules', () => {
  test('at-rules without option', () => {
    const before = `
    @namespacing
    .box[title=W3School]
    {
      border:5px solid blue;
    }
    `;
    const after = `
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
    `;
    const after = `
    .my-box[title=W3School]
    {
      border:5px solid blue;
    }
    .my1-box1{
      font-size:1.5em;
    }
    `;
    expect(ns(before, { namespace: 'my-' })).toEqual(after);
  });
});
