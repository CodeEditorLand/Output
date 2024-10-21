var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key2, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key2) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key2, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key2, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key2) => decorator(target, key2, index);
import { Queue } from "../../../../base/common/async.js";
import { CancellationToken } from "../../../../base/common/cancellation.js";
import { DisposableStore, MutableDisposable, combinedDisposable, dispose } from "../../../../base/common/lifecycle.js";
import { localize } from "../../../../nls.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IProgress, IProgressStep } from "../../../../platform/progress/common/progress.js";
import { SaveReason } from "../../../common/editor.js";
import { Session } from "./inlineChatSession.js";
import { IInlineChatSessionService } from "./inlineChatSessionService.js";
import { InlineChatConfigKeys } from "../common/inlineChat.js";
import { IEditorGroup, IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { ITextFileService } from "../../../services/textfile/common/textfiles.js";
import { IInlineChatSavingService } from "./inlineChatSavingService.js";
import { Iterable } from "../../../../base/common/iterator.js";
import { Schemas } from "../../../../base/common/network.js";
import { CellUri } from "../../notebook/common/notebookCommon.js";
import { IWorkingCopyFileService } from "../../../services/workingCopy/common/workingCopyFileService.js";
import { URI } from "../../../../base/common/uri.js";
import { Event } from "../../../../base/common/event.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { CancellationError } from "../../../../base/common/errors.js";
const key = "chat.editing.alwaysSaveWithGeneratedChanges";
let InlineChatSavingServiceImpl = class {
  constructor(_fileConfigService, _editorGroupService, _textFileService, _inlineChatSessionService, _configService, _workingCopyFileService, _dialogService, _labelService) {
    this._fileConfigService = _fileConfigService;
    this._editorGroupService = _editorGroupService;
    this._textFileService = _textFileService;
    this._configService = _configService;
    this._workingCopyFileService = _workingCopyFileService;
    this._dialogService = _dialogService;
    this._labelService = _labelService;
    this._store.add(Event.any(_inlineChatSessionService.onDidEndSession, _inlineChatSessionService.onDidStashSession)((e) => {
      this._sessionData.get(e.session)?.dispose();
    }));
    this._store.add(_configService.onDidChangeConfiguration((e) => {
      if (!e.affectsConfiguration(key) && !e.affectsConfiguration(InlineChatConfigKeys.AcceptedOrDiscardBeforeSave)) {
        return;
      }
      if (this._isDisabled()) {
        dispose(this._sessionData.values());
        this._sessionData.clear();
      }
    }));
  }
  static {
    __name(this, "InlineChatSavingServiceImpl");
  }
  _store = new DisposableStore();
  _saveParticipant = this._store.add(new MutableDisposable());
  _sessionData = /* @__PURE__ */ new Map();
  dispose() {
    this._store.dispose();
    dispose(this._sessionData.values());
  }
  markChanged(session) {
    if (this._isDisabled()) {
      return;
    }
    if (!this._sessionData.has(session)) {
      let uri = session.targetUri;
      if (uri.scheme === Schemas.vscodeNotebookCell) {
        const data = CellUri.parse(uri);
        if (!data) {
          return;
        }
        uri = data?.notebook;
      }
      if (this._sessionData.size === 0) {
        this._installSaveParticpant();
      }
      const saveConfigOverride = this._fileConfigService.disableAutoSave(uri);
      this._sessionData.set(session, {
        resourceUri: uri,
        groupCandidate: this._editorGroupService.activeGroup,
        session,
        dispose: /* @__PURE__ */ __name(() => {
          saveConfigOverride.dispose();
          this._sessionData.delete(session);
          if (this._sessionData.size === 0) {
            this._saveParticipant.clear();
          }
        }, "dispose")
      });
    }
  }
  _installSaveParticpant() {
    const queue = new Queue();
    const d1 = this._textFileService.files.addSaveParticipant({
      participate: /* @__PURE__ */ __name((model, ctx, progress, token) => {
        return queue.queue(() => this._participate(ctx.savedFrom ?? model.textEditorModel?.uri, ctx.reason, progress, token));
      }, "participate")
    });
    const d2 = this._workingCopyFileService.addSaveParticipant({
      participate: /* @__PURE__ */ __name((workingCopy, ctx, progress, token) => {
        return queue.queue(() => this._participate(ctx.savedFrom ?? workingCopy.resource, ctx.reason, progress, token));
      }, "participate")
    });
    this._saveParticipant.value = combinedDisposable(d1, d2, queue);
  }
  async _participate(uri, reason, progress, token) {
    if (reason !== SaveReason.EXPLICIT) {
      return;
    }
    if (this._isDisabled()) {
      return;
    }
    const sessions = /* @__PURE__ */ new Map();
    for (const [session, data] of this._sessionData) {
      if (uri?.toString() === data.resourceUri.toString()) {
        sessions.set(session, data);
      }
    }
    if (sessions.size === 0) {
      return;
    }
    let message;
    if (sessions.size === 1) {
      const session = Iterable.first(sessions.values()).session;
      const agentName = session.agent.fullName;
      const filelabel = this._labelService.getUriBasenameLabel(session.textModelN.uri);
      message = localize("message.1", "Do you want to save the changes {0} made in {1}?", agentName, filelabel);
    } else {
      const labels = Array.from(Iterable.map(sessions.values(), (i) => this._labelService.getUriBasenameLabel(i.session.textModelN.uri)));
      message = localize("message.2", "Do you want to save the changes inline chat made in {0}?", labels.join(", "));
    }
    const result = await this._dialogService.confirm({
      message,
      detail: localize("detail", "AI-generated changes may be incorect and should be reviewed before saving."),
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
      this._configService.updateValue(key, true);
    }
  }
  _isDisabled() {
    return this._configService.getValue(InlineChatConfigKeys.AcceptedOrDiscardBeforeSave) === true || this._configService.getValue(key);
  }
};
InlineChatSavingServiceImpl = __decorateClass([
  __decorateParam(0, IFilesConfigurationService),
  __decorateParam(1, IEditorGroupsService),
  __decorateParam(2, ITextFileService),
  __decorateParam(3, IInlineChatSessionService),
  __decorateParam(4, IConfigurationService),
  __decorateParam(5, IWorkingCopyFileService),
  __decorateParam(6, IDialogService),
  __decorateParam(7, ILabelService)
], InlineChatSavingServiceImpl);
export {
  InlineChatSavingServiceImpl
};
//# sourceMappingURL=inlineChatSavingServiceImpl.js.map
