const AT_REGEX = /@namespacing(\s*prefix\([^)]+\))?(\s*not\([^)]+\))?(\s*only\([^)]+\))?\s*/;

function getResult(section) {
  let not = [];
  let only = [];
  let namespace = '';
  const source = section.replace(AT_REGEX, (content, prefixStr, notStr, onlyStr) => {
    if (prefixStr) {
      namespace = eval(prefixStr.replace(/prefix\(([^\)]*)\)/, '$1'));
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

function divide(content, option) {
  let sections = content.split(/@(?=namespacing)/);
  sections = sections.map((section, index) => {
    if (index !== 0) {
      return `@${section}`;
    }
    return section;
  });
  const results = [];
  sections.forEach((section) => {
    const result = getResult(section);
    result.option.namespace = result.option.namespace || option.namespace;
    if (option.not) { result.option.not = result.option.not.concat(option.not); }
    if (option.only) { result.option.only = result.option.only.concat(option.only); }
    results.push(result);
  });
  return results;
}

module.exports = divide;
