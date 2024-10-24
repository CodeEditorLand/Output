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
import { localize } from "../../../../nls.js";
import { URI } from "../../../../base/common/uri.js";
import { IResourceEditorInput, IEditorOptions } from "../../../../platform/editor/common/editor.js";
import { IEditorPane, IEditorCloseEvent, EditorResourceAccessor, IEditorIdentifier, GroupIdentifier, EditorsOrder, SideBySideEditor, IUntypedEditorInput, isResourceEditorInput, isEditorInput, isSideBySideEditorInput, EditorCloseContext, IEditorPaneSelection, EditorPaneSelectionCompareResult, EditorPaneSelectionChangeReason, isEditorPaneWithSelection, IEditorPaneSelectionChangeEvent, IEditorPaneWithSelection, IEditorWillMoveEvent, GroupModelChangeKind } from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { GoFilter, GoScope, IHistoryService } from "../common/history.js";
import { FileChangesEvent, IFileService, FileChangeType, FILES_EXCLUDE_CONFIG, FileOperationEvent, FileOperation } from "../../../../platform/files/common/files.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { dispose, Disposable, DisposableStore, IDisposable } from "../../../../base/common/lifecycle.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
import { Emitter, Event } from "../../../../base/common/event.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IEditorGroup, IEditorGroupsService } from "../../editor/common/editorGroupsService.js";
import { getExcludes, ISearchConfiguration, SEARCH_EXCLUDE_CONFIG } from "../../search/common/search.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { EditorServiceImpl } from "../../../browser/parts/editor/editor.js";
import { IWorkbenchLayoutService } from "../../layout/browser/layoutService.js";
import { IContextKeyService, RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
import { coalesce, remove } from "../../../../base/common/arrays.js";
import { InstantiationType, registerSingleton } from "../../../../platform/instantiation/common/extensions.js";
import { addDisposableListener, EventType, EventHelper, WindowIdleValue } from "../../../../base/browser/dom.js";
import { IWorkspacesService } from "../../../../platform/workspaces/common/workspaces.js";
import { Schemas } from "../../../../base/common/network.js";
import { onUnexpectedError } from "../../../../base/common/errors.js";
import { ResourceGlobMatcher } from "../../../common/resources.js";
import { IPathService } from "../../path/common/pathService.js";
import { IUriIdentityService } from "../../../../platform/uriIdentity/common/uriIdentity.js";
import { ILifecycleService, LifecyclePhase } from "../../lifecycle/common/lifecycle.js";
import { ILogService, LogLevel } from "../../../../platform/log/common/log.js";
import { mainWindow } from "../../../../base/browser/window.js";
let HistoryService = class extends Disposable {
  constructor(editorService, editorGroupService, contextService, storageService, configurationService, fileService, workspacesService, instantiationService, layoutService, contextKeyService, logService) {
    super();
    this.editorService = editorService;
    this.editorGroupService = editorGroupService;
    this.contextService = contextService;
    this.storageService = storageService;
    this.configurationService = configurationService;
    this.fileService = fileService;
    this.workspacesService = workspacesService;
    this.instantiationService = instantiationService;
    this.layoutService = layoutService;
    this.contextKeyService = contextKeyService;
    this.logService = logService;
    this.registerListeners();
    if (this.editorService.activeEditorPane) {
      this.onDidActiveEditorChange();
    }
  }
  static {
    __name(this, "HistoryService");
  }
  static MOUSE_NAVIGATION_SETTING = "workbench.editor.mouseBackForwardToNavigate";
  static NAVIGATION_SCOPE_SETTING = "workbench.editor.navigationScope";
  activeEditorListeners = this._register(new DisposableStore());
  lastActiveEditor = void 0;
  editorHelper = this.instantiationService.createInstance(EditorHelper);
  registerListeners() {
    this.registerMouseNavigationListener();
    this._register(this.editorService.onDidActiveEditorChange(() => this.onDidActiveEditorChange()));
    this._register(this.editorService.onDidOpenEditorFail((event) => this.remove(event.editor)));
    this._register(this.editorService.onDidCloseEditor((event) => this.onDidCloseEditor(event)));
    this._register(this.editorService.onDidMostRecentlyActiveEditorsChange(() => this.handleEditorEventInRecentEditorsStack()));
    this._register(this.editorGroupService.onDidRemoveGroup((e) => this.onDidRemoveGroup(e)));
    this._register(this.fileService.onDidFilesChange((event) => this.onDidFilesChange(event)));
    this._register(this.fileService.onDidRunOperation((event) => this.onDidFilesChange(event)));
    this._register(this.storageService.onWillSaveState(() => this.saveState()));
    this.registerEditorNavigationScopeChangeListener();
    this._register(this.onDidChangeEditorNavigationStack(() => this.updateContextKeys()));
    this._register(this.editorGroupService.onDidChangeActiveGroup(() => this.updateContextKeys()));
  }
  onDidCloseEditor(e) {
    this.handleEditorCloseEventInHistory(e);
    this.handleEditorCloseEventInReopen(e);
  }
  registerMouseNavigationListener() {
    const mouseBackForwardSupportListener = this._register(new DisposableStore());
    const handleMouseBackForwardSupport = /* @__PURE__ */ __name(() => {
      mouseBackForwardSupportListener.clear();
      if (this.configurationService.getValue(HistoryService.MOUSE_NAVIGATION_SETTING)) {
        this._register(Event.runAndSubscribe(this.layoutService.onDidAddContainer, ({ container, disposables }) => {
          const eventDisposables = disposables.add(new DisposableStore());
          eventDisposables.add(addDisposableListener(container, EventType.MOUSE_DOWN, (e) => this.onMouseDownOrUp(e, true)));
          eventDisposables.add(addDisposableListener(container, EventType.MOUSE_UP, (e) => this.onMouseDownOrUp(e, false)));
          mouseBackForwardSupportListener.add(eventDisposables);
        }, { container: this.layoutService.mainContainer, disposables: this._store }));
      }
    }, "handleMouseBackForwardSupport");
    this._register(this.configurationService.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(HistoryService.MOUSE_NAVIGATION_SETTING)) {
        handleMouseBackForwardSupport();
      }
    }));
    handleMouseBackForwardSupport();
  }
  onMouseDownOrUp(event, isMouseDown) {
    switch (event.button) {
      case 3:
        EventHelper.stop(event);
        if (isMouseDown) {
          this.goBack();
        }
        break;
      case 4:
        EventHelper.stop(event);
        if (isMouseDown) {
          this.goForward();
        }
        break;
    }
  }
  onDidRemoveGroup(group) {
    this.handleEditorGroupRemoveInNavigationStacks(group);
  }
  onDidActiveEditorChange() {
    const activeEditorGroup = this.editorGroupService.activeGroup;
    const activeEditorPane = activeEditorGroup.activeEditorPane;
    if (this.lastActiveEditor && this.editorHelper.matchesEditorIdentifier(this.lastActiveEditor, activeEditorPane)) {
      return;
    }
    this.lastActiveEditor = activeEditorPane?.input ? { editor: activeEditorPane.input, groupId: activeEditorPane.group.id } : void 0;
    this.activeEditorListeners.clear();
    if (!activeEditorPane?.group.isTransient(activeEditorPane.input)) {
      this.handleActiveEditorChange(activeEditorGroup, activeEditorPane);
    } else {
      this.logService.trace(`[History]: ignoring transient editor change until becoming non-transient (editor: ${activeEditorPane.input?.resource?.toString()}})`);
      const transientListener = activeEditorGroup.onDidModelChange((e) => {
        if (e.kind === GroupModelChangeKind.EDITOR_TRANSIENT && e.editor === activeEditorPane.input && !activeEditorPane.group.isTransient(activeEditorPane.input)) {
          transientListener.dispose();
          this.handleActiveEditorChange(activeEditorGroup, activeEditorPane);
        }
      });
      this.activeEditorListeners.add(transientListener);
    }
    if (isEditorPaneWithSelection(activeEditorPane)) {
      this.activeEditorListeners.add(activeEditorPane.onDidChangeSelection((e) => {
        if (!activeEditorPane.group.isTransient(activeEditorPane.input)) {
          this.handleActiveEditorSelectionChangeEvent(activeEditorGroup, activeEditorPane, e);
        } else {
          this.logService.trace(`[History]: ignoring transient editor selection change (editor: ${activeEditorPane.input?.resource?.toString()}})`);
        }
      }));
    }
    this.updateContextKeys();
  }
  onDidFilesChange(event) {
    if (event instanceof FileChangesEvent) {
      if (event.gotDeleted()) {
        this.remove(event);
      }
    } else {
      if (event.isOperation(FileOperation.DELETE)) {
        this.remove(event);
      } else if (event.isOperation(FileOperation.MOVE) && event.target.isFile) {
        this.move(event);
      }
    }
  }
  handleActiveEditorChange(group, editorPane) {
    this.handleActiveEditorChangeInHistory(editorPane);
    this.handleActiveEditorChangeInNavigationStacks(group, editorPane);
  }
  handleActiveEditorSelectionChangeEvent(group, editorPane, event) {
    this.handleActiveEditorSelectionChangeInNavigationStacks(group, editorPane, event);
  }
  move(event) {
    this.moveInHistory(event);
    this.moveInEditorNavigationStacks(event);
  }
  remove(arg1) {
    this.removeFromHistory(arg1);
    this.removeFromEditorNavigationStacks(arg1);
    this.removeFromRecentlyClosedEditors(arg1);
    this.removeFromRecentlyOpened(arg1);
  }
  removeFromRecentlyOpened(arg1) {
    let resource = void 0;
    if (isEditorInput(arg1)) {
      resource = EditorResourceAccessor.getOriginalUri(arg1);
    } else if (arg1 instanceof FileChangesEvent) {
    } else {
      resource = arg1.resource;
    }
    if (resource) {
      this.workspacesService.removeRecentlyOpened([resource]);
    }
  }
  clear() {
    this.clearRecentlyOpened();
    this.clearEditorNavigationStacks();
    this.recentlyClosedEditors = [];
    this.updateContextKeys();
  }
  //#region History Context Keys
  canNavigateBackContextKey = new RawContextKey("canNavigateBack", false, localize("canNavigateBack", "Whether it is possible to navigate back in editor history")).bindTo(this.contextKeyService);
  canNavigateForwardContextKey = new RawContextKey("canNavigateForward", false, localize("canNavigateForward", "Whether it is possible to navigate forward in editor history")).bindTo(this.contextKeyService);
  canNavigateBackInNavigationsContextKey = new RawContextKey("canNavigateBackInNavigationLocations", false, localize("canNavigateBackInNavigationLocations", "Whether it is possible to navigate back in editor navigation locations history")).bindTo(this.contextKeyService);
  canNavigateForwardInNavigationsContextKey = new RawContextKey("canNavigateForwardInNavigationLocations", false, localize("canNavigateForwardInNavigationLocations", "Whether it is possible to navigate forward in editor navigation locations history")).bindTo(this.contextKeyService);
  canNavigateToLastNavigationLocationContextKey = new RawContextKey("canNavigateToLastNavigationLocation", false, localize("canNavigateToLastNavigationLocation", "Whether it is possible to navigate to the last editor navigation location")).bindTo(this.contextKeyService);
  canNavigateBackInEditsContextKey = new RawContextKey("canNavigateBackInEditLocations", false, localize("canNavigateBackInEditLocations", "Whether it is possible to navigate back in editor edit locations history")).bindTo(this.contextKeyService);
  canNavigateForwardInEditsContextKey = new RawContextKey("canNavigateForwardInEditLocations", false, localize("canNavigateForwardInEditLocations", "Whether it is possible to navigate forward in editor edit locations history")).bindTo(this.contextKeyService);
  canNavigateToLastEditLocationContextKey = new RawContextKey("canNavigateToLastEditLocation", false, localize("canNavigateToLastEditLocation", "Whether it is possible to navigate to the last editor edit location")).bindTo(this.contextKeyService);
  canReopenClosedEditorContextKey = new RawContextKey("canReopenClosedEditor", false, localize("canReopenClosedEditor", "Whether it is possible to reopen the last closed editor")).bindTo(this.contextKeyService);
  updateContextKeys() {
    this.contextKeyService.bufferChangeEvents(() => {
      const activeStack = this.getStack();
      this.canNavigateBackContextKey.set(activeStack.canGoBack(GoFilter.NONE));
      this.canNavigateForwardContextKey.set(activeStack.canGoForward(GoFilter.NONE));
      this.canNavigateBackInNavigationsContextKey.set(activeStack.canGoBack(GoFilter.NAVIGATION));
      this.canNavigateForwardInNavigationsContextKey.set(activeStack.canGoForward(GoFilter.NAVIGATION));
      this.canNavigateToLastNavigationLocationContextKey.set(activeStack.canGoLast(GoFilter.NAVIGATION));
      this.canNavigateBackInEditsContextKey.set(activeStack.canGoBack(GoFilter.EDITS));
      this.canNavigateForwardInEditsContextKey.set(activeStack.canGoForward(GoFilter.EDITS));
      this.canNavigateToLastEditLocationContextKey.set(activeStack.canGoLast(GoFilter.EDITS));
      this.canReopenClosedEditorContextKey.set(this.recentlyClosedEditors.length > 0);
    });
  }
  //#endregion
  //#region Editor History Navigation (limit: 50)
  _onDidChangeEditorNavigationStack = this._register(new Emitter());
  onDidChangeEditorNavigationStack = this._onDidChangeEditorNavigationStack.event;
  defaultScopedEditorNavigationStack = void 0;
  editorGroupScopedNavigationStacks = /* @__PURE__ */ new Map();
  editorScopedNavigationStacks = /* @__PURE__ */ new Map();
  editorNavigationScope = GoScope.DEFAULT;
  registerEditorNavigationScopeChangeListener() {
    const handleEditorNavigationScopeChange = /* @__PURE__ */ __name(() => {
      this.disposeEditorNavigationStacks();
      const configuredScope = this.configurationService.getValue(HistoryService.NAVIGATION_SCOPE_SETTING);
      if (configuredScope === "editorGroup") {
        this.editorNavigationScope = GoScope.EDITOR_GROUP;
      } else if (configuredScope === "editor") {
        this.editorNavigationScope = GoScope.EDITOR;
      } else {
        this.editorNavigationScope = GoScope.DEFAULT;
      }
    }, "handleEditorNavigationScopeChange");
    this._register(this.configurationService.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(HistoryService.NAVIGATION_SCOPE_SETTING)) {
        handleEditorNavigationScopeChange();
      }
    }));
    handleEditorNavigationScopeChange();
  }
  getStack(group = this.editorGroupService.activeGroup, editor = group.activeEditor) {
    switch (this.editorNavigationScope) {
      // Per Editor
      case GoScope.EDITOR: {
        if (!editor) {
          return new NoOpEditorNavigationStacks();
        }
        let stacksForGroup = this.editorScopedNavigationStacks.get(group.id);
        if (!stacksForGroup) {
          stacksForGroup = /* @__PURE__ */ new Map();
          this.editorScopedNavigationStacks.set(group.id, stacksForGroup);
        }
        let stack = stacksForGroup.get(editor)?.stack;
        if (!stack) {
          const disposable = new DisposableStore();
          stack = disposable.add(this.instantiationService.createInstance(EditorNavigationStacks, GoScope.EDITOR));
          disposable.add(stack.onDidChange(() => this._onDidChangeEditorNavigationStack.fire()));
          stacksForGroup.set(editor, { stack, disposable });
        }
        return stack;
      }
      // Per Editor Group
      case GoScope.EDITOR_GROUP: {
        let stack = this.editorGroupScopedNavigationStacks.get(group.id)?.stack;
        if (!stack) {
          const disposable = new DisposableStore();
          stack = disposable.add(this.instantiationService.createInstance(EditorNavigationStacks, GoScope.EDITOR_GROUP));
          disposable.add(stack.onDidChange(() => this._onDidChangeEditorNavigationStack.fire()));
          this.editorGroupScopedNavigationStacks.set(group.id, { stack, disposable });
        }
        return stack;
      }
      // Global
      case GoScope.DEFAULT: {
        if (!this.defaultScopedEditorNavigationStack) {
          this.defaultScopedEditorNavigationStack = this._register(this.instantiationService.createInstance(EditorNavigationStacks, GoScope.DEFAULT));
          this._register(this.defaultScopedEditorNavigationStack.onDidChange(() => this._onDidChangeEditorNavigationStack.fire()));
        }
        return this.defaultScopedEditorNavigationStack;
      }
    }
  }
  goForward(filter) {
    return this.getStack().goForward(filter);
  }
  goBack(filter) {
    return this.getStack().goBack(filter);
  }
  goPrevious(filter) {
    return this.getStack().goPrevious(filter);
  }
  goLast(filter) {
    return this.getStack().goLast(filter);
  }
  handleActiveEditorChangeInNavigationStacks(group, editorPane) {
    this.getStack(group, editorPane?.input).handleActiveEditorChange(editorPane);
  }
  handleActiveEditorSelectionChangeInNavigationStacks(group, editorPane, event) {
    this.getStack(group, editorPane.input).handleActiveEditorSelectionChange(editorPane, event);
  }
  handleEditorCloseEventInHistory(e) {
    const editors = this.editorScopedNavigationStacks.get(e.groupId);
    if (editors) {
      const editorStack = editors.get(e.editor);
      if (editorStack) {
        editorStack.disposable.dispose();
        editors.delete(e.editor);
      }
      if (editors.size === 0) {
        this.editorScopedNavigationStacks.delete(e.groupId);
      }
    }
  }
  handleEditorGroupRemoveInNavigationStacks(group) {
    this.defaultScopedEditorNavigationStack?.remove(group.id);
    const editorGroupStack = this.editorGroupScopedNavigationStacks.get(group.id);
    if (editorGroupStack) {
      editorGroupStack.disposable.dispose();
      this.editorGroupScopedNavigationStacks.delete(group.id);
    }
  }
  clearEditorNavigationStacks() {
    this.withEachEditorNavigationStack((stack) => stack.clear());
  }
  removeFromEditorNavigationStacks(arg1) {
    this.withEachEditorNavigationStack((stack) => stack.remove(arg1));
  }
  moveInEditorNavigationStacks(event) {
    this.withEachEditorNavigationStack((stack) => stack.move(event));
  }
  withEachEditorNavigationStack(fn) {
    if (this.defaultScopedEditorNavigationStack) {
      fn(this.defaultScopedEditorNavigationStack);
    }
    for (const [, entry] of this.editorGroupScopedNavigationStacks) {
      fn(entry.stack);
    }
    for (const [, entries] of this.editorScopedNavigationStacks) {
      for (const [, entry] of entries) {
        fn(entry.stack);
      }
    }
  }
  disposeEditorNavigationStacks() {
    this.defaultScopedEditorNavigationStack?.dispose();
    this.defaultScopedEditorNavigationStack = void 0;
    for (const [, stack] of this.editorGroupScopedNavigationStacks) {
      stack.disposable.dispose();
    }
    this.editorGroupScopedNavigationStacks.clear();
    for (const [, stacks] of this.editorScopedNavigationStacks) {
      for (const [, stack] of stacks) {
        stack.disposable.dispose();
      }
    }
    this.editorScopedNavigationStacks.clear();
  }
  //#endregion
  //#region Navigation: Next/Previous Used Editor
  recentlyUsedEditorsStack = void 0;
  recentlyUsedEditorsStackIndex = 0;
  recentlyUsedEditorsInGroupStack = void 0;
  recentlyUsedEditorsInGroupStackIndex = 0;
  navigatingInRecentlyUsedEditorsStack = false;
  navigatingInRecentlyUsedEditorsInGroupStack = false;
  openNextRecentlyUsedEditor(groupId) {
    const [stack, index] = this.ensureRecentlyUsedStack((index2) => index2 - 1, groupId);
    return this.doNavigateInRecentlyUsedEditorsStack(stack[index], groupId);
  }
  openPreviouslyUsedEditor(groupId) {
    const [stack, index] = this.ensureRecentlyUsedStack((index2) => index2 + 1, groupId);
    return this.doNavigateInRecentlyUsedEditorsStack(stack[index], groupId);
  }
  async doNavigateInRecentlyUsedEditorsStack(editorIdentifier, groupId) {
    if (editorIdentifier) {
      const acrossGroups = typeof groupId !== "number" || !this.editorGroupService.getGroup(groupId);
      if (acrossGroups) {
        this.navigatingInRecentlyUsedEditorsStack = true;
      } else {
        this.navigatingInRecentlyUsedEditorsInGroupStack = true;
      }
      const group = this.editorGroupService.getGroup(editorIdentifier.groupId) ?? this.editorGroupService.activeGroup;
      try {
        await group.openEditor(editorIdentifier.editor);
      } finally {
        if (acrossGroups) {
          this.navigatingInRecentlyUsedEditorsStack = false;
        } else {
          this.navigatingInRecentlyUsedEditorsInGroupStack = false;
        }
      }
    }
  }
  ensureRecentlyUsedStack(indexModifier, groupId) {
    let editors;
    let index;
    const group = typeof groupId === "number" ? this.editorGroupService.getGroup(groupId) : void 0;
    if (!group) {
      editors = this.recentlyUsedEditorsStack || this.editorService.getEditors(EditorsOrder.MOST_RECENTLY_ACTIVE);
      index = this.recentlyUsedEditorsStackIndex;
    } else {
      editors = this.recentlyUsedEditorsInGroupStack || group.getEditors(EditorsOrder.MOST_RECENTLY_ACTIVE).map((editor) => ({ groupId: group.id, editor }));
      index = this.recentlyUsedEditorsInGroupStackIndex;
    }
    let newIndex = indexModifier(index);
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex > editors.length - 1) {
      newIndex = editors.length - 1;
    }
    if (!group) {
      this.recentlyUsedEditorsStack = editors;
      this.recentlyUsedEditorsStackIndex = newIndex;
    } else {
      this.recentlyUsedEditorsInGroupStack = editors;
      this.recentlyUsedEditorsInGroupStackIndex = newIndex;
    }
    return [editors, newIndex];
  }
  handleEditorEventInRecentEditorsStack() {
    if (!this.navigatingInRecentlyUsedEditorsStack) {
      this.recentlyUsedEditorsStack = void 0;
      this.recentlyUsedEditorsStackIndex = 0;
    }
    if (!this.navigatingInRecentlyUsedEditorsInGroupStack) {
      this.recentlyUsedEditorsInGroupStack = void 0;
      this.recentlyUsedEditorsInGroupStackIndex = 0;
    }
  }
  //#endregion
  //#region File: Reopen Closed Editor (limit: 20)
  static MAX_RECENTLY_CLOSED_EDITORS = 20;
  recentlyClosedEditors = [];
  ignoreEditorCloseEvent = false;
  handleEditorCloseEventInReopen(event) {
    if (this.ignoreEditorCloseEvent) {
      return;
    }
    const { editor, context } = event;
    if (context === EditorCloseContext.REPLACE || context === EditorCloseContext.MOVE) {
      return;
    }
    const untypedEditor = editor.toUntyped();
    if (!untypedEditor) {
      return;
    }
    const associatedResources = [];
    const editorResource = EditorResourceAccessor.getOriginalUri(editor, { supportSideBySide: SideBySideEditor.BOTH });
    if (URI.isUri(editorResource)) {
      associatedResources.push(editorResource);
    } else if (editorResource) {
      associatedResources.push(...coalesce([editorResource.primary, editorResource.secondary]));
    }
    this.removeFromRecentlyClosedEditors(editor);
    this.recentlyClosedEditors.push({
      editorId: editor.editorId,
      editor: untypedEditor,
      resource: EditorResourceAccessor.getOriginalUri(editor),
      associatedResources,
      index: event.index,
      sticky: event.sticky
    });
    if (this.recentlyClosedEditors.length > HistoryService.MAX_RECENTLY_CLOSED_EDITORS) {
      this.recentlyClosedEditors.shift();
    }
    this.canReopenClosedEditorContextKey.set(true);
  }
  async reopenLastClosedEditor() {
    const lastClosedEditor = this.recentlyClosedEditors.pop();
    let reopenClosedEditorPromise = void 0;
    if (lastClosedEditor) {
      reopenClosedEditorPromise = this.doReopenLastClosedEditor(lastClosedEditor);
    }
    this.canReopenClosedEditorContextKey.set(this.recentlyClosedEditors.length > 0);
    return reopenClosedEditorPromise;
  }
  async doReopenLastClosedEditor(lastClosedEditor) {
    const options = { pinned: true, sticky: lastClosedEditor.sticky, index: lastClosedEditor.index, ignoreError: true };
    if (lastClosedEditor.sticky && !this.editorGroupService.activeGroup.isSticky(lastClosedEditor.index) || !lastClosedEditor.sticky && this.editorGroupService.activeGroup.isSticky(lastClosedEditor.index)) {
      options.index = void 0;
    }
    let editorPane = void 0;
    if (!this.editorGroupService.activeGroup.contains(lastClosedEditor.editor)) {
      this.ignoreEditorCloseEvent = true;
      try {
        editorPane = await this.editorService.openEditor({
          ...lastClosedEditor.editor,
          options: {
            ...lastClosedEditor.editor.options,
            ...options
          }
        });
      } finally {
        this.ignoreEditorCloseEvent = false;
      }
    }
    if (!editorPane) {
      remove(this.recentlyClosedEditors, lastClosedEditor);
      this.reopenLastClosedEditor();
    }
  }
  removeFromRecentlyClosedEditors(arg1) {
    this.recentlyClosedEditors = this.recentlyClosedEditors.filter((recentlyClosedEditor) => {
      if (isEditorInput(arg1) && recentlyClosedEditor.editorId !== arg1.editorId) {
        return true;
      }
      if (recentlyClosedEditor.resource && this.editorHelper.matchesFile(recentlyClosedEditor.resource, arg1)) {
        return false;
      }
      if (recentlyClosedEditor.associatedResources.some((associatedResource) => this.editorHelper.matchesFile(associatedResource, arg1))) {
        return false;
      }
      return true;
    });
    this.canReopenClosedEditorContextKey.set(this.recentlyClosedEditors.length > 0);
  }
  //#endregion
  //#region Go to: Recently Opened Editor (limit: 200, persisted)
  static MAX_HISTORY_ITEMS = 200;
  static HISTORY_STORAGE_KEY = "history.entries";
  history = void 0;
  editorHistoryListeners = /* @__PURE__ */ new Map();
  resourceExcludeMatcher = this._register(new WindowIdleValue(mainWindow, () => {
    const matcher = this._register(this.instantiationService.createInstance(
      ResourceGlobMatcher,
      (root) => getExcludes(root ? this.configurationService.getValue({ resource: root }) : this.configurationService.getValue()) || /* @__PURE__ */ Object.create(null),
      (event) => event.affectsConfiguration(FILES_EXCLUDE_CONFIG) || event.affectsConfiguration(SEARCH_EXCLUDE_CONFIG)
    ));
    this._register(matcher.onExpressionChange(() => this.removeExcludedFromHistory()));
    return matcher;
  }));
  handleActiveEditorChangeInHistory(editorPane) {
    const editor = editorPane?.input;
    if (!editor || editor.isDisposed() || !this.includeInHistory(editor)) {
      return;
    }
    this.removeFromHistory(editor);
    this.addToHistory(editor);
  }
  addToHistory(editor, insertFirst = true) {
    this.ensureHistoryLoaded(this.history);
    const historyInput = this.editorHelper.preferResourceEditorInput(editor);
    if (!historyInput) {
      return;
    }
    if (insertFirst) {
      this.history.unshift(historyInput);
    } else {
      this.history.push(historyInput);
    }
    if (this.history.length > HistoryService.MAX_HISTORY_ITEMS) {
      this.editorHelper.clearOnEditorDispose(this.history.pop(), this.editorHistoryListeners);
    }
    if (isEditorInput(editor)) {
      this.editorHelper.onEditorDispose(editor, () => this.updateHistoryOnEditorDispose(historyInput), this.editorHistoryListeners);
    }
  }
  updateHistoryOnEditorDispose(editor) {
    if (isEditorInput(editor)) {
      if (!isSideBySideEditorInput(editor)) {
        this.removeFromHistory(editor);
      } else {
        const resourceInputs = [];
        const sideInputs = editor.primary.matches(editor.secondary) ? [editor.primary] : [editor.primary, editor.secondary];
        for (const sideInput of sideInputs) {
          const candidateResourceInput = this.editorHelper.preferResourceEditorInput(sideInput);
          if (isResourceEditorInput(candidateResourceInput) && this.includeInHistory(candidateResourceInput)) {
            resourceInputs.push(candidateResourceInput);
          }
        }
        this.replaceInHistory(editor, ...resourceInputs);
      }
    } else {
      if (!this.includeInHistory(editor)) {
        this.removeFromHistory(editor);
      }
    }
  }
  includeInHistory(editor) {
    if (isEditorInput(editor)) {
      return true;
    }
    return !this.resourceExcludeMatcher.value.matches(editor.resource);
  }
  removeExcludedFromHistory() {
    this.ensureHistoryLoaded(this.history);
    this.history = this.history.filter((entry) => {
      const include = this.includeInHistory(entry);
      if (!include) {
        this.editorHelper.clearOnEditorDispose(entry, this.editorHistoryListeners);
      }
      return include;
    });
  }
  moveInHistory(event) {
    if (event.isOperation(FileOperation.MOVE)) {
      const removed = this.removeFromHistory(event);
      if (removed) {
        this.addToHistory({ resource: event.target.resource });
      }
    }
  }
  removeFromHistory(arg1) {
    let removed = false;
    this.ensureHistoryLoaded(this.history);
    this.history = this.history.filter((entry) => {
      const matches = this.editorHelper.matchesEditor(arg1, entry);
      if (matches) {
        this.editorHelper.clearOnEditorDispose(arg1, this.editorHistoryListeners);
        removed = true;
      }
      return !matches;
    });
    return removed;
  }
  replaceInHistory(editor, ...replacements) {
    this.ensureHistoryLoaded(this.history);
    let replaced = false;
    const newHistory = [];
    for (const entry of this.history) {
      if (this.editorHelper.matchesEditor(editor, entry)) {
        this.editorHelper.clearOnEditorDispose(editor, this.editorHistoryListeners);
        if (!replaced) {
          newHistory.push(...replacements);
          replaced = true;
        }
      } else if (!replacements.some((replacement) => this.editorHelper.matchesEditor(replacement, entry))) {
        newHistory.push(entry);
      }
    }
    if (!replaced) {
      newHistory.push(...replacements);
    }
    this.history = newHistory;
  }
  clearRecentlyOpened() {
    this.history = [];
    for (const [, disposable] of this.editorHistoryListeners) {
      dispose(disposable);
    }
    this.editorHistoryListeners.clear();
  }
  getHistory() {
    this.ensureHistoryLoaded(this.history);
    return this.history;
  }
  ensureHistoryLoaded(history) {
    if (!this.history) {
      this.history = [];
      if (this.editorGroupService.isReady) {
        this.loadHistory();
      } else {
        (async () => {
          await this.editorGroupService.whenReady;
          this.loadHistory();
        })();
      }
    }
  }
  loadHistory() {
    this.history = [];
    const storedEditorHistory = this.loadHistoryFromStorage();
    const openedEditorsLru = [...this.editorService.getEditors(EditorsOrder.MOST_RECENTLY_ACTIVE)].reverse();
    const handledEditors = /* @__PURE__ */ new Set();
    for (const { editor } of openedEditorsLru) {
      if (!this.includeInHistory(editor)) {
        continue;
      }
      this.addToHistory(editor);
      if (editor.resource) {
        handledEditors.add(`${editor.resource.toString()}/${editor.editorId}`);
      }
    }
    for (const editor of storedEditorHistory) {
      if (!handledEditors.has(`${editor.resource.toString()}/${editor.options?.override}`) && this.includeInHistory(editor)) {
        this.addToHistory(
          editor,
          false
          /* at the end */
        );
      }
    }
  }
  loadHistoryFromStorage() {
    const entries = [];
    const entriesRaw = this.storageService.get(HistoryService.HISTORY_STORAGE_KEY, StorageScope.WORKSPACE);
    if (entriesRaw) {
      try {
        const entriesParsed = JSON.parse(entriesRaw);
        for (const entryParsed of entriesParsed) {
          if (!entryParsed.editor || !entryParsed.editor.resource) {
            continue;
          }
          try {
            entries.push({
              ...entryParsed.editor,
              resource: typeof entryParsed.editor.resource === "string" ? URI.parse(entryParsed.editor.resource) : (
                //  from 1.67.x: URI is stored efficiently as URI.toString()
                URI.from(entryParsed.editor.resource)
              )
              // until 1.66.x: URI was stored very verbose as URI.toJSON()
            });
          } catch (error) {
            onUnexpectedError(error);
          }
        }
      } catch (error) {
        onUnexpectedError(error);
      }
    }
    return entries;
  }
  saveState() {
    if (!this.history) {
      return;
    }
    const entries = [];
    for (const editor of this.history) {
      if (isEditorInput(editor) || !isResourceEditorInput(editor)) {
        continue;
      }
      entries.push({
        editor: {
          ...editor,
          resource: editor.resource.toString()
        }
      });
    }
    this.storageService.store(HistoryService.HISTORY_STORAGE_KEY, JSON.stringify(entries), StorageScope.WORKSPACE, StorageTarget.MACHINE);
  }
  //#endregion
  //#region Last Active Workspace/File
  getLastActiveWorkspaceRoot(schemeFilter, authorityFilter) {
    const folders = this.contextService.getWorkspace().folders;
    if (folders.length === 0) {
      return void 0;
    }
    if (folders.length === 1) {
      const resource = folders[0].uri;
      if ((!schemeFilter || resource.scheme === schemeFilter) && (!authorityFilter || resource.authority === authorityFilter)) {
        return resource;
      }
      return void 0;
    }
    for (const input of this.getHistory()) {
      if (isEditorInput(input)) {
        continue;
      }
      if (schemeFilter && input.resource.scheme !== schemeFilter) {
        continue;
      }
      if (authorityFilter && input.resource.authority !== authorityFilter) {
        continue;
      }
      const resourceWorkspace = this.contextService.getWorkspaceFolder(input.resource);
      if (resourceWorkspace) {
        return resourceWorkspace.uri;
      }
    }
    for (const folder of folders) {
      const resource = folder.uri;
      if ((!schemeFilter || resource.scheme === schemeFilter) && (!authorityFilter || resource.authority === authorityFilter)) {
        return resource;
      }
    }
    return void 0;
  }
  getLastActiveFile(filterByScheme, filterByAuthority) {
    for (const input of this.getHistory()) {
      let resource;
      if (isEditorInput(input)) {
        resource = EditorResourceAccessor.getOriginalUri(input, { filterByScheme });
      } else {
        resource = input.resource;
      }
      if (resource && resource.scheme === filterByScheme && (!filterByAuthority || resource.authority === filterByAuthority)) {
        return resource;
      }
    }
    return void 0;
  }
  //#endregion
  dispose() {
    super.dispose();
    for (const [, stack] of this.editorGroupScopedNavigationStacks) {
      stack.disposable.dispose();
    }
    for (const [, editors] of this.editorScopedNavigationStacks) {
      for (const [, stack] of editors) {
        stack.disposable.dispose();
      }
    }
    for (const [, listener] of this.editorHistoryListeners) {
      listener.dispose();
    }
  }
};
HistoryService = __decorateClass([
  __decorateParam(0, IEditorService),
  __decorateParam(1, IEditorGroupsService),
  __decorateParam(2, IWorkspaceContextService),
  __decorateParam(3, IStorageService),
  __decorateParam(4, IConfigurationService),
  __decorateParam(5, IFileService),
  __decorateParam(6, IWorkspacesService),
  __decorateParam(7, IInstantiationService),
  __decorateParam(8, IWorkbenchLayoutService),
  __decorateParam(9, IContextKeyService),
  __decorateParam(10, ILogService)
], HistoryService);
registerSingleton(IHistoryService, HistoryService, InstantiationType.Eager);
class EditorSelectionState {
  constructor(editorIdentifier, selection, reason) {
    this.editorIdentifier = editorIdentifier;
    this.selection = selection;
    this.reason = reason;
  }
  static {
    __name(this, "EditorSelectionState");
  }
  justifiesNewNavigationEntry(other) {
    if (this.editorIdentifier.groupId !== other.editorIdentifier.groupId) {
      return true;
    }
    if (!this.editorIdentifier.editor.matches(other.editorIdentifier.editor)) {
      return true;
    }
    if (!this.selection || !other.selection) {
      return true;
    }
    const result = this.selection.compare(other.selection);
    if (result === EditorPaneSelectionCompareResult.SIMILAR && (other.reason === EditorPaneSelectionChangeReason.NAVIGATION || other.reason === EditorPaneSelectionChangeReason.JUMP)) {
      return true;
    }
    return result === EditorPaneSelectionCompareResult.DIFFERENT;
  }
}
let EditorNavigationStacks = class extends Disposable {
  constructor(scope, instantiationService) {
    super();
    this.scope = scope;
    this.instantiationService = instantiationService;
  }
  static {
    __name(this, "EditorNavigationStacks");
  }
  selectionsStack = this._register(this.instantiationService.createInstance(EditorNavigationStack, GoFilter.NONE, this.scope));
  editsStack = this._register(this.instantiationService.createInstance(EditorNavigationStack, GoFilter.EDITS, this.scope));
  navigationsStack = this._register(this.instantiationService.createInstance(EditorNavigationStack, GoFilter.NAVIGATION, this.scope));
  stacks = [
    this.selectionsStack,
    this.editsStack,
    this.navigationsStack
  ];
  onDidChange = Event.any(
    this.selectionsStack.onDidChange,
    this.editsStack.onDidChange,
    this.navigationsStack.onDidChange
  );
  canGoForward(filter) {
    return this.getStack(filter).canGoForward();
  }
  goForward(filter) {
    return this.getStack(filter).goForward();
  }
  canGoBack(filter) {
    return this.getStack(filter).canGoBack();
  }
  goBack(filter) {
    return this.getStack(filter).goBack();
  }
  goPrevious(filter) {
    return this.getStack(filter).goPrevious();
  }
  canGoLast(filter) {
    return this.getStack(filter).canGoLast();
  }
  goLast(filter) {
    return this.getStack(filter).goLast();
  }
  getStack(filter = GoFilter.NONE) {
    switch (filter) {
      case GoFilter.NONE:
        return this.selectionsStack;
      case GoFilter.EDITS:
        return this.editsStack;
      case GoFilter.NAVIGATION:
        return this.navigationsStack;
    }
  }
  handleActiveEditorChange(editorPane) {
    this.selectionsStack.notifyNavigation(editorPane);
  }
  handleActiveEditorSelectionChange(editorPane, event) {
    const previous = this.selectionsStack.current;
    this.selectionsStack.notifyNavigation(editorPane, event);
    if (event.reason === EditorPaneSelectionChangeReason.EDIT) {
      this.editsStack.notifyNavigation(editorPane, event);
    } else if ((event.reason === EditorPaneSelectionChangeReason.NAVIGATION || event.reason === EditorPaneSelectionChangeReason.JUMP) && !this.selectionsStack.isNavigating()) {
      if (event.reason === EditorPaneSelectionChangeReason.JUMP && !this.navigationsStack.isNavigating()) {
        if (previous) {
          this.navigationsStack.addOrReplace(previous.groupId, previous.editor, previous.selection);
        }
      }
      this.navigationsStack.notifyNavigation(editorPane, event);
    }
  }
  clear() {
    for (const stack of this.stacks) {
      stack.clear();
    }
  }
  remove(arg1) {
    for (const stack of this.stacks) {
      stack.remove(arg1);
    }
  }
  move(event) {
    for (const stack of this.stacks) {
      stack.move(event);
    }
  }
};
EditorNavigationStacks = __decorateClass([
  __decorateParam(1, IInstantiationService)
], EditorNavigationStacks);
class NoOpEditorNavigationStacks {
  static {
    __name(this, "NoOpEditorNavigationStacks");
  }
  onDidChange = Event.None;
  canGoForward() {
    return false;
  }
  async goForward() {
  }
  canGoBack() {
    return false;
  }
  async goBack() {
  }
  async goPrevious() {
  }
  canGoLast() {
    return false;
  }
  async goLast() {
  }
  handleActiveEditorChange() {
  }
  handleActiveEditorSelectionChange() {
  }
  clear() {
  }
  remove() {
  }
  move() {
  }
  dispose() {
  }
}
let EditorNavigationStack = class extends Disposable {
  constructor(filter, scope, instantiationService, editorService, editorGroupService, logService) {
    super();
    this.filter = filter;
    this.scope = scope;
    this.instantiationService = instantiationService;
    this.editorService = editorService;
    this.editorGroupService = editorGroupService;
    this.logService = logService;
    this.registerListeners();
  }
  static {
    __name(this, "EditorNavigationStack");
  }
  static MAX_STACK_SIZE = 50;
  _onDidChange = this._register(new Emitter());
  onDidChange = this._onDidChange.event;
  mapEditorToDisposable = /* @__PURE__ */ new Map();
  mapGroupToDisposable = /* @__PURE__ */ new Map();
  editorHelper = this.instantiationService.createInstance(EditorHelper);
  stack = [];
  index = -1;
  previousIndex = -1;
  navigating = false;
  currentSelectionState = void 0;
  get current() {
    return this.stack[this.index];
  }
  set current(entry) {
    if (entry) {
      this.stack[this.index] = entry;
    }
  }
  registerListeners() {
    this._register(this.onDidChange(() => this.traceStack()));
    this._register(this.logService.onDidChangeLogLevel(() => this.traceStack()));
  }
  traceStack() {
    if (this.logService.getLevel() !== LogLevel.Trace) {
      return;
    }
    const entryLabels = [];
    for (const entry of this.stack) {
      if (typeof entry.selection?.log === "function") {
        entryLabels.push(`- group: ${entry.groupId}, editor: ${entry.editor.resource?.toString()}, selection: ${entry.selection.log()}`);
      } else {
        entryLabels.push(`- group: ${entry.groupId}, editor: ${entry.editor.resource?.toString()}, selection: <none>`);
      }
    }
    if (entryLabels.length === 0) {
      this.trace(`index: ${this.index}, navigating: ${this.isNavigating()}: <empty>`);
    } else {
      this.trace(`index: ${this.index}, navigating: ${this.isNavigating()}
${entryLabels.join("\n")}
			`);
    }
  }
  trace(msg, editor = null, event) {
    if (this.logService.getLevel() !== LogLevel.Trace) {
      return;
    }
    let filterLabel;
    switch (this.filter) {
      case GoFilter.NONE:
        filterLabel = "global";
        break;
      case GoFilter.EDITS:
        filterLabel = "edits";
        break;
      case GoFilter.NAVIGATION:
        filterLabel = "navigation";
        break;
    }
    let scopeLabel;
    switch (this.scope) {
      case GoScope.DEFAULT:
        scopeLabel = "default";
        break;
      case GoScope.EDITOR_GROUP:
        scopeLabel = "editorGroup";
        break;
      case GoScope.EDITOR:
        scopeLabel = "editor";
        break;
    }
    if (editor !== null) {
      this.logService.trace(`[History stack ${filterLabel}-${scopeLabel}]: ${msg} (editor: ${editor?.resource?.toString()}, event: ${this.traceEvent(event)})`);
    } else {
      this.logService.trace(`[History stack ${filterLabel}-${scopeLabel}]: ${msg}`);
    }
  }
  traceEvent(event) {
    if (!event) {
      return "<none>";
    }
    switch (event.reason) {
      case EditorPaneSelectionChangeReason.EDIT:
        return "edit";
      case EditorPaneSelectionChangeReason.NAVIGATION:
        return "navigation";
      case EditorPaneSelectionChangeReason.JUMP:
        return "jump";
      case EditorPaneSelectionChangeReason.PROGRAMMATIC:
        return "programmatic";
      case EditorPaneSelectionChangeReason.USER:
        return "user";
    }
  }
  registerGroupListeners(groupId) {
    if (!this.mapGroupToDisposable.has(groupId)) {
      const group = this.editorGroupService.getGroup(groupId);
      if (group) {
        this.mapGroupToDisposable.set(groupId, group.onWillMoveEditor((e) => this.onWillMoveEditor(e)));
      }
    }
  }
  onWillMoveEditor(e) {
    this.trace("onWillMoveEditor()", e.editor);
    if (this.scope === GoScope.EDITOR_GROUP) {
      return;
    }
    for (const entry of this.stack) {
      if (entry.groupId !== e.groupId) {
        continue;
      }
      if (!this.editorHelper.matchesEditor(e.editor, entry.editor)) {
        continue;
      }
      entry.groupId = e.target;
    }
  }
  //#region Stack Mutation
  notifyNavigation(editorPane, event) {
    this.trace("notifyNavigation()", editorPane?.input, event);
    const isSelectionAwareEditorPane = isEditorPaneWithSelection(editorPane);
    const hasValidEditor = editorPane?.input && !editorPane.input.isDisposed();
    if (this.navigating) {
      this.trace(`notifyNavigation() ignoring (navigating)`, editorPane?.input, event);
      if (isSelectionAwareEditorPane && hasValidEditor) {
        this.trace("notifyNavigation() updating current selection state", editorPane?.input, event);
        this.currentSelectionState = new EditorSelectionState({ groupId: editorPane.group.id, editor: editorPane.input }, editorPane.getSelection(), event?.reason);
      } else {
        this.trace("notifyNavigation() dropping current selection state", editorPane?.input, event);
        this.currentSelectionState = void 0;
      }
    } else {
      this.trace(`notifyNavigation() not ignoring`, editorPane?.input, event);
      if (isSelectionAwareEditorPane && hasValidEditor) {
        this.onSelectionAwareEditorNavigation(editorPane.group.id, editorPane.input, editorPane.getSelection(), event);
      } else {
        this.currentSelectionState = void 0;
        if (hasValidEditor) {
          this.onNonSelectionAwareEditorNavigation(editorPane.group.id, editorPane.input);
        }
      }
    }
  }
  onSelectionAwareEditorNavigation(groupId, editor, selection, event) {
    if (this.current?.groupId === groupId && !selection && this.editorHelper.matchesEditor(this.current.editor, editor)) {
      return;
    }
    this.trace("onSelectionAwareEditorNavigation()", editor, event);
    const stateCandidate = new EditorSelectionState({ groupId, editor }, selection, event?.reason);
    if (!this.currentSelectionState || this.currentSelectionState.justifiesNewNavigationEntry(stateCandidate)) {
      this.doAdd(groupId, editor, stateCandidate.selection);
    } else {
      this.doReplace(groupId, editor, stateCandidate.selection);
    }
    this.currentSelectionState = stateCandidate;
  }
  onNonSelectionAwareEditorNavigation(groupId, editor) {
    if (this.current?.groupId === groupId && this.editorHelper.matchesEditor(this.current.editor, editor)) {
      return;
    }
    this.trace("onNonSelectionAwareEditorNavigation()", editor);
    this.doAdd(groupId, editor);
  }
  doAdd(groupId, editor, selection) {
    if (!this.navigating) {
      this.addOrReplace(groupId, editor, selection);
    }
  }
  doReplace(groupId, editor, selection) {
    if (!this.navigating) {
      this.addOrReplace(
        groupId,
        editor,
        selection,
        true
        /* force replace */
      );
    }
  }
  addOrReplace(groupId, editorCandidate, selection, forceReplace) {
    this.registerGroupListeners(groupId);
    let replace = false;
    if (this.current) {
      if (forceReplace) {
        replace = true;
      } else if (this.shouldReplaceStackEntry(this.current, { groupId, editor: editorCandidate, selection })) {
        replace = true;
      }
    }
    const editor = this.editorHelper.preferResourceEditorInput(editorCandidate);
    if (!editor) {
      return;
    }
    if (replace) {
      this.trace("replace()", editor);
    } else {
      this.trace("add()", editor);
    }
    const newStackEntry = { groupId, editor, selection };
    const removedEntries = [];
    if (replace) {
      if (this.current) {
        removedEntries.push(this.current);
      }
      this.current = newStackEntry;
    } else {
      if (this.stack.length > this.index + 1) {
        for (let i = this.index + 1; i < this.stack.length; i++) {
          removedEntries.push(this.stack[i]);
        }
        this.stack = this.stack.slice(0, this.index + 1);
      }
      this.stack.splice(this.index + 1, 0, newStackEntry);
      if (this.stack.length > EditorNavigationStack.MAX_STACK_SIZE) {
        removedEntries.push(this.stack.shift());
        if (this.previousIndex >= 0) {
          this.previousIndex--;
        }
      } else {
        this.setIndex(
          this.index + 1,
          true
          /* skip event, we fire it later */
        );
      }
    }
    for (const removedEntry of removedEntries) {
      this.editorHelper.clearOnEditorDispose(removedEntry.editor, this.mapEditorToDisposable);
    }
    if (isEditorInput(editor)) {
      this.editorHelper.onEditorDispose(editor, () => this.remove(editor), this.mapEditorToDisposable);
    }
    this._onDidChange.fire();
  }
  shouldReplaceStackEntry(entry, candidate) {
    if (entry.groupId !== candidate.groupId) {
      return false;
    }
    if (!this.editorHelper.matchesEditor(entry.editor, candidate.editor)) {
      return false;
    }
    if (!entry.selection) {
      return true;
    }
    if (!candidate.selection) {
      return false;
    }
    return entry.selection.compare(candidate.selection) === EditorPaneSelectionCompareResult.IDENTICAL;
  }
  move(event) {
    if (event.isOperation(FileOperation.MOVE)) {
      for (const entry of this.stack) {
        if (this.editorHelper.matchesEditor(event, entry.editor)) {
          entry.editor = { resource: event.target.resource };
        }
      }
    }
  }
  remove(arg1) {
    const previousStackSize = this.stack.length;
    this.stack = this.stack.filter((entry) => {
      const matches = typeof arg1 === "number" ? entry.groupId === arg1 : this.editorHelper.matchesEditor(arg1, entry.editor);
      if (matches) {
        this.editorHelper.clearOnEditorDispose(entry.editor, this.mapEditorToDisposable);
      }
      return !matches;
    });
    if (previousStackSize === this.stack.length) {
      return;
    }
    this.flatten();
    this.index = this.stack.length - 1;
    this.previousIndex = -1;
    if (typeof arg1 === "number") {
      this.mapGroupToDisposable.get(arg1)?.dispose();
      this.mapGroupToDisposable.delete(arg1);
    }
    this._onDidChange.fire();
  }
  flatten() {
    const flattenedStack = [];
    let previousEntry = void 0;
    for (const entry of this.stack) {
      if (previousEntry && this.shouldReplaceStackEntry(entry, previousEntry)) {
        continue;
      }
      previousEntry = entry;
      flattenedStack.push(entry);
    }
    this.stack = flattenedStack;
  }
  clear() {
    this.index = -1;
    this.previousIndex = -1;
    this.stack.splice(0);
    for (const [, disposable] of this.mapEditorToDisposable) {
      dispose(disposable);
    }
    this.mapEditorToDisposable.clear();
    for (const [, disposable] of this.mapGroupToDisposable) {
      dispose(disposable);
    }
    this.mapGroupToDisposable.clear();
  }
  dispose() {
    super.dispose();
    this.clear();
  }
  //#endregion
  //#region Navigation
  canGoForward() {
    return this.stack.length > this.index + 1;
  }
  async goForward() {
    const navigated = await this.maybeGoCurrent();
    if (navigated) {
      return;
    }
    if (!this.canGoForward()) {
      return;
    }
    this.setIndex(this.index + 1);
    return this.navigate();
  }
  canGoBack() {
    return this.index > 0;
  }
  async goBack() {
    const navigated = await this.maybeGoCurrent();
    if (navigated) {
      return;
    }
    if (!this.canGoBack()) {
      return;
    }
    this.setIndex(this.index - 1);
    return this.navigate();
  }
  async goPrevious() {
    const navigated = await this.maybeGoCurrent();
    if (navigated) {
      return;
    }
    if (this.previousIndex === -1) {
      return this.goBack();
    }
    this.setIndex(this.previousIndex);
    return this.navigate();
  }
  canGoLast() {
    return this.stack.length > 0;
  }
  async goLast() {
    if (!this.canGoLast()) {
      return;
    }
    this.setIndex(this.stack.length - 1);
    return this.navigate();
  }
  async maybeGoCurrent() {
    if (this.filter === GoFilter.NONE) {
      return false;
    }
    if (this.isCurrentSelectionActive()) {
      return false;
    }
    await this.navigate();
    return true;
  }
  isCurrentSelectionActive() {
    if (!this.current?.selection) {
      return false;
    }
    const pane = this.editorService.activeEditorPane;
    if (!isEditorPaneWithSelection(pane)) {
      return false;
    }
    if (pane.group.id !== this.current.groupId) {
      return false;
    }
    if (!pane.input || !this.editorHelper.matchesEditor(pane.input, this.current.editor)) {
      return false;
    }
    const paneSelection = pane.getSelection();
    if (!paneSelection) {
      return false;
    }
    return paneSelection.compare(this.current.selection) === EditorPaneSelectionCompareResult.IDENTICAL;
  }
  setIndex(newIndex, skipEvent) {
    this.previousIndex = this.index;
    this.index = newIndex;
    if (!skipEvent) {
      this._onDidChange.fire();
    }
  }
  async navigate() {
    this.navigating = true;
    try {
      if (this.current) {
        await this.doNavigate(this.current);
      }
    } finally {
      this.navigating = false;
    }
  }
  doNavigate(location) {
    let options = /* @__PURE__ */ Object.create(null);
    if (location.selection) {
      options = location.selection.restore(options);
    }
    if (isEditorInput(location.editor)) {
      return this.editorService.openEditor(location.editor, options, location.groupId);
    }
    return this.editorService.openEditor({
      ...location.editor,
      options: {
        ...location.editor.options,
        ...options
      }
    }, location.groupId);
  }
  isNavigating() {
    return this.navigating;
  }
  //#endregion
};
EditorNavigationStack = __decorateClass([
  __decorateParam(2, IInstantiationService),
  __decorateParam(3, IEditorService),
  __decorateParam(4, IEditorGroupsService),
  __decorateParam(5, ILogService)
], EditorNavigationStack);
let EditorHelper = class {
  constructor(uriIdentityService, lifecycleService, fileService, pathService) {
    this.uriIdentityService = uriIdentityService;
    this.lifecycleService = lifecycleService;
    this.fileService = fileService;
    this.pathService = pathService;
  }
  static {
    __name(this, "EditorHelper");
  }
  preferResourceEditorInput(editor) {
    const resource = EditorResourceAccessor.getOriginalUri(editor);
    const hasValidResourceEditorInputScheme = resource?.scheme === Schemas.file || resource?.scheme === Schemas.vscodeRemote || resource?.scheme === Schemas.vscodeUserData || resource?.scheme === this.pathService.defaultUriScheme;
    if (hasValidResourceEditorInputScheme) {
      if (isEditorInput(editor)) {
        const untypedInput = editor.toUntyped();
        if (isResourceEditorInput(untypedInput)) {
          return untypedInput;
        }
      }
      return editor;
    } else {
      return isEditorInput(editor) ? editor : void 0;
    }
  }
  matchesEditor(arg1, inputB) {
    if (arg1 instanceof FileChangesEvent || arg1 instanceof FileOperationEvent) {
      if (isEditorInput(inputB)) {
        return false;
      }
      if (arg1 instanceof FileChangesEvent) {
        return arg1.contains(inputB.resource, FileChangeType.DELETED);
      }
      return this.matchesFile(inputB.resource, arg1);
    }
    if (isEditorInput(arg1)) {
      if (isEditorInput(inputB)) {
        return arg1.matches(inputB);
      }
      return this.matchesFile(inputB.resource, arg1);
    }
    if (isEditorInput(inputB)) {
      return this.matchesFile(arg1.resource, inputB);
    }
    return arg1 && inputB && this.uriIdentityService.extUri.isEqual(arg1.resource, inputB.resource);
  }
  matchesFile(resource, arg2) {
    if (arg2 instanceof FileChangesEvent) {
      return arg2.contains(resource, FileChangeType.DELETED);
    }
    if (arg2 instanceof FileOperationEvent) {
      return this.uriIdentityService.extUri.isEqualOrParent(resource, arg2.resource);
    }
    if (isEditorInput(arg2)) {
      const inputResource = arg2.resource;
      if (!inputResource) {
        return false;
      }
      if (this.lifecycleService.phase >= LifecyclePhase.Restored && !this.fileService.hasProvider(inputResource)) {
        return false;
      }
      return this.uriIdentityService.extUri.isEqual(inputResource, resource);
    }
    return this.uriIdentityService.extUri.isEqual(arg2?.resource, resource);
  }
  matchesEditorIdentifier(identifier, editorPane) {
    if (!editorPane?.group) {
      return false;
    }
    if (identifier.groupId !== editorPane.group.id) {
      return false;
    }
    return editorPane.input ? identifier.editor.matches(editorPane.input) : false;
  }
  onEditorDispose(editor, listener, mapEditorToDispose) {
    const toDispose = Event.once(editor.onWillDispose)(() => listener());
    let disposables = mapEditorToDispose.get(editor);
    if (!disposables) {
      disposables = new DisposableStore();
      mapEditorToDispose.set(editor, disposables);
    }
    disposables.add(toDispose);
  }
  clearOnEditorDispose(editor, mapEditorToDispose) {
    if (!isEditorInput(editor)) {
      return;
    }
    const disposables = mapEditorToDispose.get(editor);
    if (disposables) {
      dispose(disposables);
      mapEditorToDispose.delete(editor);
    }
  }
};
EditorHelper = __decorateClass([
  __decorateParam(0, IUriIdentityService),
  __decorateParam(1, ILifecycleService),
  __decorateParam(2, IFileService),
  __decorateParam(3, IPathService)
], EditorHelper);
export {
  EditorNavigationStack,
  HistoryService
};
//# sourceMappingURL=historyService.js.map
