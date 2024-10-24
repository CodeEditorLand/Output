var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { KeyCode, KeyMod } from "../../../../base/common/keyCodes.js";
import { ICodeEditor } from "../../../browser/editorBrowser.js";
import { EditorAction, ServicesAccessor } from "../../../browser/editorExtensions.js";
import { EditorContextKeys } from "../../../common/editorContextKeys.js";
import { inlineEditAcceptId, inlineEditJumpBackId, inlineEditJumpToId, inlineEditRejectId } from "./commandIds.js";
import { InlineEditController } from "./inlineEditController.js";
import { MenuId } from "../../../../platform/actions/common/actions.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { KeybindingWeight } from "../../../../platform/keybinding/common/keybindingsRegistry.js";
class AcceptInlineEdit extends EditorAction {
  static {
    __name(this, "AcceptInlineEdit");
  }
  constructor() {
    super({
      id: inlineEditAcceptId,
      label: "Accept Inline Edit",
      alias: "Accept Inline Edit",
      precondition: ContextKeyExpr.and(EditorContextKeys.writable, InlineEditController.inlineEditVisibleContext),
      kbOpts: [
        {
          weight: KeybindingWeight.EditorContrib + 1,
          primary: KeyCode.Tab,
          kbExpr: ContextKeyExpr.and(EditorContextKeys.writable, InlineEditController.inlineEditVisibleContext, InlineEditController.cursorAtInlineEditContext)
        }
      ],
      menuOpts: [{
        menuId: MenuId.InlineEditToolbar,
        title: "Accept",
        group: "primary",
        order: 1
      }]
    });
  }
  async run(accessor, editor) {
    const controller = InlineEditController.get(editor);
    await controller?.accept();
  }
}
class TriggerInlineEdit extends EditorAction {
  static {
    __name(this, "TriggerInlineEdit");
  }
  constructor() {
    const activeExpr = ContextKeyExpr.and(EditorContextKeys.writable, ContextKeyExpr.not(InlineEditController.inlineEditVisibleKey));
    super({
      id: "editor.action.inlineEdit.trigger",
      label: "Trigger Inline Edit",
      alias: "Trigger Inline Edit",
      precondition: activeExpr,
      kbOpts: {
        weight: KeybindingWeight.EditorContrib + 1,
        primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.Equal,
        kbExpr: activeExpr
      }
    });
  }
  async run(accessor, editor) {
    const controller = InlineEditController.get(editor);
    controller?.trigger();
  }
}
class JumpToInlineEdit extends EditorAction {
  static {
    __name(this, "JumpToInlineEdit");
  }
  constructor() {
    const activeExpr = ContextKeyExpr.and(EditorContextKeys.writable, InlineEditController.inlineEditVisibleContext, ContextKeyExpr.not(InlineEditController.cursorAtInlineEditKey));
    super({
      id: inlineEditJumpToId,
      label: "Jump to Inline Edit",
      alias: "Jump to Inline Edit",
      precondition: activeExpr,
      kbOpts: {
        weight: KeybindingWeight.EditorContrib + 1,
        primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.Equal,
        kbExpr: activeExpr
      },
      menuOpts: [{
        menuId: MenuId.InlineEditToolbar,
        title: "Jump To Edit",
        group: "primary",
        order: 3,
        when: activeExpr
      }]
    });
  }
  async run(accessor, editor) {
    const controller = InlineEditController.get(editor);
    controller?.jumpToCurrent();
  }
}
class JumpBackInlineEdit extends EditorAction {
  static {
    __name(this, "JumpBackInlineEdit");
  }
  constructor() {
    const activeExpr = ContextKeyExpr.and(EditorContextKeys.writable, InlineEditController.cursorAtInlineEditContext);
    super({
      id: inlineEditJumpBackId,
      label: "Jump Back from Inline Edit",
      alias: "Jump Back from Inline Edit",
      precondition: activeExpr,
      kbOpts: {
        weight: KeybindingWeight.EditorContrib + 10,
        primary: KeyMod.CtrlCmd | KeyMod.Alt | KeyCode.Equal,
        kbExpr: activeExpr
      },
      menuOpts: [{
        menuId: MenuId.InlineEditToolbar,
        title: "Jump Back",
        group: "primary",
        order: 3,
        when: activeExpr
      }]
    });
  }
  async run(accessor, editor) {
    const controller = InlineEditController.get(editor);
    controller?.jumpBack();
  }
}
class RejectInlineEdit extends EditorAction {
  static {
    __name(this, "RejectInlineEdit");
  }
  constructor() {
    const activeExpr = ContextKeyExpr.and(EditorContextKeys.writable, InlineEditController.inlineEditVisibleContext);
    super({
      id: inlineEditRejectId,
      label: "Reject Inline Edit",
      alias: "Reject Inline Edit",
      precondition: activeExpr,
      kbOpts: {
        weight: KeybindingWeight.EditorContrib,
        primary: KeyCode.Escape,
        kbExpr: activeExpr
      },
      menuOpts: [{
        menuId: MenuId.InlineEditToolbar,
        title: "Reject",
        group: "secondary",
        order: 2
      }]
    });
  }
  async run(accessor, editor) {
    const controller = InlineEditController.get(editor);
    await controller?.clear();
  }
}
export {
  AcceptInlineEdit,
  JumpBackInlineEdit,
  JumpToInlineEdit,
  RejectInlineEdit,
  TriggerInlineEdit
};
//# sourceMappingURL=commands.js.map
