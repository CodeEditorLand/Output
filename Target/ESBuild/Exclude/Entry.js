var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import Exclude from "../Exclude.js";
var Entry_default = /* @__PURE__ */ __name((Current, From) => {
  let _Filtered = [];
  if (Current.entryPoints) {
    const Original = Current.entryPoints;
    if (Array.isArray(Original) && (Original.length === 0 || typeof Original[0] === "string")) {
      _Filtered = Original.filter((Entry) => !Exclude(Entry, From));
    } else if (Array.isArray(Original) && Original.length > 0 && typeof Original[0] === "object" && Original[0] !== null && "in" in Original[0]) {
      _Filtered = Original.filter((Entry) => !Exclude(Entry.in, From));
    } else if (!Array.isArray(Original) && typeof Original === "object" && Original !== null) {
      const Record = Original;
      const Filtered = {};
      for (const Key in Record) {
        if (Object.prototype.hasOwnProperty.call(Record, Key)) {
          const Input = Record[Key];
          if (Input !== void 0) {
            if (!Exclude(Input, From)) {
              Filtered[Key] = Input;
            }
          }
        }
      }
      _Filtered = Filtered;
    } else if (Array.isArray(Original) && Original.length === 0) {
      _Filtered = [];
    } else {
      _Filtered = Original;
    }
  } else {
    _Filtered = [];
  }
  return _Filtered;
}, "default");
export {
  Entry_default as default
};
//# sourceMappingURL=Entry.js.map
