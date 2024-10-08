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
import { Sequencer } from "../../../../base/common/async.js";
import { CancellationToken, CancellationTokenSource } from "../../../../base/common/cancellation.js";
import { BugIndicatingError } from "../../../../base/common/errors.js";
import { Emitter } from "../../../../base/common/event.js";
import { Disposable, DisposableStore, IDisposable, IReference } from "../../../../base/common/lifecycle.js";
import { ResourceSet } from "../../../../base/common/map.js";
import { derived, IObservable, ITransaction, observableValue, ValueWithChangeEventFromObservable } from "../../../../base/common/observable.js";
import { URI } from "../../../../base/common/uri.js";
import { isCodeEditor, isDiffEditor } from "../../../../editor/browser/editorBrowser.js";
import { IBulkEditService } from "../../../../editor/browser/services/bulkEditService.js";
import { TextEdit } from "../../../../editor/common/languages.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { createTextBufferFactoryFromSnapshot } from "../../../../editor/common/model/textModel.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { IResolvedTextEditorModel, ITextModelContentProvider, ITextModelService } from "../../../../editor/common/services/resolverService.js";
import { localize, localize2 } from "../../../../nls.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { EditorActivation } from "../../../../platform/editor/common/editor.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { bindContextKey } from "../../../../platform/observable/common/platformObservableUtils.js";
import { IProgressService, ProgressLocation } from "../../../../platform/progress/common/progress.js";
import { DiffEditorInput } from "../../../common/editor/diffEditorInput.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IEditorGroup, IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { MultiDiffEditor } from "../../multiDiffEditor/browser/multiDiffEditor.js";
import { MultiDiffEditorInput } from "../../multiDiffEditor/browser/multiDiffEditorInput.js";
import { IMultiDiffSourceResolver, IMultiDiffSourceResolverService, IResolvedMultiDiffSource, MultiDiffEditorItem } from "../../multiDiffEditor/browser/multiDiffSourceResolverService.js";
import { ICodeMapperResponse, ICodeMapperService } from "../common/chatCodeMapperService.js";
import { applyingChatEditsContextKey, CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME, chatEditingResourceContextKey, ChatEditingSessionState, decidedChatEditingResourceContextKey, IChatEditingService, IChatEditingSession, IChatEditingSessionStream, IModifiedFileEntry, inChatEditingSessionContextKey, WorkingSetEntryState } from "../common/chatEditingService.js";
import { IChatResponseModel } from "../common/chatModel.js";
import { IChatService } from "../common/chatService.js";
import { IChatWidgetService } from "./chat.js";
let ChatEditingService = class extends Disposable {
  constructor(_editorGroupsService, _instantiationService, multiDiffSourceResolverService, textModelService, contextKeyService, _chatService, _progressService, _codeMapperService, _editorService) {
    super();
    this._editorGroupsService = _editorGroupsService;
    this._instantiationService = _instantiationService;
    this._chatService = _chatService;
    this._progressService = _progressService;
    this._codeMapperService = _codeMapperService;
    this._editorService = _editorService;
    this._register(multiDiffSourceResolverService.registerResolver(_instantiationService.createInstance(ChatEditingMultiDiffSourceResolver, this._currentSessionObs)));
    textModelService.registerTextModelContentProvider(ChatEditingTextModelContentProvider.scheme, _instantiationService.createInstance(ChatEditingTextModelContentProvider, this._currentSessionObs));
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
  _onDidCreateEditingSession = this._register(new Emitter());
  get onDidCreateEditingSession() {
    return this._onDidCreateEditingSession.event;
  }
  _onDidChangeEditingSession = this._register(new Emitter());
  onDidChangeEditingSession = this._onDidChangeEditingSession.event;
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
  installAutoApplyObserver(sessionId) {
    const chatModel = this._chatService.getSession(sessionId);
    if (!chatModel) {
      throw new Error(`Edit session was created for a non-existing chat session: ${sessionId}`);
    }
    const observerDisposables = new DisposableStore();
    const onResponseComplete = /* @__PURE__ */ __name((responseModel) => {
      if (responseModel.result?.metadata?.autoApplyEdits) {
        this.triggerEditComputation(responseModel);
      }
    }, "onResponseComplete");
    const openCodeBlockUris = /* @__PURE__ */ __name((responseModel) => {
      for (const part of responseModel.response.value) {
        if (part.kind === "codeblockUri") {
          this._editorService.openEditor({ resource: part.uri, options: { inactive: true, preserveFocus: true, pinned: true } });
        }
      }
    }, "openCodeBlockUris");
    observerDisposables.add(chatModel.onDidChange((e) => {
      if (e.kind === "addRequest") {
        const responseModel = e.request.response;
        if (responseModel) {
          if (responseModel.isComplete) {
            openCodeBlockUris(responseModel);
            onResponseComplete(responseModel);
          } else {
            const disposable = responseModel.onDidChange(() => {
              openCodeBlockUris(responseModel);
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
  __decorateParam(8, IEditorService)
], ChatEditingService);
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
let ChatEditingSession = class extends Disposable {
  constructor(chatSessionId, editorPane, _instantiationService, _textModelService, _bulkEditService, _editorGroupsService, _editorService, chatWidgetService) {
    super();
    this.chatSessionId = chatSessionId;
    this.editorPane = editorPane;
    this._instantiationService = _instantiationService;
    this._textModelService = _textModelService;
    this._bulkEditService = _bulkEditService;
    this._editorGroupsService = _editorGroupsService;
    this._editorService = _editorService;
    const widget = chatWidgetService.getWidgetBySessionId(chatSessionId);
    let activeEditorControl = this._editorService.activeTextEditorControl;
    if (activeEditorControl) {
      if (isDiffEditor(activeEditorControl)) {
        activeEditorControl = activeEditorControl.getOriginalEditor().hasTextFocus() ? activeEditorControl.getOriginalEditor() : activeEditorControl.getModifiedEditor();
      }
      if (isCodeEditor(activeEditorControl) && activeEditorControl.hasModel()) {
        const uri = activeEditorControl.getModel().uri;
        this._workingSet.add(uri);
        widget?.attachmentModel.addFile(uri);
        this._workingSetObs.set([...this._workingSet.values()], void 0);
      }
    }
  }
  static {
    __name(this, "ChatEditingSession");
  }
  _state = observableValue(this, ChatEditingSessionState.Initial);
  _entriesObs = observableValue(this, []);
  get entries() {
    this._assertNotDisposed();
    return this._entriesObs;
  }
  _sequencer = new Sequencer();
  _entries = [];
  _workingSetObs = observableValue(this, []);
  _workingSet = new ResourceSet();
  get workingSet() {
    this._assertNotDisposed();
    return this._workingSetObs;
  }
  get state() {
    this._assertNotDisposed();
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
  remove(...uris) {
    this._assertNotDisposed();
    let didRemoveUris = false;
    for (const uri of uris) {
      didRemoveUris = didRemoveUris || this._workingSet.delete(uri);
    }
    if (!didRemoveUris) {
      return;
    }
    this._workingSetObs.set([...this._workingSet.values()], void 0);
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
      this._workingSet.add(resource);
      this._workingSetObs.set([...this._workingSet.values()], void 0);
      this._onDidChange.fire();
    }
  }
  async _acceptStreamingEditsStart() {
    this._state.set(ChatEditingSessionState.StreamingEdits, void 0);
    this._onDidChange.fire();
  }
  async _acceptTextEdits(resource, textEdits, responseModel) {
    const entry = await this._getOrCreateModifiedFileEntry(resource, responseModel);
    entry.applyEdits(textEdits);
    await this._editorService.openEditor({ resource: entry.modifiedURI, options: { inactive: true } });
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
  __decorateParam(3, ITextModelService),
  __decorateParam(4, IBulkEditService),
  __decorateParam(5, IEditorGroupsService),
  __decorateParam(6, IEditorService),
  __decorateParam(7, IChatWidgetService)
], ChatEditingSession);
let ModifiedFileEntry = class extends Disposable {
  constructor(resource, resourceRef, _multiDiffEntryDelegate, _responseModel, modelService, textModelService, languageService, bulkEditService, _chatService) {
    super();
    this.resource = resource;
    this._multiDiffEntryDelegate = _multiDiffEntryDelegate;
    this._responseModel = _responseModel;
    this.bulkEditService = bulkEditService;
    this._chatService = _chatService;
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
      this._register(await textModelService.createModelReference(docSnapshot.uri));
    })();
    this._register(resourceRef);
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
  _stateObs = observableValue(this, WorkingSetEntryState.Modified);
  get state() {
    return this._stateObs;
  }
  applyEdits(textEdits) {
    this.doc.applyEdits(textEdits);
    this._stateObs.set(WorkingSetEntryState.Modified, void 0);
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
    this.doc.setValue(this.docSnapshot.createSnapshot());
    this._stateObs.set(WorkingSetEntryState.Rejected, transaction);
    await this.collapse(transaction);
    this._notifyAction("rejected");
  }
  async collapse(transaction) {
    this._multiDiffEntryDelegate.collapse(transaction);
  }
  _notifyAction(outcome) {
    this._chatService.notifyUserAction({
      action: { kind: "chatEditingSessionAction", uri: this.resource, hasRemainingEdits: false, outcome },
      agentId: this._responseModel.agent?.id,
      command: this._responseModel.slashCommand?.name,
      sessionId: this._responseModel.session.sessionId,
      requestId: this._responseModel.requestId,
      result: this._responseModel.result
    });
  }
};
ModifiedFileEntry = __decorateClass([
  __decorateParam(4, IModelService),
  __decorateParam(5, ITextModelService),
  __decorateParam(6, ILanguageService),
  __decorateParam(7, IBulkEditService),
  __decorateParam(8, IChatService)
], ModifiedFileEntry);
export {
  ChatEditingService
};
//# sourceMappingURL=chatEditingService.js.map
