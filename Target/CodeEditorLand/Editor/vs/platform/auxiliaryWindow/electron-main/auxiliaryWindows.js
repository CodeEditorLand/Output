import {
  BrowserWindowConstructorOptions,
  HandlerDetails,
  WebContents
} from "electron";
import { Event } from "../../../base/common/event.js";
import { createDecorator } from "../../instantiation/common/instantiation.js";
import { IAuxiliaryWindow } from "./auxiliaryWindow.js";
const IAuxiliaryWindowsMainService = createDecorator(
  "auxiliaryWindowsMainService"
);
export {
  IAuxiliaryWindowsMainService
};
//# sourceMappingURL=auxiliaryWindows.js.map
