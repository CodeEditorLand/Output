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
import { Sequencer } from "../../../../../base/common/async.js";
import { BugIndicatingError } from "../../../../../base/common/errors.js";
import { Emitter } from "../../../../../base/common/event.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import { ResourceMap, ResourceSet } from "../../../../../base/common/map.js";
import { autorun, derived, IObservable, ITransaction, observableValue, transaction } from "../../../../../base/common/observable.js";
import { URI } from "../../../../../base/common/uri.js";
import { isCodeEditor, isDiffEditor } from "../../../../../editor/browser/editorBrowser.js";
import { IBulkEditService } from "../../../../../editor/browser/services/bulkEditService.js";
import { TextEdit } from "../../../../../editor/common/languages.js";
import { ILanguageService } from "../../../../../editor/common/languages/language.js";
import { ITextModel } from "../../../../../editor/common/model.js";
import { IModelService } from "../../../../../editor/common/services/model.js";
import { ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { localize } from "../../../../../nls.js";
import { IFileDialogService } from "../../../../../platform/dialogs/common/dialogs.js";
import { EditorActivation } from "../../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { IWorkspaceContextService } from "../../../../../platform/workspace/common/workspace.js";
import { IEditorCloseEvent } from "../../../../common/editor.js";
import { DiffEditorInput } from "../../../../common/editor/diffEditorInput.js";
import { IEditorGroupsService } from "../../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { MultiDiffEditor } from "../../../multiDiffEditor/browser/multiDiffEditor.js";
import { MultiDiffEditorInput } from "../../../multiDiffEditor/browser/multiDiffEditorInput.js";
import { ChatAgentLocation, IChatAgentService } from "../../common/chatAgents.js";
import { ChatEditingSessionState, ChatEditKind, IChatEditingSession, WorkingSetEntryState } from "../../common/chatEditingService.js";
import { IChatResponseModel } from "../../common/chatModel.js";
import { IChatWidgetService } from "../chat.js";
import { ChatEditingMultiDiffSourceResolver } from "./chatEditingService.js";
import { ChatEditingModifiedFileEntry, IModifiedEntryTelemetryInfo, ISnapshotEntry } from "./chatEditingModifiedFileEntry.js";
import { ChatEditingTextModelContentProvider } from "./chatEditingTextModelContentProviders.js";
import { Schemas } from "../../../../../base/common/network.js";
let ChatEditingSession = class extends Disposable {
  constructor(chatSessionId, editorPane, editingSessionFileLimitPromise, _instantiationService, _modelService, _languageService, _textModelService, _bulkEditService, _editorGroupsService, _editorService, _chatWidgetService, _workspaceContextService, _fileService, _dialogService, _chatAgentService) {
    super();
    this.chatSessionId = chatSessionId;
    this.editorPane = editorPane;
    this.editingSessionFileLimitPromise = editingSessionFileLimitPromise;
    this._instantiationService = _instantiationService;
    this._modelService = _modelService;
    this._languageService = _languageService;
    this._textModelService = _textModelService;
    this._bulkEditService = _bulkEditService;
    this._editorGroupsService = _editorGroupsService;
    this._editorService = _editorService;
    this._chatWidgetService = _chatWidgetService;
    this._workspaceContextService = _workspaceContextService;
    this._fileService = _fileService;
    this._dialogService = _dialogService;
    this._chatAgentService = _chatAgentService;
    const widget = _chatWidgetService.getWidgetBySessionId(chatSessionId);
    if (!widget) {
      return;
    }
    this._trackCurrentEditorsInWorkingSet();
    this._register(this._editorService.onDidActiveEditorChange(() => {
      this._trackCurrentEditorsInWorkingSet();
    }));
    this._register(this._editorService.onDidCloseEditor((e) => {
      this._trackCurrentEditorsInWorkingSet(e);
    }));
    this._register(autorun((reader) => {
      const entries = this.entries.read(reader);
      entries.forEach((entry) => {
        entry.state.read(reader);
      });
      this._onDidChange.fire();
    }));
  }
  static {
    __name(this, "ChatEditingSession");
  }
  _state = observableValue(this, ChatEditingSessionState.Initial);
  _linearHistory = observableValue(this, []);
  _linearHistoryIndex = observableValue(this, 0);
  /**
   * Contains the contents of a file when the AI first began doing edits to it.
   */
  _initialFileContents = new ResourceMap();
  _snapshots = /* @__PURE__ */ new Map();
  _filesToSkipCreating = new ResourceSet();
  _entriesObs = observableValue(this, []);
  get entries() {
    this._assertNotDisposed();
    return this._entriesObs;
  }
  _sequencer = new Sequencer();
  _workingSet = new ResourceMap();
  get workingSet() {
    this._assertNotDisposed();
    const result = new ResourceMap(this._workingSet);
    for (const entry of this._entriesObs.get()) {
      result.set(entry.modifiedURI, entry.state.get());
    }
    return result;
  }
  get state() {
    return this._state;
  }
  canUndo = derived((r) => {
    if (this.state.read(r) !== ChatEditingSessionState.Idle) {
      return false;
    }
    const linearHistoryIndex = this._linearHistoryIndex.read(r);
    return linearHistoryIndex > 0;
  });
  canRedo = derived((r) => {
    if (this.state.read(r) !== ChatEditingSessionState.Idle) {
      return false;
    }
    const linearHistory = this._linearHistory.read(r);
    const linearHistoryIndex = this._linearHistoryIndex.read(r);
    return linearHistoryIndex < linearHistory.length;
  });
  hiddenRequestIds = derived((r) => {
    const linearHistory = this._linearHistory.read(r);
    const linearHistoryIndex = this._linearHistoryIndex.read(r);
    return linearHistory.slice(linearHistoryIndex).map((s) => s.requestId).filter((r2) => !!r2);
  });
  _onDidChange = new Emitter();
  get onDidChange() {
    this._assertNotDisposed();
    return this._onDidChange.event;
  }
  _onDidDispose = new Emitter();
  get onDidDispose() {
    this._assertNotDisposed();
    return this._onDidDispose.event;
  }
  get isVisible() {
    this._assertNotDisposed();
    return Boolean(this.editorPane && this.editorPane.isVisible());
  }
  _trackCurrentEditorsInWorkingSet(e) {
    const widget = this._chatWidgetService.getWidgetBySessionId(this.chatSessionId);
    const requests = widget?.viewModel?.getItems();
    if (requests && requests.length > 0) {
      return;
    }
    const closedEditor = e?.editor.resource?.toString();
    const existingTransientEntries = new ResourceSet();
    for (const file of this._workingSet.keys()) {
      if (this._workingSet.get(file) === WorkingSetEntryState.Transient) {
        existingTransientEntries.add(file);
      }
    }
    if (existingTransientEntries.size === 0 && this._workingSet.size > 0) {
      return;
    }
    const activeEditors = new ResourceSet();
    this._editorGroupsService.groups.forEach((group) => {
      if (!group.activeEditorPane) {
        return;
      }
      let activeEditorControl = group.activeEditorPane.getControl();
      if (isDiffEditor(activeEditorControl)) {
        activeEditorControl = activeEditorControl.getOriginalEditor().hasTextFocus() ? activeEditorControl.getOriginalEditor() : activeEditorControl.getModifiedEditor();
      }
      if (isCodeEditor(activeEditorControl) && activeEditorControl.hasModel()) {
        const uri = activeEditorControl.getModel().uri;
        if (closedEditor === uri.toString()) {
        } else if (existingTransientEntries.has(uri)) {
          existingTransientEntries.delete(uri);
        } else {
          activeEditors.add(uri);
        }
      }
    });
    let didChange = false;
    for (const entry of existingTransientEntries) {
      didChange = this._workingSet.delete(entry) || didChange;
    }
    for (const entry of activeEditors) {
      this._workingSet.set(entry, WorkingSetEntryState.Transient);
      didChange = true;
    }
    if (didChange) {
      this._onDidChange.fire();
    }
  }
  createSnapshot(requestId) {
    const snapshot = this._createSnapshot(requestId);
    if (requestId) {
      this._snapshots.set(requestId, snapshot);
      for (const workingSetItem of this._workingSet.keys()) {
        this._workingSet.set(workingSetItem, WorkingSetEntryState.Sent);
      }
      const linearHistory = this._linearHistory.get();
      const linearHistoryIndex = this._linearHistoryIndex.get();
      const newLinearHistory = linearHistory.slice(0, linearHistoryIndex);
      newLinearHistory.push(snapshot);
      transaction((tx) => {
        this._linearHistory.set(newLinearHistory, tx);
        this._linearHistoryIndex.set(newLinearHistory.length, tx);
      });
    } else {
      this._pendingSnapshot = snapshot;
    }
  }
  _createSnapshot(requestId) {
    const workingSet = new ResourceMap();
    for (const [file, state] of this._workingSet) {
      workingSet.set(file, state);
    }
    const entries = new ResourceMap();
    for (const entry of this._entriesObs.get()) {
      entries.set(entry.modifiedURI, entry.createSnapshot(requestId));
    }
    return {
      requestId,
      workingSet,
      entries
    };
  }
  async getSnapshotModel(requestId, snapshotUri) {
    const entries = this._snapshots.get(requestId)?.entries;
    if (!entries) {
      return null;
    }
    const snapshotEntry = [...entries.values()].find((e) => e.snapshotUri.toString() === snapshotUri.toString());
    if (!snapshotEntry) {
      return null;
    }
    return this._modelService.createModel(snapshotEntry.current, this._languageService.createById(snapshotEntry.languageId), snapshotUri, false);
  }
  getSnapshot(requestId, uri) {
    const snapshot = this._snapshots.get(requestId);
    const snapshotEntries = snapshot?.entries;
    return snapshotEntries?.get(uri);
  }
  async restoreSnapshot(requestId) {
    if (requestId !== void 0) {
      const snapshot = this._snapshots.get(requestId);
      if (snapshot) {
        await this._restoreSnapshot(snapshot);
      }
    } else {
      await this._restoreSnapshot(void 0);
    }
  }
  /**
   * A snapshot representing the state of the working set before a new request has been sent
   */
  _pendingSnapshot;
  async _restoreSnapshot(snapshot) {
    if (!snapshot) {
      if (!this._pendingSnapshot) {
        return;
      }
      snapshot = this._pendingSnapshot;
      this._pendingSnapshot = void 0;
    } else if (!this._pendingSnapshot) {
      this.createSnapshot(void 0);
    }
    this._workingSet = new ResourceMap();
    snapshot.workingSet.forEach((state, uri) => this._workingSet.set(uri, state));
    for (const entry of this._entriesObs.get()) {
      const snapshotEntry = snapshot.entries.get(entry.modifiedURI);
      if (!snapshotEntry) {
        const initialContents = this._initialFileContents.get(entry.modifiedURI);
        if (typeof initialContents === "string") {
          entry.resetToInitialValue(initialContents);
        }
        entry.dispose();
      }
    }
    const entriesArr = [];
    for (const snapshotEntry of snapshot.entries.values()) {
      const entry = await this._getOrCreateModifiedFileEntry(snapshotEntry.resource, snapshotEntry.telemetryInfo);
      entry.restoreFromSnapshot(snapshotEntry);
      entriesArr.push(entry);
    }
    this._entriesObs.set(entriesArr, void 0);
  }
  remove(...uris) {
    this._assertNotDisposed();
    let didRemoveUris = false;
    for (const uri of uris) {
      didRemoveUris = this._workingSet.delete(uri) || didRemoveUris;
    }
    if (!didRemoveUris) {
      return;
    }
    this._onDidChange.fire();
  }
  _assertNotDisposed() {
    if (this._state.get() === ChatEditingSessionState.Disposed) {
      throw new BugIndicatingError(`Cannot access a disposed editing session`);
    }
  }
  async accept(...uris) {
    this._assertNotDisposed();
    if (uris.length === 0) {
      await Promise.all(this._entriesObs.get().map((entry) => entry.accept(void 0)));
    }
    for (const uri of uris) {
      const entry = this._entriesObs.get().find((e) => e.modifiedURI.toString() === uri.toString());
      if (entry) {
        await entry.accept(void 0);
      }
    }
    this._onDidChange.fire();
  }
  async reject(...uris) {
    this._assertNotDisposed();
    if (uris.length === 0) {
      await Promise.all(this._entriesObs.get().map((entry) => entry.reject(void 0)));
    }
    for (const uri of uris) {
      const entry = this._entriesObs.get().find((e) => e.modifiedURI.toString() === uri.toString());
      if (entry) {
        await entry.reject(void 0);
      }
    }
    this._onDidChange.fire();
  }
  async show() {
    this._assertNotDisposed();
    if (this.editorPane?.isVisible()) {
      return;
    } else if (this.editorPane?.input) {
      await this._editorGroupsService.activeGroup.openEditor(this.editorPane.input, { pinned: true, activation: EditorActivation.ACTIVATE });
      return;
    }
    const input = MultiDiffEditorInput.fromResourceMultiDiffEditorInput({
      multiDiffSource: ChatEditingMultiDiffSourceResolver.getMultiDiffSourceUri(),
      label: localize("multiDiffEditorInput.name", "Suggested Edits")
    }, this._instantiationService);
    const editorPane = await this._editorGroupsService.activeGroup.openEditor(input, { pinned: true, activation: EditorActivation.ACTIVATE });
    this.editorPane = editorPane;
  }
  async stop() {
    this._assertNotDisposed();
    await Promise.allSettled(this._editorGroupsService.groups.map(async (g) => {
      return Promise.allSettled(g.editors.map(async (e) => {
        if (e instanceof MultiDiffEditorInput || e instanceof DiffEditorInput && (e.original.resource?.scheme === ChatEditingModifiedFileEntry.scheme || e.original.resource?.scheme === ChatEditingTextModelContentProvider.scheme)) {
          await g.closeEditor(e);
        }
      }));
    }));
    if (this._state.get() !== ChatEditingSessionState.Disposed) {
      this.dispose();
    }
  }
  dispose() {
    this._assertNotDisposed();
    for (const entry of this._entriesObs.get()) {
      entry.dispose();
    }
    super.dispose();
    this._state.set(ChatEditingSessionState.Disposed, void 0);
    this._onDidDispose.fire();
  }
  getVirtualModel(documentId) {
    this._assertNotDisposed();
    const entry = this._entriesObs.get().find((e) => e.entryId === documentId);
    return entry?.docSnapshot ?? null;
  }
  acceptStreamingEditsStart() {
    if (this._state.get() === ChatEditingSessionState.Disposed) {
      return;
    }
    this._sequencer.queue(() => this._acceptStreamingEditsStart());
  }
  acceptTextEdits(resource, textEdits, responseModel) {
    if (this._state.get() === ChatEditingSessionState.Disposed) {
      return;
    }
    this._sequencer.queue(() => this._acceptTextEdits(resource, textEdits, responseModel));
  }
  resolve() {
    if (this._state.get() === ChatEditingSessionState.Disposed) {
      return;
    }
    this._sequencer.queue(() => this._resolve());
  }
  addFileToWorkingSet(resource) {
    if (!this._workingSet.has(resource)) {
      this._workingSet.set(resource, WorkingSetEntryState.Attached);
      for (const file of this._workingSet.keys()) {
        if (this._workingSet.get(file) === WorkingSetEntryState.Transient) {
          this._workingSet.set(file, WorkingSetEntryState.Attached);
        }
      }
      this._onDidChange.fire();
    }
  }
  async undoInteraction() {
    const linearHistory = this._linearHistory.get();
    const linearHistoryIndex = this._linearHistoryIndex.get();
    if (linearHistoryIndex <= 0) {
      return;
    }
    const previousSnapshot = linearHistory[linearHistoryIndex - 1];
    await this.restoreSnapshot(previousSnapshot.requestId);
    this._linearHistoryIndex.set(linearHistoryIndex - 1, void 0);
  }
  async redoInteraction() {
    const linearHistory = this._linearHistory.get();
    const linearHistoryIndex = this._linearHistoryIndex.get();
    if (linearHistoryIndex >= linearHistory.length) {
      return;
    }
    const nextSnapshot = linearHistoryIndex + 1 < linearHistory.length ? linearHistory[linearHistoryIndex + 1] : this._pendingSnapshot;
    if (!nextSnapshot) {
      return;
    }
    await this.restoreSnapshot(nextSnapshot.requestId);
    this._linearHistoryIndex.set(linearHistoryIndex + 1, void 0);
  }
  async _acceptStreamingEditsStart() {
    transaction((tx) => {
      this._state.set(ChatEditingSessionState.StreamingEdits, tx);
      for (const entry of this._entriesObs.get()) {
        entry.acceptStreamingEditsStart(tx);
      }
    });
  }
  async _acceptTextEdits(resource, textEdits, responseModel) {
    if (this._filesToSkipCreating.has(resource)) {
      return;
    }
    if (!this._entriesObs.get().find((e) => e.resource.toString() === resource.toString()) && this._entriesObs.get().length >= await this.editingSessionFileLimitPromise) {
      return;
    }
    if (resource.scheme !== Schemas.untitled && !this._workspaceContextService.getWorkspaceFolder(resource) && !await this._fileService.exists(resource)) {
      const saveLocation = await this._dialogService.showSaveDialog({ title: localize("chatEditing.fileSave", "{0} wants to create a file. Choose where it should be saved.", this._chatAgentService.getDefaultAgent(ChatAgentLocation.EditingSession)?.fullName ?? "Chat") });
      if (!saveLocation) {
        this._filesToSkipCreating.add(resource);
        return;
      }
      resource = saveLocation;
    }
    const telemetryInfo = new class {
      get agentId() {
        return responseModel.agent?.id;
      }
      get command() {
        return responseModel.slashCommand?.name;
      }
      get sessionId() {
        return responseModel.session.sessionId;
      }
      get requestId() {
        return responseModel.requestId;
      }
      get result() {
        return responseModel.result;
      }
    }();
    const entry = await this._getOrCreateModifiedFileEntry(resource, telemetryInfo);
    entry.acceptAgentEdits(textEdits);
  }
  async _resolve() {
    transaction((tx) => {
      for (const entry of this._entriesObs.get()) {
        entry.acceptStreamingEditsEnd(tx);
      }
      this._state.set(ChatEditingSessionState.Idle, tx);
    });
    this._onDidChange.fire();
  }
  async _getOrCreateModifiedFileEntry(resource, responseModel) {
    const existingEntry = this._entriesObs.get().find((e) => e.resource.toString() === resource.toString());
    if (existingEntry) {
      if (responseModel.requestId !== existingEntry.telemetryInfo.requestId) {
        existingEntry.updateTelemetryInfo(responseModel);
      }
      return existingEntry;
    }
    const entry = await this._createModifiedFileEntry(resource, responseModel);
    if (!this._initialFileContents.has(resource)) {
      this._initialFileContents.set(resource, entry.modifiedModel.getValue());
    }
    this._register(entry.onDidDelete(() => {
      const newEntries = this._entriesObs.get().filter((e) => e.modifiedURI.toString() !== entry.modifiedURI.toString());
      this._entriesObs.set(newEntries, void 0);
      this._workingSet.delete(entry.modifiedURI);
      this._onDidChange.fire();
    }));
    const entriesArr = [...this._entriesObs.get(), entry];
    this._entriesObs.set(entriesArr, void 0);
    this._onDidChange.fire();
    return entry;
  }
  async _createModifiedFileEntry(resource, responseModel, mustExist = false) {
    try {
      const ref = await this._textModelService.createModelReference(resource);
      return this._instantiationService.createInstance(ChatEditingModifiedFileEntry, resource, ref, { collapse: /* @__PURE__ */ __name((transaction2) => this._collapse(resource, transaction2), "collapse") }, responseModel, mustExist ? ChatEditKind.Created : ChatEditKind.Modified);
    } catch (err) {
      if (mustExist) {
        throw err;
      }
      await this._bulkEditService.apply({ edits: [{ newResource: resource }] });
      this._editorService.openEditor({ resource, options: { inactive: true, preserveFocus: true, pinned: true } });
      return this._createModifiedFileEntry(resource, responseModel, true);
    }
  }
  _collapse(resource, transaction2) {
    const multiDiffItem = this.editorPane?.findDocumentDiffItem(resource);
    if (multiDiffItem) {
      this.editorPane?.viewModel?.items.get().find((documentDiffItem) => String(documentDiffItem.originalUri) === String(multiDiffItem.originalUri) && String(documentDiffItem.modifiedUri) === String(multiDiffItem.modifiedUri))?.collapsed.set(true, transaction2);
    }
  }
};
ChatEditingSession = __decorateClass([
  __decorateParam(3, IInstantiationService),
  __decorateParam(4, IModelService),
  __decorateParam(5, ILanguageService),
  __decorateParam(6, ITextModelService),
  __decorateParam(7, IBulkEditService),
  __decorateParam(8, IEditorGroupsService),
  __decorateParam(9, IEditorService),
  __decorateParam(10, IChatWidgetService),
  __decorateParam(11, IWorkspaceContextService),
  __decorateParam(12, IFileService),
  __decorateParam(13, IFileDialogService),
  __decorateParam(14, IChatAgentService)
], ChatEditingSession);
export {
  ChatEditingSession
};
//# sourceMappingURL=chatEditingSession.js.map
