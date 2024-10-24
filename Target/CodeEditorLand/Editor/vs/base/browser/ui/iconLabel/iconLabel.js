var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import "./iconlabel.css";
import * as dom from "../../dom.js";
import * as css from "../../cssValue.js";
import { HighlightedLabel } from "../highlightedlabel/highlightedLabel.js";
import { IHoverDelegate } from "../hover/hoverDelegate.js";
import { IMatch } from "../../../common/filters.js";
import { Disposable, IDisposable } from "../../../common/lifecycle.js";
import { equals } from "../../../common/objects.js";
import { Range } from "../../../common/range.js";
import { getDefaultHoverDelegate } from "../hover/hoverDelegateFactory.js";
import { getBaseLayerHoverDelegate } from "../hover/hoverDelegate2.js";
import { isString } from "../../../common/types.js";
import { stripIcons } from "../../../common/iconLabels.js";
import { URI } from "../../../common/uri.js";
class FastLabelNode {
  constructor(_element) {
    this._element = _element;
  }
  static {
    __name(this, "FastLabelNode");
  }
  disposed;
  _textContent;
  _classNames;
  _empty;
  get element() {
    return this._element;
  }
  set textContent(content) {
    if (this.disposed || content === this._textContent) {
      return;
    }
    this._textContent = content;
    this._element.textContent = content;
  }
  set classNames(classNames) {
    if (this.disposed || equals(classNames, this._classNames)) {
      return;
    }
    this._classNames = classNames;
    this._element.classList.value = "";
    this._element.classList.add(...classNames);
  }
  set empty(empty) {
    if (this.disposed || empty === this._empty) {
      return;
    }
    this._empty = empty;
    this._element.style.marginLeft = empty ? "0" : "";
  }
  dispose() {
    this.disposed = true;
  }
}
class IconLabel extends Disposable {
  static {
    __name(this, "IconLabel");
  }
  creationOptions;
  domNode;
  nameContainer;
  nameNode;
  descriptionNode;
  suffixNode;
  labelContainer;
  hoverDelegate;
  customHovers = /* @__PURE__ */ new Map();
  constructor(container, options) {
    super();
    this.creationOptions = options;
    this.domNode = this._register(new FastLabelNode(dom.append(container, dom.$(".monaco-icon-label"))));
    this.labelContainer = dom.append(this.domNode.element, dom.$(".monaco-icon-label-container"));
    this.nameContainer = dom.append(this.labelContainer, dom.$("span.monaco-icon-name-container"));
    if (options?.supportHighlights || options?.supportIcons) {
      this.nameNode = this._register(new LabelWithHighlights(this.nameContainer, !!options.supportIcons));
    } else {
      this.nameNode = new Label(this.nameContainer);
    }
    this.hoverDelegate = options?.hoverDelegate ?? getDefaultHoverDelegate("mouse");
  }
  get element() {
    return this.domNode.element;
  }
  setLabel(label, description, options) {
    const labelClasses = ["monaco-icon-label"];
    const containerClasses = ["monaco-icon-label-container"];
    let ariaLabel = "";
    if (options) {
      if (options.extraClasses) {
        labelClasses.push(...options.extraClasses);
      }
      if (options.italic) {
        labelClasses.push("italic");
      }
      if (options.strikethrough) {
        labelClasses.push("strikethrough");
      }
      if (options.disabledCommand) {
        containerClasses.push("disabled");
      }
      if (options.title) {
        if (typeof options.title === "string") {
          ariaLabel += options.title;
        } else {
          ariaLabel += label;
        }
      }
    }
    const existingIconNode = this.domNode.element.querySelector(".monaco-icon-label-iconpath");
    if (options?.iconPath) {
      let iconNode;
      if (!existingIconNode || !dom.isHTMLElement(existingIconNode)) {
        iconNode = dom.$(".monaco-icon-label-iconpath");
        this.domNode.element.prepend(iconNode);
      } else {
        iconNode = existingIconNode;
      }
      iconNode.style.backgroundImage = css.asCSSUrl(options?.iconPath);
    } else if (existingIconNode) {
      existingIconNode.remove();
    }
    this.domNode.classNames = labelClasses;
    this.domNode.element.setAttribute("aria-label", ariaLabel);
    this.labelContainer.classList.value = "";
    this.labelContainer.classList.add(...containerClasses);
    this.setupHover(options?.descriptionTitle ? this.labelContainer : this.element, options?.title);
    this.nameNode.setLabel(label, options);
    if (description || this.descriptionNode) {
      const descriptionNode = this.getOrCreateDescriptionNode();
      if (descriptionNode instanceof HighlightedLabel) {
        descriptionNode.set(description || "", options ? options.descriptionMatches : void 0, void 0, options?.labelEscapeNewLines);
        this.setupHover(descriptionNode.element, options?.descriptionTitle);
      } else {
        descriptionNode.textContent = description && options?.labelEscapeNewLines ? HighlightedLabel.escapeNewLines(description, []) : description || "";
        this.setupHover(descriptionNode.element, options?.descriptionTitle || "");
        descriptionNode.empty = !description;
      }
    }
    if (options?.suffix || this.suffixNode) {
      const suffixNode = this.getOrCreateSuffixNode();
      suffixNode.textContent = options?.suffix ?? "";
    }
  }
  setupHover(htmlElement, tooltip) {
    const previousCustomHover = this.customHovers.get(htmlElement);
    if (previousCustomHover) {
      previousCustomHover.dispose();
      this.customHovers.delete(htmlElement);
    }
    if (!tooltip) {
      htmlElement.removeAttribute("title");
      return;
    }
    let hoverTarget = htmlElement;
    if (this.creationOptions?.hoverTargetOverrride) {
      if (!dom.isAncestor(htmlElement, this.creationOptions.hoverTargetOverrride)) {
        throw new Error("hoverTargetOverrride must be an ancestor of the htmlElement");
      }
      hoverTarget = this.creationOptions.hoverTargetOverrride;
    }
    if (this.hoverDelegate.showNativeHover) {
      let setupNativeHover2 = function(htmlElement2, tooltip2) {
        if (isString(tooltip2)) {
          htmlElement2.title = stripIcons(tooltip2);
        } else if (tooltip2?.markdownNotSupportedFallback) {
          htmlElement2.title = tooltip2.markdownNotSupportedFallback;
        } else {
          htmlElement2.removeAttribute("title");
        }
      };
      var setupNativeHover = setupNativeHover2;
      __name(setupNativeHover2, "setupNativeHover");
      setupNativeHover2(hoverTarget, tooltip);
    } else {
      const hoverDisposable = getBaseLayerHoverDelegate().setupManagedHover(this.hoverDelegate, hoverTarget, tooltip);
      if (hoverDisposable) {
        this.customHovers.set(htmlElement, hoverDisposable);
      }
    }
  }
  dispose() {
    super.dispose();
    for (const disposable of this.customHovers.values()) {
      disposable.dispose();
    }
    this.customHovers.clear();
  }
  getOrCreateSuffixNode() {
    if (!this.suffixNode) {
      const suffixContainer = this._register(new FastLabelNode(dom.after(this.nameContainer, dom.$("span.monaco-icon-suffix-container"))));
      this.suffixNode = this._register(new FastLabelNode(dom.append(suffixContainer.element, dom.$("span.label-suffix"))));
    }
    return this.suffixNode;
  }
  getOrCreateDescriptionNode() {
    if (!this.descriptionNode) {
      const descriptionContainer = this._register(new FastLabelNode(dom.append(this.labelContainer, dom.$("span.monaco-icon-description-container"))));
      if (this.creationOptions?.supportDescriptionHighlights) {
        this.descriptionNode = this._register(new HighlightedLabel(dom.append(descriptionContainer.element, dom.$("span.label-description")), { supportIcons: !!this.creationOptions.supportIcons }));
      } else {
        this.descriptionNode = this._register(new FastLabelNode(dom.append(descriptionContainer.element, dom.$("span.label-description"))));
      }
    }
    return this.descriptionNode;
  }
}
class Label {
  constructor(container) {
    this.container = container;
  }
  static {
    __name(this, "Label");
  }
  label = void 0;
  singleLabel = void 0;
  options;
  setLabel(label, options) {
    if (this.label === label && equals(this.options, options)) {
      return;
    }
    this.label = label;
    this.options = options;
    if (typeof label === "string") {
      if (!this.singleLabel) {
        this.container.innerText = "";
        this.container.classList.remove("multiple");
        this.singleLabel = dom.append(this.container, dom.$("a.label-name", { id: options?.domId }));
      }
      this.singleLabel.textContent = label;
    } else {
      this.container.innerText = "";
      this.container.classList.add("multiple");
      this.singleLabel = void 0;
      for (let i = 0; i < label.length; i++) {
        const l = label[i];
        const id = options?.domId && `${options?.domId}_${i}`;
        dom.append(this.container, dom.$("a.label-name", { id, "data-icon-label-count": label.length, "data-icon-label-index": i, "role": "treeitem" }, l));
        if (i < label.length - 1) {
          dom.append(this.container, dom.$("span.label-separator", void 0, options?.separator || "/"));
        }
      }
    }
  }
}
function splitMatches(labels, separator, matches) {
  if (!matches) {
    return void 0;
  }
  let labelStart = 0;
  return labels.map((label) => {
    const labelRange = { start: labelStart, end: labelStart + label.length };
    const result = matches.map((match) => Range.intersect(labelRange, match)).filter((range) => !Range.isEmpty(range)).map(({ start, end }) => ({ start: start - labelStart, end: end - labelStart }));
    labelStart = labelRange.end + separator.length;
    return result;
  });
}
__name(splitMatches, "splitMatches");
class LabelWithHighlights extends Disposable {
  constructor(container, supportIcons) {
    super();
    this.container = container;
    this.supportIcons = supportIcons;
  }
  static {
    __name(this, "LabelWithHighlights");
  }
  label = void 0;
  singleLabel = void 0;
  options;
  setLabel(label, options) {
    if (this.label === label && equals(this.options, options)) {
      return;
    }
    this.label = label;
    this.options = options;
    if (typeof label === "string") {
      if (!this.singleLabel) {
        this.container.innerText = "";
        this.container.classList.remove("multiple");
        this.singleLabel = this._register(new HighlightedLabel(dom.append(this.container, dom.$("a.label-name", { id: options?.domId })), { supportIcons: this.supportIcons }));
      }
      this.singleLabel.set(label, options?.matches, void 0, options?.labelEscapeNewLines);
    } else {
      this.container.innerText = "";
      this.container.classList.add("multiple");
      this.singleLabel = void 0;
      const separator = options?.separator || "/";
      const matches = splitMatches(label, separator, options?.matches);
      for (let i = 0; i < label.length; i++) {
        const l = label[i];
        const m = matches ? matches[i] : void 0;
        const id = options?.domId && `${options?.domId}_${i}`;
        const name = dom.$("a.label-name", { id, "data-icon-label-count": label.length, "data-icon-label-index": i, "role": "treeitem" });
        const highlightedLabel = this._register(new HighlightedLabel(dom.append(this.container, name), { supportIcons: this.supportIcons }));
        highlightedLabel.set(l, m, void 0, options?.labelEscapeNewLines);
        if (i < label.length - 1) {
          dom.append(name, dom.$("span.label-separator", void 0, separator));
        }
      }
    }
  }
}
export {
  IconLabel
};
//# sourceMappingURL=iconLabel.js.map
