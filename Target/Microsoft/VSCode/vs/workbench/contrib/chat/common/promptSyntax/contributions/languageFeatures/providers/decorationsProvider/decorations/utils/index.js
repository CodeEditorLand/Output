var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { DecorationBase } from "./decorationBase.js";
import { ReactiveDecorationBase } from "./reactiveDecorationBase.js";
const asCssVariable = /* @__PURE__ */ __name((color) => {
  return `var(--vscode-${color.replaceAll(".", "-")})`;
}, "asCssVariable");
export {
  DecorationBase,
  ReactiveDecorationBase,
  asCssVariable
};
//# sourceMappingURL=index.js.map
