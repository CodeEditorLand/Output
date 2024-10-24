var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as strings from "./strings.js";
function buildReplaceStringWithCasePreserved(matches, pattern) {
  if (matches && matches[0] !== "") {
    const containsHyphens = validateSpecificSpecialCharacter(matches, pattern, "-");
    const containsUnderscores = validateSpecificSpecialCharacter(matches, pattern, "_");
    if (containsHyphens && !containsUnderscores) {
      return buildReplaceStringForSpecificSpecialCharacter(matches, pattern, "-");
    } else if (!containsHyphens && containsUnderscores) {
      return buildReplaceStringForSpecificSpecialCharacter(matches, pattern, "_");
    }
    if (matches[0].toUpperCase() === matches[0]) {
      return pattern.toUpperCase();
    } else if (matches[0].toLowerCase() === matches[0]) {
      return pattern.toLowerCase();
    } else if (strings.containsUppercaseCharacter(matches[0][0]) && pattern.length > 0) {
      return pattern[0].toUpperCase() + pattern.substr(1);
    } else if (matches[0][0].toUpperCase() !== matches[0][0] && pattern.length > 0) {
      return pattern[0].toLowerCase() + pattern.substr(1);
    } else {
      return pattern;
    }
  } else {
    return pattern;
  }
}
__name(buildReplaceStringWithCasePreserved, "buildReplaceStringWithCasePreserved");
function validateSpecificSpecialCharacter(matches, pattern, specialCharacter) {
  const doesContainSpecialCharacter = matches[0].indexOf(specialCharacter) !== -1 && pattern.indexOf(specialCharacter) !== -1;
  return doesContainSpecialCharacter && matches[0].split(specialCharacter).length === pattern.split(specialCharacter).length;
}
__name(validateSpecificSpecialCharacter, "validateSpecificSpecialCharacter");
function buildReplaceStringForSpecificSpecialCharacter(matches, pattern, specialCharacter) {
  const splitPatternAtSpecialCharacter = pattern.split(specialCharacter);
  const splitMatchAtSpecialCharacter = matches[0].split(specialCharacter);
  let replaceString = "";
  splitPatternAtSpecialCharacter.forEach((splitValue, index) => {
    replaceString += buildReplaceStringWithCasePreserved([splitMatchAtSpecialCharacter[index]], splitValue) + specialCharacter;
  });
  return replaceString.slice(0, -1);
}
__name(buildReplaceStringForSpecificSpecialCharacter, "buildReplaceStringForSpecificSpecialCharacter");
export {
  buildReplaceStringWithCasePreserved
};
//# sourceMappingURL=search.js.map
