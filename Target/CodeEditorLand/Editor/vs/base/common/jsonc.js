var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const regexp = /("[^"\\]*(?:\\.[^"\\]*)*")|('[^'\\]*(?:\\.[^'\\]*)*')|(\/\*[^\/\*]*(?:(?:\*|\/)[^\/\*]*)*?\*\/)|(\/{2,}.*?(?:(?:\r?\n)|$))|(,\s*[}\]])/g;
function stripComments(content) {
  return content.replace(regexp, function(match, _m1, _m2, m3, m4, m5) {
    if (m3) {
      return "";
    } else if (m4) {
      const length = m4.length;
      if (m4[length - 1] === "\n") {
        return m4[length - 2] === "\r" ? "\r\n" : "\n";
      } else {
        return "";
      }
    } else if (m5) {
      return match.substring(1);
    } else {
      return match;
    }
  });
}
__name(stripComments, "stripComments");
function parse(content) {
  const commentsStripped = stripComments(content);
  try {
    return JSON.parse(commentsStripped);
  } catch (error) {
    const trailingCommasStriped = commentsStripped.replace(/,\s*([}\]])/g, "$1");
    return JSON.parse(trailingCommasStriped);
  }
}
__name(parse, "parse");
export {
  parse,
  stripComments
};
//# sourceMappingURL=jsonc.js.map
