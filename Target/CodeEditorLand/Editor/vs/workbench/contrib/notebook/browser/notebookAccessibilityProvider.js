var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { IListAccessibilityProvider } from "../../../../base/browser/ui/list/listWidget.js";
import { Event, Emitter } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { observableFromEvent } from "../../../../base/common/observable.js";
import * as nls from "../../../../nls.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { AccessibilityVerbositySettingId } from "../../accessibility/browser/accessibilityConfiguration.js";
import { AccessibilityCommandId } from "../../accessibility/common/accessibilityCommands.js";
import { CellViewModel, NotebookViewModel } from "./viewModel/notebookViewModelImpl.js";
import { CellKind, NotebookCellExecutionState } from "../common/notebookCommon.js";
import { ICellExecutionStateChangedEvent, IExecutionStateChangedEvent, INotebookExecutionStateService, NotebookExecutionType } from "../common/notebookExecutionStateService.js";
class NotebookAccessibilityProvider extends Disposable {
  constructor(notebookExecutionStateService, viewModel, keybindingService, configurationService, isReplHistory) {
    super();
    this.notebookExecutionStateService = notebookExecutionStateService;
    this.viewModel = viewModel;
    this.keybindingService = keybindingService;
    this.configurationService = configurationService;
    this.isReplHistory = isReplHistory;
    this._register(Event.debounce(
      this.notebookExecutionStateService.onDidChangeExecution,
      (last, e) => this.mergeEvents(last, e),
      100
    )((cellHandles) => {
      const viewModel2 = this.viewModel();
      if (viewModel2) {
        for (const handle of cellHandles) {
          const cellModel = viewModel2.getCellByHandle(handle);
          if (cellModel) {
            this._onDidAriaLabelChange.fire(cellModel);
          }
        }
      }
    }, this));
  }
  static {
    __name(this, "NotebookAccessibilityProvider");
  }
  _onDidAriaLabelChange = new Emitter();
  onDidAriaLabelChange = this._onDidAriaLabelChange.event;
  get verbositySettingId() {
    return this.isReplHistory ? AccessibilityVerbositySettingId.ReplEditor : AccessibilityVerbositySettingId.Notebook;
  }
  getAriaLabel(element) {
    const event = Event.filter(this.onDidAriaLabelChange, (e) => e === element);
    return observableFromEvent(this, event, () => {
      const viewModel = this.viewModel();
      if (!viewModel) {
        return "";
      }
      const index = viewModel.getCellIndex(element);
      if (index >= 0) {
        return this.getLabel(index, element);
      }
      return "";
    });
  }
  createItemLabel(executionLabel, index, cellKind) {
    return this.isReplHistory ? `item${executionLabel}` : `${cellKind === CellKind.Markup ? "markdown" : "code"} cell${executionLabel}`;
  }
  getLabel(index, element) {
    const executionState = this.notebookExecutionStateService.getCellExecution(element.uri)?.state;
    const executionLabel = executionState === NotebookCellExecutionState.Executing ? ", executing" : executionState === NotebookCellExecutionState.Pending ? ", pending" : "";
    return this.createItemLabel(executionLabel, index, element.cellKind);
  }
  get widgetAriaLabelName() {
    return this.isReplHistory ? nls.localize("replHistoryTreeAriaLabel", "REPL Editor History") : nls.localize("notebookTreeAriaLabel", "Notebook");
  }
  getWidgetAriaLabel() {
    const keybinding = this.keybindingService.lookupKeybinding(AccessibilityCommandId.OpenAccessibilityHelp)?.getLabel();
    if (this.configurationService.getValue(this.verbositySettingId)) {
      return keybinding ? nls.localize("notebookTreeAriaLabelHelp", "{0}\nUse {1} for accessibility help", this.widgetAriaLabelName, keybinding) : nls.localize("notebookTreeAriaLabelHelpNoKb", "{0}\nRun the Open Accessibility Help command for more information", this.widgetAriaLabelName);
    }
    return this.widgetAriaLabelName;
  }
  mergeEvents(last, e) {
    const viewModel = this.viewModel();
    const result = last || [];
    if (viewModel && e.type === NotebookExecutionType.cell && e.affectsNotebook(viewModel.uri)) {
      if (result.indexOf(e.cellHandle) < 0) {
        result.push(e.cellHandle);
      }
    }
    return result;
  }
}
export {
  NotebookAccessibilityProvider
};
//# sourceMappingURL=notebookAccessibilityProvider.js.map
