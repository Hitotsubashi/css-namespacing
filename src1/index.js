const divide = require('./divide');
const segmentProcess = require('./segment-process');
const validateOption = require('./validate');
const AnnotaionHandler = require('./handler/annotation-handler');
const { flow } = require('./utils');

function handleSegments(segments) {
  return segments.map((result) => segmentProcess(result.source, result.option));
}

const ns = function ns(source, option = {}) {
  validateOption(option);
  const annoHandler = new AnnotaionHandler();
  const transform = flow([
    annoHandler.collectAnno,
    (handledSource) => divide(handledSource, option),
    handleSegments,
    (segments) => segments.join(''),
    annoHandler.resetAnno,
  ]);
  return transform(source);
};

module.exports = ns;
