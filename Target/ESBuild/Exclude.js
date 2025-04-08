var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { posix, sep } from "../ESBuild.js";
var Exclude_default = /* @__PURE__ */ __name((Path, From) => From.some(
  (Pattern) => ((Path2) => Path2.split(sep).join(posix.sep))(Path).includes(Pattern)
), "default");
export {
  Exclude_default as default
};
//# sourceMappingURL=Exclude.js.map
