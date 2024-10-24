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
import { ToolBar } from "../../../../../../base/browser/ui/toolbar/toolbar.js";
import { Action, IAction } from "../../../../../../base/common/actions.js";
import { DisposableStore } from "../../../../../../base/common/lifecycle.js";
import { MarshalledId } from "../../../../../../base/common/marshallingIds.js";
import { EditorContextKeys } from "../../../../../../editor/common/editorContextKeys.js";
import { localize } from "../../../../../../nls.js";
import { DropdownWithPrimaryActionViewItem } from "../../../../../../platform/actions/browser/dropdownWithPrimaryActionViewItem.js";
import { createAndFillInActionBarActions } from "../../../../../../platform/actions/browser/menuEntryActionViewItem.js";
import { IMenu, IMenuService, MenuId, MenuItemAction } from "../../../../../../platform/actions/common/actions.js";
import { IContextKeyService, IScopedContextKeyService } from "../../../../../../platform/contextkey/common/contextkey.js";
import { InputFocusedContext } from "../../../../../../platform/contextkey/common/contextkeys.js";
import { IContextMenuService } from "../../../../../../platform/contextview/browser/contextView.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../../../platform/keybinding/common/keybinding.js";
import { INotebookCellActionContext } from "../../controller/coreActions.js";
import { ICellViewModel, INotebookEditorDelegate } from "../../notebookBrowser.js";
import { CellContentPart } from "../cellPart.js";
import { registerCellToolbarStickyScroll } from "./cellToolbarStickyScroll.js";
import { NOTEBOOK_CELL_EXECUTION_STATE, NOTEBOOK_CELL_LIST_FOCUSED, NOTEBOOK_CELL_TYPE, NOTEBOOK_EDITOR_FOCUSED } from "../../../common/notebookContextKeys.js";
let RunToolbar = class extends CellContentPart {
  constructor(notebookEditor, contextKeyService, cellContainer, runButtonContainer, primaryMenuId, secondaryMenuId, menuService, keybindingService, contextMenuService, instantiationService) {
    super();
    this.notebookEditor = notebookEditor;
    this.contextKeyService = contextKeyService;
    this.cellContainer = cellContainer;
    this.runButtonContainer = runButtonContainer;
    this.keybindingService = keybindingService;
    this.contextMenuService = contextMenuService;
    this.instantiationService = instantiationService;
    this.primaryMenu = this._register(menuService.createMenu(primaryMenuId, contextKeyService));
    this.secondaryMenu = this._register(menuService.createMenu(secondaryMenuId, contextKeyService));
    this.createRunCellToolbar(runButtonContainer, cellContainer, contextKeyService);
    const updateActions = /* @__PURE__ */ __name(() => {
      const actions = this.getCellToolbarActions(this.primaryMenu);
      const primary = actions.primary[0];
      this.toolbar.setActions(primary ? [primary] : []);
    }, "updateActions");
    updateActions();
    this._register(this.primaryMenu.onDidChange(updateActions));
    this._register(this.secondaryMenu.onDidChange(updateActions));
    this._register(this.notebookEditor.notebookOptions.onDidChangeOptions(updateActions));
  }
  static {
    __name(this, "RunToolbar");
  }
  toolbar;
  primaryMenu;
  secondaryMenu;
  didRenderCell(element) {
    this.cellDisposables.add(registerCellToolbarStickyScroll(this.notebookEditor, element, this.runButtonContainer));
    if (this.notebookEditor.hasModel()) {
      const context = {
        ui: true,
        cell: element,
        notebookEditor: this.notebookEditor,
        $mid: MarshalledId.NotebookCellActionContext
      };
      this.toolbar.context = context;
    }
  }
  getCellToolbarActions(menu) {
    const primary = [];
    const secondary = [];
    const result = { primary, secondary };
    createAndFillInActionBarActions(menu, { shouldForwardArgs: true }, result, (g) => /^inline/.test(g));
    return result;
  }
  createRunCellToolbar(container, cellContainer, contextKeyService) {
    const actionViewItemDisposables = this._register(new DisposableStore());
    const dropdownAction = this._register(new Action("notebook.moreRunActions", localize("notebook.moreRunActionsLabel", "More..."), "codicon-chevron-down", true));
    const keybindingProvider = /* @__PURE__ */ __name((action) => this.keybindingService.lookupKeybinding(action.id, executionContextKeyService), "keybindingProvider");
    const executionContextKeyService = this._register(getCodeCellExecutionContextKeyService(contextKeyService));
    this.toolbar = this._register(new ToolBar(container, this.contextMenuService, {
      getKeyBinding: keybindingProvider,
      actionViewItemProvider: /* @__PURE__ */ __name((_action, _options) => {
        actionViewItemDisposables.clear();
        const primary = this.getCellToolbarActions(this.primaryMenu).primary[0];
        if (!(primary instanceof MenuItemAction)) {
          return void 0;
        }
        const secondary = this.getCellToolbarActions(this.secondaryMenu).secondary;
        if (!secondary.length) {
          return void 0;
        }
        const item = this.instantiationService.createInstance(
          DropdownWithPrimaryActionViewItem,
          primary,
          dropdownAction,
          secondary,
          "notebook-cell-run-toolbar",
          {
            ..._options,
            getKeyBinding: keybindingProvider
          }
        );
        actionViewItemDisposables.add(item.onDidChangeDropdownVisibility((visible) => {
          cellContainer.classList.toggle("cell-run-toolbar-dropdown-active", visible);
        }));
        return item;
      }, "actionViewItemProvider"),
      renderDropdownAsChildElement: true
    }));
  }
};
RunToolbar = __decorateClass([
  __decorateParam(6, IMenuService),
  __decorateParam(7, IKeybindingService),
  __decorateParam(8, IContextMenuService),
  __decorateParam(9, IInstantiationService)
], RunToolbar);
function getCodeCellExecutionContextKeyService(contextKeyService) {
  const executionContextKeyService = contextKeyService.createScoped(document.createElement("div"));
  InputFocusedContext.bindTo(executionContextKeyService).set(true);
  EditorContextKeys.editorTextFocus.bindTo(executionContextKeyService).set(true);
  EditorContextKeys.focus.bindTo(executionContextKeyService).set(true);
  EditorContextKeys.textInputFocus.bindTo(executionContextKeyService).set(true);
  NOTEBOOK_CELL_EXECUTION_STATE.bindTo(executionContextKeyService).set("idle");
  NOTEBOOK_CELL_LIST_FOCUSED.bindTo(executionContextKeyService).set(true);
  NOTEBOOK_EDITOR_FOCUSED.bindTo(executionContextKeyService).set(true);
  NOTEBOOK_CELL_TYPE.bindTo(executionContextKeyService).set("code");
  return executionContextKeyService;
}
__name(getCodeCellExecutionContextKeyService, "getCodeCellExecutionContextKeyService");
export {
  RunToolbar,
  getCodeCellExecutionContextKeyService
};
//# sourceMappingURL=codeCellRunToolbar.js.map
