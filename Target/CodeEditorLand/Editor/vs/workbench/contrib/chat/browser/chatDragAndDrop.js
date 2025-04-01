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
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { UriList } from "../../../../base/common/dataTransfer.js";
import { IDisposable } from "../../../../base/common/lifecycle.js";
import { Mimes } from "../../../../base/common/mime.js";
import { basename } from "../../../../base/common/resources.js";
import { URI } from "../../../../base/common/uri.js";
import { IRange } from "../../../../editor/common/core/range.js";
import { SymbolKinds } from "../../../../editor/common/languages.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { localize } from "../../../../nls.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import {
  CodeDataTransfers,
  containsDragType,
  DocumentSymbolTransferData,
  extractEditorsDropData,
  extractMarkerDropData,
  extractSymbolDropData,
  IDraggedResourceEditorInput,
  MarkerTransferData
} from "../../../../platform/dnd/browser/dnd.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { MarkerSeverity } from "../../../../platform/markers/common/markers.js";
import {
  IThemeService,
  Themable
} from "../../../../platform/theme/common/themeService.js";
import { ISharedWebContentExtractorService } from "../../../../platform/webContentExtractor/common/webContentExtractor.js";
import { isUntitledResourceEditorInput } from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import {
  IExtensionService,
  isProposedApiEnabled
} from "../../../services/extensions/common/extensions.js";
import { UntitledTextEditorInput } from "../../../services/untitled/common/untitledTextEditorInput.js";
import {
  IChatRequestVariableEntry,
  IDiagnosticVariableEntry,
  IDiagnosticVariableEntryFilterData,
  ISymbolVariableEntry
} from "../common/chatModel.js";
import { IChatWidgetService } from "./chat.js";
import { ChatAttachmentModel } from "./chatAttachmentModel.js";
import { IChatInputStyles } from "./chatInputPart.js";
import { imageToHash } from "./chatPasteProviders.js";
import { resizeImage } from "./imageUtils.js";
var ChatDragAndDropType = /* @__PURE__ */ ((ChatDragAndDropType2) => {
  ChatDragAndDropType2[ChatDragAndDropType2["FILE_INTERNAL"] = 0] = "FILE_INTERNAL";
  ChatDragAndDropType2[ChatDragAndDropType2["FILE_EXTERNAL"] = 1] = "FILE_EXTERNAL";
  ChatDragAndDropType2[ChatDragAndDropType2["FOLDER"] = 2] = "FOLDER";
  ChatDragAndDropType2[ChatDragAndDropType2["IMAGE"] = 3] = "IMAGE";
  ChatDragAndDropType2[ChatDragAndDropType2["SYMBOL"] = 4] = "SYMBOL";
  ChatDragAndDropType2[ChatDragAndDropType2["HTML"] = 5] = "HTML";
  ChatDragAndDropType2[ChatDragAndDropType2["MARKER"] = 6] = "MARKER";
  return ChatDragAndDropType2;
})(ChatDragAndDropType || {});
let ChatDragAndDrop = class extends Themable {
  constructor(attachmentModel, styles, themeService, extensionService, fileService, editorService, dialogService, textModelService, webContentExtractorService, chatWidgetService, logService) {
    super(themeService);
    this.attachmentModel = attachmentModel;
    this.styles = styles;
    this.extensionService = extensionService;
    this.fileService = fileService;
    this.editorService = editorService;
    this.dialogService = dialogService;
    this.textModelService = textModelService;
    this.webContentExtractorService = webContentExtractorService;
    this.chatWidgetService = chatWidgetService;
    this.logService = logService;
    this.updateStyles();
  }
  static {
    __name(this, "ChatDragAndDrop");
  }
  overlays = /* @__PURE__ */ new Map();
  overlayText;
  overlayTextBackground = "";
  addOverlay(target, overlayContainer) {
    this.removeOverlay(target);
    const { overlay, disposable } = this.createOverlay(
      target,
      overlayContainer
    );
    this.overlays.set(target, { overlay, disposable });
  }
  removeOverlay(target) {
    if (this.currentActiveTarget === target) {
      this.currentActiveTarget = void 0;
    }
    const existingOverlay = this.overlays.get(target);
    if (existingOverlay) {
      existingOverlay.overlay.remove();
      existingOverlay.disposable.dispose();
      this.overlays.delete(target);
    }
  }
  currentActiveTarget = void 0;
  createOverlay(target, overlayContainer) {
    const overlay = document.createElement("div");
    overlay.classList.add("chat-dnd-overlay");
    this.updateOverlayStyles(overlay);
    overlayContainer.appendChild(overlay);
    const disposable = new DragAndDropObserver(target, {
      onDragOver: /* @__PURE__ */ __name((e) => {
        e.stopPropagation();
        e.preventDefault();
        if (target === this.currentActiveTarget) {
          return;
        }
        if (this.currentActiveTarget) {
          this.setOverlay(this.currentActiveTarget, void 0);
        }
        this.currentActiveTarget = target;
        this.onDragEnter(e, target);
      }, "onDragOver"),
      onDragLeave: /* @__PURE__ */ __name((e) => {
        if (target === this.currentActiveTarget) {
          this.currentActiveTarget = void 0;
        }
        this.onDragLeave(e, target);
      }, "onDragLeave"),
      onDrop: /* @__PURE__ */ __name((e) => {
        e.stopPropagation();
        e.preventDefault();
        if (target !== this.currentActiveTarget) {
          return;
        }
        this.currentActiveTarget = void 0;
        this.onDrop(e, target);
      }, "onDrop")
    });
    return { overlay, disposable };
  }
  onDragEnter(e, target) {
    const estimatedDropType = this.guessDropType(e);
    this.updateDropFeedback(e, target, estimatedDropType);
  }
  onDragLeave(e, target) {
    this.updateDropFeedback(e, target, void 0);
  }
  onDrop(e, target) {
    this.updateDropFeedback(e, target, void 0);
    this.drop(e);
  }
  async drop(e) {
    const contexts = await this.getAttachContext(e);
    if (contexts.length === 0) {
      return;
    }
    this.attachmentModel.addContext(...contexts);
  }
  updateDropFeedback(e, target, dropType) {
    const showOverlay = dropType !== void 0;
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = showOverlay ? "copy" : "none";
    }
    this.setOverlay(target, dropType);
  }
  guessDropType(e) {
    if (this.isImageDnd(e)) {
      return this.extensionService.extensions.some(
        (ext) => isProposedApiEnabled(ext, "chatReferenceBinaryData")
      ) ? 3 /* IMAGE */ : void 0;
    } else if (containsDragType(e, "text/html")) {
      return 5 /* HTML */;
    } else if (containsDragType(e, CodeDataTransfers.SYMBOLS)) {
      return 4 /* SYMBOL */;
    } else if (containsDragType(e, CodeDataTransfers.MARKERS)) {
      return 6 /* MARKER */;
    } else if (containsDragType(e, DataTransfers.FILES)) {
      return 1 /* FILE_EXTERNAL */;
    } else if (containsDragType(e, DataTransfers.INTERNAL_URI_LIST)) {
      return 0 /* FILE_INTERNAL */;
    } else if (containsDragType(
      e,
      Mimes.uriList,
      CodeDataTransfers.FILES,
      DataTransfers.RESOURCES
    )) {
      return 2 /* FOLDER */;
    }
    return void 0;
  }
  isDragEventSupported(e) {
    const dropType = this.guessDropType(e);
    return dropType !== void 0;
  }
  getDropTypeName(type) {
    switch (type) {
      case 0 /* FILE_INTERNAL */:
        return localize("file", "File");
      case 1 /* FILE_EXTERNAL */:
        return localize("file", "File");
      case 2 /* FOLDER */:
        return localize("folder", "Folder");
      case 3 /* IMAGE */:
        return localize("image", "Image");
      case 4 /* SYMBOL */:
        return localize("symbol", "Symbol");
      case 6 /* MARKER */:
        return localize("problem", "Problem");
      case 5 /* HTML */:
        return localize("url", "URL");
    }
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
  async getAttachContext(e) {
    if (!this.isDragEventSupported(e)) {
      return [];
    }
    const markerData = extractMarkerDropData(e);
    if (markerData) {
      return this.resolveMarkerAttachContext(markerData);
    }
    if (containsDragType(e, CodeDataTransfers.SYMBOLS)) {
      const data = extractSymbolDropData(e);
      return this.resolveSymbolsAttachContext(data);
    }
    const editorDragData = extractEditorsDropData(e);
    if (editorDragData.length === 0 && !containsDragType(e, DataTransfers.INTERNAL_URI_LIST) && containsDragType(e, Mimes.uriList) && (containsDragType(e, Mimes.html) || containsDragType(e, Mimes.text))) {
      return this.resolveHTMLAttachContext(e);
    }
    return coalesce(
      await Promise.all(
        editorDragData.map((editorInput) => {
          return this.resolveAttachContext(editorInput);
        })
      )
    );
  }
  async resolveAttachContext(editorInput) {
    const imageContext = await getImageAttachContext(
      editorInput,
      this.fileService,
      this.dialogService
    );
    if (imageContext) {
      return this.extensionService.extensions.some(
        (ext) => isProposedApiEnabled(ext, "chatReferenceBinaryData")
      ) ? imageContext : void 0;
    }
    return await this.getEditorAttachContext(editorInput);
  }
  async getEditorAttachContext(editor) {
    if (isUntitledResourceEditorInput(editor)) {
      return await this.resolveUntitledAttachContext(editor);
    }
    if (!editor.resource) {
      return void 0;
    }
    let stat;
    try {
      stat = await this.fileService.stat(editor.resource);
    } catch {
      return void 0;
    }
    if (!stat.isDirectory && !stat.isFile) {
      return void 0;
    }
    return await getResourceAttachContext(
      editor.resource,
      stat.isDirectory,
      this.textModelService
    );
  }
  async resolveUntitledAttachContext(editor) {
    if (editor.resource) {
      return await getResourceAttachContext(
        editor.resource,
        false,
        this.textModelService
      );
    }
    const openUntitledEditors = this.editorService.editors.filter(
      (editor2) => editor2 instanceof UntitledTextEditorInput
    );
    for (const canidate of openUntitledEditors) {
      const model = await canidate.resolve();
      const contents = model.textEditorModel?.getValue();
      if (contents === editor.contents) {
        return await getResourceAttachContext(
          canidate.resource,
          false,
          this.textModelService
        );
      }
    }
    return void 0;
  }
  resolveSymbolsAttachContext(symbols) {
    return symbols.map((symbol) => {
      const resource = URI.file(symbol.fsPath);
      return {
        kind: "symbol",
        id: symbolId(resource, symbol.range),
        value: { uri: resource, range: symbol.range },
        symbolKind: symbol.kind,
        fullName: `$(${SymbolKinds.toIcon(symbol.kind).id}) ${symbol.name}`,
        name: symbol.name
      };
    });
  }
  async downloadImageAsUint8Array(url) {
    try {
      const extractedImages = await this.webContentExtractorService.readImage(
        URI.parse(url),
        CancellationToken.None
      );
      if (extractedImages) {
        return extractedImages.buffer;
      }
    } catch (error) {
      this.logService.warn("Fetch failed:", error);
    }
    const selection = this.chatWidgetService.lastFocusedWidget?.inputEditor.getSelection();
    if (selection && this.chatWidgetService.lastFocusedWidget) {
      this.chatWidgetService.lastFocusedWidget.inputEditor.executeEdits(
        "chatInsertUrl",
        [{ range: selection, text: url }]
      );
    }
    this.logService.warn(
      `Image URLs must end in .jpg, .png, .gif, .webp, or .bmp. Failed to fetch image from this URL: ${url}`
    );
    return void 0;
  }
  async resolveHTMLAttachContext(e) {
    const displayName = localize(
      "dragAndDroppedImageName",
      "Image from URL"
    );
    let finalDisplayName = displayName;
    for (let appendValue = 2; this.attachmentModel.attachments.some(
      (attachment) => attachment.name === finalDisplayName
    ); appendValue++) {
      finalDisplayName = `${displayName} ${appendValue}`;
    }
    const dataFromFile = await this.extractImageFromFile(e);
    if (dataFromFile) {
      return [
        await this.createImageVariable(
          await resizeImage(dataFromFile),
          finalDisplayName
        )
      ];
    }
    const dataFromUrl = await this.extractImageFromUrl(e);
    const variableEntries = [];
    if (dataFromUrl) {
      for (const url of dataFromUrl) {
        if (/^data:image\/[a-z]+;base64,/.test(url)) {
          variableEntries.push(
            await this.createImageVariable(
              await resizeImage(url),
              finalDisplayName,
              URI.parse(url)
            )
          );
        } else if (/^https?:\/\/.+/.test(url)) {
          const imageData = await this.downloadImageAsUint8Array(url);
          if (imageData) {
            variableEntries.push(
              await this.createImageVariable(
                await resizeImage(imageData),
                finalDisplayName,
                URI.parse(url),
                url
              )
            );
          }
        }
      }
    }
    return variableEntries;
  }
  async createImageVariable(data, name, uri, id) {
    return {
      id: id || await imageToHash(data),
      name,
      value: data,
      isImage: true,
      isFile: false,
      isDirectory: false,
      references: uri ? [{ reference: uri, kind: "reference" }] : []
    };
  }
  resolveMarkerAttachContext(markers) {
    return markers.map((marker) => {
      let filter;
      if (!("severity" in marker)) {
        filter = {
          filterUri: URI.revive(marker.uri),
          filterSeverity: MarkerSeverity.Warning
        };
      } else {
        filter = IDiagnosticVariableEntryFilterData.fromMarker(marker);
      }
      return IDiagnosticVariableEntryFilterData.toEntry(filter);
    });
  }
  setOverlay(target, type) {
    this.overlayText?.remove();
    this.overlayText = void 0;
    const { overlay } = this.overlays.get(target);
    if (type !== void 0) {
      const iconAndtextElements = renderLabelWithIcons(
        `$(${Codicon.attach.id}) ${this.getOverlayText(type)}`
      );
      const htmlElements = iconAndtextElements.map((element) => {
        if (typeof element === "string") {
          return $("span.overlay-text", void 0, element);
        }
        return element;
      });
      this.overlayText = $(
        "span.attach-context-overlay-text",
        void 0,
        ...htmlElements
      );
      this.overlayText.style.backgroundColor = this.overlayTextBackground;
      overlay.appendChild(this.overlayText);
    }
    overlay.classList.toggle("visible", type !== void 0);
  }
  getOverlayText(type) {
    const typeName = this.getDropTypeName(type);
    return localize("attacAsContext", "Attach {0} as Context", typeName);
  }
  updateOverlayStyles(overlay) {
    overlay.style.backgroundColor = this.getColor(this.styles.overlayBackground) || "";
    overlay.style.color = this.getColor(this.styles.listForeground) || "";
  }
  updateStyles() {
    this.overlays.forEach(
      (overlay) => this.updateOverlayStyles(overlay.overlay)
    );
    this.overlayTextBackground = this.getColor(this.styles.listBackground) || "";
  }
  async extractImageFromFile(e) {
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        try {
          const buffer = await file.arrayBuffer();
          return new Uint8Array(buffer);
        } catch (error) {
          this.logService.error("Error reading file:", error);
          return void 0;
        }
      }
    }
    return void 0;
  }
  async extractImageFromUrl(e) {
    const textUrl = e.dataTransfer?.getData("text/uri-list");
    if (textUrl) {
      try {
        const uris = UriList.parse(textUrl);
        if (uris.length > 0) {
          return uris;
        }
      } catch (error) {
        this.logService.error("Error parsing URI list:", error);
        return void 0;
      }
    }
    return void 0;
  }
};
ChatDragAndDrop = __decorateClass([
  __decorateParam(2, IThemeService),
  __decorateParam(3, IExtensionService),
  __decorateParam(4, IFileService),
  __decorateParam(5, IEditorService),
  __decorateParam(6, IDialogService),
  __decorateParam(7, ITextModelService),
  __decorateParam(8, ISharedWebContentExtractorService),
  __decorateParam(9, IChatWidgetService),
  __decorateParam(10, ILogService)
], ChatDragAndDrop);
async function getResourceAttachContext(resource, isDirectory, textModelService) {
  let isOmitted = false;
  if (!isDirectory) {
    try {
      const createdModel = await textModelService.createModelReference(resource);
      createdModel.dispose();
    } catch {
      isOmitted = true;
    }
    if (/\.(svg)$/i.test(resource.path)) {
      isOmitted = true;
    }
  }
  return {
    value: resource,
    id: resource.toString(),
    name: basename(resource),
    isFile: !isDirectory,
    isDirectory,
    isOmitted
  };
}
__name(getResourceAttachContext, "getResourceAttachContext");
async function getImageAttachContext(editor, fileService, dialogService) {
  if (!editor.resource) {
    return void 0;
  }
  if (/\.(png|jpg|jpeg|gif|webp)$/i.test(editor.resource.path)) {
    const fileName = basename(editor.resource);
    const readFile = await fileService.readFile(editor.resource);
    if (readFile.size > 30 * 1024 * 1024) {
      dialogService.error(
        localize("imageTooLarge", "Image is too large"),
        localize(
          "imageTooLargeMessage",
          "The image {0} is too large to be attached.",
          fileName
        )
      );
      throw new Error("Image is too large");
    }
    const resizedImage = await resizeImage(readFile.value.buffer);
    return {
      id: editor.resource.toString(),
      name: fileName,
      fullName: editor.resource.path,
      value: resizedImage,
      icon: Codicon.fileMedia,
      isImage: true,
      isFile: false,
      references: [{ reference: editor.resource, kind: "reference" }]
    };
  }
  return void 0;
}
__name(getImageAttachContext, "getImageAttachContext");
function symbolId(resource, range) {
  let rangePart = "";
  if (range) {
    rangePart = `:${range.startLineNumber}`;
    if (range.startLineNumber !== range.endLineNumber) {
      rangePart += `-${range.endLineNumber}`;
    }
  }
  return resource.fsPath + rangePart;
}
__name(symbolId, "symbolId");
export {
  ChatDragAndDrop
};
//# sourceMappingURL=chatDragAndDrop.js.map
