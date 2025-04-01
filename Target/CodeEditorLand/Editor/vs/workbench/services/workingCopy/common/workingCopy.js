import {
  VSBufferReadable,
  VSBufferReadableStream
} from "../../../../base/common/buffer.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Event } from "../../../../base/common/event.js";
import { URI } from "../../../../base/common/uri.js";
import {
  IRevertOptions,
  ISaveOptions,
  SaveReason,
  SaveSource
} from "../../../common/editor.js";
var WorkingCopyCapabilities = /* @__PURE__ */ ((WorkingCopyCapabilities2) => {
  WorkingCopyCapabilities2[WorkingCopyCapabilities2["None"] = 0] = "None";
  WorkingCopyCapabilities2[WorkingCopyCapabilities2["Untitled"] = 2] = "Untitled";
  WorkingCopyCapabilities2[WorkingCopyCapabilities2["Scratchpad"] = 4] = "Scratchpad";
  return WorkingCopyCapabilities2;
})(WorkingCopyCapabilities || {});
const NO_TYPE_ID = "";
export {
  NO_TYPE_ID,
  WorkingCopyCapabilities
};
//# sourceMappingURL=workingCopy.js.map
