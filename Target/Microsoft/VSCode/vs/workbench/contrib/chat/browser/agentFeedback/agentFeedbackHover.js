var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
import * as dom from "../../../../../base/browser/dom.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { Disposable, DisposableStore } from "../../../../../base/common/lifecycle.js";
import { ThemeIcon } from "../../../../../base/common/themables.js";
import { localize } from "../../../../../nls.js";
import { IHoverService } from "../../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { DEFAULT_LABELS_CONTAINER, ResourceLabels } from "../../../../browser/labels.js";
import { IAgentFeedbackService } from "./agentFeedbackService.js";
let AgentFeedbackHover = class AgentFeedbackHover2 extends Disposable {
  static {
    __name(this, "AgentFeedbackHover");
  }
  constructor(_element, _attachment, _hoverService, _instantiationService, _editorService, _agentFeedbackService) {
    super();
    this._element = _element;
    this._attachment = _attachment;
    this._hoverService = _hoverService;
    this._instantiationService = _instantiationService;
    this._editorService = _editorService;
    this._agentFeedbackService = _agentFeedbackService;
    this._store.add(this._hoverService.setupDelayedHover(this._element, () => this._buildHoverContent(), { groupId: "chat-attachments" }));
    this._store.add(dom.addDisposableListener(this._element, dom.EventType.CLICK, (e) => {
      e.preventDefault();
      e.stopPropagation();
      this._showHoverNow();
    }));
  }
  _showHoverNow() {
    const opts = this._buildHoverContent();
    this._hoverService.showInstantHover({
      content: opts.content,
      target: this._element,
      style: opts.style,
      position: opts.position,
      trapFocus: opts.trapFocus
    });
  }
  _buildHoverContent() {
    const disposables = new DisposableStore();
    const hoverElement = dom.$("div.agent-feedback-hover");
    const title = dom.$("div.agent-feedback-hover-title");
    title.textContent = this._attachment.feedbackItems.length === 1 ? localize("agentFeedbackHover.titleOne", "1 feedback comment") : localize("agentFeedbackHover.titleMany", "{0} feedback comments", this._attachment.feedbackItems.length);
    hoverElement.appendChild(title);
    const list = dom.$("div.agent-feedback-hover-list");
    hoverElement.appendChild(list);
    const resourceLabels = disposables.add(this._instantiationService.createInstance(ResourceLabels, DEFAULT_LABELS_CONTAINER));
    const byFile = /* @__PURE__ */ new Map();
    for (const item of this._attachment.feedbackItems) {
      const key = item.resourceUri.toString();
      let group = byFile.get(key);
      if (!group) {
        group = [];
        byFile.set(key, group);
      }
      group.push(item);
    }
    for (const [, items] of byFile) {
      const fileHeader = dom.$("div.agent-feedback-hover-file-header");
      list.appendChild(fileHeader);
      const label = resourceLabels.create(fileHeader);
      label.setFile(items[0].resourceUri, { hidePath: false });
      for (const item of items) {
        const row = dom.$("div.agent-feedback-hover-row");
        list.appendChild(row);
        const text = dom.$("div.agent-feedback-hover-text");
        text.textContent = item.text;
        row.appendChild(text);
        row.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this._goToFeedback(item.resourceUri, item.range);
        });
        const removeBtn = dom.$("a.agent-feedback-hover-remove");
        removeBtn.title = localize("agentFeedbackHover.remove", "Remove feedback");
        const removeIcon = dom.$("span");
        removeIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.close));
        removeBtn.appendChild(removeIcon);
        row.appendChild(removeBtn);
        removeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          this._agentFeedbackService.removeFeedback(this._attachment.sessionResource, item.id);
        });
      }
    }
    return {
      content: hoverElement,
      style: 1,
      position: {
        hoverPosition: 2
        /* HoverPosition.BELOW */
      },
      trapFocus: true,
      dispose: /* @__PURE__ */ __name(() => disposables.dispose(), "dispose")
    };
  }
  _goToFeedback(resourceUri, range) {
    this._editorService.openEditor({
      resource: resourceUri,
      options: {
        selection: range,
        preserveFocus: false,
        revealIfVisible: true
      }
    });
  }
};
AgentFeedbackHover = __decorate([
  __param(2, IHoverService),
  __param(3, IInstantiationService),
  __param(4, IEditorService),
  __param(5, IAgentFeedbackService)
], AgentFeedbackHover);
export {
  AgentFeedbackHover
};
//# sourceMappingURL=agentFeedbackHover.js.map
