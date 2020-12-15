const namespace = require('@/index');

describe('attribute-selector expect class', () => {
  test('attribute-selector', () => {
    const before = `
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
    expect(namespace(before)).toEqual(after);
  });

  test('only attribute-selector', () => {
    const before = `
    [title=W3School]
    {
      border:5px solid blue;
    }
    `;
    expect(namespace(before)).toEqual(before);
  });

  test('only attribute-selector and without value', () => {
    const before = `
    [title]
    {
      border:5px solid blue;
    }
    `;
    expect(namespace(before)).toEqual(before);
  });

  test('nested attribute-selector with different quotes', () => {
    const before = `
    .box[title="box2"] .box3[title=box4] input[title~='box5']
    {
      border:5px solid blue;
    }
    `;
    const after = `
    .cst-box[title="box2"] .cst-box3[title=box4] input[title~='box5']
    {
      border:5px solid blue;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });
});

describe(('class-attribute-selector'), () => {
  test('nested class-attribute-selector with different quotes', () => {
    const before = `
    .box[class="box2"] .box3[class=box4] input[class~='box5']
    {
      border:5px solid blue;
    }
    `;
    const after = `
    .cst-box[class="cst-box2"] .cst-box3[class="cst-box4"] input[class~="cst-box5"]
    {
      border:5px solid blue;
    }
    `;
    expect(namespace(before)).toEqual(after);
  });

  test('empty class attribute', () => {
    const before = '.box[class]{ }';
    const after = '.cst-box[class]{ }';
    expect(namespace(before)).toEqual(after);
  });

  test('class attribute with multiple value', () => {
    const before = '.box[class="warning important"]{ }';
    const after = '.cst-box[class="cst-warning cst-important"]{ }';
    expect(namespace(before)).toEqual(after);
  });
});

describe('mixin attribute-selector', () => {
  test('nested attribute-selector', () => {
    const before = '.planet[moons][class="warning important"] {color:red;}';
    const after = '.cst-planet[moons][class="cst-warning cst-important"] {color:red;}';
    expect(namespace(before)).toEqual(after);
  });
});
