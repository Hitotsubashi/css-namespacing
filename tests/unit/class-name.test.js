import NameHandler from '@/name-handler';

describe('class-name', () => {
  let nameHandler;
  let name;
  let result;

  beforeAll(() => {
    nameHandler = new NameHandler();
  });

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
});
