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
import { RunOnceScheduler, timeout } from "../../../../../base/common/async.js";
import { Emitter } from "../../../../../base/common/event.js";
import { Disposable, IReference, toDisposable } from "../../../../../base/common/lifecycle.js";
import { IObservable, ITransaction, observableValue, transaction } from "../../../../../base/common/observable.js";
import { themeColorFromId } from "../../../../../base/common/themables.js";
import { URI } from "../../../../../base/common/uri.js";
import { IBulkEditService } from "../../../../../editor/browser/services/bulkEditService.js";
import { EditOperation, ISingleEditOperation } from "../../../../../editor/common/core/editOperation.js";
import { OffsetEdit } from "../../../../../editor/common/core/offsetEdit.js";
import { IDocumentDiff, nullDocumentDiff } from "../../../../../editor/common/diff/documentDiffProvider.js";
import { TextEdit } from "../../../../../editor/common/languages.js";
import { ILanguageService } from "../../../../../editor/common/languages/language.js";
import { IModelDeltaDecoration, ITextModel, OverviewRulerLane } from "../../../../../editor/common/model.js";
import { SingleModelEditStackElement } from "../../../../../editor/common/model/editStack.js";
import { ModelDecorationOptions, createTextBufferFactoryFromSnapshot } from "../../../../../editor/common/model/textModel.js";
import { OffsetEdits } from "../../../../../editor/common/model/textModelOffsetEdit.js";
import { IEditorWorkerService } from "../../../../../editor/common/services/editorWorker.js";
import { IModelService } from "../../../../../editor/common/services/model.js";
import { IResolvedTextEditorModel, ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { IModelContentChangedEvent } from "../../../../../editor/common/textModelEvents.js";
import { localize } from "../../../../../nls.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { editorSelectionBackground } from "../../../../../platform/theme/common/colorRegistry.js";
import { IUndoRedoService } from "../../../../../platform/undoRedo/common/undoRedo.js";
import { IChatAgentResult } from "../../common/chatAgents.js";
import { ChatEditKind, IModifiedFileEntry, WorkingSetEntryState } from "../../common/chatEditingService.js";
import { IChatService } from "../../common/chatService.js";
import { ChatEditingSnapshotTextModelContentProvider, ChatEditingTextModelContentProvider } from "./chatEditingTextModelContentProviders.js";
let ChatEditingModifiedFileEntry = class extends Disposable {
  constructor(resource, resourceRef, _multiDiffEntryDelegate, _telemetryInfo, kind, modelService, textModelService, languageService, bulkEditService, _chatService, _editorWorkerService, _undoRedoService, _fileService) {
    super();
    this.resource = resource;
    this._multiDiffEntryDelegate = _multiDiffEntryDelegate;
    this._telemetryInfo = _telemetryInfo;
    this.bulkEditService = bulkEditService;
    this._chatService = _chatService;
    this._editorWorkerService = _editorWorkerService;
    this._undoRedoService = _undoRedoService;
    this._fileService = _fileService;
    if (kind === ChatEditKind.Created) {
      this.createdInRequestId = this._telemetryInfo.requestId;
    }
    this.doc = resourceRef.object.textEditorModel;
    this.originalContent = this.doc.getValue();
    const docSnapshot = this.docSnapshot = this._register(
      modelService.createModel(
        createTextBufferFactoryFromSnapshot(this.doc.createSnapshot()),
        languageService.createById(this.doc.getLanguageId()),
        ChatEditingTextModelContentProvider.getFileURI(this.entryId, resource.path),
        false
      )
    );
    (async () => {
      const reference = await textModelService.createModelReference(docSnapshot.uri);
      if (this._store.isDisposed) {
        reference.dispose();
        return;
      }
      this._register(reference);
    })();
    this._register(resourceRef);
    this._register(this.doc.onDidChangeContent((e) => this._mirrorEdits(e)));
    this._register(this._fileService.watch(this.resource));
    this._register(this._fileService.onDidFilesChange((e) => {
      if (e.affects(this.resource) && kind === ChatEditKind.Created && e.gotDeleted()) {
        this._onDidDelete.fire();
        this.dispose();
      }
    }));
    this._register(toDisposable(() => {
      this._clearCurrentEditLineDecoration();
    }));
  }
  static {
    __name(this, "ChatEditingModifiedFileEntry");
  }
  static scheme = "modified-file-entry";
  static lastEntryId = 0;
  entryId = `${ChatEditingModifiedFileEntry.scheme}::${++ChatEditingModifiedFileEntry.lastEntryId}`;
  docSnapshot;
  doc;
  originalContent;
  _onDidDelete = this._register(new Emitter());
  get onDidDelete() {
    return this._onDidDelete.event;
  }
  get originalURI() {
    return this.docSnapshot.uri;
  }
  get originalModel() {
    return this.docSnapshot;
  }
  get modifiedURI() {
    return this.doc.uri;
  }
  get modifiedModel() {
    return this.doc;
  }
  _stateObs = observableValue(this, WorkingSetEntryState.Modified);
  get state() {
    return this._stateObs;
  }
  _isCurrentlyBeingModifiedObs = observableValue(this, false);
  get isCurrentlyBeingModified() {
    return this._isCurrentlyBeingModifiedObs;
  }
  _isFirstEditAfterStartOrSnapshot = true;
  _edit = OffsetEdit.empty;
  _isEditFromUs = false;
  _diffOperation;
  _diffOperationIds = 0;
  _diffInfo = observableValue(this, nullDocumentDiff);
  get diffInfo() {
    return this._diffInfo;
  }
  _editDecorationClear = this._register(new RunOnceScheduler(() => {
    this._editDecorations = this.doc.deltaDecorations(this._editDecorations, []);
  }, 3e3));
  _editDecorations = [];
  static _editDecorationOptions = ModelDecorationOptions.register({
    isWholeLine: true,
    description: "chat-editing",
    className: "rangeHighlight",
    marginClassName: "rangeHighlight",
    overviewRuler: {
      position: OverviewRulerLane.Full,
      color: themeColorFromId(editorSelectionBackground)
    }
  });
  get telemetryInfo() {
    return this._telemetryInfo;
  }
  createdInRequestId;
  get lastModifyingRequestId() {
    return this._telemetryInfo.requestId;
  }
  _clearCurrentEditLineDecoration() {
    this._editDecorations = this.doc.deltaDecorations(this._editDecorations, []);
  }
  updateTelemetryInfo(telemetryInfo) {
    this._telemetryInfo = telemetryInfo;
  }
  createSnapshot(requestId) {
    this._isFirstEditAfterStartOrSnapshot = true;
    return {
      resource: this.modifiedURI,
      languageId: this.modifiedModel.getLanguageId(),
      snapshotUri: ChatEditingSnapshotTextModelContentProvider.getSnapshotFileURI(requestId, this.modifiedURI.path),
      original: this.originalModel.getValue(),
      current: this.modifiedModel.getValue(),
      originalToCurrentEdit: this._edit,
      state: this.state.get(),
      telemetryInfo: this._telemetryInfo
    };
  }
  restoreFromSnapshot(snapshot) {
    this._stateObs.set(snapshot.state, void 0);
    this.docSnapshot.setValue(snapshot.original);
    this._setDocValue(snapshot.current);
    this._edit = snapshot.originalToCurrentEdit;
  }
  resetToInitialValue(value) {
    this._setDocValue(value);
  }
  acceptStreamingEditsStart(tx) {
    this._isCurrentlyBeingModifiedObs.set(false, tx);
    this._clearCurrentEditLineDecoration();
  }
  acceptStreamingEditsEnd(tx) {
    this._isCurrentlyBeingModifiedObs.set(false, tx);
    this._clearCurrentEditLineDecoration();
  }
  _mirrorEdits(event) {
    const edit = OffsetEdits.fromContentChanges(event.changes);
    if (this._isEditFromUs) {
      const e_sum = this._edit;
      const e_ai = edit;
      this._edit = e_sum.compose(e_ai);
    } else {
      const e_ai = this._edit;
      const e_user = edit;
      const e_user_r = e_user.tryRebase(e_ai.inverse(this.docSnapshot.getValue()), true);
      if (e_user_r === void 0) {
        this._edit = e_ai.compose(e_user);
      } else {
        const edits = OffsetEdits.asEditOperations(e_user_r, this.docSnapshot);
        this.docSnapshot.applyEdits(edits);
        this._edit = e_ai.tryRebase(e_user_r);
      }
    }
    if (!this.isCurrentlyBeingModified.get()) {
      const didResetToOriginalContent = this.doc.getValue() === this.originalContent;
      const currentState = this._stateObs.get();
      switch (currentState) {
        case WorkingSetEntryState.Accepted:
        case WorkingSetEntryState.Modified:
          if (didResetToOriginalContent) {
            this._stateObs.set(WorkingSetEntryState.Rejected, void 0);
            break;
          }
        case WorkingSetEntryState.Rejected:
          if (event.isUndoing && !didResetToOriginalContent) {
            this._stateObs.set(WorkingSetEntryState.Modified, void 0);
            break;
          }
      }
    }
    this._updateDiffInfoSeq(!this._isEditFromUs);
  }
  acceptAgentEdits(textEdits) {
    this._editDecorations = this.doc.deltaDecorations(this._editDecorations, textEdits.map((edit) => {
      return {
        options: ChatEditingModifiedFileEntry._editDecorationOptions,
        range: edit.range
      };
    }));
    this._editDecorationClear.schedule();
    if (this._isFirstEditAfterStartOrSnapshot) {
      this._isFirstEditAfterStartOrSnapshot = false;
      const request = this._chatService.getSession(this._telemetryInfo.sessionId)?.getRequests().at(-1);
      const label = request?.message.text ? localize("chatEditing1", "Chat Edit: '{0}'", request.message.text) : localize("chatEditing2", "Chat Edit");
      this._undoRedoService.pushElement(new SingleModelEditStackElement(label, "chat.edit", this.doc, null));
    }
    this._applyEdits(textEdits.map(TextEdit.asEditOperation));
    transaction((tx) => {
      this._stateObs.set(WorkingSetEntryState.Modified, tx);
      this._isCurrentlyBeingModifiedObs.set(true, tx);
    });
  }
  _applyEdits(edits) {
    this._isEditFromUs = true;
    try {
      this.doc.pushEditOperations(null, edits, () => null);
    } finally {
      this._isEditFromUs = false;
    }
  }
  _updateDiffInfoSeq(fast) {
    const myDiffOperationId = ++this._diffOperationIds;
    Promise.resolve(this._diffOperation).then(() => {
      if (this._diffOperationIds === myDiffOperationId) {
        this._diffOperation = this._updateDiffInfo(fast);
      }
    });
  }
  async _updateDiffInfo(fast) {
    const docVersionNow = this.doc.getVersionId();
    const snapshotVersionNow = this.docSnapshot.getVersionId();
    const [diff] = await Promise.all([
      this._editorWorkerService.computeDiff(
        this.docSnapshot.uri,
        this.doc.uri,
        { computeMoves: true, ignoreTrimWhitespace: false, maxComputationTimeMs: 3e3 },
        "advanced"
      ),
      timeout(fast ? 50 : 800)
      // DON't diff too fast
    ]);
    if (this.doc.getVersionId() === docVersionNow && this.docSnapshot.getVersionId() === snapshotVersionNow) {
      const diff2 = diff ?? nullDocumentDiff;
      this._diffInfo.set(diff2, void 0);
      this._edit = OffsetEdits.fromLineRangeMapping(this.docSnapshot, this.doc, diff2.changes);
    }
  }
  async accept(transaction2) {
    if (this._stateObs.get() !== WorkingSetEntryState.Modified) {
      return;
    }
    this.docSnapshot.setValue(this.doc.createSnapshot());
    this._stateObs.set(WorkingSetEntryState.Accepted, transaction2);
    await this.collapse(transaction2);
    this._notifyAction("accepted");
  }
  async reject(transaction2) {
    if (this._stateObs.get() !== WorkingSetEntryState.Modified) {
      return;
    }
    this._stateObs.set(WorkingSetEntryState.Rejected, transaction2);
    this._notifyAction("rejected");
    if (this.createdInRequestId === this._telemetryInfo.requestId) {
      await this._fileService.del(this.resource);
      this._onDidDelete.fire();
      this.dispose();
    } else {
      this._setDocValue(this.docSnapshot.getValue());
      await this.collapse(transaction2);
    }
  }
  _setDocValue(value) {
    this.doc.pushStackElement();
    const edit = EditOperation.replace(this.doc.getFullModelRange(), value);
    this._applyEdits([edit]);
    this.doc.pushStackElement();
  }
  async collapse(transaction2) {
    this._multiDiffEntryDelegate.collapse(transaction2);
  }
  _notifyAction(outcome) {
    this._chatService.notifyUserAction({
      action: { kind: "chatEditingSessionAction", uri: this.resource, hasRemainingEdits: false, outcome },
      agentId: this._telemetryInfo.agentId,
      command: this._telemetryInfo.command,
      sessionId: this._telemetryInfo.sessionId,
      requestId: this._telemetryInfo.requestId,
      result: this._telemetryInfo.result
    });
  }
};
ChatEditingModifiedFileEntry = __decorateClass([
  __decorateParam(5, IModelService),
  __decorateParam(6, ITextModelService),
  __decorateParam(7, ILanguageService),
  __decorateParam(8, IBulkEditService),
  __decorateParam(9, IChatService),
  __decorateParam(10, IEditorWorkerService),
  __decorateParam(11, IUndoRedoService),
  __decorateParam(12, IFileService)
], ChatEditingModifiedFileEntry);
export {
  ChatEditingModifiedFileEntry
};
//# sourceMappingURL=chatEditingModifiedFileEntry.js.map
