import AnnotaionHandler from './handler/annotation-handler';
import AttributeselectorHandler from './handler/attributeseletor-handler';
import QuotesHandler from './handler/quotes-handler.js';
import nameHandler from './handler/name-handler';
import { flow } from './utils';

const PROPERTY_LINE_REG:string = '\\s*[a-z-\\s]+:[^;]+;\\s*';
const PROPERTY__LAST_LINE_REG:string = '\\s*[a-z-\\s]+:[^\\}]+';
const CLASS_NAME:string = '\\.[^@\\{;\\}]+';
const REG:RegExp = new RegExp(`(${CLASS_NAME})(\\{\\s*?((${AnnotaionHandler.ANNO_MARK})*${PROPERTY_LINE_REG}(${AnnotaionHandler.ANNO_MARK})*)*?(${PROPERTY__LAST_LINE_REG})?(${AnnotaionHandler.ANNO_MARK})*\\})`, 'gm');

const processName:Function = function processName(name:string, option:Option):string {
  return nameHandler.processName(name, option);
};

const processClass:Function = function processClass(source:string, option:Option):string {
  const result = source.replace(REG, (object, name, content) => {
    const modifiedName = processName(name, option);
    return modifiedName + content;
  });
  return result;
};

const segmentProcess:Function = function segmentProcess(source:string, option:object={}):string {
  const attrseleHandler = new AttributeselectorHandler();
  const quotesHandler = new QuotesHandler();
  // let result = attrseleHandler.collectAttr(source);
  // result = quotesHandler.collectUrl(result);
  // result = processClass(result, option);
  // result = quotesHandler.resetUrl(result);
  // result = attrseleHandler.resetAttr(result, option);
  const transform:Function = flow([
    attrseleHandler.collectAttr,
    quotesHandler.collectUrl,
    (data:string) => processClass(data, option),
    quotesHandler.resetUrl,
    (data:string) => attrseleHandler.resetAttr(data, option),
  ]);
  return transform(source);
};

export default segmentProcess;