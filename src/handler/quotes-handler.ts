export default class QuotesHandler {
  private recordIndex:number = 0
  private record:HandlerRecord = {}

  static QUOTES_MARK:string = '\\&\\d+';
  private QUOTES_REG:RegExp = new RegExp(/(\s*("|')[\s\S]*?\1\s*)/, 'gm');
  private QUOTES_MARK_REG:RegExp=new RegExp(`(${QuotesHandler.QUOTES_MARK})`, 'gm')

  collectUrl:Function = (content:string):string => content.replace(this.QUOTES_REG, (url) => {
    const mark = `&${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = url;
    return mark;
  });
  resetUrl:Function = (content:string):string => content.replace(this.QUOTES_MARK_REG, (mark) => this.record[mark]);
}
