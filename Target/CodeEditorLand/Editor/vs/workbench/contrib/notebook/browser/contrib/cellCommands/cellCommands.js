var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { KeyChord, KeyCode, KeyMod } from "../../../../../../base/common/keyCodes.js";
import { Mimes } from "../../../../../../base/common/mime.js";
import { IBulkEditService, ResourceTextEdit } from "../../../../../../editor/browser/services/bulkEditService.js";
import { localize, localize2 } from "../../../../../../nls.js";
import { MenuId, registerAction2 } from "../../../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../../../platform/contextkey/common/contextkey.js";
import { InputFocusedContext, InputFocusedContextKey } from "../../../../../../platform/contextkey/common/contextkeys.js";
import { ServicesAccessor } from "../../../../../../platform/instantiation/common/instantiation.js";
import { KeybindingWeight } from "../../../../../../platform/keybinding/common/keybindingsRegistry.js";
import { ResourceNotebookCellEdit } from "../../../../bulkEdit/browser/bulkCellEdits.js";
import { changeCellToKind, computeCellLinesContents, copyCellRange, joinCellsWithSurrounds, joinSelectedCells, moveCellRange } from "../../controller/cellOperations.js";
import { cellExecutionArgs, CellOverflowToolbarGroups, CellToolbarOrder, CELL_TITLE_CELL_GROUP_ID, INotebookCellActionContext, INotebookCellToolbarActionContext, INotebookCommandContext, NotebookCellAction, NotebookMultiCellAction, parseMultiCellExecutionArgs } from "../../controller/coreActions.js";
import { CellFocusMode, EXPAND_CELL_INPUT_COMMAND_ID, EXPAND_CELL_OUTPUT_COMMAND_ID, ICellOutputViewModel, ICellViewModel, INotebookEditor } from "../../notebookBrowser.js";
import { NOTEBOOK_CELL_EDITABLE, NOTEBOOK_CELL_HAS_OUTPUTS, NOTEBOOK_CELL_INPUT_COLLAPSED, NOTEBOOK_CELL_LIST_FOCUSED, NOTEBOOK_CELL_OUTPUT_COLLAPSED, NOTEBOOK_CELL_TYPE, NOTEBOOK_EDITOR_EDITABLE, NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_IS_ACTIVE_EDITOR, NOTEBOOK_OUTPUT_FOCUSED } from "../../../common/notebookContextKeys.js";
import * as icons from "../../notebookIcons.js";
import { CellEditType, CellKind, NotebookSetting } from "../../../common/notebookCommon.js";
import { INotificationService } from "../../../../../../platform/notification/common/notification.js";
import { EditorContextKeys } from "../../../../../../editor/common/editorContextKeys.js";
import { IConfigurationService } from "../../../../../../platform/configuration/common/configuration.js";
const MOVE_CELL_UP_COMMAND_ID = "notebook.cell.moveUp";
const MOVE_CELL_DOWN_COMMAND_ID = "notebook.cell.moveDown";
const COPY_CELL_UP_COMMAND_ID = "notebook.cell.copyUp";
const COPY_CELL_DOWN_COMMAND_ID = "notebook.cell.copyDown";
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: MOVE_CELL_UP_COMMAND_ID,
        title: localize2("notebookActions.moveCellUp", "Move Cell Up"),
        icon: icons.moveUpIcon,
        keybinding: {
          primary: KeyMod.Alt | KeyCode.UpArrow,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, InputFocusedContext.toNegated()),
          weight: KeybindingWeight.WorkbenchContrib
        },
        menu: {
          id: MenuId.NotebookCellTitle,
          when: ContextKeyExpr.equals("config.notebook.dragAndDropEnabled", false),
          group: CellOverflowToolbarGroups.Edit,
          order: 14
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    return moveCellRange(context, "up");
  }
});
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: MOVE_CELL_DOWN_COMMAND_ID,
        title: localize2("notebookActions.moveCellDown", "Move Cell Down"),
        icon: icons.moveDownIcon,
        keybinding: {
          primary: KeyMod.Alt | KeyCode.DownArrow,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, InputFocusedContext.toNegated()),
          weight: KeybindingWeight.WorkbenchContrib
        },
        menu: {
          id: MenuId.NotebookCellTitle,
          when: ContextKeyExpr.equals("config.notebook.dragAndDropEnabled", false),
          group: CellOverflowToolbarGroups.Edit,
          order: 14
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    return moveCellRange(context, "down");
  }
});
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: COPY_CELL_UP_COMMAND_ID,
        title: localize2("notebookActions.copyCellUp", "Copy Cell Up"),
        keybinding: {
          primary: KeyMod.Alt | KeyMod.Shift | KeyCode.UpArrow,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, InputFocusedContext.toNegated()),
          weight: KeybindingWeight.WorkbenchContrib
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    return copyCellRange(context, "up");
  }
});
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: COPY_CELL_DOWN_COMMAND_ID,
        title: localize2("notebookActions.copyCellDown", "Copy Cell Down"),
        keybinding: {
          primary: KeyMod.Alt | KeyMod.Shift | KeyCode.DownArrow,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, InputFocusedContext.toNegated()),
          weight: KeybindingWeight.WorkbenchContrib
        },
        menu: {
          id: MenuId.NotebookCellTitle,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_EDITOR_EDITABLE, NOTEBOOK_CELL_EDITABLE),
          group: CellOverflowToolbarGroups.Edit,
          order: 13
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    return copyCellRange(context, "down");
  }
});
const SPLIT_CELL_COMMAND_ID = "notebook.cell.split";
const JOIN_SELECTED_CELLS_COMMAND_ID = "notebook.cell.joinSelected";
const JOIN_CELL_ABOVE_COMMAND_ID = "notebook.cell.joinAbove";
const JOIN_CELL_BELOW_COMMAND_ID = "notebook.cell.joinBelow";
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: SPLIT_CELL_COMMAND_ID,
        title: localize2("notebookActions.splitCell", "Split Cell"),
        menu: {
          id: MenuId.NotebookCellTitle,
          when: ContextKeyExpr.and(
            NOTEBOOK_EDITOR_EDITABLE,
            NOTEBOOK_CELL_EDITABLE,
            NOTEBOOK_CELL_INPUT_COLLAPSED.toNegated()
          ),
          order: CellToolbarOrder.SplitCell,
          group: CELL_TITLE_CELL_GROUP_ID
        },
        icon: icons.splitCellIcon,
        keybinding: {
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_EDITOR_EDITABLE, NOTEBOOK_CELL_EDITABLE, EditorContextKeys.editorTextFocus),
          primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyK, KeyMod.CtrlCmd | KeyMod.Shift | KeyCode.Backslash),
          weight: KeybindingWeight.WorkbenchContrib
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    if (context.notebookEditor.isReadOnly) {
      return;
    }
    const bulkEditService = accessor.get(IBulkEditService);
    const cell = context.cell;
    const index = context.notebookEditor.getCellIndex(cell);
    const splitPoints = cell.focusMode === CellFocusMode.Container ? [{ lineNumber: 1, column: 1 }] : cell.getSelectionsStartPosition();
    if (splitPoints && splitPoints.length > 0) {
      await cell.resolveTextModel();
      if (!cell.hasModel()) {
        return;
      }
      const newLinesContents = computeCellLinesContents(cell, splitPoints);
      if (newLinesContents) {
        const language = cell.language;
        const kind = cell.cellKind;
        const mime = cell.mime;
        const textModel = await cell.resolveTextModel();
        await bulkEditService.apply(
          [
            new ResourceTextEdit(cell.uri, { range: textModel.getFullModelRange(), text: newLinesContents[0] }),
            new ResourceNotebookCellEdit(
              context.notebookEditor.textModel.uri,
              {
                editType: CellEditType.Replace,
                index: index + 1,
                count: 0,
                cells: newLinesContents.slice(1).map((line) => ({
                  cellKind: kind,
                  language,
                  mime,
                  source: line,
                  outputs: [],
                  metadata: {}
                }))
              }
            )
          ],
          { quotableLabel: "Split Notebook Cell" }
        );
      }
    }
  }
});
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: JOIN_CELL_ABOVE_COMMAND_ID,
        title: localize2("notebookActions.joinCellAbove", "Join With Previous Cell"),
        keybinding: {
          when: NOTEBOOK_EDITOR_FOCUSED,
          primary: KeyMod.WinCtrl | KeyMod.Alt | KeyMod.Shift | KeyCode.KeyJ,
          weight: KeybindingWeight.WorkbenchContrib
        },
        menu: {
          id: MenuId.NotebookCellTitle,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_EDITOR_EDITABLE),
          group: CellOverflowToolbarGroups.Edit,
          order: 10
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    const bulkEditService = accessor.get(IBulkEditService);
    return joinCellsWithSurrounds(bulkEditService, context, "above");
  }
});
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: JOIN_CELL_BELOW_COMMAND_ID,
        title: localize2("notebookActions.joinCellBelow", "Join With Next Cell"),
        keybinding: {
          when: NOTEBOOK_EDITOR_FOCUSED,
          primary: KeyMod.WinCtrl | KeyMod.Alt | KeyCode.KeyJ,
          weight: KeybindingWeight.WorkbenchContrib
        },
        menu: {
          id: MenuId.NotebookCellTitle,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_EDITOR_EDITABLE),
          group: CellOverflowToolbarGroups.Edit,
          order: 11
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    const bulkEditService = accessor.get(IBulkEditService);
    return joinCellsWithSurrounds(bulkEditService, context, "below");
  }
});
registerAction2(class extends NotebookCellAction {
  constructor() {
    super(
      {
        id: JOIN_SELECTED_CELLS_COMMAND_ID,
        title: localize2("notebookActions.joinSelectedCells", "Join Selected Cells"),
        menu: {
          id: MenuId.NotebookCellTitle,
          when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_EDITOR_EDITABLE),
          group: CellOverflowToolbarGroups.Edit,
          order: 12
        }
      }
    );
  }
  async runWithContext(accessor, context) {
    const bulkEditService = accessor.get(IBulkEditService);
    const notificationService = accessor.get(INotificationService);
    return joinSelectedCells(bulkEditService, notificationService, context);
  }
});
const CHANGE_CELL_TO_CODE_COMMAND_ID = "notebook.cell.changeToCode";
const CHANGE_CELL_TO_MARKDOWN_COMMAND_ID = "notebook.cell.changeToMarkdown";
registerAction2(class ChangeCellToCodeAction extends NotebookMultiCellAction {
  static {
    __name(this, "ChangeCellToCodeAction");
  }
  constructor() {
    super({
      id: CHANGE_CELL_TO_CODE_COMMAND_ID,
      title: localize2("notebookActions.changeCellToCode", "Change Cell to Code"),
      keybinding: {
        when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, ContextKeyExpr.not(InputFocusedContextKey), NOTEBOOK_OUTPUT_FOCUSED.toNegated()),
        primary: KeyCode.KeyY,
        weight: KeybindingWeight.WorkbenchContrib
      },
      precondition: ContextKeyExpr.and(NOTEBOOK_IS_ACTIVE_EDITOR, NOTEBOOK_CELL_TYPE.isEqualTo("markup")),
      menu: {
        id: MenuId.NotebookCellTitle,
        when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_EDITOR_EDITABLE, NOTEBOOK_CELL_EDITABLE, NOTEBOOK_CELL_TYPE.isEqualTo("markup")),
        group: CellOverflowToolbarGroups.Edit
      }
    });
  }
  async runWithContext(accessor, context) {
    await changeCellToKind(CellKind.Code, context);
  }
});
registerAction2(class ChangeCellToMarkdownAction extends NotebookMultiCellAction {
  static {
    __name(this, "ChangeCellToMarkdownAction");
  }
  constructor() {
    super({
      id: CHANGE_CELL_TO_MARKDOWN_COMMAND_ID,
      title: localize2("notebookActions.changeCellToMarkdown", "Change Cell to Markdown"),
      keybinding: {
        when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, ContextKeyExpr.not(InputFocusedContextKey), NOTEBOOK_OUTPUT_FOCUSED.toNegated()),
        primary: KeyCode.KeyM,
        weight: KeybindingWeight.WorkbenchContrib
      },
      precondition: ContextKeyExpr.and(NOTEBOOK_IS_ACTIVE_EDITOR, NOTEBOOK_CELL_TYPE.isEqualTo("code")),
      menu: {
        id: MenuId.NotebookCellTitle,
        when: ContextKeyExpr.and(NOTEBOOK_EDITOR_FOCUSED, NOTEBOOK_EDITOR_EDITABLE, NOTEBOOK_CELL_EDITABLE, NOTEBOOK_CELL_TYPE.isEqualTo("code")),
        group: CellOverflowToolbarGroups.Edit
      }
    });
  }
  async runWithContext(accessor, context) {
    await changeCellToKind(CellKind.Markup, context, "markdown", Mimes.markdown);
  }
});
const COLLAPSE_CELL_INPUT_COMMAND_ID = "notebook.cell.collapseCellInput";
const COLLAPSE_CELL_OUTPUT_COMMAND_ID = "notebook.cell.collapseCellOutput";
const COLLAPSE_ALL_CELL_INPUTS_COMMAND_ID = "notebook.cell.collapseAllCellInputs";
const EXPAND_ALL_CELL_INPUTS_COMMAND_ID = "notebook.cell.expandAllCellInputs";
const COLLAPSE_ALL_CELL_OUTPUTS_COMMAND_ID = "notebook.cell.collapseAllCellOutputs";
const EXPAND_ALL_CELL_OUTPUTS_COMMAND_ID = "notebook.cell.expandAllCellOutputs";
const TOGGLE_CELL_OUTPUTS_COMMAND_ID = "notebook.cell.toggleOutputs";
const TOGGLE_CELL_OUTPUT_SCROLLING = "notebook.cell.toggleOutputScrolling";
registerAction2(class CollapseCellInputAction extends NotebookMultiCellAction {
  static {
    __name(this, "CollapseCellInputAction");
  }
  constructor() {
    super({
      id: COLLAPSE_CELL_INPUT_COMMAND_ID,
      title: localize2("notebookActions.collapseCellInput", "Collapse Cell Input"),
      keybinding: {
        when: ContextKeyExpr.and(NOTEBOOK_CELL_LIST_FOCUSED, NOTEBOOK_CELL_INPUT_COLLAPSED.toNegated(), InputFocusedContext.toNegated()),
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyK, KeyMod.CtrlCmd | KeyCode.KeyC),
        weight: KeybindingWeight.WorkbenchContrib
      }
    });
  }
  parseArgs(accessor, ...args) {
    return parseMultiCellExecutionArgs(accessor, ...args);
  }
  async runWithContext(accessor, context) {
    if (context.ui) {
      context.cell.isInputCollapsed = true;
    } else {
      context.selectedCells.forEach((cell) => cell.isInputCollapsed = true);
    }
  }
});
registerAction2(class ExpandCellInputAction extends NotebookMultiCellAction {
  static {
    __name(this, "ExpandCellInputAction");
  }
  constructor() {
    super({
      id: EXPAND_CELL_INPUT_COMMAND_ID,
      title: localize2("notebookActions.expandCellInput", "Expand Cell Input"),
      keybinding: {
        when: ContextKeyExpr.and(NOTEBOOK_CELL_LIST_FOCUSED, NOTEBOOK_CELL_INPUT_COLLAPSED),
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyK, KeyMod.CtrlCmd | KeyCode.KeyC),
        weight: KeybindingWeight.WorkbenchContrib
      }
    });
  }
  parseArgs(accessor, ...args) {
    return parseMultiCellExecutionArgs(accessor, ...args);
  }
  async runWithContext(accessor, context) {
    if (context.ui) {
      context.cell.isInputCollapsed = false;
    } else {
      context.selectedCells.forEach((cell) => cell.isInputCollapsed = false);
    }
  }
});
registerAction2(class CollapseCellOutputAction extends NotebookMultiCellAction {
  static {
    __name(this, "CollapseCellOutputAction");
  }
  constructor() {
    super({
      id: COLLAPSE_CELL_OUTPUT_COMMAND_ID,
      title: localize2("notebookActions.collapseCellOutput", "Collapse Cell Output"),
      keybinding: {
        when: ContextKeyExpr.and(NOTEBOOK_CELL_LIST_FOCUSED, NOTEBOOK_CELL_OUTPUT_COLLAPSED.toNegated(), InputFocusedContext.toNegated(), NOTEBOOK_CELL_HAS_OUTPUTS),
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyK, KeyCode.KeyT),
        weight: KeybindingWeight.WorkbenchContrib
      }
    });
  }
  async runWithContext(accessor, context) {
    if (context.ui) {
      context.cell.isOutputCollapsed = true;
    } else {
      context.selectedCells.forEach((cell) => cell.isOutputCollapsed = true);
    }
  }
});
registerAction2(class ExpandCellOuputAction extends NotebookMultiCellAction {
  static {
    __name(this, "ExpandCellOuputAction");
  }
  constructor() {
    super({
      id: EXPAND_CELL_OUTPUT_COMMAND_ID,
      title: localize2("notebookActions.expandCellOutput", "Expand Cell Output"),
      keybinding: {
        when: ContextKeyExpr.and(NOTEBOOK_CELL_LIST_FOCUSED, NOTEBOOK_CELL_OUTPUT_COLLAPSED),
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyK, KeyCode.KeyT),
        weight: KeybindingWeight.WorkbenchContrib
      }
    });
  }
  async runWithContext(accessor, context) {
    if (context.ui) {
      context.cell.isOutputCollapsed = false;
    } else {
      context.selectedCells.forEach((cell) => cell.isOutputCollapsed = false);
    }
  }
});
registerAction2(class extends NotebookMultiCellAction {
  constructor() {
    super({
      id: TOGGLE_CELL_OUTPUTS_COMMAND_ID,
      precondition: NOTEBOOK_CELL_LIST_FOCUSED,
      title: localize2("notebookActions.toggleOutputs", "Toggle Outputs"),
      metadata: {
        description: localize("notebookActions.toggleOutputs", "Toggle Outputs"),
        args: cellExecutionArgs
      }
    });
  }
  parseArgs(accessor, ...args) {
    return parseMultiCellExecutionArgs(accessor, ...args);
  }
  async runWithContext(accessor, context) {
    let cells = [];
    if (context.ui) {
      cells = [context.cell];
    } else if (context.selectedCells) {
      cells = context.selectedCells;
    }
    for (const cell of cells) {
      cell.isOutputCollapsed = !cell.isOutputCollapsed;
    }
  }
});
registerAction2(class CollapseAllCellInputsAction extends NotebookMultiCellAction {
  static {
    __name(this, "CollapseAllCellInputsAction");
  }
  constructor() {
    super({
      id: COLLAPSE_ALL_CELL_INPUTS_COMMAND_ID,
      title: localize2("notebookActions.collapseAllCellInput", "Collapse All Cell Inputs"),
      f1: true
    });
  }
  async runWithContext(accessor, context) {
    forEachCell(context.notebookEditor, (cell) => cell.isInputCollapsed = true);
  }
});
registerAction2(class ExpandAllCellInputsAction extends NotebookMultiCellAction {
  static {
    __name(this, "ExpandAllCellInputsAction");
  }
  constructor() {
    super({
      id: EXPAND_ALL_CELL_INPUTS_COMMAND_ID,
      title: localize2("notebookActions.expandAllCellInput", "Expand All Cell Inputs"),
      f1: true
    });
  }
  async runWithContext(accessor, context) {
    forEachCell(context.notebookEditor, (cell) => cell.isInputCollapsed = false);
  }
});
registerAction2(class CollapseAllCellOutputsAction extends NotebookMultiCellAction {
  static {
    __name(this, "CollapseAllCellOutputsAction");
  }
  constructor() {
    super({
      id: COLLAPSE_ALL_CELL_OUTPUTS_COMMAND_ID,
      title: localize2("notebookActions.collapseAllCellOutput", "Collapse All Cell Outputs"),
      f1: true
    });
  }
  async runWithContext(accessor, context) {
    forEachCell(context.notebookEditor, (cell) => cell.isOutputCollapsed = true);
  }
});
registerAction2(class ExpandAllCellOutputsAction extends NotebookMultiCellAction {
  static {
    __name(this, "ExpandAllCellOutputsAction");
  }
  constructor() {
    super({
      id: EXPAND_ALL_CELL_OUTPUTS_COMMAND_ID,
      title: localize2("notebookActions.expandAllCellOutput", "Expand All Cell Outputs"),
      f1: true
    });
  }
  async runWithContext(accessor, context) {
    forEachCell(context.notebookEditor, (cell) => cell.isOutputCollapsed = false);
  }
});
registerAction2(class ToggleCellOutputScrolling extends NotebookMultiCellAction {
  static {
    __name(this, "ToggleCellOutputScrolling");
  }
  constructor() {
    super({
      id: TOGGLE_CELL_OUTPUT_SCROLLING,
      title: localize2("notebookActions.toggleScrolling", "Toggle Scroll Cell Output"),
      keybinding: {
        when: ContextKeyExpr.and(NOTEBOOK_CELL_LIST_FOCUSED, InputFocusedContext.toNegated(), NOTEBOOK_CELL_HAS_OUTPUTS),
        primary: KeyChord(KeyMod.CtrlCmd | KeyCode.KeyK, KeyCode.KeyY),
        weight: KeybindingWeight.WorkbenchContrib
      }
    });
  }
  toggleOutputScrolling(viewModel, globalScrollSetting, collapsed) {
    const cellMetadata = viewModel.model.metadata;
    if (cellMetadata) {
      const currentlyEnabled = cellMetadata["scrollable"] !== void 0 ? cellMetadata["scrollable"] : globalScrollSetting;
      const shouldEnableScrolling = collapsed || !currentlyEnabled;
      cellMetadata["scrollable"] = shouldEnableScrolling;
      viewModel.resetRenderer();
    }
  }
  async runWithContext(accessor, context) {
    const globalScrolling = accessor.get(IConfigurationService).getValue(NotebookSetting.outputScrolling);
    if (context.ui) {
      context.cell.outputsViewModels.forEach((viewModel) => {
        this.toggleOutputScrolling(viewModel, globalScrolling, context.cell.isOutputCollapsed);
      });
      context.cell.isOutputCollapsed = false;
    } else {
      context.selectedCells.forEach((cell) => {
        cell.outputsViewModels.forEach((viewModel) => {
          this.toggleOutputScrolling(viewModel, globalScrolling, cell.isOutputCollapsed);
        });
        cell.isOutputCollapsed = false;
      });
    }
  }
});
function forEachCell(editor, callback) {
  for (let i = 0; i < editor.getLength(); i++) {
    const cell = editor.cellAt(i);
    callback(cell, i);
  }
}
__name(forEachCell, "forEachCell");
//# sourceMappingURL=cellCommands.js.map
