var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { IRange } from "../../core/range.js";
import { IInplaceReplaceSupportResult } from "../../languages.js";
class BasicInplaceReplace {
  static {
    __name(this, "BasicInplaceReplace");
  }
  static INSTANCE = new BasicInplaceReplace();
  navigateValueSet(range1, text1, range2, text2, up) {
    if (range1 && text1) {
      const result = this.doNavigateValueSet(text1, up);
      if (result) {
        return {
          range: range1,
          value: result
        };
      }
    }
    if (range2 && text2) {
      const result = this.doNavigateValueSet(text2, up);
      if (result) {
        return {
          range: range2,
          value: result
        };
      }
    }
    return null;
  }
  doNavigateValueSet(text, up) {
    const numberResult = this.numberReplace(text, up);
    if (numberResult !== null) {
      return numberResult;
    }
    return this.textReplace(text, up);
  }
  numberReplace(value, up) {
    const precision = Math.pow(10, value.length - (value.lastIndexOf(".") + 1));
    let n1 = Number(value);
    const n2 = parseFloat(value);
    if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
      if (n1 === 0 && !up) {
        return null;
      } else {
        n1 = Math.floor(n1 * precision);
        n1 += up ? precision : -precision;
        return String(n1 / precision);
      }
    }
    return null;
  }
  _defaultValueSet = [
    ["true", "false"],
    ["True", "False"],
    ["Private", "Public", "Friend", "ReadOnly", "Partial", "Protected", "WriteOnly"],
    ["public", "protected", "private"]
  ];
  textReplace(value, up) {
    return this.valueSetsReplace(this._defaultValueSet, value, up);
  }
  valueSetsReplace(valueSets, value, up) {
    let result = null;
    for (let i = 0, len = valueSets.length; result === null && i < len; i++) {
      result = this.valueSetReplace(valueSets[i], value, up);
    }
    return result;
  }
  valueSetReplace(valueSet, value, up) {
    let idx = valueSet.indexOf(value);
    if (idx >= 0) {
      idx += up ? 1 : -1;
      if (idx < 0) {
        idx = valueSet.length - 1;
      } else {
        idx %= valueSet.length;
      }
      return valueSet[idx];
    }
    return null;
  }
}
export {
  BasicInplaceReplace
};
//# sourceMappingURL=inplaceReplaceSupport.js.map
