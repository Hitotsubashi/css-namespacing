const namespace = require('@/index');

describe('Media Types', () => {
  test('media', () => {
    const before = `
    @media screen
    {
      p.test {font-family:verdana,sans-serif; font-size:14px;}
    }
    `;
    const after = `
    @media screen
    {
      p.cst-test {font-family:verdana,sans-serif; font-size:14px;}
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('media and size', () => {
    const before = `
    @media screen and (max-width: 300.5px) {
      .box { background-color:lightblue; }

      .gridmain { width:100%; }

      .gridright { width:100%; }
    }
    `;
    const after = `
    @media screen and (max-width: 300.5px) {
      .cst-box { background-color:lightblue; }

      .cst-gridmain { width:100%; }

      .cst-gridright { width:100%; }
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});
