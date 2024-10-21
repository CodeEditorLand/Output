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
import { DataTransfers } from "../../../../base/browser/dnd.js";
import { $, DragAndDropObserver } from "../../../../base/browser/dom.js";
import { renderLabelWithIcons } from "../../../../base/browser/ui/iconLabel/iconLabels.js";
import { coalesce } from "../../../../base/common/arrays.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { basename } from "../../../../base/common/resources.js";
import { URI } from "../../../../base/common/uri.js";
import { localize } from "../../../../nls.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { containsDragType, extractEditorsDropData, IDraggedResourceEditorInput } from "../../../../platform/dnd/browser/dnd.js";
import { IThemeService, Themable } from "../../../../platform/theme/common/themeService.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IChatRequestVariableEntry } from "../common/chatModel.js";
import { ChatInputPart } from "./chatInputPart.js";
import { IChatWidgetStyles } from "./chatWidget.js";
var ChatDragAndDropType = /* @__PURE__ */ ((ChatDragAndDropType2) => {
  ChatDragAndDropType2[ChatDragAndDropType2["FILE"] = 0] = "FILE";
  ChatDragAndDropType2[ChatDragAndDropType2["IMAGE"] = 1] = "IMAGE";
  return ChatDragAndDropType2;
})(ChatDragAndDropType || {});
let ChatDragAndDrop = class extends Themable {
  constructor(contianer, inputPart, styles, themeService, configurationService) {
    super(themeService);
    this.contianer = contianer;
    this.inputPart = inputPart;
    this.styles = styles;
    this.configurationService = configurationService;
    let mouseInside = false;
    this._register(new DragAndDropObserver(this.contianer, {
      onDragEnter: /* @__PURE__ */ __name((e) => {
        if (!mouseInside) {
          mouseInside = true;
          this.onDragEnter(e);
        }
      }, "onDragEnter"),
      onDragOver: /* @__PURE__ */ __name((e) => {
        e.stopPropagation();
      }, "onDragOver"),
      onDragLeave: /* @__PURE__ */ __name((e) => {
        this.onDragLeave(e);
        mouseInside = false;
      }, "onDragLeave"),
      onDrop: /* @__PURE__ */ __name((e) => {
        this.onDrop(e);
        mouseInside = false;
      }, "onDrop")
    }));
    this.overlay = document.createElement("div");
    this.overlay.classList.add("chat-dnd-overlay");
    this.contianer.appendChild(this.overlay);
    this.updateStyles();
  }
  static {
    __name(this, "ChatDragAndDrop");
  }
  overlay;
  overlayText;
  overlayTextBackground = "";
  onDragEnter(e) {
    const estimatedDropType = this.guessDropType(e);
    if (estimatedDropType !== void 0) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.updateDropFeedback(e, estimatedDropType);
  }
  onDragLeave(e) {
    this.updateDropFeedback(e, void 0);
  }
  onDrop(e) {
    this.updateDropFeedback(e, void 0);
    const contexts = this.getAttachContext(e);
    if (contexts.length === 0) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const currentContextIds = this.inputPart.attachmentModel.getAttachmentIDs();
    const filteredContext = [];
    for (const context of contexts) {
      if (!currentContextIds.has(context.id)) {
        currentContextIds.add(context.id);
        filteredContext.push(context);
      }
    }
    this.inputPart.attachmentModel.addContext(...filteredContext);
  }
  updateDropFeedback(e, dropType) {
    const showOverlay = dropType !== void 0;
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = showOverlay ? "copy" : "none";
    }
    this.setOverlay(dropType);
  }
  isImageDnd(e) {
    if (containsDragType(e, "image")) {
      return true;
    }
    if (containsDragType(e, DataTransfers.FILES)) {
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        const file = files[0];
        return file.type.startsWith("image/");
      }
      const items = e.dataTransfer?.items;
      if (items && items.length > 0) {
        const item = items[0];
        return item.type.startsWith("image/");
      }
    }
    return false;
  }
  guessDropType(e) {
    if (this.isImageDnd(e)) {
      const imageDndSupported = this.configurationService.getValue("chat.experimental.imageAttachments");
      return imageDndSupported ? 1 /* IMAGE */ : void 0;
    } else if (containsDragType(e, DataTransfers.FILES, DataTransfers.INTERNAL_URI_LIST)) {
      return 0 /* FILE */;
    }
    return void 0;
  }
  isDragEventSupported(e) {
    const dropType = this.guessDropType(e);
    return dropType !== void 0;
  }
  getDropTypeName(type) {
    switch (type) {
      case 0 /* FILE */:
        return localize("file", "File");
      case 1 /* IMAGE */:
        return localize("image", "Image");
    }
  }
  getAttachContext(e) {
    if (!this.isDragEventSupported(e)) {
      return [];
    }
    const data = extractEditorsDropData(e);
    return coalesce(data.map((editorInput) => {
      return this.resolveAttachContext(editorInput);
    }));
  }
  resolveAttachContext(editorInput) {
    const imageContext = getImageAttachContext(editorInput);
    if (imageContext) {
      const isImageDndSupported = this.configurationService.getValue("chat.experimental.imageAttachments");
      return isImageDndSupported ? imageContext : void 0;
    }
    return getEditorAttachContext(editorInput);
  }
  setOverlay(type) {
    this.overlayText?.remove();
    this.overlayText = void 0;
    if (type !== void 0) {
      const typeName = this.getDropTypeName(type);
      const iconAndtextElements = renderLabelWithIcons(`$(${Codicon.attach.id}) ${localize("attach as context", "Attach {0} as Context", typeName)}`);
      const htmlElements = iconAndtextElements.map((element) => {
        if (typeof element === "string") {
          return $("span.overlay-text", void 0, element);
        }
        return element;
      });
      this.overlayText = $("span.attach-context-overlay-text", void 0, ...htmlElements);
      this.overlayText.style.backgroundColor = this.overlayTextBackground;
      this.overlay.appendChild(this.overlayText);
    }
    this.overlay.classList.toggle("visible", type !== void 0);
  }
  updateStyles() {
    this.overlay.style.backgroundColor = this.getColor(this.styles.overlayBackground) || "";
    this.overlay.style.color = this.getColor(this.styles.listForeground) || "";
    this.overlayTextBackground = this.getColor(this.styles.listBackground) || "";
  }
};
ChatDragAndDrop = __decorateClass([
  __decorateParam(3, IThemeService),
  __decorateParam(4, IConfigurationService)
], ChatDragAndDrop);
function getEditorAttachContext(editor) {
  if (!editor.resource) {
    return void 0;
  }
  return getFileAttachContext(editor.resource);
}
__name(getEditorAttachContext, "getEditorAttachContext");
function getFileAttachContext(resource) {
  return {
    value: resource,
    id: resource.toString(),
    name: basename(resource),
    isFile: true,
    isDynamic: true
  };
}
__name(getFileAttachContext, "getFileAttachContext");
function getImageAttachContext(editor) {
  if (!editor.resource) {
    return void 0;
  }
  if (/\.(png|jpg|jpeg|bmp|gif|tiff)$/i.test(editor.resource.path)) {
    const fileName = basename(editor.resource);
    return {
      id: editor.resource.toString(),
      name: fileName,
      fullName: editor.resource.path,
      value: editor.resource,
      icon: Codicon.fileMedia,
      isDynamic: true,
      isImage: true,
      isFile: false
    };
  }
  return void 0;
}
__name(getImageAttachContext, "getImageAttachContext");
export {
  ChatDragAndDrop
};
//# sourceMappingURL=chatDragAndDrop.js.map
