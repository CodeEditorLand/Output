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
import { AsyncIterableSource, RunOnceScheduler, Sequencer, timeout } from "../../../../base/common/async.js";
import { CancellationToken, CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { BugIndicatingError } from "../../../../base/common/errors.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { Disposable, DisposableStore, IDisposable, IReference } from "../../../../base/common/lifecycle.js";
import { ResourceMap, ResourceSet } from "../../../../base/common/map.js";
import { autorun, derived, IObservable, ITransaction, observableValue, ValueWithChangeEventFromObservable } from "../../../../base/common/observable.js";
import { isEqual } from "../../../../base/common/resources.js";
import { themeColorFromId, ThemeIcon } from "../../../../base/common/themables.js";
import { URI } from "../../../../base/common/uri.js";
import { isCodeEditor, isDiffEditor } from "../../../../editor/browser/editorBrowser.js";
import { IBulkEditService } from "../../../../editor/browser/services/bulkEditService.js";
import { EditOperation } from "../../../../editor/common/core/editOperation.js";
import { LineRange } from "../../../../editor/common/core/lineRange.js";
import { Range } from "../../../../editor/common/core/range.js";
import { IDocumentDiff, nullDocumentDiff } from "../../../../editor/common/diff/documentDiffProvider.js";
import { TextEdit } from "../../../../editor/common/languages.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IIdentifiedSingleEditOperation, IModelDeltaDecoration, ITextModel, OverviewRulerLane } from "../../../../editor/common/model.js";
import { SingleModelEditStackElement } from "../../../../editor/common/model/editStack.js";
import { createTextBufferFactoryFromSnapshot, ModelDecorationOptions } from "../../../../editor/common/model/textModel.js";
import { IEditorWorkerService } from "../../../../editor/common/services/editorWorker.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IResolvedTextEditorModel, ITextModelContentProvider, ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { IModelContentChangedEvent } from "../../../../editor/common/textModelEvents.js";
import { localize, localize2 } from "../../../../nls.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IFileDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { EditorActivation } from "../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { bindContextKey } from "../../../../platform/observable/common/platformObservableUtils.js";
import { IProgressService, ProgressLocation } from "../../../../platform/progress/common/progress.js";
import { editorSelectionBackground } from "../../../../platform/theme/common/colorRegistry.js";
import { IUndoRedoService } from "../../../../platform/undoRedo/common/undoRedo.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IEditorCloseEvent } from "../../../common/editor.js";
import { DiffEditorInput } from "../../../common/editor/diffEditorInput.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IDecorationData, IDecorationsProvider, IDecorationsService } from "../../../services/decorations/common/decorations.js";
import { IEditorGroup, IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { MultiDiffEditor } from "../../multiDiffEditor/browser/multiDiffEditor.js";
import { MultiDiffEditorInput } from "../../multiDiffEditor/browser/multiDiffEditorInput.js";
import { IMultiDiffSourceResolver, IMultiDiffSourceResolverService, IResolvedMultiDiffSource, MultiDiffEditorItem } from "../../multiDiffEditor/browser/multiDiffSourceResolverService.js";
import { ChatAgentLocation, IChatAgentResult, IChatAgentService } from "../common/chatAgents.js";
import { ICodeMapperResponse, ICodeMapperService } from "../common/chatCodeMapperService.js";
import { applyingChatEditsContextKey, CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME, chatEditingResourceContextKey, ChatEditingSessionState, decidedChatEditingResourceContextKey, IChatEditingService, IChatEditingSession, IChatEditingSessionStream, IModifiedFileEntry, inChatEditingSessionContextKey, WorkingSetEntryState } from "../common/chatEditingService.js";
import { IChatResponseModel, IChatTextEditGroup } from "../common/chatModel.js";
import { IChatService } from "../common/chatService.js";
import { IChatWidgetService } from "./chat.js";
let ChatEditingService = class extends Disposable {
  constructor(_editorGroupsService, _instantiationService, multiDiffSourceResolverService, textModelService, contextKeyService, _chatService, _progressService, _codeMapperService, _editorService, decorationsService) {
    super();
    this._editorGroupsService = _editorGroupsService;
    this._instantiationService = _instantiationService;
    this._chatService = _chatService;
    this._progressService = _progressService;
    this._codeMapperService = _codeMapperService;
    this._editorService = _editorService;
    this._register(decorationsService.registerDecorationsProvider(new ChatDecorationsProvider(this._currentSessionObs)));
    this._register(multiDiffSourceResolverService.registerResolver(_instantiationService.createInstance(ChatEditingMultiDiffSourceResolver, this._currentSessionObs)));
    textModelService.registerTextModelContentProvider(ChatEditingTextModelContentProvider.scheme, _instantiationService.createInstance(ChatEditingTextModelContentProvider, this._currentSessionObs));
    textModelService.registerTextModelContentProvider(ChatEditingSnapshotTextModelContentProvider.scheme, _instantiationService.createInstance(ChatEditingSnapshotTextModelContentProvider, this._currentSessionObs));
    this._register(bindContextKey(decidedChatEditingResourceContextKey, contextKeyService, (reader) => {
      const currentSession = this._currentSessionObs.read(reader);
      if (!currentSession) {
        return;
      }
      const entries = currentSession.entries.read(reader);
      const decidedEntries = entries.filter((entry) => entry.state.read(reader) !== WorkingSetEntryState.Modified);
      return decidedEntries.map((entry) => entry.entryId);
    }));
    this._register(bindContextKey(inChatEditingSessionContextKey, contextKeyService, (reader) => {
      return this._currentSessionObs.read(reader) !== null;
    }));
    this._register(bindContextKey(applyingChatEditsContextKey, contextKeyService, (reader) => {
      return this._currentAutoApplyOperationObs.read(reader) !== null;
    }));
    this._register(this._chatService.onDidDisposeSession((e) => {
      if (e.reason === "cleared" && this._currentSessionObs.get()?.chatSessionId === e.sessionId) {
        void this._currentSessionObs.get()?.stop();
      }
    }));
  }
  static {
    __name(this, "ChatEditingService");
  }
  _serviceBrand;
  _currentSessionObs = observableValue(this, null);
  _currentSessionDisposables = this._register(new DisposableStore());
  _currentAutoApplyOperationObs = observableValue(this, null);
  get currentAutoApplyOperation() {
    return this._currentAutoApplyOperationObs.get();
  }
  get currentEditingSession() {
    return this._currentSessionObs.get();
  }
  get currentEditingSessionObs() {
    return this._currentSessionObs;
  }
  _onDidCreateEditingSession = this._register(new Emitter());
  get onDidCreateEditingSession() {
    return this._onDidCreateEditingSession.event;
  }
  _onDidChangeEditingSession = this._register(new Emitter());
  onDidChangeEditingSession = this._onDidChangeEditingSession.event;
  getSnapshotUri(id, uri) {
    const session = this._currentSessionObs.get();
    if (!session) {
      return void 0;
    }
    return session.getSnapshot(id, uri)?.snapshotUri;
  }
  getEditingSession(resource) {
    const session = this.currentEditingSession;
    if (!session) {
      return null;
    }
    const entries = session.entries.get();
    for (const entry of entries) {
      if (entry.modifiedURI.toString() === resource.toString()) {
        return session;
      }
    }
    return null;
  }
  async addFileToWorkingSet(resource) {
    const session = this._currentSessionObs.get();
    if (session) {
      session.addFileToWorkingSet(resource);
    }
  }
  dispose() {
    this._currentSessionObs.get()?.dispose();
    super.dispose();
  }
  async startOrContinueEditingSession(chatSessionId, options) {
    const session = this._currentSessionObs.get();
    if (session) {
      if (session.chatSessionId !== chatSessionId) {
        throw new BugIndicatingError("Cannot start new session while another session is active");
      }
    }
    return this._createEditingSession(chatSessionId, options);
  }
  async _createEditingSession(chatSessionId, options) {
    if (this._currentSessionObs.get()) {
      throw new BugIndicatingError("Cannot have more than one active editing session");
    }
    this._currentSessionDisposables.clear();
    this._currentSessionDisposables.add(this.installAutoApplyObserver(chatSessionId));
    const input = MultiDiffEditorInput.fromResourceMultiDiffEditorInput({
      multiDiffSource: ChatEditingMultiDiffSourceResolver.getMultiDiffSourceUri(),
      label: localize("multiDiffEditorInput.name", "Suggested Edits")
    }, this._instantiationService);
    const editorPane = options?.silent ? void 0 : await this._editorGroupsService.activeGroup.openEditor(input, { pinned: true, activation: EditorActivation.ACTIVATE });
    const session = this._instantiationService.createInstance(ChatEditingSession, chatSessionId, editorPane);
    this._currentSessionDisposables.add(session.onDidDispose(() => {
      this._currentSessionDisposables.clear();
      this._currentSessionObs.set(null, void 0);
      this._onDidChangeEditingSession.fire();
    }));
    this._currentSessionDisposables.add(session.onDidChange(() => {
      this._onDidChangeEditingSession.fire();
    }));
    this._currentSessionObs.set(session, void 0);
    this._onDidCreateEditingSession.fire(session);
    this._onDidChangeEditingSession.fire();
    return session;
  }
  triggerEditComputation(responseModel) {
    return this._continueEditingSession(async (builder, token) => {
      const codeMapperResponse = {
        textEdit: /* @__PURE__ */ __name((resource, edits) => builder.textEdits(resource, edits, responseModel), "textEdit")
      };
      await this._codeMapperService.mapCodeFromResponse(responseModel, codeMapperResponse, token);
    }, { silent: true });
  }
  createSnapshot(requestId) {
    this._currentSessionObs.get()?.createSnapshot(requestId);
  }
  async restoreSnapshot(requestId) {
    await this._currentSessionObs.get()?.restoreSnapshot(requestId);
  }
  installAutoApplyObserver(sessionId) {
    const chatModel = this._chatService.getSession(sessionId);
    if (!chatModel) {
      throw new Error(`Edit session was created for a non-existing chat session: ${sessionId}`);
    }
    const observerDisposables = new DisposableStore();
    let editsSource;
    const editsSeen = new ResourceMap();
    const onResponseComplete = /* @__PURE__ */ __name((responseModel) => {
      if (responseModel.result?.metadata?.autoApplyEdits) {
        this.triggerEditComputation(responseModel);
      }
      editsSource?.resolve();
      editsSource = void 0;
      editsSeen.clear();
    }, "onResponseComplete");
    const handleResponseParts = /* @__PURE__ */ __name((responseModel) => {
      for (const part of responseModel.response.value) {
        if (part.kind === "codeblockUri" || part.kind === "textEditGroup") {
          this._editorService.openEditor({ resource: part.uri, options: { inactive: true, preserveFocus: true, pinned: true } });
          const first = editsSeen.size === 0;
          let entry = editsSeen.get(part.uri);
          if (!entry) {
            entry = { seen: 0 };
            editsSeen.set(part.uri, entry);
          }
          const allEdits = part.kind === "textEditGroup" ? part.edits : [];
          const newEdits = allEdits.slice(entry.seen);
          entry.seen += newEdits.length;
          editsSource ??= new AsyncIterableSource();
          editsSource.emitOne({ uri: part.uri, edits: newEdits, kind: "textEditGroup" });
          if (first) {
            this._continueEditingSession(async (builder, token) => {
              for await (const item of editsSource.asyncIterable) {
                if (token.isCancellationRequested) {
                  break;
                }
                for (const group of item.edits) {
                  builder.textEdits(item.uri, group, responseModel);
                }
              }
            }, { silent: true });
          }
        }
      }
    }, "handleResponseParts");
    observerDisposables.add(chatModel.onDidChange((e) => {
      if (e.kind === "addRequest") {
        const responseModel = e.request.response;
        if (responseModel) {
          if (responseModel.isComplete) {
            handleResponseParts(responseModel);
            onResponseComplete(responseModel);
          } else {
            const disposable = responseModel.onDidChange(() => {
              handleResponseParts(responseModel);
              if (responseModel.isComplete) {
                onResponseComplete(responseModel);
                disposable.dispose();
              } else if (responseModel.isCanceled || responseModel.isStale) {
                disposable.dispose();
              }
            });
          }
        }
      }
    }));
    observerDisposables.add(chatModel.onDidDispose(() => observerDisposables.dispose()));
    return observerDisposables;
  }
  async _continueEditingSession(builder, options) {
    const session = this._currentSessionObs.get();
    if (!session) {
      throw new BugIndicatingError("Cannot continue missing session");
    }
    if (session.state.get() === ChatEditingSessionState.StreamingEdits) {
      throw new BugIndicatingError("Cannot continue session that is still streaming");
    }
    let editorPane;
    if (!options?.silent && session.isVisible) {
      const groupedEditors = this._findGroupedEditors();
      if (groupedEditors.length !== 1) {
        throw new Error(`Unexpected number of editors: ${groupedEditors.length}`);
      }
      const [group, editor] = groupedEditors[0];
      editorPane = await group.openEditor(editor, { pinned: true, activation: EditorActivation.ACTIVATE });
    }
    const stream = {
      textEdits: /* @__PURE__ */ __name((resource, textEdits, responseModel) => {
        session.acceptTextEdits(resource, textEdits, responseModel);
      }, "textEdits")
    };
    session.acceptStreamingEditsStart();
    const cancellationTokenSource = new CancellationTokenSource();
    this._currentAutoApplyOperationObs.set(cancellationTokenSource, void 0);
    try {
      if (editorPane) {
        await editorPane?.showWhile(builder(stream, cancellationTokenSource.token));
      } else {
        await this._progressService.withProgress(
          {
            location: ProgressLocation.Window,
            title: localize2("chatEditing.startingSession", "Generating edits...").value
          },
          async () => {
            await builder(stream, cancellationTokenSource.token);
          },
          () => cancellationTokenSource.cancel()
        );
      }
    } finally {
      cancellationTokenSource.dispose();
      this._currentAutoApplyOperationObs.set(null, void 0);
      session.resolve();
    }
  }
  _findGroupedEditors() {
    const editors = [];
    for (const group of this._editorGroupsService.groups) {
      for (const editor of group.editors) {
        if (editor.resource?.scheme === ChatEditingMultiDiffSourceResolver.scheme) {
          editors.push([group, editor]);
        }
      }
    }
    return editors;
  }
};
ChatEditingService = __decorateClass([
  __decorateParam(0, IEditorGroupsService),
  __decorateParam(1, IInstantiationService),
  __decorateParam(2, IMultiDiffSourceResolverService),
  __decorateParam(3, ITextModelService),
  __decorateParam(4, IContextKeyService),
  __decorateParam(5, IChatService),
  __decorateParam(6, IProgressService),
  __decorateParam(7, ICodeMapperService),
  __decorateParam(8, IEditorService),
  __decorateParam(9, IDecorationsService)
], ChatEditingService);
class ChatDecorationsProvider extends Disposable {
  constructor(_session) {
    super();
    this._session = _session;
    this._store.add(autorun((r) => {
      const session = _session.read(r);
      if (!session) {
        return;
      }
      const state = session.state.read(r);
      if (state === ChatEditingSessionState.Disposed) {
        return;
      }
      const entries = session.entries.read(r);
      const uris = [];
      for (const entry of entries) {
        entry.state.read(r);
        uris.push(entry.modifiedURI);
      }
      this._onDidChange.fire(uris);
    }));
  }
  static {
    __name(this, "ChatDecorationsProvider");
  }
  label = localize("chat", "Chat Editing");
  _onDidChange = new Emitter();
  onDidChange = this._onDidChange.event;
  provideDecorations(uri, _token) {
    const session = this._session.get();
    if (!session) {
      return void 0;
    }
    if (session.state.get() !== ChatEditingSessionState.StreamingEdits) {
      return void 0;
    }
    const entry = session.entries.get().find((entry2) => isEqual(uri, entry2.modifiedURI));
    if (!entry) {
      return void 0;
    }
    const state = entry.state.get();
    if (state !== WorkingSetEntryState.Modified) {
      return void 0;
    }
    return {
      weight: 1e3,
      letter: ThemeIcon.modify(Codicon.loading, "spin"),
      bubble: false
    };
  }
}
let ChatEditingMultiDiffSourceResolver = class {
  constructor(_currentSession, _instantiationService) {
    this._currentSession = _currentSession;
    this._instantiationService = _instantiationService;
  }
  static {
    __name(this, "ChatEditingMultiDiffSourceResolver");
  }
  static scheme = CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME;
  static getMultiDiffSourceUri() {
    return URI.from({
      scheme: ChatEditingMultiDiffSourceResolver.scheme,
      path: ""
    });
  }
  canHandleUri(uri) {
    return uri.scheme === ChatEditingMultiDiffSourceResolver.scheme;
  }
  async resolveDiffSource(uri) {
    return this._instantiationService.createInstance(ChatEditingMultiDiffSource, this._currentSession);
  }
};
ChatEditingMultiDiffSourceResolver = __decorateClass([
  __decorateParam(1, IInstantiationService)
], ChatEditingMultiDiffSourceResolver);
class ChatEditingMultiDiffSource {
  constructor(_currentSession) {
    this._currentSession = _currentSession;
  }
  static {
    __name(this, "ChatEditingMultiDiffSource");
  }
  _resources = derived(this, (reader) => {
    const currentSession = this._currentSession.read(reader);
    if (!currentSession) {
      return [];
    }
    const entries = currentSession.entries.read(reader);
    return entries.map((entry) => {
      return new MultiDiffEditorItem(
        entry.originalURI,
        entry.modifiedURI,
        void 0,
        {
          [chatEditingResourceContextKey.key]: entry.entryId
          // [inChatEditingSessionContextKey.key]: true
        }
      );
    });
  });
  resources = new ValueWithChangeEventFromObservable(this._resources);
  contextKeys = {
    [inChatEditingSessionContextKey.key]: true
  };
}
let ChatEditingTextModelContentProvider = class {
  constructor(_currentSessionObs, _modelService) {
    this._currentSessionObs = _currentSessionObs;
    this._modelService = _modelService;
  }
  static {
    __name(this, "ChatEditingTextModelContentProvider");
  }
  static scheme = "chat-editing-text-model";
  static getEmptyFileURI() {
    return URI.from({
      scheme: ChatEditingTextModelContentProvider.scheme,
      query: JSON.stringify({ kind: "empty" })
    });
  }
  static getFileURI(documentId, path) {
    return URI.from({
      scheme: ChatEditingTextModelContentProvider.scheme,
      path,
      query: JSON.stringify({ kind: "doc", documentId })
    });
  }
  async provideTextContent(resource) {
    const existing = this._modelService.getModel(resource);
    if (existing && !existing.isDisposed()) {
      return existing;
    }
    const data = JSON.parse(resource.query);
    if (data.kind === "empty") {
      return this._modelService.createModel("", null, resource, false);
    }
    const session = this._currentSessionObs.get();
    if (!session) {
      return null;
    }
    return session.getVirtualModel(data.documentId);
  }
};
ChatEditingTextModelContentProvider = __decorateClass([
  __decorateParam(1, IModelService)
], ChatEditingTextModelContentProvider);
let ChatEditingSnapshotTextModelContentProvider = class {
  constructor(_currentSessionObs, _modelService) {
    this._currentSessionObs = _currentSessionObs;
    this._modelService = _modelService;
  }
  static {
    __name(this, "ChatEditingSnapshotTextModelContentProvider");
  }
  static scheme = "chat-editing-snapshot-text-model";
  static getSnapshotFileURI(requestId, path) {
    return URI.from({
      scheme: ChatEditingSnapshotTextModelContentProvider.scheme,
      path,
      query: JSON.stringify({ requestId: requestId ?? "" })
    });
  }
  async provideTextContent(resource) {
    const existing = this._modelService.getModel(resource);
    if (existing && !existing.isDisposed()) {
      return existing;
    }
    const data = JSON.parse(resource.query);
    const session = this._currentSessionObs.get();
    if (!session || !data.requestId) {
      return null;
    }
    return session.getSnapshotModel(data.requestId, resource);
  }
};
ChatEditingSnapshotTextModelContentProvider = __decorateClass([
  __decorateParam(1, IModelService)
], ChatEditingSnapshotTextModelContentProvider);
let ChatEditingSession = class extends Disposable {
  constructor(chatSessionId, editorPane, _instantiationService, _modelService, _languageService, _textModelService, _bulkEditService, _editorGroupsService, _editorService, chatWidgetService, _workspaceContextService, _fileService, _dialogService, _chatAgentService) {
    super();
    this.chatSessionId = chatSessionId;
    this.editorPane = editorPane;
    this._instantiationService = _instantiationService;
    this._modelService = _modelService;
    this._languageService = _languageService;
    this._textModelService = _textModelService;
    this._bulkEditService = _bulkEditService;
    this._editorGroupsService = _editorGroupsService;
    this._editorService = _editorService;
    this._workspaceContextService = _workspaceContextService;
    this._fileService = _fileService;
    this._dialogService = _dialogService;
    this._chatAgentService = _chatAgentService;
    const widget = chatWidgetService.getWidgetBySessionId(chatSessionId);
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
  }
  static {
    __name(this, "ChatEditingSession");
  }
  _state = observableValue(this, ChatEditingSessionState.Initial);
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
  _entries = [];
  _workingSet = new ResourceMap();
  get workingSet() {
    this._assertNotDisposed();
    return this._workingSet;
  }
  get state() {
    return this._state;
  }
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
      didChange ||= this._workingSet.delete(entry);
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
    } else {
      this.createSnapshot(void 0);
    }
    this._workingSet = new ResourceMap();
    snapshot.workingSet.forEach((state, uri) => this._workingSet.set(uri, state));
    for (const entry of this._entries) {
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
    this._entries = entriesArr;
    this._entriesObs.set(this._entries, void 0);
  }
  remove(...uris) {
    this._assertNotDisposed();
    let didRemoveUris = false;
    for (const uri of uris) {
      didRemoveUris ||= this._workingSet.delete(uri);
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
      await Promise.all(this._entries.map((entry) => entry.accept(void 0)));
    }
    for (const uri of uris) {
      const entry = this._entries.find((e) => e.modifiedURI.toString() === uri.toString());
      if (entry) {
        await entry.accept(void 0);
      }
    }
    this._onDidChange.fire();
  }
  async reject(...uris) {
    this._assertNotDisposed();
    if (uris.length === 0) {
      await Promise.all(this._entries.map((entry) => entry.reject(void 0)));
    }
    for (const uri of uris) {
      const entry = this._entries.find((e) => e.modifiedURI.toString() === uri.toString());
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
        if (e instanceof MultiDiffEditorInput || e instanceof DiffEditorInput && (e.original.resource?.scheme === ModifiedFileEntry.scheme || e.original.resource?.scheme === ChatEditingTextModelContentProvider.scheme)) {
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
    super.dispose();
    this._state.set(ChatEditingSessionState.Disposed, void 0);
    this._onDidDispose.fire();
  }
  getVirtualModel(documentId) {
    this._assertNotDisposed();
    const entry = this._entries.find((e) => e.entryId === documentId);
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
  async _acceptStreamingEditsStart() {
    this._state.set(ChatEditingSessionState.StreamingEdits, void 0);
    this._onDidChange.fire();
  }
  async _acceptTextEdits(resource, textEdits, responseModel) {
    if (this._filesToSkipCreating.has(resource)) {
      return;
    }
    if (!this._workspaceContextService.getWorkspaceFolder(resource) && !this._fileService.exists(resource)) {
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
    entry.applyEdits(textEdits);
  }
  async _resolve() {
    this._state.set(ChatEditingSessionState.Idle, void 0);
    this._onDidChange.fire();
  }
  async _getOrCreateModifiedFileEntry(resource, responseModel) {
    const existingEntry = this._entries.find((e) => e.resource.toString() === resource.toString());
    if (existingEntry) {
      return existingEntry;
    }
    const entry = await this._createModifiedFileEntry(resource, responseModel);
    this._register(entry);
    this._initialFileContents.set(resource, entry.modifiedModel.getValue());
    this._entries = [...this._entries, entry];
    this._entriesObs.set(this._entries, void 0);
    this._onDidChange.fire();
    return entry;
  }
  async _createModifiedFileEntry(resource, responseModel, mustExist = false) {
    try {
      const ref = await this._textModelService.createModelReference(resource);
      return this._instantiationService.createInstance(ModifiedFileEntry, resource, ref, { collapse: /* @__PURE__ */ __name((transaction) => this._collapse(resource, transaction), "collapse") }, responseModel);
    } catch (err) {
      if (mustExist) {
        throw err;
      }
      await this._bulkEditService.apply({ edits: [{ newResource: resource }] });
      return this._createModifiedFileEntry(resource, responseModel, true);
    }
  }
  _collapse(resource, transaction) {
    const multiDiffItem = this.editorPane?.findDocumentDiffItem(resource);
    if (multiDiffItem) {
      this.editorPane?.viewModel?.items.get().find((documentDiffItem) => String(documentDiffItem.originalUri) === String(multiDiffItem.originalUri) && String(documentDiffItem.modifiedUri) === String(multiDiffItem.modifiedUri))?.collapsed.set(true, transaction);
    }
  }
};
ChatEditingSession = __decorateClass([
  __decorateParam(2, IInstantiationService),
  __decorateParam(3, IModelService),
  __decorateParam(4, ILanguageService),
  __decorateParam(5, ITextModelService),
  __decorateParam(6, IBulkEditService),
  __decorateParam(7, IEditorGroupsService),
  __decorateParam(8, IEditorService),
  __decorateParam(9, IChatWidgetService),
  __decorateParam(10, IWorkspaceContextService),
  __decorateParam(11, IFileService),
  __decorateParam(12, IFileDialogService),
  __decorateParam(13, IChatAgentService)
], ChatEditingSession);
let ModifiedFileEntry = class extends Disposable {
  constructor(resource, resourceRef, _multiDiffEntryDelegate, _telemetryInfo, modelService, textModelService, languageService, bulkEditService, _chatService, _editorWorkerService, _undoRedoService) {
    super();
    this.resource = resource;
    this._multiDiffEntryDelegate = _multiDiffEntryDelegate;
    this._telemetryInfo = _telemetryInfo;
    this.bulkEditService = bulkEditService;
    this._chatService = _chatService;
    this._editorWorkerService = _editorWorkerService;
    this._undoRedoService = _undoRedoService;
    this.doc = resourceRef.object.textEditorModel;
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
  }
  static {
    __name(this, "ModifiedFileEntry");
  }
  static scheme = "modified-file-entry";
  static lastEntryId = 0;
  entryId = `${ModifiedFileEntry.scheme}::${++ModifiedFileEntry.lastEntryId}`;
  docSnapshot;
  doc;
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
  _isFirstEditAfterStartOrSnapshot = true;
  _isApplyingEdits = false;
  _diffOperation;
  _diffOperationIds = 0;
  _diffInfo = observableValue(this, nullDocumentDiff);
  get diffInfo() {
    return this._diffInfo;
  }
  _editDecorationClear = this._register(new RunOnceScheduler(() => {
    this._editDecorations = this.doc.deltaDecorations(this._editDecorations, []);
  }, 500));
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
  createSnapshot(requestId) {
    this._isFirstEditAfterStartOrSnapshot = true;
    return {
      resource: this.modifiedURI,
      languageId: this.modifiedModel.getLanguageId(),
      snapshotUri: ChatEditingSnapshotTextModelContentProvider.getSnapshotFileURI(requestId, this.modifiedURI.path),
      original: this.originalModel.getValue(),
      current: this.modifiedModel.getValue(),
      state: this.state.get(),
      telemetryInfo: this._telemetryInfo
    };
  }
  restoreFromSnapshot(snapshot) {
    this.docSnapshot.setValue(snapshot.original);
    this._setDocValue(snapshot.current);
    this._stateObs.set(snapshot.state, void 0);
  }
  resetToInitialValue(value) {
    this._setDocValue(value);
  }
  _mirrorEdits(event) {
    if (this._isApplyingEdits) {
      return;
    }
    const diff = this._diffInfo.get();
    const edits = [];
    for (const edit of event.changes) {
      let isOverlapping = false;
      let changeDelta = 0;
      for (const change of diff.changes) {
        const modifiedRange = lineRangeAsRange(change.modified, this.doc);
        if (modifiedRange.getEndPosition().isBefore(Range.getStartPosition(edit.range))) {
          const originalRange = lineRangeAsRange(change.original, this.docSnapshot);
          changeDelta -= this.docSnapshot.getValueLengthInRange(originalRange);
          changeDelta += this.doc.getValueLengthInRange(modifiedRange);
        } else if (Range.areIntersectingOrTouching(modifiedRange, edit.range)) {
          isOverlapping = true;
          break;
        } else {
          break;
        }
      }
      if (isOverlapping) {
        continue;
      }
      const offset = edit.rangeOffset - changeDelta;
      const start = this.docSnapshot.getPositionAt(offset);
      const end = this.docSnapshot.getPositionAt(offset + edit.rangeLength);
      edits.push(EditOperation.replace(Range.fromPositions(start, end), edit.text));
    }
    this.docSnapshot.applyEdits(edits);
  }
  applyEdits(textEdits) {
    this._editDecorations = this.doc.deltaDecorations(this._editDecorations, textEdits.map((edit) => {
      return {
        options: ModifiedFileEntry._editDecorationOptions,
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
    this._isApplyingEdits = true;
    try {
      this.doc.pushEditOperations(null, textEdits.map(TextEdit.asEditOperation), () => null);
    } finally {
      this._isApplyingEdits = false;
    }
    this._stateObs.set(WorkingSetEntryState.Modified, void 0);
    const myDiffOperationId = ++this._diffOperationIds;
    Promise.resolve(this._diffOperation).then(() => {
      if (this._diffOperationIds === myDiffOperationId) {
        this._diffOperation = this._updateDiffInfo();
      }
    });
  }
  async _updateDiffInfo() {
    const [diff] = await Promise.all([
      this._editorWorkerService.computeDiff(
        this.docSnapshot.uri,
        this.doc.uri,
        { computeMoves: true, ignoreTrimWhitespace: false, maxComputationTimeMs: 3e3 },
        "advanced"
      ),
      timeout(800)
      // DON't diff too fast
    ]);
    this._diffInfo.set(diff ?? nullDocumentDiff, void 0);
  }
  async accept(transaction) {
    if (this._stateObs.get() !== WorkingSetEntryState.Modified) {
      return;
    }
    this.docSnapshot.setValue(this.doc.createSnapshot());
    this._stateObs.set(WorkingSetEntryState.Accepted, transaction);
    await this.collapse(transaction);
    this._notifyAction("accepted");
  }
  async reject(transaction) {
    if (this._stateObs.get() !== WorkingSetEntryState.Modified) {
      return;
    }
    this._setDocValue(this.docSnapshot.getValue());
    this._stateObs.set(WorkingSetEntryState.Rejected, transaction);
    await this.collapse(transaction);
    this._notifyAction("rejected");
  }
  _setDocValue(value) {
    this.doc.pushStackElement();
    const edit = EditOperation.replace(this.doc.getFullModelRange(), value);
    this.doc.pushEditOperations(null, [edit], () => null);
    this.doc.pushStackElement();
  }
  async collapse(transaction) {
    this._multiDiffEntryDelegate.collapse(transaction);
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
ModifiedFileEntry = __decorateClass([
  __decorateParam(4, IModelService),
  __decorateParam(5, ITextModelService),
  __decorateParam(6, ILanguageService),
  __decorateParam(7, IBulkEditService),
  __decorateParam(8, IChatService),
  __decorateParam(9, IEditorWorkerService),
  __decorateParam(10, IUndoRedoService)
], ModifiedFileEntry);
const lineRangeAsRange = /* @__PURE__ */ __name((lineRange, model) => {
  return model.validateRange(
    lineRange.isEmpty ? new Range(lineRange.startLineNumber, 1, lineRange.startLineNumber, Number.MAX_SAFE_INTEGER) : new Range(lineRange.startLineNumber, 1, lineRange.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER)
  );
}, "lineRangeAsRange");
export {
  ChatEditingService
};
//# sourceMappingURL=chatEditingService.js.map
