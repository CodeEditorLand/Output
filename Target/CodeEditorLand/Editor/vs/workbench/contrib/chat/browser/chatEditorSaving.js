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
import { Queue } from "../../../../base/common/async.js";
import { CancellationError } from "../../../../base/common/errors.js";
import { Disposable, DisposableMap, DisposableStore, MutableDisposable } from "../../../../base/common/lifecycle.js";
import { ServicesAccessor } from "../../../../editor/browser/editorExtensions.js";
import { localize } from "../../../../nls.js";
import { Action2, MenuId, registerAction2 } from "../../../../platform/actions/common/actions.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr } from "../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IEditorIdentifier, SaveReason } from "../../../common/editor.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { ITextFileService } from "../../../services/textfile/common/textfiles.js";
import { ChatAgentLocation, IChatAgentService } from "../common/chatAgents.js";
import { CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME, IChatEditingService, IChatEditingSession, WorkingSetEntryState } from "../common/chatEditingService.js";
let ChatEditorSaving = class extends Disposable {
  constructor(configService, chatEditingService, chatAgentService, textFileService, labelService, _dialogService, _fileConfigService) {
    super();
    this._dialogService = _dialogService;
    this._fileConfigService = _fileConfigService;
    const store = this._store.add(new DisposableStore());
    const queue = new Queue();
    const update = /* @__PURE__ */ __name(() => {
      store.clear();
      const alwaysSave = configService.getValue(ChatEditorSaving._config);
      if (alwaysSave) {
        return;
      }
      if (chatEditingService.currentEditingSession) {
        this._handleNewEditingSession(chatEditingService.currentEditingSession, store);
      }
      store.add(chatEditingService.onDidCreateEditingSession((e) => this._handleNewEditingSession(e, store)));
      store.add(textFileService.files.addSaveParticipant({
        participate: /* @__PURE__ */ __name(async (workingCopy, context, progress, token) => {
          if (context.reason !== SaveReason.EXPLICIT) {
            return;
          }
          const session = chatEditingService.getEditingSession(workingCopy.resource);
          if (!session) {
            return;
          }
          if (!session.entries.get().find((e) => e.state.get() === WorkingSetEntryState.Modified && e.modifiedURI.toString() === workingCopy.resource.toString())) {
            return;
          }
          await queue.queue(async () => {
            const alwaysSave2 = configService.getValue(ChatEditorSaving._config);
            if (alwaysSave2) {
              return;
            }
            const agentName = chatAgentService.getDefaultAgent(ChatAgentLocation.EditingSession)?.fullName;
            const filelabel = labelService.getUriBasenameLabel(workingCopy.resource);
            const message = agentName ? localize("message.1", "Do you want to save the changes {0} made in {1}?", agentName, filelabel) : localize("message.2", "Do you want to save the changes chat made in {0}?", filelabel);
            const result = await this._dialogService.confirm({
              message,
              detail: localize("detail2", "AI-generated changes may be incorrect and should be reviewed before saving.", agentName),
              primaryButton: localize("save", "Save"),
              cancelButton: localize("discard", "Cancel"),
              checkbox: {
                label: localize("config", "Always save with AI-generated changes without asking"),
                checked: false
              }
            });
            if (!result.confirmed) {
              throw new CancellationError();
            }
            if (result.checkboxChecked) {
              await configService.updateValue(ChatEditorSaving._config, true);
            }
          });
        }, "participate")
      }));
    }, "update");
    configService.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration(ChatEditorSaving._config)) {
        update();
      }
    });
    update();
  }
  static {
    __name(this, "ChatEditorSaving");
  }
  static ID = "workbench.chat.editorSaving";
  static _config = "chat.editing.alwaysSaveWithGeneratedChanges";
  _sessionStore = this._store.add(new DisposableMap());
  _handleNewEditingSession(session, container) {
    const store = new DisposableStore();
    container.add(store);
    const saveConfig = store.add(new MutableDisposable());
    const update = /* @__PURE__ */ __name(() => {
      const store2 = new DisposableStore();
      const entries = session.entries.get();
      for (const entry of entries) {
        if (entry.state.get() === WorkingSetEntryState.Modified) {
          store2.add(this._fileConfigService.disableAutoSave(entry.modifiedURI));
        }
      }
      saveConfig.value = store2;
    }, "update");
    update();
    this._sessionStore.set(session, store);
    store.add(session.onDidChange(() => {
      update();
    }));
    store.add(session.onDidDispose(() => {
      store.dispose();
      container.delete(store);
    }));
  }
};
ChatEditorSaving = __decorateClass([
  __decorateParam(0, IConfigurationService),
  __decorateParam(1, IChatEditingService),
  __decorateParam(2, IChatAgentService),
  __decorateParam(3, ITextFileService),
  __decorateParam(4, ILabelService),
  __decorateParam(5, IDialogService),
  __decorateParam(6, IFilesConfigurationService)
], ChatEditorSaving);
class ChatEditingSaveAllAction extends Action2 {
  static {
    __name(this, "ChatEditingSaveAllAction");
  }
  static ID = "chatEditing.saveAllFiles";
  static LABEL = localize("save.allFiles", "Save All");
  constructor() {
    super({
      id: ChatEditingSaveAllAction.ID,
      title: ChatEditingSaveAllAction.LABEL,
      menu: {
        when: ContextKeyExpr.equals("resourceScheme", CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME),
        id: MenuId.EditorTitle,
        order: 0,
        group: "navigation"
      }
    });
  }
  async run(accessor, ...args) {
    const chatEditingService = accessor.get(IChatEditingService);
    const editorService = accessor.get(IEditorService);
    const configService = accessor.get(IConfigurationService);
    const chatAgentService = accessor.get(IChatAgentService);
    const dialogService = accessor.get(IDialogService);
    const labelService = accessor.get(ILabelService);
    const currentEditingSession = chatEditingService.currentEditingSession;
    if (!currentEditingSession) {
      return;
    }
    const editors = [];
    for (const modifiedFileEntry of currentEditingSession.entries.get()) {
      if (modifiedFileEntry.state.get() === WorkingSetEntryState.Modified) {
        const modifiedFile = modifiedFileEntry.modifiedURI;
        const matchingEditors = editorService.findEditors(modifiedFile);
        if (matchingEditors.length === 0) {
          continue;
        }
        const matchingEditor = matchingEditors[0];
        if (matchingEditor.editor.isDirty()) {
          editors.push(matchingEditor);
        }
      }
    }
    if (editors.length === 0) {
      return;
    }
    const alwaysSave = configService.getValue(ChatEditorSaving._config);
    if (!alwaysSave) {
      const agentName = chatAgentService.getDefaultAgent(ChatAgentLocation.EditingSession)?.fullName;
      let message;
      if (editors.length === 1) {
        const resource = editors[0].editor.resource;
        if (resource) {
          const filelabel = labelService.getUriBasenameLabel(resource);
          message = agentName ? localize("message.batched.oneFile.1", "Do you want to save the changes {0} made in {1}?", agentName, filelabel) : localize("message.batched.oneFile.2", "Do you want to save the changes chat made in {0}?", filelabel);
        } else {
          message = agentName ? localize("message.batched.oneFile.3", "Do you want to save the changes {0} made in 1 file?", agentName) : localize("message.batched.oneFile.4", "Do you want to save the changes chat made in 1 file?");
        }
      } else {
        message = agentName ? localize("message.batched.multiFile.1", "Do you want to save the changes {0} made in {1} files?", agentName, editors.length) : localize("message.batched.multiFile.2", "Do you want to save the changes chat made in {0} files?", editors.length);
      }
      const result = await dialogService.confirm({
        message,
        detail: localize("detail2", "AI-generated changes may be incorrect and should be reviewed before saving.", agentName),
        primaryButton: localize("save all", "Save All"),
        cancelButton: localize("discard", "Cancel"),
        checkbox: {
          label: localize("config", "Always save with AI-generated changes without asking"),
          checked: false
        }
      });
      if (!result.confirmed) {
        return;
      }
      if (result.checkboxChecked) {
        await configService.updateValue(ChatEditorSaving._config, true);
      }
    }
    await editorService.save(editors, { reason: SaveReason.EXPLICIT, skipSaveParticipants: true });
  }
}
registerAction2(ChatEditingSaveAllAction);
export {
  ChatEditingSaveAllAction,
  ChatEditorSaving
};
//# sourceMappingURL=chatEditorSaving.js.map
