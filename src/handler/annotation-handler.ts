export default class AnnotationHandler{
  private recordIndex:number=0
  private record:HandlerRecord={}

  private ANNO_MULTI:string='\\/\\*(.|\\n)*?\\*\\/'
  private ANNO_REG:RegExp = new RegExp(`(\\s*${this.ANNO_MULTI}\\s*)`, 'gm');
  private ANNO_MARK_REG:RegExp = new RegExp(`(${AnnotationHandler.ANNO_MARK})`, 'gm');
  static ANNO_MARK:string = '\\$\\d+';
  
  collectAnno:Function = (content:string):string => content.replace(this.ANNO_REG, (anno) => {
    const mark:string = `$${this.recordIndex}`;
    this.recordIndex += 1;
    this.record[mark] = anno;
    return mark;
  });

  resetAnno:Function = (content:string):string => content.replace(this.ANNO_MARK_REG, (mark) => this.record[mark]);
}
