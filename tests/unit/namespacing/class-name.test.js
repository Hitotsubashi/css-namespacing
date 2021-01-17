/* eslint-disable import/no-unresolved */
const nameHandler = require('@/handler/name-handler').default;

const namespacing = require('@/index');

describe('class-name', () => {
  let name;
  let result;
  let before;
  let after;

  test('name with all kinds of selector ', () => {
    name = '.box1>.box2';
    result = name.match(nameHandler.NAME_REG);
    expect(result).toEqual(['.box1', '.box2']);
    name = '.box1>.box2 .box3,.box4~.box5';
    result = name.match(nameHandler.NAME_REG);
    expect(result).toEqual(['.box1', '.box2', '.box3', '.box4', '.box5']);
    name = '.box1.box2 .box3.box4';
    result = name.match(nameHandler.NAME_REG);
    expect(result).toEqual(['.box1', '.box2', '.box3', '.box4']);
  });

  test('set namespace', () => {
    before = `
    .box{}
    `;
    after = `
    .bsp-box{}
    `;
    expect(namespacing(before, { namespace: 'bsp-' })).toEqual(after);
  });

  test('not', () => {
    before = `
      .box1,.box2 .box3+.box4,
      .box5~.box6 .box7[class="box8 box9"]{

      }
    `;
    after = `
      .cst-box1,.box2 .cst-box3+.box4,
      .box5~.cst-box6 .cst-box7[class="cst-box8 box9"]{

      }
    `;
    result = namespacing(before, { not: [/box2/, /box4/, /box5/, /box9/] });
    expect(result).toEqual(after);
  });

  test('only', () => {
    before = `
      .box1,.box2 .box3+.box4,
      .box5~.box6 .box7[class="box8 box9"]{

      }
    `;
    after = `
      .box1,.cst-box2 .box3+.cst-box4,
      .cst-box5~.box6 .box7[class="box8 cst-box9"]{

      }
    `;
    result = namespacing(before, { only: [/box2/, /box4/, /box5/, /box9/] });
    expect(result).toEqual(after);
  });

  test('only and not', () => {
    before = `
      .box1,.box2 .box3+.box4,
      .box5~.box6 .box7[class="box8 box9"]{

      }
    `;
    after = `
      .box1,.cst-box2 .box3+.cst-box4,
      .box5~.box6 .box7[class="box8 box9"]{

      }
    `;
    result = namespacing(before, { only: [/box2/, /box4/], not: [/box3/, /box4/] });
    expect(result).toEqual(after);
  });

  test('not in el-*', () => {
    before = `
      .box .el-input{

      }
      .box2 .el-form{

      }
    `;
    after = `
      .cst-box .el-input{

      }
      .cst-box2 .el-form{

      }
    `;
    result = namespacing(before, { not: [/el-.*/] });
    expect(result).toEqual(after);
  });
});
