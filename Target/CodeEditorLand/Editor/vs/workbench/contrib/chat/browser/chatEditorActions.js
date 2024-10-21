var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { isCodeEditor } from "../../../../editor/browser/editorBrowser.js";
import { localize2 } from "../../../../nls.js";
import { ServicesAccessor } from "../../../../editor/browser/editorExtensions.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { Action2, MenuId, registerAction2 } from "../../../../platform/actions/common/actions.js";
import { KeybindingWeight } from "../../../../platform/keybinding/common/keybindingsRegistry.js";
import { KeyCode, KeyMod } from "../../../../base/common/keyCodes.js";
import { CHAT_CATEGORY } from "./actions/chatActions.js";
import { ChatEditorController, ctxHasEditorModification } from "./chatEditorController.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { EditorContextKeys } from "../../../../editor/common/editorContextKeys.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IChatEditingService } from "../common/chatEditingService.js";
class NavigateAction extends Action2 {
  constructor(next) {
    super({
      id: next ? "chatEditor.action.navigateNext" : "chatEditor.action.navigatePrevious",
      title: next ? localize2("next", "Go to Next Chat Edit") : localize2("prev", "Go to Previous Chat Edit"),
      category: CHAT_CATEGORY,
      icon: next ? Codicon.arrowDown : Codicon.arrowUp,
      keybinding: {
        primary: next ? KeyMod.Alt | KeyCode.F5 : KeyMod.Alt | KeyMod.Shift | KeyCode.F5,
        weight: KeybindingWeight.EditorContrib,
        when: ContextKeyExpr.and(ctxHasEditorModification, EditorContextKeys.focus)
      },
      f1: true,
      menu: {
        id: MenuId.EditorTitle,
        group: "navigation",
        order: next ? -100 : -101,
        when: ctxHasEditorModification
      }
    });
    this.next = next;
  }
  static {
    __name(this, "NavigateAction");
  }
  run(accessor) {
    const editor = accessor.get(IEditorService).activeTextEditorControl;
    if (!isCodeEditor(editor)) {
      return;
    }
    if (this.next) {
      ChatEditorController.get(editor)?.revealNext();
    } else {
      ChatEditorController.get(editor)?.revealPrevious();
    }
  }
}
class AcceptDiscardAction extends Action2 {
  constructor(accept) {
    super({
      id: accept ? "chatEditor.action.accept" : "chatEditor.action.reject",
      title: accept ? localize2("accept", "Accept Chat Edit") : localize2("reject", "Reject Chat Edit"),
      category: CHAT_CATEGORY,
      icon: accept ? Codicon.check : Codicon.discard,
      menu: {
        id: MenuId.EditorTitle,
        group: "navigation",
        order: accept ? -103 : -102,
        when: ctxHasEditorModification
      }
    });
    this.accept = accept;
  }
  static {
    __name(this, "AcceptDiscardAction");
  }
  run(accessor) {
    const chatEditingService = accessor.get(IChatEditingService);
    const editorService = accessor.get(IEditorService);
    const editor = editorService.activeTextEditorControl;
    if (!isCodeEditor(editor) || !editor.hasModel()) {
      return;
    }
    const session = chatEditingService.getEditingSession(editor.getModel().uri);
    if (!session) {
      return;
    }
    if (this.accept) {
      session.accept(editor.getModel().uri);
    } else {
      session.reject(editor.getModel().uri);
    }
  }
}
function registerChatEditorActions() {
  registerAction2(class NextAction extends NavigateAction {
    static {
      __name(this, "NextAction");
    }
    constructor() {
      super(true);
    }
  });
  registerAction2(class PrevAction extends NavigateAction {
    static {
      __name(this, "PrevAction");
    }
    constructor() {
      super(false);
    }
  });
  registerAction2(class AcceptAction extends AcceptDiscardAction {
    static {
      __name(this, "AcceptAction");
    }
    constructor() {
      super(true);
    }
  });
  registerAction2(class RejectAction extends AcceptDiscardAction {
    static {
      __name(this, "RejectAction");
    }
    constructor() {
      super(false);
    }
  });
}
__name(registerChatEditorActions, "registerChatEditorActions");
export {
  registerChatEditorActions
};
//# sourceMappingURL=chatEditorActions.js.map
