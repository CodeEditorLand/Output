var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = function(paramIndex, decorator) {
  return function(target, key) {
    decorator(target, key, paramIndex);
  };
};
var ChatEditsFileTreeRenderer_1;
import * as dom from "../../../../../../base/browser/dom.js";
import { addDisposableListener } from "../../../../../../base/browser/dom.js";
import { ObjectTreeElementCollapseState } from "../../../../../../base/browser/ui/tree/tree.js";
import { Codicon } from "../../../../../../base/common/codicons.js";
import { comparePaths } from "../../../../../../base/common/comparers.js";
import { Emitter } from "../../../../../../base/common/event.js";
import { Disposable, DisposableStore } from "../../../../../../base/common/lifecycle.js";
import { matchesSomeScheme, Schemas } from "../../../../../../base/common/network.js";
import { basename } from "../../../../../../base/common/path.js";
import { basenameOrAuthority, dirname, isEqual, isEqualAuthority, isEqualOrParent } from "../../../../../../base/common/resources.js";
import { ThemeIcon } from "../../../../../../base/common/themables.js";
import { URI } from "../../../../../../base/common/uri.js";
import { localize } from "../../../../../../nls.js";
import { MenuWorkbenchToolBar } from "../../../../../../platform/actions/browser/toolbar.js";
import { MenuId } from "../../../../../../platform/actions/common/actions.js";
import { IContextKeyService } from "../../../../../../platform/contextkey/common/contextkey.js";
import { FileKind } from "../../../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../../../platform/instantiation/common/instantiation.js";
import { ServiceCollection } from "../../../../../../platform/instantiation/common/serviceCollection.js";
import { ILabelService } from "../../../../../../platform/label/common/label.js";
import { WorkbenchObjectTree } from "../../../../../../platform/list/browser/listService.js";
import { IProductService } from "../../../../../../platform/product/common/productService.js";
import { IStorageService } from "../../../../../../platform/storage/common/storage.js";
import { isDark } from "../../../../../../platform/theme/common/theme.js";
import { IThemeService } from "../../../../../../platform/theme/common/themeService.js";
import { ResourceLabels } from "../../../../../browser/labels.js";
import { SETTINGS_AUTHORITY } from "../../../../../services/preferences/common/preferences.js";
import { ChatContextKeys } from "../../../common/actions/chatContextKeys.js";
import { ChatResponseReferencePartStatusKind } from "../../../common/chatService/chatService.js";
import { chatEditingWidgetFileStateContextKey } from "../../../common/editing/chatEditingService.js";
import { CHAT_EDITS_VIEW_MODE_STORAGE_KEY } from "../../chatEditing/chatEditingActions.js";
import { createFileIconThemableTreeContainerScope } from "../../../../files/browser/views/explorerView.js";
import { CollapsibleListPool } from "../chatContentParts/chatReferencesContentPart.js";
const $ = dom.$;
function findCommonAncestorUri(uris) {
  if (uris.length === 0) {
    return void 0;
  }
  let common = uris[0];
  for (let i = 1; i < uris.length; i++) {
    while (!isEqualOrParent(uris[i], common)) {
      const parent = dirname(common);
      if (isEqual(parent, common)) {
        return void 0;
      }
      common = parent;
    }
  }
  return common;
}
__name(findCommonAncestorUri, "findCommonAncestorUri");
function buildEditsTree(items) {
  const folderMap = /* @__PURE__ */ new Map();
  const itemsWithoutUri = [];
  for (const item of items) {
    if (item.kind === "reference" && URI.isUri(item.reference)) {
      const folderUri = dirname(item.reference);
      const key = folderUri.toString();
      let group = folderMap.get(key);
      if (!group) {
        group = { uri: folderUri, items: [] };
        folderMap.set(key, group);
      }
      group.items.push(item);
    } else {
      itemsWithoutUri.push(item);
    }
  }
  const result = [];
  for (const item of itemsWithoutUri) {
    result.push({ element: item });
  }
  if (folderMap.size === 0) {
    return result;
  }
  const folderUris = [...folderMap.values()].map((f) => f.uri);
  const commonAncestor = findCommonAncestorUri(folderUris);
  const sortedFolders = [...folderMap.values()].sort((a, b) => comparePaths(a.uri.fsPath, b.uri.fsPath));
  const rootFiles = [];
  for (const folder of sortedFolders) {
    const isAtCommonAncestor = commonAncestor && isEqual(folder.uri, commonAncestor);
    if (isAtCommonAncestor) {
      for (const item of folder.items) {
        rootFiles.push({ element: item });
      }
    } else {
      const folderElement = {
        kind: "folder",
        uri: folder.uri,
        children: folder.items
      };
      result.push({
        element: folderElement,
        children: folder.items.map((item) => ({ element: item })),
        collapsible: true,
        collapsed: ObjectTreeElementCollapseState.PreserveOrExpanded
      });
    }
  }
  result.push(...rootFiles);
  return result;
}
__name(buildEditsTree, "buildEditsTree");
function buildEditsList(items) {
  return items.map((item) => ({ element: item }));
}
__name(buildEditsList, "buildEditsList");
class ChatEditsTreeDelegate {
  static {
    __name(this, "ChatEditsTreeDelegate");
  }
  getHeight(_element) {
    return 22;
  }
  getTemplateId(element) {
    if (element.kind === "folder") {
      return ChatEditsFolderRenderer.TEMPLATE_ID;
    }
    return ChatEditsFileTreeRenderer.TEMPLATE_ID;
  }
}
class ChatEditsTreeIdentityProvider {
  static {
    __name(this, "ChatEditsTreeIdentityProvider");
  }
  getId(element) {
    if (element.kind === "folder") {
      return `folder:${element.uri.toString()}`;
    }
    if (element.kind === "warning") {
      return `warning:${element.content.value}`;
    }
    const ref = element.reference;
    if (typeof ref === "string") {
      return `ref:${ref}`;
    } else if (URI.isUri(ref)) {
      return `file:${ref.toString()}`;
    } else {
      return `file:${"uri" in ref ? ref.uri.toString() : String(ref)}`;
    }
  }
}
class ChatEditsFolderRenderer {
  static {
    __name(this, "ChatEditsFolderRenderer");
  }
  static {
    this.TEMPLATE_ID = "chatEditsFolderRenderer";
  }
  constructor(labels, labelService) {
    this.labels = labels;
    this.labelService = labelService;
    this.templateId = ChatEditsFolderRenderer.TEMPLATE_ID;
  }
  renderTemplate(container) {
    const templateDisposables = new DisposableStore();
    const label = templateDisposables.add(this.labels.create(container, { supportHighlights: true, supportIcons: true }));
    return { label, templateDisposables };
  }
  renderElement(node, _index, templateData) {
    const element = node.element;
    if (element.kind !== "folder") {
      return;
    }
    const relativeLabel = this.labelService.getUriLabel(element.uri, { relative: true });
    templateData.label.setResource({ resource: element.uri, name: relativeLabel || basename(element.uri.path) }, { fileKind: FileKind.FOLDER, fileDecorations: void 0 });
  }
  disposeTemplate(templateData) {
    templateData.templateDisposables.dispose();
  }
}
let ChatEditsFileTreeRenderer = class ChatEditsFileTreeRenderer2 {
  static {
    __name(this, "ChatEditsFileTreeRenderer");
  }
  static {
    ChatEditsFileTreeRenderer_1 = this;
  }
  static {
    this.TEMPLATE_ID = "chatEditsFileRenderer";
  }
  constructor(labels, menuId, themeService, productService, instantiationService, contextKeyService) {
    this.labels = labels;
    this.menuId = menuId;
    this.themeService = themeService;
    this.productService = productService;
    this.instantiationService = instantiationService;
    this.contextKeyService = contextKeyService;
    this.templateId = ChatEditsFileTreeRenderer_1.TEMPLATE_ID;
  }
  renderTemplate(container) {
    const templateDisposables = new DisposableStore();
    const label = templateDisposables.add(this.labels.create(container, { supportHighlights: true, supportIcons: true }));
    const fileDiffsContainer = $(".working-set-line-counts");
    const addedSpan = dom.$(".working-set-lines-added");
    const removedSpan = dom.$(".working-set-lines-removed");
    fileDiffsContainer.appendChild(addedSpan);
    fileDiffsContainer.appendChild(removedSpan);
    label.element.appendChild(fileDiffsContainer);
    let toolbar;
    let actionBarContainer;
    let contextKeyService;
    if (this.menuId) {
      actionBarContainer = $(".chat-collapsible-list-action-bar");
      contextKeyService = templateDisposables.add(this.contextKeyService.createScoped(actionBarContainer));
      const scopedInstantiationService = templateDisposables.add(this.instantiationService.createChild(new ServiceCollection([IContextKeyService, contextKeyService])));
      toolbar = templateDisposables.add(scopedInstantiationService.createInstance(MenuWorkbenchToolBar, actionBarContainer, this.menuId, { menuOptions: { shouldForwardArgs: true, arg: void 0 } }));
      label.element.appendChild(actionBarContainer);
    }
    return { templateDisposables, label, toolbar, actionBarContainer, contextKeyService, fileDiffsContainer, addedSpan, removedSpan };
  }
  getReferenceIcon(data) {
    if (ThemeIcon.isThemeIcon(data.iconPath)) {
      return data.iconPath;
    } else {
      return isDark(this.themeService.getColorTheme().type) && data.iconPath?.dark ? data.iconPath?.dark : data.iconPath?.light;
    }
  }
  renderElement(node, _index, templateData) {
    const data = node.element;
    if (data.kind === "folder") {
      return;
    }
    if (data.kind === "warning") {
      templateData.label.setResource({ name: data.content.value }, { icon: Codicon.warning });
      return;
    }
    const reference = data.reference;
    const icon = this.getReferenceIcon(data);
    templateData.label.element.style.display = "flex";
    let arg;
    if (typeof reference === "object" && "variableName" in reference) {
      if (reference.value) {
        const uri = URI.isUri(reference.value) ? reference.value : reference.value.uri;
        templateData.label.setResource({
          resource: uri,
          name: basenameOrAuthority(uri),
          description: `#${reference.variableName}`,
          // eslint-disable-next-line local/code-no-in-operator
          range: "range" in reference.value ? reference.value.range : void 0
        }, { icon, title: data.options?.status?.description ?? data.title });
      } else if (reference.variableName.startsWith("kernelVariable")) {
        const variable = reference.variableName.split(":")[1];
        const asVariableName = `${variable}`;
        const label = `Kernel variable`;
        templateData.label.setLabel(label, asVariableName, { title: data.options?.status?.description });
      } else {
        templateData.label.setLabel("Unknown variable type: " + reference.variableName);
      }
    } else if (typeof reference === "string") {
      templateData.label.setLabel(reference, void 0, { iconPath: URI.isUri(icon) ? icon : void 0, title: data.options?.status?.description ?? data.title });
    } else {
      const uri = "uri" in reference ? reference.uri : reference;
      arg = uri;
      if (uri.scheme === "https" && isEqualAuthority(uri.authority, "github.com") && uri.path.includes("/tree/")) {
        templateData.label.setResource({ resource: uri, name: basename(uri.path) }, { icon: Codicon.github, title: data.title });
      } else if (uri.scheme === this.productService.urlProtocol && isEqualAuthority(uri.authority, SETTINGS_AUTHORITY)) {
        const settingId = uri.path.substring(1);
        templateData.label.setResource({ resource: uri, name: settingId }, { icon: Codicon.settingsGear, title: localize("setting.hover", "Open setting '{0}'", settingId) });
      } else if (matchesSomeScheme(uri, Schemas.mailto, Schemas.http, Schemas.https)) {
        templateData.label.setResource({ resource: uri, name: uri.toString(true) }, { icon: icon ?? Codicon.globe, title: data.options?.status?.description ?? data.title ?? uri.toString(true) });
      } else {
        templateData.label.setFile(uri, {
          fileKind: FileKind.FILE,
          fileDecorations: void 0,
          // eslint-disable-next-line local/code-no-in-operator
          range: "range" in reference ? reference.range : void 0,
          title: data.options?.status?.description ?? data.title
        });
      }
    }
    for (const selector of [".monaco-icon-suffix-container", ".monaco-icon-name-container"]) {
      const element = templateData.label.element.querySelector(selector);
      if (element) {
        if (data.options?.status?.kind === ChatResponseReferencePartStatusKind.Omitted || data.options?.status?.kind === ChatResponseReferencePartStatusKind.Partial) {
          element.classList.add("warning");
        } else {
          element.classList.remove("warning");
        }
      }
    }
    if (data.state !== void 0) {
      if (templateData.actionBarContainer) {
        const diffMeta = data?.options?.diffMeta;
        if (diffMeta) {
          if (!templateData.fileDiffsContainer || !templateData.addedSpan || !templateData.removedSpan) {
            return;
          }
          templateData.addedSpan.textContent = `+${diffMeta.added}`;
          templateData.removedSpan.textContent = `-${diffMeta.removed}`;
          templateData.fileDiffsContainer.setAttribute("aria-label", localize("chatEditingSession.fileCounts", "{0} lines added, {1} lines removed", diffMeta.added, diffMeta.removed));
        }
        templateData.label.element.querySelector(".monaco-icon-name-container")?.classList.add("modified");
      }
      if (templateData.toolbar) {
        templateData.toolbar.context = arg;
      }
      if (templateData.contextKeyService) {
        chatEditingWidgetFileStateContextKey.bindTo(templateData.contextKeyService).set(data.state);
      }
    }
  }
  disposeTemplate(templateData) {
    templateData.templateDisposables.dispose();
  }
};
ChatEditsFileTreeRenderer = ChatEditsFileTreeRenderer_1 = __decorate([
  __param(2, IThemeService),
  __param(3, IProductService),
  __param(4, IInstantiationService),
  __param(5, IContextKeyService)
], ChatEditsFileTreeRenderer);
let ChatEditsListWidget = class ChatEditsListWidget2 extends Disposable {
  static {
    __name(this, "ChatEditsListWidget");
  }
  get currentSession() {
    return this._currentSession;
  }
  get selectedElements() {
    const edits = [];
    if (this._tree) {
      for (const element of this._tree.getSelection()) {
        if (element && element.kind === "reference" && URI.isUri(element.reference)) {
          edits.push(element.reference);
        }
      }
    } else if (this._list) {
      for (const element of this._list.object.getSelectedElements()) {
        if (element.kind === "reference" && URI.isUri(element.reference)) {
          edits.push(element.reference);
        }
      }
    }
    return edits;
  }
  constructor(onDidChangeVisibility, instantiationService, contextKeyService, storageService, themeService, labelService) {
    super();
    this.onDidChangeVisibility = onDidChangeVisibility;
    this.instantiationService = instantiationService;
    this.storageService = storageService;
    this.themeService = themeService;
    this.labelService = labelService;
    this._onDidFocus = this._register(new Emitter());
    this.onDidFocus = this._onDidFocus.event;
    this._onDidOpen = this._register(new Emitter());
    this.onDidOpen = this._onDidOpen.event;
    this._widgetDisposables = this._register(new DisposableStore());
    this._currentSession = null;
    this._lastEntries = [];
    this._listPool = this._register(this.instantiationService.createInstance(CollapsibleListPool, this.onDidChangeVisibility, MenuId.ChatEditingWidgetModifiedFilesToolbar, {
      verticalScrollMode: 3
      /* ScrollbarVisibility.Visible */
    }));
    this._chatEditsInTreeView = ChatContextKeys.chatEditsInTreeView.bindTo(contextKeyService);
    this._chatEditsInTreeView.set(this._isTreeMode);
    this._register(this.storageService.onDidChangeValue(0, CHAT_EDITS_VIEW_MODE_STORAGE_KEY, this._store)(() => {
      const isTree = this._isTreeMode;
      this._chatEditsInTreeView.set(isTree);
      if (this._currentContainer) {
        this.create(this._currentContainer, this._currentSession);
        this.setEntries(this._lastEntries);
      }
    }));
  }
  get _isTreeMode() {
    return this.storageService.get(CHAT_EDITS_VIEW_MODE_STORAGE_KEY, 0, "list") === "tree";
  }
  /**
   * Creates the appropriate widget (tree or list) inside the given container.
   * Must be called before {@link setEntries}.
   */
  create(container, chatEditingSession) {
    this._currentContainer = container;
    this._currentSession = chatEditingSession;
    this.clear();
    dom.clearNode(container);
    if (this._isTreeMode) {
      this._createTree(container, chatEditingSession);
    } else {
      this._createList(container, chatEditingSession);
    }
  }
  /**
   * Rebuild the widget (e.g. after a view mode toggle).
   */
  rebuild(container, chatEditingSession) {
    this.create(container, chatEditingSession);
  }
  /**
   * Whether the current view mode has changed since the widget was last created.
   */
  get needsRebuild() {
    if (this._isTreeMode) {
      return !this._tree;
    }
    return !this._list;
  }
  /**
   * Update the displayed entries.
   */
  setEntries(entries) {
    this._lastEntries = entries;
    if (this._tree) {
      const treeElements = this._isTreeMode ? buildEditsTree(entries) : buildEditsList(entries);
      const maxItemsShown = 6;
      const itemsShown = Math.min(entries.length, maxItemsShown);
      const height = itemsShown * 22;
      this._tree.layout(height);
      this._tree.getHTMLElement().style.height = `${height}px`;
      this._tree.setChildren(null, treeElements);
    } else if (this._list) {
      const maxItemsShown = 6;
      const itemsShown = Math.min(entries.length, maxItemsShown);
      const height = itemsShown * 22;
      const list = this._list.object;
      list.layout(height);
      list.getHTMLElement().style.height = `${height}px`;
      list.splice(0, list.length, entries);
    }
  }
  /**
   * Dispose the current tree or list widget without disposing the outer widget.
   */
  clear() {
    this._widgetDisposables.clear();
    this._tree = void 0;
    this._list = void 0;
  }
  _createTree(container, chatEditingSession) {
    const resourceLabels = this._widgetDisposables.add(this.instantiationService.createInstance(ResourceLabels, { onDidChangeVisibility: this.onDidChangeVisibility }));
    const treeContainer = dom.$(".chat-used-context-list");
    this._widgetDisposables.add(createFileIconThemableTreeContainerScope(treeContainer, this.themeService));
    const tree = this._widgetDisposables.add(this.instantiationService.createInstance(WorkbenchObjectTree, "ChatEditsTree", treeContainer, new ChatEditsTreeDelegate(), [
      new ChatEditsFolderRenderer(resourceLabels, this.labelService),
      this.instantiationService.createInstance(ChatEditsFileTreeRenderer, resourceLabels, MenuId.ChatEditingWidgetModifiedFilesToolbar)
    ], {
      alwaysConsumeMouseWheel: false,
      accessibilityProvider: {
        getAriaLabel: /* @__PURE__ */ __name((element) => {
          if (element.kind === "folder") {
            return this.labelService.getUriLabel(element.uri, { relative: true });
          }
          if (element.kind === "warning") {
            return element.content.value;
          }
          const reference = element.reference;
          if (typeof reference === "string") {
            return reference;
          } else if (URI.isUri(reference)) {
            return this.labelService.getUriBasenameLabel(reference);
          } else if ("uri" in reference) {
            return this.labelService.getUriBasenameLabel(reference.uri);
          } else {
            return "";
          }
        }, "getAriaLabel"),
        getWidgetAriaLabel: /* @__PURE__ */ __name(() => localize("chatEditsTree", "Changed Files"), "getWidgetAriaLabel")
      },
      identityProvider: new ChatEditsTreeIdentityProvider(),
      verticalScrollMode: 3,
      hideTwistiesOfChildlessElements: true
    }));
    tree.updateOptions({ enableStickyScroll: false });
    this._tree = tree;
    this._widgetDisposables.add(tree.onDidChangeFocus(() => {
      this._onDidFocus.fire();
    }));
    this._widgetDisposables.add(tree.onDidOpen((e) => {
      this._onDidOpen.fire(e);
    }));
    this._widgetDisposables.add(addDisposableListener(tree.getHTMLElement(), "click", () => {
      this._onDidFocus.fire();
    }, true));
    dom.append(container, tree.getHTMLElement());
  }
  _createList(container, chatEditingSession) {
    this._list = this._listPool.get();
    const list = this._list.object;
    this._widgetDisposables.add(this._list);
    this._widgetDisposables.add(list.onDidFocus(() => {
      this._onDidFocus.fire();
    }));
    this._widgetDisposables.add(list.onDidOpen(async (e) => {
      if (e.element) {
        this._onDidOpen.fire({
          element: e.element,
          editorOptions: e.editorOptions,
          sideBySide: e.sideBySide,
          browserEvent: e.browserEvent
        });
      }
    }));
    this._widgetDisposables.add(addDisposableListener(list.getHTMLElement(), "click", () => {
      this._onDidFocus.fire();
    }, true));
    dom.append(container, list.getHTMLElement());
  }
  dispose() {
    this.clear();
    super.dispose();
  }
};
ChatEditsListWidget = __decorate([
  __param(1, IInstantiationService),
  __param(2, IContextKeyService),
  __param(3, IStorageService),
  __param(4, IThemeService),
  __param(5, ILabelService)
], ChatEditsListWidget);
export {
  ChatEditsFileTreeRenderer,
  ChatEditsFolderRenderer,
  ChatEditsListWidget,
  ChatEditsTreeDelegate,
  ChatEditsTreeIdentityProvider,
  buildEditsList,
  buildEditsTree
};
//# sourceMappingURL=chatEditsTree.js.map
