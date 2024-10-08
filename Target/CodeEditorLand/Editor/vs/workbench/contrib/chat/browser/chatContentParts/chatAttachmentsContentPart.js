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
import * as dom from "../../../../../base/browser/dom.js";
import { Disposable, DisposableStore } from "../../../../../base/common/lifecycle.js";
import { IChatRequestVariableEntry } from "../../common/chatModel.js";
import { Emitter } from "../../../../../base/common/event.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { ResourceLabels } from "../../../../browser/labels.js";
import { URI } from "../../../../../base/common/uri.js";
import { FileKind, IFileService } from "../../../../../platform/files/common/files.js";
import { Range } from "../../../../../editor/common/core/range.js";
import { basename, dirname } from "../../../../../base/common/path.js";
import { localize } from "../../../../../nls.js";
import { ChatResponseReferencePartStatusKind, IChatContentReference } from "../../common/chatService.js";
import { IOpenerService } from "../../../../../platform/opener/common/opener.js";
import { IHoverService } from "../../../../../platform/hover/browser/hover.js";
import { createInstantHoverDelegate } from "../../../../../base/browser/ui/hover/hoverDelegateFactory.js";
let ChatAttachmentsContentPart = class extends Disposable {
  constructor(variables, contentReferences = [], domNode = dom.$(".chat-attached-context"), instantiationService, openerService, hoverService, fileService) {
    super();
    this.variables = variables;
    this.contentReferences = contentReferences;
    this.domNode = domNode;
    this.instantiationService = instantiationService;
    this.openerService = openerService;
    this.hoverService = hoverService;
    this.fileService = fileService;
    this.initAttachedContext(domNode);
  }
  static {
    __name(this, "ChatAttachmentsContentPart");
  }
  attachedContextDisposables = this._register(new DisposableStore());
  _onDidChangeVisibility = this._register(new Emitter());
  _contextResourceLabels = this.instantiationService.createInstance(ResourceLabels, { onDidChangeVisibility: this._onDidChangeVisibility.event });
  initAttachedContext(container) {
    dom.clearNode(container);
    this.attachedContextDisposables.clear();
    dom.setVisibility(Boolean(this.variables.length), this.domNode);
    const hoverDelegate = this.attachedContextDisposables.add(createInstantHoverDelegate());
    this.variables.forEach(async (attachment) => {
      const widget = dom.append(container, dom.$(".chat-attached-context-attachment.show-file-icons"));
      const label = this._contextResourceLabels.create(widget, { supportIcons: true, hoverDelegate, hoverTargetOverrride: widget });
      const file = URI.isUri(attachment.value) ? attachment.value : attachment.value && typeof attachment.value === "object" && "uri" in attachment.value && URI.isUri(attachment.value.uri) ? attachment.value.uri : void 0;
      const range = attachment.value && typeof attachment.value === "object" && "range" in attachment.value && Range.isIRange(attachment.value.range) ? attachment.value.range : void 0;
      const correspondingContentReference = this.contentReferences.find((ref) => typeof ref.reference === "object" && "variableName" in ref.reference && ref.reference.variableName === attachment.name);
      const isAttachmentOmitted = correspondingContentReference?.options?.status?.kind === ChatResponseReferencePartStatusKind.Omitted;
      const isAttachmentPartialOrOmitted = isAttachmentOmitted || correspondingContentReference?.options?.status?.kind === ChatResponseReferencePartStatusKind.Partial;
      let ariaLabel;
      if (file && attachment.isFile) {
        const fileBasename = basename(file.path);
        const fileDirname = dirname(file.path);
        const friendlyName = `${fileBasename} ${fileDirname}`;
        if (isAttachmentOmitted) {
          ariaLabel = range ? localize("chat.omittedFileAttachmentWithRange", "Omitted: {0}, line {1} to line {2}.", friendlyName, range.startLineNumber, range.endLineNumber) : localize("chat.omittedFileAttachment", "Omitted: {0}.", friendlyName);
        } else if (isAttachmentPartialOrOmitted) {
          ariaLabel = range ? localize("chat.partialFileAttachmentWithRange", "Partially attached: {0}, line {1} to line {2}.", friendlyName, range.startLineNumber, range.endLineNumber) : localize("chat.partialFileAttachment", "Partially attached: {0}.", friendlyName);
        } else {
          ariaLabel = range ? localize("chat.fileAttachmentWithRange3", "Attached: {0}, line {1} to line {2}.", friendlyName, range.startLineNumber, range.endLineNumber) : localize("chat.fileAttachment3", "Attached: {0}.", friendlyName);
        }
        label.setFile(file, {
          fileKind: FileKind.FILE,
          hidePath: true,
          range,
          title: correspondingContentReference?.options?.status?.description
        });
      } else if (attachment.isImage) {
        ariaLabel = localize("chat.imageAttachment", "Attached image, {0}", attachment.name);
        const hoverElement = dom.$("div.chat-attached-context-hover");
        hoverElement.setAttribute("aria-label", ariaLabel);
        const pillIcon = dom.$("div.chat-attached-context-pill", {}, dom.$("span.codicon.codicon-file-media"));
        const textLabel = dom.$("span.chat-attached-context-custom-text", {}, attachment.name);
        widget.appendChild(pillIcon);
        widget.appendChild(textLabel);
        let buffer;
        try {
          if (attachment.value instanceof URI) {
            const readFile = await this.fileService.readFile(attachment.value);
            buffer = readFile.value.buffer;
          } else {
            buffer = attachment.value;
          }
          await this.createImageElements(buffer, widget, hoverElement);
        } catch (error) {
          console.error("Error processing attachment:", error);
        }
        widget.style.position = "relative";
        if (!this.attachedContextDisposables.isDisposed) {
          this.attachedContextDisposables.add(this.hoverService.setupManagedHover(hoverDelegate, widget, hoverElement));
        }
      } else {
        const attachmentLabel = attachment.fullName ?? attachment.name;
        const withIcon = attachment.icon?.id ? `$(${attachment.icon.id}) ${attachmentLabel}` : attachmentLabel;
        label.setLabel(withIcon, correspondingContentReference?.options?.status?.description);
        ariaLabel = localize("chat.attachment3", "Attached context: {0}.", attachment.name);
      }
      if (isAttachmentPartialOrOmitted) {
        widget.classList.add("warning");
      }
      const description = correspondingContentReference?.options?.status?.description;
      if (isAttachmentPartialOrOmitted) {
        ariaLabel = `${ariaLabel}${description ? ` ${description}` : ""}`;
        for (const selector of [".monaco-icon-suffix-container", ".monaco-icon-name-container"]) {
          const element = label.element.querySelector(selector);
          if (element) {
            element.classList.add("warning");
          }
        }
      }
      if (file) {
        widget.style.cursor = "pointer";
        if (!this.attachedContextDisposables.isDisposed) {
          this.attachedContextDisposables.add(dom.addDisposableListener(widget, dom.EventType.CLICK, async (e) => {
            dom.EventHelper.stop(e, true);
            this.openerService.open(
              file,
              {
                fromUserGesture: true,
                editorOptions: {
                  selection: range
                }
              }
            );
          }));
        }
      }
      widget.ariaLabel = ariaLabel;
      widget.tabIndex = 0;
    });
  }
  // Helper function to create and replace image
  async createImageElements(buffer, widget, hoverElement) {
    const blob = new Blob([buffer], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    const img = dom.$("img.chat-attached-context-image", { src: url, alt: "" });
    const pillImg = dom.$("img.chat-attached-context-pill-image", { src: url, alt: "" });
    const pill = dom.$("div.chat-attached-context-pill", {}, pillImg);
    const existingPill = widget.querySelector(".chat-attached-context-pill");
    if (existingPill) {
      existingPill.replaceWith(pill);
    }
    hoverElement.appendChild(img);
  }
};
ChatAttachmentsContentPart = __decorateClass([
  __decorateParam(3, IInstantiationService),
  __decorateParam(4, IOpenerService),
  __decorateParam(5, IHoverService),
  __decorateParam(6, IFileService)
], ChatAttachmentsContentPart);
export {
  ChatAttachmentsContentPart
};
//# sourceMappingURL=chatAttachmentsContentPart.js.map
