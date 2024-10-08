var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { FileAccess } from "../common/network.js";
import { URI } from "../common/uri.js";
function asCssValueWithDefault(cssPropertyValue, dflt) {
  if (cssPropertyValue !== void 0) {
    const variableMatch = cssPropertyValue.match(/^\s*var\((.+)\)$/);
    if (variableMatch) {
      const varArguments = variableMatch[1].split(",", 2);
      if (varArguments.length === 2) {
        dflt = asCssValueWithDefault(varArguments[1].trim(), dflt);
      }
      return `var(${varArguments[0]}, ${dflt})`;
    }
    return cssPropertyValue;
  }
  return dflt;
}
__name(asCssValueWithDefault, "asCssValueWithDefault");
function asCSSPropertyValue(value) {
  return `'${value.replace(/'/g, "%27")}'`;
}
__name(asCSSPropertyValue, "asCSSPropertyValue");
function asCSSUrl(uri) {
  if (!uri) {
    return `url('')`;
  }
  return `url('${FileAccess.uriToBrowserUri(uri).toString(true).replace(/'/g, "%27")}')`;
}
__name(asCSSUrl, "asCSSUrl");
export {
  asCSSPropertyValue,
  asCSSUrl,
  asCssValueWithDefault
};
//# sourceMappingURL=cssValue.js.map
