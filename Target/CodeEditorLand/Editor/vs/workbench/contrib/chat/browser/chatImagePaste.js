var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import { Codicon } from "../../../../base/common/codicons.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IClipboardService } from "../../../../platform/clipboard/common/clipboardService.js";
import { IChatRequestVariableEntry } from "../common/chatModel.js";
import { ChatInputPart } from "./chatInputPart.js";
import { localize } from "../../../../nls.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
let ChatImageDropAndPaste = class extends Disposable {
  constructor(inputPart, clipboardService, configurationService) {
    super();
    this.inputPart = inputPart;
    this.clipboardService = clipboardService;
    this.configurationService = configurationService;
    this._register(this.inputPart.inputEditor.onDidPaste((e) => {
      if (this.configurationService.getValue("chat.experimental.imageAttachments")) {
        this._handlePaste();
      }
    }));
  }
  static {
    __name(this, "ChatImageDropAndPaste");
  }
  async _handlePaste() {
    const currClipboard = await this.clipboardService.readImage();
    if (!currClipboard || !isImage(currClipboard)) {
      return;
    }
    const context = await getImageAttachContext(currClipboard);
    if (!context) {
      return;
    }
    const currentContextIds = this.inputPart.attachmentModel.getAttachmentIDs();
    const filteredContext = [];
    if (!currentContextIds.has(context.id)) {
      currentContextIds.add(context.id);
      filteredContext.push(context);
    }
    this.inputPart.attachmentModel.addContext(...filteredContext);
  }
};
ChatImageDropAndPaste = __decorateClass([
  __decorateParam(1, IClipboardService),
  __decorateParam(2, IConfigurationService)
], ChatImageDropAndPaste);
async function getImageAttachContext(data) {
  return {
    value: data,
    id: await imageToHash(data),
    name: localize("pastedImage", "Pasted Image"),
    isImage: true,
    icon: Codicon.fileMedia,
    isDynamic: true
  };
}
__name(getImageAttachContext, "getImageAttachContext");
async function imageToHash(data) {
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(imageToHash, "imageToHash");
function isImage(array) {
  if (array.length < 4) {
    return false;
  }
  const identifier = {
    png: [137, 80, 78, 71, 13, 10, 26, 10],
    jpeg: [255, 216, 255],
    bmp: [66, 77],
    gif: [71, 73, 70, 56],
    tiff: [73, 73, 42, 0]
  };
  return Object.values(identifier).some(
    (signature) => signature.every((byte, index) => array[index] === byte)
  );
}
__name(isImage, "isImage");
export {
  ChatImageDropAndPaste,
  imageToHash,
  isImage
};
//# sourceMappingURL=chatImagePaste.js.map
