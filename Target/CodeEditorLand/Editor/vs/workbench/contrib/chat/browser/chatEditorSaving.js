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
import { Disposable, DisposableMap, DisposableStore, MutableDisposable } from "../../../../base/common/lifecycle.js";
import { localize, localize2 } from "../../../../nls.js";
import { Action2, registerAction2 } from "../../../../platform/actions/common/actions.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { SaveReason } from "../../../common/editor.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { ITextFileService } from "../../../services/textfile/common/textfiles.js";
import { ChatAgentLocation, IChatAgentService } from "../common/chatAgents.js";
import { IChatEditingService, IChatEditingSession, WorkingSetEntryState } from "../common/chatEditingService.js";
import { CHAT_CATEGORY } from "./actions/chatActions.js";
const _storageKey = "workbench.chat.editorSaving";
let ChatEditorSaving = class extends Disposable {
  constructor(chatEditingService, chatAgentService, textFileService, labelService, _dialogService, _storageService, _fileConfigService) {
    super();
    this._dialogService = _dialogService;
    this._storageService = _storageService;
    this._fileConfigService = _fileConfigService;
    const store = this._store.add(new DisposableStore());
    const queue = new Queue();
    const update = /* @__PURE__ */ __name(() => {
      store.clear();
      const alwaysAcceptOnSave = this._storageService.getBoolean(_storageKey, StorageScope.PROFILE, false);
      if (alwaysAcceptOnSave) {
        return;
      }
      store.add(chatEditingService.onDidCreateEditingSession((e) => this._handleNewEditingSession(e)));
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
            const alwaysAcceptOnSave2 = this._storageService.getBoolean(_storageKey, StorageScope.PROFILE, false);
            if (alwaysAcceptOnSave2) {
              await session.accept(workingCopy.resource);
              return;
            }
            const agentName = chatAgentService.getDefaultAgent(ChatAgentLocation.EditingSession)?.fullName;
            const filelabel = labelService.getUriBasenameLabel(workingCopy.resource);
            const message = agentName ? localize("message.1", "Do you want to accept the changes {0} made in {1}", agentName, filelabel) : localize("message.2", "Do you want to accept the changes chat made in {1}", filelabel);
            const result = await this._dialogService.confirm({
              message,
              detail: localize("detail", "AI-generated changes may be incorect and should be reviewed before saving.", agentName),
              primaryButton: localize("save", "Accept & Save"),
              cancelButton: localize("discard", "Discard & Save"),
              checkbox: {
                label: localize("config", "Always accept edits when saving"),
                checked: false
              }
            });
            if (result.confirmed) {
              await session.accept(workingCopy.resource);
              if (result.checkboxChecked) {
                this._storageService.store(_storageKey, true, StorageScope.PROFILE, StorageTarget.USER);
              }
            } else {
              await session.reject(workingCopy.resource);
            }
          });
        }, "participate")
      }));
    }, "update");
    this._storageService.onDidChangeValue(StorageScope.PROFILE, _storageKey, this._store)(update);
    update();
  }
  static {
    __name(this, "ChatEditorSaving");
  }
  static ID = "workbench.chat.editorSaving";
  _sessionStore = this._store.add(new DisposableMap());
  _handleNewEditingSession(session) {
    const store = new DisposableStore();
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
      this._sessionStore.deleteAndDispose(session);
    }));
  }
};
ChatEditorSaving = __decorateClass([
  __decorateParam(0, IChatEditingService),
  __decorateParam(1, IChatAgentService),
  __decorateParam(2, ITextFileService),
  __decorateParam(3, ILabelService),
  __decorateParam(4, IDialogService),
  __decorateParam(5, IStorageService),
  __decorateParam(6, IFilesConfigurationService)
], ChatEditorSaving);
registerAction2(class extends Action2 {
  constructor() {
    super({
      id: "workbench.action.resetChatEditorSaving",
      title: localize2("resetChatEditorSaving", "Reset Choise for 'Always accept edits when saving'"),
      category: CHAT_CATEGORY,
      f1: true
    });
  }
  run(accessor) {
    const storageService = accessor.get(IStorageService);
    storageService.remove(_storageKey, StorageScope.PROFILE);
  }
});
export {
  ChatEditorSaving
};
//# sourceMappingURL=chatEditorSaving.js.map
