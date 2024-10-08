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
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { IDataTransferItem, IReadonlyVSDataTransfer } from "../../../../base/common/dataTransfer.js";
import { HierarchicalKind } from "../../../../base/common/hierarchicalKind.js";
import { IRange } from "../../../../editor/common/core/range.js";
import { DocumentPasteContext, DocumentPasteEditProvider, DocumentPasteEditsSession } from "../../../../editor/common/languages.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { ILanguageFeaturesService } from "../../../../editor/common/services/languageFeatures.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ChatInputPart } from "./chatInputPart.js";
import { IChatWidgetService } from "./chat.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { localize } from "../../../../nls.js";
import { IChatRequestVariableEntry } from "../common/chatModel.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
class PasteImageProvider {
  constructor(chatWidgetService, configurationService) {
    this.chatWidgetService = chatWidgetService;
    this.configurationService = configurationService;
  }
  static {
    __name(this, "PasteImageProvider");
  }
  kind = new HierarchicalKind("image");
  pasteMimeTypes = ["image/*"];
  async provideDocumentPasteEdits(_model, _ranges, dataTransfer, context, token) {
    if (!this.configurationService.getValue("chat.experimental.imageAttachments")) {
      return;
    }
    const supportedMimeTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/bmp",
      "image/gif",
      "image/tiff"
    ];
    let mimeType;
    let imageItem;
    for (const type of supportedMimeTypes) {
      imageItem = dataTransfer.get(type);
      if (imageItem) {
        mimeType = type;
        break;
      }
    }
    if (!imageItem || !mimeType) {
      return;
    }
    const currClipboard = await imageItem.asFile()?.data();
    if (token.isCancellationRequested || !currClipboard) {
      return;
    }
    const widget = this.chatWidgetService.getWidgetByInputUri(_model.uri);
    if (!widget) {
      return;
    }
    const attachedVariables = widget.attachmentModel.attachments;
    const displayName = localize("pastedImageName", "Pasted Image");
    let tempDisplayName = displayName;
    for (let appendValue = 2; attachedVariables.some((attachment) => attachment.name === tempDisplayName); appendValue++) {
      tempDisplayName = `${displayName} ${appendValue}`;
    }
    const imageContext = await getImageAttachContext(currClipboard, mimeType, token, tempDisplayName);
    if (token.isCancellationRequested || !imageContext) {
      return;
    }
    const currentContextIds = widget.attachmentModel.getAttachmentIDs();
    if (currentContextIds.has(imageContext.id)) {
      return;
    }
    widget.attachmentModel.addContext(imageContext);
    return;
  }
}
async function getImageAttachContext(data, mimeType, token, displayName) {
  const imageHash = await imageToHash(data);
  if (token.isCancellationRequested) {
    return void 0;
  }
  return {
    value: data,
    id: imageHash,
    name: displayName,
    isImage: true,
    icon: Codicon.fileMedia,
    isDynamic: true,
    isFile: false,
    mimeType
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
let ChatPasteProvidersFeature = class extends Disposable {
  static {
    __name(this, "ChatPasteProvidersFeature");
  }
  constructor(languageFeaturesService, chatWidgetService, configurationService) {
    super();
    this._register(languageFeaturesService.documentPasteEditProvider.register({ scheme: ChatInputPart.INPUT_SCHEME, pattern: "*", hasAccessToAllModels: true }, new PasteImageProvider(chatWidgetService, configurationService)));
  }
};
ChatPasteProvidersFeature = __decorateClass([
  __decorateParam(0, ILanguageFeaturesService),
  __decorateParam(1, IChatWidgetService),
  __decorateParam(2, IConfigurationService)
], ChatPasteProvidersFeature);
export {
  ChatPasteProvidersFeature,
  PasteImageProvider,
  imageToHash,
  isImage
};
//# sourceMappingURL=chatPasteProviders.js.map
