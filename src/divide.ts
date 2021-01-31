const AT_REGEX = /@namespacing(\s*prefix\([^)]+\))?(\s*not\([^)]+\))?(\s*only\([^)]+\))?\s*/;

function getSegment(section:string):Segment {
  let not:Array<RegExp> = [];
  let only:Array<RegExp> = [];
  let namespace = '';
  const source:string = section.replace(AT_REGEX, (content, prefixStr, notStr, onlyStr) => {
    if (prefixStr) {
      namespace = eval(prefixStr.replace(/prefix\(([^)]*)\)/, '$1'));
    }
    if (notStr) {
      not = eval(notStr.replace(/not\(([^)]*)\)/, '$1'));
    }
    if (onlyStr) {
      only = eval(onlyStr.replace(/only\(([^)]*)\)/, '$1'));
    }
    return '';
  });
  return {
    source,
    option: {
      namespace, not, only,
    },
  };
}

function divide(content:string, option:Option):Array<Segment> {
  let sections:Array<string> = content.split(/@(?=namespacing)/);
  sections = sections.map((section, index) => {
    if (index !== 0) {
      return `@${section}`;
    }
    return section;
  });
  const segments:Array<Segment> = [];
  sections.forEach((section) => {
    const result:Segment = getSegment(section);
    result.option.namespace = result.option.namespace || option.namespace;
    result.option.not = result.option.not.concat(option.not);
    result.option.only = result.option.only.concat(option.only);
    segments.push(result);
  });
  return segments;
}

export default divide;
