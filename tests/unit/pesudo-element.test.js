const namespace = require('@/index');

describe('pesudo-element', () => {
  test('::after', () => {
    const before = `
    .box::after{
      content:url(logo.gif);
    }
    `;
    const after = `
    .cst-box::after{
      content:url(logo.gif);
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('property "content" with text', () => {
    const before = `
    .box::after{
      content:"123.123{";
      content:".box{
        width:12px;
      }";
    }
    `;
    const after = `
    .cst-box::after{
      content:"123.123{";
      content:".box{
        width:12px;
      }";
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});
