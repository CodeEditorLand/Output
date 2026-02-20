var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { $ } from "../../../base/browser/dom.js";
import { mainWindow } from "../../../base/browser/window.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { Emitter } from "../../../base/common/event.js";
import { Codicon } from "../../../base/common/codicons.js";
import { ThemeIcon } from "../../../base/common/themables.js";
import { mark } from "../../../base/common/performance.js";
const MODAL_HEADER_HEIGHT = 32;
const MODAL_SIZE_PERCENTAGE = 0.8;
const MODAL_MIN_WIDTH = 400;
const MODAL_MAX_WIDTH = 1200;
const MODAL_MIN_HEIGHT = 300;
const MODAL_MAX_HEIGHT = 900;
class EditorModal extends Disposable {
  static {
    __name(this, "EditorModal");
  }
  get visible() {
    return this._visible;
  }
  constructor(parentContainer, editorPart, editorGroupService) {
    super();
    this.parentContainer = parentContainer;
    this.editorPart = editorPart;
    this.editorGroupService = editorGroupService;
    this._onDidChangeVisibility = this._register(new Emitter());
    this.onDidChangeVisibility = this._onDidChangeVisibility.event;
    this._visible = false;
    this._workbenchWidth = 0;
    this._workbenchHeight = 0;
    this.overlay = this.createOverlay();
    this.container = this.createContainer();
    this.content = this.createContent();
    this.container.appendChild(this.content);
    this.overlay.appendChild(this.container);
    this.createEditorPart();
    this.registerKeyboardHandler();
    this.parentContainer.appendChild(this.overlay);
  }
  createOverlay() {
    const overlay = $("div.editor-modal-overlay");
    const backdrop = $("div.editor-modal-backdrop");
    backdrop.addEventListener("click", () => this.close());
    overlay.appendChild(backdrop);
    return overlay;
  }
  createContainer() {
    const container = $("div.editor-modal-container");
    container.setAttribute("role", "dialog");
    container.setAttribute("aria-modal", "true");
    const header = $("div.editor-modal-header");
    const closeButton = $("button.editor-modal-close-button");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.title = "Close (Escape)";
    const closeIcon = $("span");
    closeIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.close));
    closeButton.appendChild(closeIcon);
    closeButton.addEventListener("click", () => this.close());
    header.appendChild(closeButton);
    container.appendChild(header);
    return container;
  }
  createContent() {
    return $("div.editor-modal-content");
  }
  createEditorPart() {
    const editorPartContainer = document.createElement("div");
    editorPartContainer.classList.add("part", "editor");
    editorPartContainer.id = "workbench.parts.editor";
    editorPartContainer.setAttribute("role", "main");
    mark("code/willCreatePart/workbench.parts.editor");
    this.editorPart.create(editorPartContainer, { restorePreviousState: false });
    mark("code/didCreatePart/workbench.parts.editor");
    this.content.appendChild(editorPartContainer);
  }
  registerKeyboardHandler() {
    mainWindow.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this._visible) {
        this.close();
      }
    });
  }
  show() {
    if (this._visible) {
      return;
    }
    this._visible = true;
    this.overlay.classList.add("visible");
    this.doLayout();
    this._onDidChangeVisibility.fire(true);
  }
  hide() {
    if (!this._visible) {
      return;
    }
    this._visible = false;
    this.overlay.classList.remove("visible");
    this._onDidChangeVisibility.fire(false);
  }
  close() {
    if (!this._visible) {
      return;
    }
    for (const group of this.editorGroupService.groups) {
      group.closeAllEditors();
    }
    this.hide();
  }
  layout(workbenchWidth, workbenchHeight) {
    this._workbenchWidth = workbenchWidth;
    this._workbenchHeight = workbenchHeight;
    if (this._visible) {
      this.doLayout();
    }
  }
  doLayout() {
    const modalWidth = Math.floor(Math.min(MODAL_MAX_WIDTH, Math.max(MODAL_MIN_WIDTH, this._workbenchWidth * MODAL_SIZE_PERCENTAGE)));
    const modalHeight = Math.floor(Math.min(MODAL_MAX_HEIGHT, Math.max(MODAL_MIN_HEIGHT, this._workbenchHeight * MODAL_SIZE_PERCENTAGE)));
    this.container.style.width = `${modalWidth}px`;
    this.container.style.height = `${modalHeight}px`;
    const contentWidth = modalWidth;
    const contentHeight = modalHeight - MODAL_HEADER_HEIGHT;
    if (contentWidth > 0 && contentHeight > 0) {
      this.content.style.width = `${contentWidth}px`;
      this.content.style.height = `${contentHeight}px`;
      this.editorPart.layout(contentWidth, contentHeight, 0, 0);
    }
  }
}
export {
  EditorModal
};
//# sourceMappingURL=editorModal.js.map
