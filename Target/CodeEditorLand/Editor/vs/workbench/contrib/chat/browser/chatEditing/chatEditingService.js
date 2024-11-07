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
import { compareBy, delta } from "../../../../../base/common/arrays.js";
import { AsyncIterableSource } from "../../../../../base/common/async.js";
import { CancellationToken, CancellationTokenSource } from "../../../../../base/common/cancellation.js";
import { Codicon } from "../../../../../base/common/codicons.js";
import { BugIndicatingError } from "../../../../../base/common/errors.js";
import { Emitter, Event } from "../../../../../base/common/event.js";
import { Disposable, DisposableStore, IDisposable } from "../../../../../base/common/lifecycle.js";
import { ResourceMap } from "../../../../../base/common/map.js";
import { derived, IObservable, observableValue, runOnChange, ValueWithChangeEventFromObservable } from "../../../../../base/common/observable.js";
import { compare } from "../../../../../base/common/strings.js";
import { ThemeIcon } from "../../../../../base/common/themables.js";
import { URI } from "../../../../../base/common/uri.js";
import { TextEdit } from "../../../../../editor/common/languages.js";
import { ITextModelService } from "../../../../../editor/common/services/resolverService.js";
import { localize, localize2 } from "../../../../../nls.js";
import { IContextKey, IContextKeyService } from "../../../../../platform/contextkey/common/contextkey.js";
import { EditorActivation } from "../../../../../platform/editor/common/editor.js";
import { IFileService } from "../../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../../platform/instantiation/common/instantiation.js";
import { bindContextKey } from "../../../../../platform/observable/common/platformObservableUtils.js";
import { IProgressService, ProgressLocation } from "../../../../../platform/progress/common/progress.js";
import { EditorInput } from "../../../../common/editor/editorInput.js";
import { IWorkbenchAssignmentService } from "../../../../services/assignment/common/assignmentService.js";
import { IDecorationData, IDecorationsProvider, IDecorationsService } from "../../../../services/decorations/common/decorations.js";
import { IEditorGroup, IEditorGroupsService } from "../../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../../services/editor/common/editorService.js";
import { MultiDiffEditor } from "../../../multiDiffEditor/browser/multiDiffEditor.js";
import { MultiDiffEditorInput } from "../../../multiDiffEditor/browser/multiDiffEditorInput.js";
import { IMultiDiffSourceResolver, IMultiDiffSourceResolverService, IResolvedMultiDiffSource, MultiDiffEditorItem } from "../../../multiDiffEditor/browser/multiDiffSourceResolverService.js";
import { ICodeMapperResponse, ICodeMapperService } from "../../common/chatCodeMapperService.js";
import { ChatContextKeys } from "../../common/chatContextKeys.js";
import { applyingChatEditsContextKey, applyingChatEditsFailedContextKey, CHAT_EDITING_MULTI_DIFF_SOURCE_RESOLVER_SCHEME, chatEditingMaxFileAssignmentName, chatEditingResourceContextKey, ChatEditingSessionState, decidedChatEditingResourceContextKey, defaultChatEditingMaxFileLimit, hasAppliedChatEditsContextKey, hasUndecidedChatEditingResourceContextKey, IChatEditingService, IChatEditingSession, IChatEditingSessionStream, inChatEditingSessionContextKey, WorkingSetEntryState } from "../../common/chatEditingService.js";
import { IChatResponseModel, IChatTextEditGroup } from "../../common/chatModel.js";
import { IChatService } from "../../common/chatService.js";
import { ChatEditingSession } from "./chatEditingSession.js";
import { ChatEditingSnapshotTextModelContentProvider, ChatEditingTextModelContentProvider } from "./chatEditingTextModelContentProviders.js";
let ChatEditingService = class extends Disposable {
  constructor(_editorGroupsService, _instantiationService, multiDiffSourceResolverService, textModelService, contextKeyService, _chatService, _progressService, _codeMapperService, _editorService, decorationsService, _fileService, _workbenchAssignmentService) {
    super();
    this._editorGroupsService = _editorGroupsService;
    this._instantiationService = _instantiationService;
    this._chatService = _chatService;
    this._progressService = _progressService;
    this._codeMapperService = _codeMapperService;
    this._editorService = _editorService;
    this._fileService = _fileService;
    this._workbenchAssignmentService = _workbenchAssignmentService;
    this._applyingChatEditsFailedContextKey = applyingChatEditsFailedContextKey.bindTo(contextKeyService);
    this._applyingChatEditsFailedContextKey.set(false);
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
    this._register(bindContextKey(hasUndecidedChatEditingResourceContextKey, contextKeyService, (reader) => {
      const currentSession = this._currentSessionObs.read(reader);
      if (!currentSession) {
        return;
      }
      const entries = currentSession.entries.read(reader);
      const decidedEntries = entries.filter((entry) => entry.state.read(reader) === WorkingSetEntryState.Modified);
      return decidedEntries.length > 0;
    }));
    this._register(bindContextKey(hasAppliedChatEditsContextKey, contextKeyService, (reader) => {
      const currentSession = this._currentSessionObs.read(reader);
      if (!currentSession) {
        return false;
      }
      const entries = currentSession.entries.read(reader);
      return entries.length > 0;
    }));
    this._register(bindContextKey(inChatEditingSessionContextKey, contextKeyService, (reader) => {
      return this._currentSessionObs.read(reader) !== null;
    }));
    this._register(bindContextKey(applyingChatEditsContextKey, contextKeyService, (reader) => {
      return this._currentAutoApplyOperationObs.read(reader) !== null;
    }));
    this._register(bindContextKey(ChatContextKeys.chatEditingCanUndo, contextKeyService, (r) => {
      return this._currentSessionObs.read(r)?.canUndo.read(r) || false;
    }));
    this._register(bindContextKey(ChatContextKeys.chatEditingCanRedo, contextKeyService, (r) => {
      return this._currentSessionObs.read(r)?.canRedo.read(r) || false;
    }));
    this._register(this._chatService.onDidDisposeSession((e) => {
      if (e.reason === "cleared" && this._currentSessionObs.get()?.chatSessionId === e.sessionId) {
        void this._currentSessionObs.get()?.stop();
      }
    }));
    this._editingSessionFileLimitPromise = this._workbenchAssignmentService.getTreatment(chatEditingMaxFileAssignmentName).then((value) => {
      this._editingSessionFileLimit = value ?? defaultChatEditingMaxFileLimit;
      return this._editingSessionFileLimit;
    });
    void this._editingSessionFileLimitPromise;
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
  _editingSessionFileLimitPromise;
  _editingSessionFileLimit;
  get editingSessionFileLimit() {
    return this._editingSessionFileLimit ?? defaultChatEditingMaxFileLimit;
  }
  _applyingChatEditsFailedContextKey;
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
    const session = this._instantiationService.createInstance(ChatEditingSession, chatSessionId, editorPane, this._editingSessionFileLimitPromise);
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
    const editedFilesExist = new ResourceMap();
    const onResponseComplete = /* @__PURE__ */ __name((responseModel) => {
      if (responseModel.result?.errorDetails) {
        this.restoreSnapshot(responseModel.requestId);
        this._applyingChatEditsFailedContextKey.set(true);
      } else if (responseModel.result?.metadata?.autoApplyEdits) {
        this.triggerEditComputation(responseModel);
      }
      editsSource?.resolve();
      editsSource = void 0;
      editsSeen.clear();
      editedFilesExist.clear();
    }, "onResponseComplete");
    const handleResponseParts = /* @__PURE__ */ __name((responseModel) => {
      for (const part of responseModel.response.value) {
        if (part.kind === "codeblockUri" || part.kind === "textEditGroup") {
          if (!editedFilesExist.get(part.uri)) {
            editedFilesExist.set(part.uri, this._fileService.exists(part.uri).then((e) => {
              if (e) {
                this._editorService.openEditor({ resource: part.uri, options: { inactive: true, preserveFocus: true, pinned: true } });
              }
              return e;
            }));
          }
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
        this._applyingChatEditsFailedContextKey.set(false);
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
  __decorateParam(9, IDecorationsService),
  __decorateParam(10, IFileService),
  __decorateParam(11, IWorkbenchAssignmentService)
], ChatEditingService);
function observeArrayChanges(obs, compare2, store) {
  const emitter = store.add(new Emitter());
  store.add(runOnChange(obs, (newArr, oldArr) => {
    const change = delta(oldArr || [], newArr, compare2);
    const changedElements = [].concat(change.added).concat(change.removed);
    emitter.fire(changedElements);
  }));
  return emitter.event;
}
__name(observeArrayChanges, "observeArrayChanges");
class ChatDecorationsProvider extends Disposable {
  constructor(_session) {
    super();
    this._session = _session;
  }
  static {
    __name(this, "ChatDecorationsProvider");
  }
  label = localize("chat", "Chat Editing");
  _currentlyEditingUris = derived(this, (r) => {
    const session = this._session.read(r);
    if (!session) {
      return [];
    }
    const state = session.state.read(r);
    if (state === ChatEditingSessionState.Disposed) {
      return [];
    }
    return session.entries.read(r).filter((entry) => entry.isCurrentlyBeingModified.read(r)).map((entry) => entry.modifiedURI);
  });
  onDidChange = observeArrayChanges(this._currentlyEditingUris, compareBy((uri) => uri.toString(), compare), this._store);
  provideDecorations(uri, _token) {
    const isCurrentlyBeingModified = this._currentlyEditingUris.get().some((e) => e.toString() === uri.toString());
    if (!isCurrentlyBeingModified) {
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
export {
  ChatEditingMultiDiffSourceResolver,
  ChatEditingService
};
//# sourceMappingURL=chatEditingService.js.map
