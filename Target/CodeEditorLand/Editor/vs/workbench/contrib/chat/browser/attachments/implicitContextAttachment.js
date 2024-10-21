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
import { Button } from "../../../../../base/browser/ui/button/button.js";
import { getDefaultHoverDelegate } from "../../../../../base/browser/ui/hover/hoverDelegateFactory.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { Disposable, DisposableStore } from "../../../../../base/common/lifecycle.js";
import { basename, dirname } from "../../../../../base/common/resources.js";
import { URI } from "../../../../../base/common/uri.js";
import { localize } from "../../../../../nls.js";
import { FileKind } from "../../../../../platform/files/common/files.js";
import { IHoverService } from "../../../../../platform/hover/browser/hover.js";
import { ILabelService } from "../../../../../platform/label/common/label.js";
import { ResourceLabels } from "../../../../browser/labels.js";
import { IChatRequestImplicitVariableEntry } from "../../common/chatModel.js";
let ImplicitContextAttachmentWidget = class extends Disposable {
  constructor(attachment, resourceLabels, labelService, hoverService) {
    super();
    this.attachment = attachment;
    this.resourceLabels = resourceLabels;
    this.labelService = labelService;
    this.hoverService = hoverService;
    this.domNode = dom.$(".chat-attached-context-attachment.show-file-icons.implicit");
    this.render();
  }
  static {
    __name(this, "ImplicitContextAttachmentWidget");
  }
  domNode;
  renderDisposables = this._register(new DisposableStore());
  render() {
    dom.clearNode(this.domNode);
    this.renderDisposables.clear();
    this.domNode.classList.toggle("disabled", !this.attachment.enabled);
    const label = this.resourceLabels.create(this.domNode, { supportIcons: true });
    const file = URI.isUri(this.attachment.value) ? this.attachment.value : this.attachment.value.uri;
    const range = URI.isUri(this.attachment.value) ? void 0 : this.attachment.value.range;
    const fileBasename = basename(file);
    const fileDirname = dirname(file);
    const friendlyName = `${fileBasename} ${fileDirname}`;
    const ariaLabel = range ? localize("chat.fileAttachmentWithRange", "Attached file, {0}, line {1} to line {2}", friendlyName, range.startLineNumber, range.endLineNumber) : localize("chat.fileAttachment", "Attached file, {0}", friendlyName);
    const uriLabel = this.labelService.getUriLabel(file, { relative: true });
    const currentFile = localize("openEditor", "Current file context");
    const inactive = localize("enableHint", "disabled");
    const currentFileHint = currentFile + (this.attachment.enabled ? "" : ` (${inactive})`);
    const title = `${currentFileHint}
${uriLabel}`;
    label.setFile(file, {
      fileKind: FileKind.FILE,
      hidePath: true,
      range,
      title
    });
    this.domNode.ariaLabel = ariaLabel;
    this.domNode.tabIndex = 0;
    const hintElement = dom.append(this.domNode, dom.$("span.chat-implicit-hint", void 0, "Current file"));
    this._register(this.hoverService.setupManagedHover(getDefaultHoverDelegate("element"), hintElement, title));
    const buttonMsg = this.attachment.enabled ? localize("disable", "Disable current file context") : localize("enable", "Enable current file context");
    const toggleButton = this.renderDisposables.add(new Button(this.domNode, { supportIcons: true, title: buttonMsg }));
    toggleButton.icon = this.attachment.enabled ? Codicon.eye : Codicon.eyeClosed;
    this.renderDisposables.add(toggleButton.onDidClick((e) => {
      e.stopPropagation();
      this.attachment.enabled = !this.attachment.enabled;
    }));
  }
};
ImplicitContextAttachmentWidget = __decorateClass([
  __decorateParam(2, ILabelService),
  __decorateParam(3, IHoverService)
], ImplicitContextAttachmentWidget);
export {
  ImplicitContextAttachmentWidget
};
//# sourceMappingURL=implicitContextAttachment.js.map
