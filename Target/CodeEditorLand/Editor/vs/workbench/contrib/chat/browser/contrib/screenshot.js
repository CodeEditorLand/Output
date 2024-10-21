var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { localize } from "../../../../../nls.js";
import { IChatRequestVariableEntry } from "../../common/chatModel.js";
const ScreenshotVariableId = "screenshot-focused-window";
function convertBufferToScreenshotVariable(buffer) {
  return {
    id: ScreenshotVariableId,
    name: localize("screenshot", "Screenshot"),
    value: new Uint8Array(buffer),
    isImage: true,
    isDynamic: true
  };
}
__name(convertBufferToScreenshotVariable, "convertBufferToScreenshotVariable");
export {
  ScreenshotVariableId,
  convertBufferToScreenshotVariable
};
//# sourceMappingURL=screenshot.js.map
