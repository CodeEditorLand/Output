var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { KeyCode, KeyMod } from "../../../../base/common/keyCodes.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { EditorAction, registerEditorAction, ServicesAccessor } from "../../../browser/editorExtensions.js";
import { ReplaceCommand } from "../../../common/commands/replaceCommand.js";
import { MoveOperations } from "../../../common/cursor/cursorMoveOperations.js";
import { Range } from "../../../common/core/range.js";
import { ICommand } from "../../../common/editorCommon.js";
import { EditorContextKeys } from "../../../common/editorContextKeys.js";
import * as nls from "../../../../nls.js";
import { KeybindingWeight } from "../../../../platform/keybinding/common/keybindingsRegistry.js";
class TransposeLettersAction extends EditorAction {
  static {
    __name(this, "TransposeLettersAction");
  }
  constructor() {
    super({
      id: "editor.action.transposeLetters",
      label: nls.localize("transposeLetters.label", "Transpose Letters"),
      alias: "Transpose Letters",
      precondition: EditorContextKeys.writable,
      kbOpts: {
        kbExpr: EditorContextKeys.textInputFocus,
        primary: 0,
        mac: {
          primary: KeyMod.WinCtrl | KeyCode.KeyT
        },
        weight: KeybindingWeight.EditorContrib
      }
    });
  }
  run(accessor, editor) {
    if (!editor.hasModel()) {
      return;
    }
    const model = editor.getModel();
    const commands = [];
    const selections = editor.getSelections();
    for (const selection of selections) {
      if (!selection.isEmpty()) {
        continue;
      }
      const lineNumber = selection.startLineNumber;
      const column = selection.startColumn;
      const lastColumn = model.getLineMaxColumn(lineNumber);
      if (lineNumber === 1 && (column === 1 || column === 2 && lastColumn === 2)) {
        continue;
      }
      const endPosition = column === lastColumn ? selection.getPosition() : MoveOperations.rightPosition(model, selection.getPosition().lineNumber, selection.getPosition().column);
      const middlePosition = MoveOperations.leftPosition(model, endPosition);
      const beginPosition = MoveOperations.leftPosition(model, middlePosition);
      const leftChar = model.getValueInRange(Range.fromPositions(beginPosition, middlePosition));
      const rightChar = model.getValueInRange(Range.fromPositions(middlePosition, endPosition));
      const replaceRange = Range.fromPositions(beginPosition, endPosition);
      commands.push(new ReplaceCommand(replaceRange, rightChar + leftChar));
    }
    if (commands.length > 0) {
      editor.pushUndoStop();
      editor.executeCommands(this.id, commands);
      editor.pushUndoStop();
    }
  }
}
registerEditorAction(TransposeLettersAction);
//# sourceMappingURL=transpose.js.map
