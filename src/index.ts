import divide from './divide';
import segmentProcess from './segment-process';
import validateOption from './validate';
import AnnotaionHandler from './handler/annotation-handler';
import { flow } from './utils';

const DEFAULT_OPTION:Option = {
  namespace: 'cst-',
  not: [],
  only: [],
};

function setOption(option:Record<string,unknown>):Option {
  const handledOption = {  };
  Object.entries(DEFAULT_OPTION).forEach(([key, value]) => {
    /* eslint-disable-next-line */
    handledOption[key] = option[key] || value;
  });
  return <Option>handledOption;
}

function handleSegments(segments:Array<Segment>):Array<Segment> {
  return segments.map((segment) => segmentProcess(segment.source, segment.option));
}

const ns = function ns(source:string, inputOption:Record<string,unknown>):string {
  validateOption(inputOption);
  const option:Option = setOption(inputOption);
  const annoHandler = new AnnotaionHandler();
  const transform:(source:string)=>string = flow([
    annoHandler.collectAnno,
    (handledSource:string) => divide(handledSource, option),
    handleSegments,
    (segments:Array<string>) => segments.join(''),
    annoHandler.resetAnno,
  ]);
  return transform(source);
};

module.exports = ns;
