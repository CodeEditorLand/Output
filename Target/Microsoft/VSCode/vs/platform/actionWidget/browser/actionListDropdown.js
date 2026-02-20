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
import * as dom from "../../../base/browser/dom.js";
import { StandardKeyboardEvent } from "../../../base/browser/keyboardEvent.js";
import { Button } from "../../../base/browser/ui/button/button.js";
import { Codicon } from "../../../base/common/codicons.js";
import { Disposable, DisposableStore } from "../../../base/common/lifecycle.js";
import { ThemeIcon } from "../../../base/common/themables.js";
import { localize } from "../../../nls.js";
import { IContextViewService } from "../../contextview/browser/contextView.js";
import { ILayoutService } from "../../layout/browser/layoutService.js";
import { defaultButtonStyles } from "../../theme/browser/defaultStyles.js";
import "./actionListDropdown.css";
var ActionListDropdownItemKind;
(function(ActionListDropdownItemKind2) {
  ActionListDropdownItemKind2["Action"] = "action";
  ActionListDropdownItemKind2["Separator"] = "separator";
})(ActionListDropdownItemKind || (ActionListDropdownItemKind = {}));
const ACTION_ITEM_HEIGHT = 24;
const SEPARATOR_HEIGHT = 8;
let ActionListDropdown = class ActionListDropdown2 extends Disposable {
  static {
    __name(this, "ActionListDropdown");
  }
  get isVisible() {
    return this._isVisible;
  }
  constructor(_contextViewService, _layoutService) {
    super();
    this._contextViewService = _contextViewService;
    this._layoutService = _layoutService;
    this._isVisible = false;
    this._showDisposables = this._register(new DisposableStore());
    this._collapsedSections = /* @__PURE__ */ new Set();
    this._focusedIndex = -1;
  }
  /**
   * Show the dropdown anchored to the given element.
   */
  show(entries, delegate, anchor, options) {
    this.hide();
    this._showDisposables.clear();
    this._previousFocusedElement = dom.getDocument(anchor).activeElement;
    this._focusedIndex = -1;
    this._collapsedSections.clear();
    if (options?.collapsedByDefault) {
      for (const section of options.collapsedByDefault) {
        this._collapsedSections.add(section);
      }
    }
    let filterText = "";
    let itemElements = [];
    let itemsContainer;
    let filterContainer;
    const showDisposables = this._showDisposables;
    let filterInput;
    const renderItems = /* @__PURE__ */ __name(() => {
      dom.clearNode(itemsContainer);
      itemElements = [];
      const filtered = this._getVisibleEntries(entries, filterText);
      for (const entry of filtered) {
        const el = this._renderEntry(entry, delegate, renderItems, showDisposables);
        itemsContainer.appendChild(el);
        itemElements.push({ element: el, entry });
      }
      this._focusedIndex = -1;
      this._updateWidth(itemsContainer, itemElements, options?.minWidth);
      this._constrainHeight(itemsContainer, filterContainer);
      filterInput?.focus();
    }, "renderItems");
    const contextView = this._contextViewService.showContextView({
      getAnchor: /* @__PURE__ */ __name(() => anchor, "getAnchor"),
      render: /* @__PURE__ */ __name((container) => {
        const disposables = new DisposableStore();
        const widget = dom.append(container, dom.$(".action-list-dropdown"));
        this._domNode = widget;
        itemsContainer = dom.append(widget, dom.$(".action-list-dropdown-items"));
        filterContainer = dom.append(widget, dom.$(".action-list-dropdown-filter"));
        filterInput = dom.append(filterContainer, dom.$("input.action-list-dropdown-filter-input"));
        filterInput.type = "text";
        filterInput.placeholder = localize("filterPlaceholder", "Filter...");
        disposables.add(dom.addDisposableListener(filterInput, "input", () => {
          filterText = filterInput.value;
          renderItems();
        }));
        disposables.add(dom.addDisposableListener(filterInput, "keydown", (e) => {
          const event = new StandardKeyboardEvent(e);
          if (event.keyCode === 18) {
            e.preventDefault();
            this._focusedIndex = -1;
            this._moveFocus(itemElements, 1);
          } else if (event.keyCode === 16) {
            e.preventDefault();
            this._focusedIndex = itemElements.length;
            this._moveFocus(itemElements, -1);
          } else if (event.keyCode === 9) {
            e.preventDefault();
            if (filterText) {
              filterInput.value = "";
              filterText = "";
              renderItems();
            } else {
              this.hide();
            }
          }
        }));
        disposables.add(dom.addDisposableListener(widget, "keydown", (e) => {
          const event = new StandardKeyboardEvent(e);
          if (event.keyCode === 18) {
            e.preventDefault();
            this._moveFocus(itemElements, 1);
          } else if (event.keyCode === 16) {
            e.preventDefault();
            this._moveFocus(itemElements, -1);
          } else if (event.keyCode === 3) {
            e.preventDefault();
            if (this._focusedIndex >= 0 && this._focusedIndex < itemElements.length) {
              const { entry } = itemElements[this._focusedIndex];
              if (entry.kind === "action" && entry.item) {
                if (entry.item.isSectionToggle) {
                  this._toggleSection(entry.item.section);
                  renderItems();
                } else {
                  delegate.onSelect(entry.item);
                }
              }
            }
          } else if (event.keyCode === 9) {
            e.preventDefault();
            if (filterText) {
              filterInput.value = "";
              filterText = "";
              renderItems();
            } else {
              this.hide();
            }
          }
        }));
        renderItems();
        const focusTracker = dom.trackFocus(widget);
        disposables.add(focusTracker);
        disposables.add(focusTracker.onDidBlur(() => {
          const activeElement = dom.getDocument(widget).activeElement;
          if (!widget.contains(activeElement)) {
            this.hide();
          }
        }));
        filterInput.focus();
        return disposables;
      }, "render"),
      onHide: /* @__PURE__ */ __name(() => {
        this._isVisible = false;
        delegate.onHide();
        if (this._previousFocusedElement) {
          this._previousFocusedElement.focus();
          this._previousFocusedElement = void 0;
        }
      }, "onHide")
    }, void 0, false);
    this._showDisposables.add({ dispose: /* @__PURE__ */ __name(() => contextView.close(), "dispose") });
    this._isVisible = true;
  }
  /**
   * Hide the dropdown.
   */
  hide() {
    if (!this._isVisible) {
      return;
    }
    this._isVisible = false;
    this._showDisposables.clear();
    this._domNode = void 0;
  }
  _getVisibleEntries(entries, filter) {
    const isFiltering = filter.length > 0;
    const filterLower = filter.toLowerCase();
    const result = [];
    const seenIds = /* @__PURE__ */ new Set();
    let pendingSeparator;
    for (const entry of entries) {
      if (entry.kind === "separator") {
        pendingSeparator = entry;
        continue;
      }
      const item = entry.item;
      if (!item) {
        continue;
      }
      if (isFiltering && item.isSectionToggle) {
        continue;
      }
      if (!isFiltering && item.section && !item.isSectionToggle && this._collapsedSections.has(item.section)) {
        continue;
      }
      if (isFiltering) {
        const label = item.label.toLowerCase();
        const desc = (item.description ?? "").toLowerCase();
        if (!label.includes(filterLower) && !desc.includes(filterLower)) {
          continue;
        }
        if (seenIds.has(item.id)) {
          continue;
        }
        seenIds.add(item.id);
      }
      if (pendingSeparator && result.length > 0) {
        result.push(pendingSeparator);
      }
      pendingSeparator = void 0;
      result.push(entry);
    }
    return result;
  }
  _renderEntry(entry, delegate, rerender, disposables) {
    if (entry.kind === "separator") {
      const separator = dom.$(".action-list-dropdown-item.separator");
      separator.style.height = `${SEPARATOR_HEIGHT}px`;
      return separator;
    }
    const item = entry.item;
    const row = dom.$(".action-list-dropdown-item.action");
    row.style.height = `${ACTION_ITEM_HEIGHT}px`;
    row.tabIndex = 0;
    if (item.disabled) {
      row.classList.add("option-disabled");
    }
    if (item.className) {
      row.classList.add(item.className);
    }
    if (item.tooltip) {
      row.title = item.tooltip;
    }
    const iconContainer = dom.append(row, dom.$(".icon"));
    if (item.isSectionToggle) {
      const toggleIcon = this._collapsedSections.has(item.section ?? "") ? Codicon.chevronRight : Codicon.chevronDown;
      iconContainer.classList.add(...ThemeIcon.asClassNameArray(toggleIcon));
    } else if (item.checked !== void 0) {
      const checkIcon = item.checked ? Codicon.check : Codicon.blank;
      iconContainer.classList.add(...ThemeIcon.asClassNameArray(checkIcon));
    } else if (item.icon) {
      iconContainer.classList.add(...ThemeIcon.asClassNameArray(item.icon));
    }
    const title = dom.append(row, dom.$("span.title"));
    title.textContent = item.label;
    if (item.badge) {
      const badge = dom.append(row, dom.$("span.action-list-dropdown-item-badge"));
      badge.textContent = item.badge;
    }
    if (item.descriptionButton) {
      const descContainer = dom.append(row, dom.$("span.description"));
      const btn = new Button(descContainer, { ...defaultButtonStyles });
      disposables.add(btn);
      btn.label = item.descriptionButton.label;
      disposables.add(btn.onDidClick(() => {
        item.descriptionButton.onDidClick();
      }));
    } else if (item.description) {
      const desc = dom.append(row, dom.$("span.description"));
      desc.textContent = item.description;
    }
    if (!item.disabled || item.isSectionToggle) {
      disposables.add(dom.addDisposableListener(row, dom.EventType.CLICK, (e) => {
        e.stopPropagation();
        if (item.isSectionToggle) {
          this._toggleSection(item.section);
          rerender();
        } else {
          delegate.onSelect(item);
        }
      }));
    }
    return row;
  }
  _toggleSection(section) {
    if (!section) {
      return;
    }
    if (this._collapsedSections.has(section)) {
      this._collapsedSections.delete(section);
    } else {
      this._collapsedSections.add(section);
    }
  }
  _moveFocus(itemElements, direction) {
    let idx = this._focusedIndex;
    while (true) {
      idx += direction;
      if (idx < 0 || idx >= itemElements.length) {
        return;
      }
      const { entry } = itemElements[idx];
      if (entry.kind === "action" && entry.item && !entry.item.disabled) {
        this._setFocusedIndex(itemElements, idx);
        return;
      }
    }
  }
  _setFocusedIndex(itemElements, index) {
    if (this._focusedIndex >= 0 && this._focusedIndex < itemElements.length) {
      itemElements[this._focusedIndex].element.classList.remove("focused");
    }
    this._focusedIndex = index;
    if (index >= 0 && index < itemElements.length) {
      const el = itemElements[index].element;
      el.classList.add("focused");
      el.focus();
    }
  }
  _constrainHeight(itemsContainer, filterContainer) {
    if (!this._domNode) {
      return;
    }
    const targetWindow = dom.getWindow(this._domNode);
    const windowHeight = this._layoutService.getContainer(targetWindow).clientHeight;
    const widgetTop = this._domNode.getBoundingClientRect().top;
    const padding = 10;
    const filterHeight = filterContainer.getBoundingClientRect().height || 30;
    const availableHeight = widgetTop > 0 ? windowHeight - widgetTop - padding : windowHeight * 0.7;
    const maxHeight = Math.max(availableHeight, ACTION_ITEM_HEIGHT * 3 + filterHeight);
    itemsContainer.style.maxHeight = `${maxHeight - filterHeight}px`;
    itemsContainer.style.overflowY = "auto";
  }
  _updateWidth(itemsContainer, itemElements, minWidth) {
    let maxWidth = minWidth ?? 0;
    for (const { element, entry } of itemElements) {
      if (entry.kind !== "action") {
        continue;
      }
      element.style.width = "auto";
      const width = element.getBoundingClientRect().width;
      element.style.width = "";
      maxWidth = Math.max(maxWidth, width);
    }
    if (maxWidth > 0) {
      itemsContainer.style.width = `${maxWidth}px`;
    }
  }
};
ActionListDropdown = __decorate([
  __param(0, IContextViewService),
  __param(1, ILayoutService)
], ActionListDropdown);
export {
  ActionListDropdown,
  ActionListDropdownItemKind
};
//# sourceMappingURL=actionListDropdown.js.map
