var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { IDragAndDropData } from "../../dnd.js";
import { IIdentityProvider, IListDragAndDrop, IListDragOverReaction, IListVirtualDelegate } from "../list/list.js";
import { ElementsDragAndDropData, ListViewTargetSector } from "../list/listView.js";
import { IListStyles } from "../list/listWidget.js";
import { ComposedTreeDelegate, TreeFindMode, IAbstractTreeOptions, IAbstractTreeOptionsUpdate, TreeFindMatchType, AbstractTreePart, LabelFuzzyScore, IFindFilter, AbstractFindController, ITreeFindToggleContribution, ITreeFindToggleChangeEvent } from "./abstractTree.js";
import { ICompressedTreeElement, ICompressedTreeNode } from "./compressedObjectTreeModel.js";
import { getVisibleState, isFilterResult } from "./indexTreeModel.js";
import { CompressibleObjectTree, ICompressibleKeyboardNavigationLabelProvider, ICompressibleObjectTreeOptions, ICompressibleTreeRenderer, IObjectTreeOptions, IObjectTreeSetChildrenOptions, ObjectTree } from "./objectTree.js";
import { IAsyncDataSource, ICollapseStateChangeEvent, IObjectTreeElement, ITreeContextMenuEvent, ITreeDragAndDrop, ITreeEvent, ITreeFilter, ITreeModel, ITreeMouseEvent, ITreeNavigator, ITreeNode, ITreeRenderer, ITreeSorter, ObjectTreeElementCollapseState, TreeError, TreeFilterResult, TreeVisibility, WeakMapper } from "./tree.js";
import { CancelablePromise, createCancelablePromise, Promises, timeout, TimeoutTimer } from "../../../common/async.js";
import { Codicon } from "../../../common/codicons.js";
import { ThemeIcon } from "../../../common/themables.js";
import { isCancellationError, onUnexpectedError } from "../../../common/errors.js";
import { Emitter, Event } from "../../../common/event.js";
import { Iterable } from "../../../common/iterator.js";
import { DisposableStore, dispose, IDisposable } from "../../../common/lifecycle.js";
import { ScrollEvent } from "../../../common/scrollable.js";
import { isIterable, isNumber } from "../../../common/types.js";
import { CancellationToken, CancellationTokenSource } from "../../../common/cancellation.js";
import { IObjectTreeModel } from "./objectTreeModel.js";
import { IContextViewProvider } from "../contextview/contextview.js";
import { FuzzyScore } from "../../../common/filters.js";
function createAsyncDataTreeNode(props) {
  return {
    ...props,
    children: [],
    refreshPromise: void 0,
    stale: true,
    slow: false,
    forceExpanded: false
  };
}
__name(createAsyncDataTreeNode, "createAsyncDataTreeNode");
function isAncestor(ancestor, descendant) {
  if (!descendant.parent) {
    return false;
  } else if (descendant.parent === ancestor) {
    return true;
  } else {
    return isAncestor(ancestor, descendant.parent);
  }
}
__name(isAncestor, "isAncestor");
function intersects(node, other) {
  return node === other || isAncestor(node, other) || isAncestor(other, node);
}
__name(intersects, "intersects");
class AsyncDataTreeNodeWrapper {
  constructor(node) {
    this.node = node;
  }
  static {
    __name(this, "AsyncDataTreeNodeWrapper");
  }
  get element() {
    return this.node.element.element;
  }
  get children() {
    return this.node.children.map((node) => new AsyncDataTreeNodeWrapper(node));
  }
  get depth() {
    return this.node.depth;
  }
  get visibleChildrenCount() {
    return this.node.visibleChildrenCount;
  }
  get visibleChildIndex() {
    return this.node.visibleChildIndex;
  }
  get collapsible() {
    return this.node.collapsible;
  }
  get collapsed() {
    return this.node.collapsed;
  }
  get visible() {
    return this.node.visible;
  }
  get filterData() {
    return this.node.filterData;
  }
}
class AsyncDataTreeRenderer {
  constructor(renderer, nodeMapper, onDidChangeTwistieState) {
    this.renderer = renderer;
    this.nodeMapper = nodeMapper;
    this.onDidChangeTwistieState = onDidChangeTwistieState;
    this.templateId = renderer.templateId;
  }
  static {
    __name(this, "AsyncDataTreeRenderer");
  }
  templateId;
  renderedNodes = /* @__PURE__ */ new Map();
  renderTemplate(container) {
    const templateData = this.renderer.renderTemplate(container);
    return { templateData };
  }
  renderElement(node, index, templateData, height) {
    this.renderer.renderElement(this.nodeMapper.map(node), index, templateData.templateData, height);
  }
  renderTwistie(element, twistieElement) {
    if (element.slow) {
      twistieElement.classList.add(...ThemeIcon.asClassNameArray(Codicon.treeItemLoading));
      return true;
    } else {
      twistieElement.classList.remove(...ThemeIcon.asClassNameArray(Codicon.treeItemLoading));
      return false;
    }
  }
  disposeElement(node, index, templateData, height) {
    this.renderer.disposeElement?.(this.nodeMapper.map(node), index, templateData.templateData, height);
  }
  disposeTemplate(templateData) {
    this.renderer.disposeTemplate(templateData.templateData);
  }
  dispose() {
    this.renderedNodes.clear();
  }
}
function asTreeEvent(e) {
  return {
    browserEvent: e.browserEvent,
    elements: e.elements.map((e2) => e2.element)
  };
}
__name(asTreeEvent, "asTreeEvent");
function asTreeMouseEvent(e) {
  return {
    browserEvent: e.browserEvent,
    element: e.element && e.element.element,
    target: e.target
  };
}
__name(asTreeMouseEvent, "asTreeMouseEvent");
function asTreeContextMenuEvent(e) {
  return {
    browserEvent: e.browserEvent,
    element: e.element && e.element.element,
    anchor: e.anchor,
    isStickyScroll: e.isStickyScroll
  };
}
__name(asTreeContextMenuEvent, "asTreeContextMenuEvent");
class AsyncDataTreeElementsDragAndDropData extends ElementsDragAndDropData {
  constructor(data) {
    super(data.elements.map((node) => node.element));
    this.data = data;
  }
  static {
    __name(this, "AsyncDataTreeElementsDragAndDropData");
  }
  set context(context) {
    this.data.context = context;
  }
  get context() {
    return this.data.context;
  }
}
function asAsyncDataTreeDragAndDropData(data) {
  if (data instanceof ElementsDragAndDropData) {
    return new AsyncDataTreeElementsDragAndDropData(data);
  }
  return data;
}
__name(asAsyncDataTreeDragAndDropData, "asAsyncDataTreeDragAndDropData");
class AsyncDataTreeNodeListDragAndDrop {
  constructor(dnd) {
    this.dnd = dnd;
  }
  static {
    __name(this, "AsyncDataTreeNodeListDragAndDrop");
  }
  getDragURI(node) {
    return this.dnd.getDragURI(node.element);
  }
  getDragLabel(nodes, originalEvent) {
    if (this.dnd.getDragLabel) {
      return this.dnd.getDragLabel(nodes.map((node) => node.element), originalEvent);
    }
    return void 0;
  }
  onDragStart(data, originalEvent) {
    this.dnd.onDragStart?.(asAsyncDataTreeDragAndDropData(data), originalEvent);
  }
  onDragOver(data, targetNode, targetIndex, targetSector, originalEvent, raw = true) {
    return this.dnd.onDragOver(asAsyncDataTreeDragAndDropData(data), targetNode && targetNode.element, targetIndex, targetSector, originalEvent);
  }
  drop(data, targetNode, targetIndex, targetSector, originalEvent) {
    this.dnd.drop(asAsyncDataTreeDragAndDropData(data), targetNode && targetNode.element, targetIndex, targetSector, originalEvent);
  }
  onDragEnd(originalEvent) {
    this.dnd.onDragEnd?.(originalEvent);
  }
  dispose() {
    this.dnd.dispose();
  }
}
class AsyncFindTreeNode {
  constructor(element, id, sorter) {
    this.element = element;
    this.id = id;
    this.sorter = sorter;
  }
  static {
    __name(this, "AsyncFindTreeNode");
  }
  _children = [];
  get children() {
    return this._children.values();
  }
  addChild(child) {
    if (!this.sorter) {
      this._children.push(child);
      return;
    }
    const index = this._children.findIndex((existingChild) => this.sorter.compare(child.element, existingChild.element) < 0);
    if (index !== -1) {
      this._children.splice(index, 0, child);
    } else {
      this._children.push(child);
    }
  }
}
class AsyncFindTree {
  constructor(dataSource, identityProvider, sorter) {
    this.dataSource = dataSource;
    this.identityProvider = identityProvider;
    this.sorter = sorter;
    if (!dataSource.getParent) {
      throw new Error("Data source must implement `getParent`");
    }
  }
  static {
    __name(this, "AsyncFindTree");
  }
  cachedNodes = /* @__PURE__ */ new Map();
  root = new AsyncFindTreeNode(void 0, "_AsyncFindTreeRoot_", this.sorter);
  get rootNodes() {
    return [...this.root.children];
  }
  _totalLeafs = 0;
  get totalLeafs() {
    return this._totalLeafs;
  }
  get totalNodes() {
    return this.cachedNodes.size;
  }
  _results = [];
  get results() {
    return [...this._results];
  }
  add(result) {
    this._results.push(result);
    const element = result.element;
    const elementId = this.identityProvider.getId(element).toString();
    if (this.cachedNodes.has(elementId)) {
      return;
    }
    this._totalLeafs++;
    const node = new AsyncFindTreeNode(element, elementId, this.sorter);
    this.cachedNodes.set(elementId, node);
    let currentNode = node;
    while (true) {
      let currentParentElement = this.dataSource.getParent(currentNode.element);
      if (currentParentElement === currentNode.element) {
        this.root.addChild(currentNode);
        break;
      }
      currentParentElement = currentParentElement;
      const parentId = this.identityProvider.getId(currentParentElement).toString();
      const parentNode = this.cachedNodes.get(parentId);
      if (parentNode) {
        parentNode.addChild(currentNode);
        break;
      }
      const newParent = new AsyncFindTreeNode(currentParentElement, parentId, this.sorter);
      this.cachedNodes.set(parentId, newParent);
      newParent.addChild(currentNode);
      currentNode = newParent;
    }
  }
}
class AsyncFindFilter {
  constructor(_filter) {
    this._filter = _filter;
  }
  static {
    __name(this, "AsyncFindFilter");
  }
  pattern = "";
  findFilterData = /* @__PURE__ */ new Map();
  disposables = new DisposableStore();
  setFindResults(findResults) {
    this.findFilterData = new Map(
      findResults.filter((result) => result.filterdata !== void 0).map((result) => [result.element, result.filterdata])
    );
  }
  filter(element, parentVisibility) {
    let visibility = TreeVisibility.Visible;
    if (this._filter) {
      const result = this._filter.filter(element, parentVisibility);
      if (typeof result === "boolean") {
        visibility = result ? TreeVisibility.Visible : TreeVisibility.Hidden;
      } else if (isFilterResult(result)) {
        visibility = getVisibleState(result.visibility);
      } else {
        visibility = result;
      }
      if (visibility === TreeVisibility.Hidden) {
        return false;
      }
    }
    const filterData = this.findFilterData.get(element.element);
    if (filterData !== void 0) {
      return { data: filterData, visibility };
    }
    return { data: FuzzyScore.Default, visibility };
  }
  dispose() {
    dispose(this.disposables);
  }
}
class AsyncFindController extends AbstractFindController {
  constructor(user, tree, findProvider, filter, sorter, dataSource, identityProvider, contextViewProvider, options, asTreeElement) {
    super(tree, filter, contextViewProvider, { ...options, placeholder: findProvider.placeholder, toggles: findProvider.toggles });
    this.user = user;
    this.tree = tree;
    this.findProvider = findProvider;
    this.sorter = sorter;
    this.dataSource = dataSource;
    this.identityProvider = identityProvider;
    this.asTreeElement = asTreeElement;
    this.model = tree.getModel();
    this.scheduler = this.store.add(new TimeoutTimer());
  }
  static {
    __name(this, "AsyncFindController");
  }
  model;
  nodes = /* @__PURE__ */ new Map();
  previousScrollTop;
  previousFocus = [];
  previousSelection = [];
  sessionId = 0;
  active = false;
  activeTokenSource;
  scheduler;
  store = new DisposableStore();
  setFindModeActive(active) {
    if (this.active === active) {
      return;
    }
    if (active) {
      this.activateFindMode();
    } else {
      this.deactivateFindMode();
    }
    this.active = active;
  }
  activateFindMode() {
    this.sessionId++;
    this.previousScrollTop = this.tree.scrollTop;
    this.previousFocus = this.tree.getFocus();
    this.previousSelection = this.tree.getSelection();
    this.tree.scrollTop = 0;
    const findModel = this.tree.createNewModel({ filter: this.filter });
    this.tree.setModel(findModel);
  }
  deactivateFindMode() {
    const focus = this.tree.getFocus()[0];
    this.tree.setModel(this.model);
    if (focus && focus.element && this.findProvider.revealResultInTree) {
      this.findProvider.revealResultInTree(focus.element);
    } else {
      this.tree.scrollTop = this.previousScrollTop ?? 0;
      this.tree.setFocus(this.previousFocus);
      this.tree.setSelection(this.previousSelection);
    }
    this.activeTokenSource = void 0;
    this.nodes.clear();
  }
  applyPattern(pattern) {
    this.renderMessage(false);
    this.scheduler.cancel();
    this.activeTokenSource?.cancel();
    if (!pattern) {
      this.setFindModeActive(false);
      return;
    }
    this.activeTokenSource = new CancellationTokenSource();
    const results = this.findProvider.getFindResults(pattern, this.sessionId, this.activeTokenSource.token, this.toggles.states());
    this.pocessFindResults(results, this.activeTokenSource.token);
  }
  async pocessFindResults(results, token) {
    if (!this.dataSource.getParent || !this.identityProvider) {
      return;
    }
    this.clearFindResults();
    const findTree = new AsyncFindTree(this.dataSource, this.identityProvider, this.sorter);
    for await (const result of results) {
      if (token.isCancellationRequested) {
        return;
      }
      findTree.add(result);
    }
    if (token.isCancellationRequested) {
      return;
    }
    this.setFindResults(findTree);
    this.activeTokenSource?.dispose();
    this.activeTokenSource = void 0;
  }
  clearFindResults() {
    this.schedule(() => {
      if (!this.active) {
        this.setFindModeActive(true);
        return;
      } else {
        this.filter.setFindResults([]);
        this.tree.setChildren(null, []);
      }
    }, 600);
  }
  setFindResults(findTree) {
    const rootChildren = [];
    for (const rootNodes of findTree.rootNodes) {
      rootChildren.push(this.asTreeElement(this.findNodeToAsyncNode(rootNodes, null)));
    }
    this.schedule(() => {
      this.setFindModeActive(true);
      this.filter.setFindResults(findTree.results);
      this.tree.setChildren(null, rootChildren);
      this.renderMessage(rootChildren.length === 0);
      this.alertResults(findTree.totalLeafs);
    }, 0);
  }
  findNodeToAsyncNode(node, parent) {
    const children = [];
    if (node.element === void 0) {
      throw new TreeError(this.user, "Found node without an element");
    }
    const asyncNode = {
      element: node.element,
      parent,
      children,
      hasChildren: false,
      defaultCollapseState: ObjectTreeElementCollapseState.PreserveOrExpanded,
      stale: false,
      refreshPromise: void 0,
      slow: false,
      forceExpanded: false
    };
    for (const child of node.children) {
      children.push(this.findNodeToAsyncNode(child, asyncNode));
    }
    asyncNode.hasChildren = !!children.length;
    this.nodes.set(node.element, asyncNode);
    return asyncNode;
  }
  schedule(fn, delay) {
    if (delay === 0) {
      this.scheduler.cancel();
      fn();
      return;
    }
    this.scheduler.cancelAndSet(fn, delay);
  }
  onDidToggleChange(e) {
    super.onDidToggleChange(e);
    this.applyPattern(this.pattern);
  }
  getDataNode(element) {
    return this.nodes.get(element);
  }
  dispose() {
    super.dispose();
    this.store.dispose();
  }
}
function asObjectTreeOptions(options) {
  return options && {
    ...options,
    collapseByDefault: true,
    identityProvider: options.identityProvider && {
      getId(el) {
        return options.identityProvider.getId(el.element);
      }
    },
    dnd: options.dnd && new AsyncDataTreeNodeListDragAndDrop(options.dnd),
    multipleSelectionController: options.multipleSelectionController && {
      isSelectionSingleChangeEvent(e) {
        return options.multipleSelectionController.isSelectionSingleChangeEvent({ ...e, element: e.element });
      },
      isSelectionRangeChangeEvent(e) {
        return options.multipleSelectionController.isSelectionRangeChangeEvent({ ...e, element: e.element });
      }
    },
    accessibilityProvider: options.accessibilityProvider && {
      ...options.accessibilityProvider,
      getPosInSet: void 0,
      getSetSize: void 0,
      getRole: options.accessibilityProvider.getRole ? (el) => {
        return options.accessibilityProvider.getRole(el.element);
      } : () => "treeitem",
      isChecked: options.accessibilityProvider.isChecked ? (e) => {
        return !!options.accessibilityProvider?.isChecked(e.element);
      } : void 0,
      getAriaLabel(e) {
        return options.accessibilityProvider.getAriaLabel(e.element);
      },
      getWidgetAriaLabel() {
        return options.accessibilityProvider.getWidgetAriaLabel();
      },
      getWidgetRole: options.accessibilityProvider.getWidgetRole ? () => options.accessibilityProvider.getWidgetRole() : () => "tree",
      getAriaLevel: options.accessibilityProvider.getAriaLevel && ((node) => {
        return options.accessibilityProvider.getAriaLevel(node.element);
      }),
      getActiveDescendantId: options.accessibilityProvider.getActiveDescendantId && ((node) => {
        return options.accessibilityProvider.getActiveDescendantId(node.element);
      })
    },
    filter: options.filter && {
      filter(e, parentVisibility) {
        return options.filter.filter(e.element, parentVisibility);
      }
    },
    keyboardNavigationLabelProvider: options.keyboardNavigationLabelProvider && {
      ...options.keyboardNavigationLabelProvider,
      getKeyboardNavigationLabel(e) {
        return options.keyboardNavigationLabelProvider.getKeyboardNavigationLabel(e.element);
      }
    },
    sorter: void 0,
    expandOnlyOnTwistieClick: typeof options.expandOnlyOnTwistieClick === "undefined" ? void 0 : typeof options.expandOnlyOnTwistieClick !== "function" ? options.expandOnlyOnTwistieClick : (e) => options.expandOnlyOnTwistieClick(e.element),
    defaultFindVisibility: /* @__PURE__ */ __name((e) => {
      if (e.hasChildren && e.stale) {
        return TreeVisibility.Visible;
      } else if (typeof options.defaultFindVisibility === "number") {
        return options.defaultFindVisibility;
      } else if (typeof options.defaultFindVisibility === "undefined") {
        return TreeVisibility.Recurse;
      } else {
        return options.defaultFindVisibility(e.element);
      }
    }, "defaultFindVisibility")
  };
}
__name(asObjectTreeOptions, "asObjectTreeOptions");
function dfs(node, fn) {
  fn(node);
  node.children.forEach((child) => dfs(child, fn));
}
__name(dfs, "dfs");
class AsyncDataTree {
  constructor(user, container, delegate, renderers, dataSource, options = {}) {
    this.user = user;
    this.dataSource = dataSource;
    this.identityProvider = options.identityProvider;
    this.autoExpandSingleChildren = typeof options.autoExpandSingleChildren === "undefined" ? false : options.autoExpandSingleChildren;
    this.sorter = options.sorter;
    this.getDefaultCollapseState = (e) => options.collapseByDefault ? options.collapseByDefault(e) ? ObjectTreeElementCollapseState.PreserveOrCollapsed : ObjectTreeElementCollapseState.PreserveOrExpanded : void 0;
    let asyncFindEnabled = false;
    if (options.findResultsProvider && (options.findWidgetEnabled ?? true) && options.keyboardNavigationLabelProvider && options.contextViewProvider) {
      if (!this.dataSource.getParent || !this.identityProvider) {
        throw new TreeError(this.user, "Find Provider requires `getParent` and `identityProvider`");
      }
      asyncFindEnabled = true;
    }
    this.tree = this.createTree(user, container, delegate, renderers, { ...options, findWidgetEnabled: !asyncFindEnabled });
    this.model = this.tree.getModel();
    this.root = createAsyncDataTreeNode({
      element: void 0,
      parent: null,
      hasChildren: true,
      defaultCollapseState: void 0
    });
    if (this.identityProvider) {
      this.root = {
        ...this.root,
        id: null
      };
    }
    this.nodes.set(null, this.root);
    this.tree.onDidChangeCollapseState(this._onDidChangeCollapseState, this, this.disposables);
    if (asyncFindEnabled) {
      const findFilter = this.disposables.add(new AsyncFindFilter(this.tree.options.filter));
      const findOptions = { styles: options.findWidgetStyles, showNotFoundMessage: options.showNotFoundMessage };
      this.findController = this.disposables.add(new AsyncFindController(user, this.tree, options.findResultsProvider, findFilter, this.sorter, this.dataSource, this.identityProvider, options.contextViewProvider, findOptions, (node) => this.asTreeElement(node)));
      this.onDidChangeFindOpenState = this.findController.onDidChangeOpenState;
      this.onDidChangeFindMode = Event.None;
      this.onDidChangeFindMatchType = Event.None;
    } else {
      this.onDidChangeFindOpenState = this.tree.onDidChangeFindOpenState;
      this.onDidChangeFindMode = this.tree.onDidChangeFindMode;
      this.onDidChangeFindMatchType = this.tree.onDidChangeFindMatchType;
    }
  }
  static {
    __name(this, "AsyncDataTree");
  }
  tree;
  model;
  root;
  nodes = /* @__PURE__ */ new Map();
  sorter;
  findController;
  getDefaultCollapseState;
  subTreeRefreshPromises = /* @__PURE__ */ new Map();
  refreshPromises = /* @__PURE__ */ new Map();
  identityProvider;
  autoExpandSingleChildren;
  _onDidRender = new Emitter();
  _onDidChangeNodeSlowState = new Emitter();
  nodeMapper = new WeakMapper((node) => new AsyncDataTreeNodeWrapper(node));
  disposables = new DisposableStore();
  get onDidScroll() {
    return this.tree.onDidScroll;
  }
  get onDidChangeFocus() {
    return Event.map(this.tree.onDidChangeFocus, asTreeEvent);
  }
  get onDidChangeSelection() {
    return Event.map(this.tree.onDidChangeSelection, asTreeEvent);
  }
  get onKeyDown() {
    return this.tree.onKeyDown;
  }
  get onMouseClick() {
    return Event.map(this.tree.onMouseClick, asTreeMouseEvent);
  }
  get onMouseDblClick() {
    return Event.map(this.tree.onMouseDblClick, asTreeMouseEvent);
  }
  get onContextMenu() {
    return Event.map(this.tree.onContextMenu, asTreeContextMenuEvent);
  }
  get onTap() {
    return Event.map(this.tree.onTap, asTreeMouseEvent);
  }
  get onPointer() {
    return Event.map(this.tree.onPointer, asTreeMouseEvent);
  }
  get onDidFocus() {
    return this.tree.onDidFocus;
  }
  get onDidBlur() {
    return this.tree.onDidBlur;
  }
  /**
   * To be used internally only!
   * @deprecated
   */
  get onDidChangeModel() {
    return this.tree.onDidChangeModel;
  }
  get onDidChangeCollapseState() {
    return this.tree.onDidChangeCollapseState;
  }
  get onDidUpdateOptions() {
    return this.tree.onDidUpdateOptions;
  }
  onDidChangeFindOpenState;
  get onDidChangeStickyScrollFocused() {
    return this.tree.onDidChangeStickyScrollFocused;
  }
  get findMode() {
    return this.tree.findMode;
  }
  set findMode(mode) {
    this.tree.findMode = mode;
  }
  onDidChangeFindMode;
  get findMatchType() {
    return this.tree.findMatchType;
  }
  set findMatchType(matchType) {
    this.tree.findMatchType = matchType;
  }
  onDidChangeFindMatchType;
  get expandOnlyOnTwistieClick() {
    if (typeof this.tree.expandOnlyOnTwistieClick === "boolean") {
      return this.tree.expandOnlyOnTwistieClick;
    }
    const fn = this.tree.expandOnlyOnTwistieClick;
    return (element) => fn(this.nodes.get(element === this.root.element ? null : element) || null);
  }
  get onDidDispose() {
    return this.tree.onDidDispose;
  }
  createTree(user, container, delegate, renderers, options) {
    const objectTreeDelegate = new ComposedTreeDelegate(delegate);
    const objectTreeRenderers = renderers.map((r) => new AsyncDataTreeRenderer(r, this.nodeMapper, this._onDidChangeNodeSlowState.event));
    const objectTreeOptions = asObjectTreeOptions(options) || {};
    return new ObjectTree(user, container, objectTreeDelegate, objectTreeRenderers, objectTreeOptions);
  }
  updateOptions(options = {}) {
    this.tree.updateOptions(options);
  }
  get options() {
    return this.tree.options;
  }
  // Widget
  getHTMLElement() {
    return this.tree.getHTMLElement();
  }
  get contentHeight() {
    return this.tree.contentHeight;
  }
  get contentWidth() {
    return this.tree.contentWidth;
  }
  get onDidChangeContentHeight() {
    return this.tree.onDidChangeContentHeight;
  }
  get onDidChangeContentWidth() {
    return this.tree.onDidChangeContentWidth;
  }
  get scrollTop() {
    return this.tree.scrollTop;
  }
  set scrollTop(scrollTop) {
    this.tree.scrollTop = scrollTop;
  }
  get scrollLeft() {
    return this.tree.scrollLeft;
  }
  set scrollLeft(scrollLeft) {
    this.tree.scrollLeft = scrollLeft;
  }
  get scrollHeight() {
    return this.tree.scrollHeight;
  }
  get renderHeight() {
    return this.tree.renderHeight;
  }
  get lastVisibleElement() {
    return this.tree.lastVisibleElement.element;
  }
  get ariaLabel() {
    return this.tree.ariaLabel;
  }
  set ariaLabel(value) {
    this.tree.ariaLabel = value;
  }
  domFocus() {
    this.tree.domFocus();
  }
  isDOMFocused() {
    return this.tree.isDOMFocused();
  }
  navigate(start) {
    let startNode;
    if (start) {
      startNode = this.getDataNode(start);
    }
    return new AsyncDataTreeNavigator(this.tree.navigate(startNode));
  }
  layout(height, width) {
    this.tree.layout(height, width);
    if (isNumber(width)) {
      this.findController?.layout(width);
    }
  }
  style(styles) {
    this.tree.style(styles);
  }
  // Model
  getInput() {
    return this.root.element;
  }
  async setInput(input, viewState) {
    this.refreshPromises.forEach((promise) => promise.cancel());
    this.refreshPromises.clear();
    this.root.element = input;
    const viewStateContext = viewState && { viewState, focus: [], selection: [] };
    await this._updateChildren(input, true, false, viewStateContext);
    if (viewStateContext) {
      this.tree.setFocus(viewStateContext.focus);
      this.tree.setSelection(viewStateContext.selection);
    }
    if (viewState && typeof viewState.scrollTop === "number") {
      this.scrollTop = viewState.scrollTop;
    }
  }
  async updateChildren(element = this.root.element, recursive = true, rerender = false, options) {
    await this._updateChildren(element, recursive, rerender, void 0, options);
  }
  async _updateChildren(element = this.root.element, recursive = true, rerender = false, viewStateContext, options) {
    if (typeof this.root.element === "undefined") {
      throw new TreeError(this.user, "Tree input not set");
    }
    if (this.root.refreshPromise) {
      await this.root.refreshPromise;
      await Event.toPromise(this._onDidRender.event);
    }
    const node = this.getDataNode(element);
    await this.refreshAndRenderNode(node, recursive, viewStateContext, options);
    if (rerender) {
      try {
        this.tree.rerender(node);
      } catch {
      }
    }
  }
  resort(element = this.root.element, recursive = true) {
    this.model.resort(this.getDataNode(element), recursive);
  }
  hasNode(element) {
    return element === this.root.element || this.nodes.has(element);
  }
  // View
  rerender(element) {
    if (element === void 0 || element === this.root.element) {
      this.tree.rerender();
      return;
    }
    const node = this.getDataNode(element);
    this.tree.rerender(node);
  }
  updateElementHeight(element, height) {
    const node = this.getDataNode(element);
    this.tree.updateElementHeight(node, height);
  }
  updateWidth(element) {
    const node = this.getDataNode(element);
    this.tree.updateWidth(node);
  }
  // Tree
  getNode(element = this.root.element) {
    const dataNode = this.getDataNode(element);
    const node = this.tree.getNode(dataNode === this.root ? null : dataNode);
    return this.nodeMapper.map(node);
  }
  collapse(element, recursive = false) {
    const node = this.getDataNode(element);
    return this.tree.collapse(node === this.root ? null : node, recursive);
  }
  async expand(element, recursive = false) {
    if (typeof this.root.element === "undefined") {
      throw new TreeError(this.user, "Tree input not set");
    }
    if (this.root.refreshPromise) {
      await this.root.refreshPromise;
      await Event.toPromise(this._onDidRender.event);
    }
    const node = this.getDataNode(element);
    if (this.tree.hasElement(node) && !this.tree.isCollapsible(node)) {
      return false;
    }
    if (node.refreshPromise) {
      await this.root.refreshPromise;
      await Event.toPromise(this._onDidRender.event);
    }
    if (node !== this.root && !node.refreshPromise && !this.tree.isCollapsed(node)) {
      return false;
    }
    const result = this.tree.expand(node === this.root ? null : node, recursive);
    if (node.refreshPromise) {
      await this.root.refreshPromise;
      await Event.toPromise(this._onDidRender.event);
    }
    return result;
  }
  toggleCollapsed(element, recursive = false) {
    return this.tree.toggleCollapsed(this.getDataNode(element), recursive);
  }
  expandAll() {
    this.tree.expandAll();
  }
  async expandTo(element) {
    if (!this.dataSource.getParent) {
      throw new Error("Can't expand to element without getParent method");
    }
    const elements = [];
    while (!this.hasNode(element)) {
      element = this.dataSource.getParent(element);
      if (element !== this.root.element) {
        elements.push(element);
      }
    }
    for (const element2 of Iterable.reverse(elements)) {
      await this.expand(element2);
    }
    this.tree.expandTo(this.getDataNode(element));
  }
  collapseAll() {
    this.tree.collapseAll();
  }
  isCollapsible(element) {
    return this.tree.isCollapsible(this.getDataNode(element));
  }
  isCollapsed(element) {
    return this.tree.isCollapsed(this.getDataNode(element));
  }
  triggerTypeNavigation() {
    this.tree.triggerTypeNavigation();
  }
  openFind() {
    if (this.findController) {
      this.findController.open();
    } else {
      this.tree.openFind();
    }
  }
  closeFind() {
    if (this.findController) {
      this.findController.close();
    } else {
      this.tree.closeFind();
    }
  }
  refilter() {
    this.tree.refilter();
  }
  setAnchor(element) {
    this.tree.setAnchor(typeof element === "undefined" ? void 0 : this.getDataNode(element));
  }
  getAnchor() {
    const node = this.tree.getAnchor();
    return node?.element;
  }
  setSelection(elements, browserEvent) {
    const nodes = elements.map((e) => this.getDataNode(e));
    this.tree.setSelection(nodes, browserEvent);
  }
  getSelection() {
    const nodes = this.tree.getSelection();
    return nodes.map((n) => n.element);
  }
  setFocus(elements, browserEvent) {
    const nodes = elements.map((e) => this.getDataNode(e));
    this.tree.setFocus(nodes, browserEvent);
  }
  focusNext(n = 1, loop = false, browserEvent) {
    this.tree.focusNext(n, loop, browserEvent);
  }
  focusPrevious(n = 1, loop = false, browserEvent) {
    this.tree.focusPrevious(n, loop, browserEvent);
  }
  focusNextPage(browserEvent) {
    return this.tree.focusNextPage(browserEvent);
  }
  focusPreviousPage(browserEvent) {
    return this.tree.focusPreviousPage(browserEvent);
  }
  focusLast(browserEvent) {
    this.tree.focusLast(browserEvent);
  }
  focusFirst(browserEvent) {
    this.tree.focusFirst(browserEvent);
  }
  getFocus() {
    const nodes = this.tree.getFocus();
    return nodes.map((n) => n.element);
  }
  getStickyScrollFocus() {
    const nodes = this.tree.getStickyScrollFocus();
    return nodes.map((n) => n.element);
  }
  getFocusedPart() {
    return this.tree.getFocusedPart();
  }
  reveal(element, relativeTop) {
    this.tree.reveal(this.getDataNode(element), relativeTop);
  }
  getRelativeTop(element) {
    return this.tree.getRelativeTop(this.getDataNode(element));
  }
  // Tree navigation
  getParentElement(element) {
    const node = this.tree.getParentElement(this.getDataNode(element));
    return node && node.element;
  }
  getFirstElementChild(element = this.root.element) {
    const dataNode = this.getDataNode(element);
    const node = this.tree.getFirstElementChild(dataNode === this.root ? null : dataNode);
    return node && node.element;
  }
  // Implementation
  getDataNode(element) {
    const asyncFindNode = this.findController?.getDataNode(element);
    if (asyncFindNode) {
      return asyncFindNode;
    }
    const node = this.nodes.get(element === this.root.element ? null : element);
    if (!node) {
      throw new TreeError(this.user, `Data tree node not found: ${element}`);
    }
    return node;
  }
  async refreshAndRenderNode(node, recursive, viewStateContext, options) {
    await this.refreshNode(node, recursive, viewStateContext);
    if (this.disposables.isDisposed) {
      return;
    }
    this.render(node, viewStateContext, options);
  }
  async refreshNode(node, recursive, viewStateContext) {
    let result;
    this.subTreeRefreshPromises.forEach((refreshPromise, refreshNode) => {
      if (!result && intersects(refreshNode, node)) {
        result = refreshPromise.then(() => this.refreshNode(node, recursive, viewStateContext));
      }
    });
    if (result) {
      return result;
    }
    if (node !== this.root) {
      const treeNode = this.tree.getNode(node);
      if (treeNode.collapsed) {
        node.hasChildren = !!this.dataSource.hasChildren(node.element);
        node.stale = true;
        this.setChildren(node, [], recursive, viewStateContext);
        return;
      }
    }
    return this.doRefreshSubTree(node, recursive, viewStateContext);
  }
  async doRefreshSubTree(node, recursive, viewStateContext) {
    let done;
    node.refreshPromise = new Promise((c) => done = c);
    this.subTreeRefreshPromises.set(node, node.refreshPromise);
    node.refreshPromise.finally(() => {
      node.refreshPromise = void 0;
      this.subTreeRefreshPromises.delete(node);
    });
    try {
      const childrenToRefresh = await this.doRefreshNode(node, recursive, viewStateContext);
      node.stale = false;
      await Promises.settled(childrenToRefresh.map((child) => this.doRefreshSubTree(child, recursive, viewStateContext)));
    } finally {
      done();
    }
  }
  async doRefreshNode(node, recursive, viewStateContext) {
    node.hasChildren = !!this.dataSource.hasChildren(node.element);
    let childrenPromise;
    if (!node.hasChildren) {
      childrenPromise = Promise.resolve(Iterable.empty());
    } else {
      const children = this.doGetChildren(node);
      if (isIterable(children)) {
        childrenPromise = Promise.resolve(children);
      } else {
        const slowTimeout = timeout(800);
        slowTimeout.then(() => {
          node.slow = true;
          this._onDidChangeNodeSlowState.fire(node);
        }, (_) => null);
        childrenPromise = children.finally(() => slowTimeout.cancel());
      }
    }
    try {
      const children = await childrenPromise;
      return this.setChildren(node, children, recursive, viewStateContext);
    } catch (err) {
      if (node !== this.root && this.model.has(node)) {
        this.model.setCollapsed(node);
      }
      if (isCancellationError(err)) {
        return [];
      }
      throw err;
    } finally {
      if (node.slow) {
        node.slow = false;
        this._onDidChangeNodeSlowState.fire(node);
      }
    }
  }
  doGetChildren(node) {
    let result = this.refreshPromises.get(node);
    if (result) {
      return result;
    }
    const children = this.dataSource.getChildren(node.element);
    if (isIterable(children)) {
      return this.processChildren(children);
    } else {
      result = createCancelablePromise(async () => this.processChildren(await children));
      this.refreshPromises.set(node, result);
      return result.finally(() => {
        this.refreshPromises.delete(node);
      });
    }
  }
  _onDidChangeCollapseState({ node, deep }) {
    if (node.element === null) {
      return;
    }
    if (!node.collapsed && node.element.stale) {
      if (deep) {
        this.collapse(node.element.element);
      } else {
        this.refreshAndRenderNode(node.element, false).catch(onUnexpectedError);
      }
    }
  }
  setChildren(node, childrenElementsIterable, recursive, viewStateContext) {
    const childrenElements = [...childrenElementsIterable];
    if (node.children.length === 0 && childrenElements.length === 0) {
      return [];
    }
    const nodesToForget = /* @__PURE__ */ new Map();
    const childrenTreeNodesById = /* @__PURE__ */ new Map();
    for (const child of node.children) {
      nodesToForget.set(child.element, child);
      if (this.identityProvider) {
        childrenTreeNodesById.set(child.id, { node: child, collapsed: this.model.has(child) && this.model.isCollapsed(child) });
      }
    }
    const childrenToRefresh = [];
    const children = childrenElements.map((element) => {
      const hasChildren = !!this.dataSource.hasChildren(element);
      if (!this.identityProvider) {
        const asyncDataTreeNode = createAsyncDataTreeNode({ element, parent: node, hasChildren, defaultCollapseState: this.getDefaultCollapseState(element) });
        if (hasChildren && asyncDataTreeNode.defaultCollapseState === ObjectTreeElementCollapseState.PreserveOrExpanded) {
          childrenToRefresh.push(asyncDataTreeNode);
        }
        return asyncDataTreeNode;
      }
      const id = this.identityProvider.getId(element).toString();
      const result = childrenTreeNodesById.get(id);
      if (result) {
        const asyncDataTreeNode = result.node;
        nodesToForget.delete(asyncDataTreeNode.element);
        this.nodes.delete(asyncDataTreeNode.element);
        this.nodes.set(element, asyncDataTreeNode);
        asyncDataTreeNode.element = element;
        asyncDataTreeNode.hasChildren = hasChildren;
        if (recursive) {
          if (result.collapsed) {
            asyncDataTreeNode.children.forEach((node2) => dfs(node2, (node3) => this.nodes.delete(node3.element)));
            asyncDataTreeNode.children.splice(0, asyncDataTreeNode.children.length);
            asyncDataTreeNode.stale = true;
          } else {
            childrenToRefresh.push(asyncDataTreeNode);
          }
        } else if (hasChildren && !result.collapsed) {
          childrenToRefresh.push(asyncDataTreeNode);
        }
        return asyncDataTreeNode;
      }
      const childAsyncDataTreeNode = createAsyncDataTreeNode({ element, parent: node, id, hasChildren, defaultCollapseState: this.getDefaultCollapseState(element) });
      if (viewStateContext && viewStateContext.viewState.focus && viewStateContext.viewState.focus.indexOf(id) > -1) {
        viewStateContext.focus.push(childAsyncDataTreeNode);
      }
      if (viewStateContext && viewStateContext.viewState.selection && viewStateContext.viewState.selection.indexOf(id) > -1) {
        viewStateContext.selection.push(childAsyncDataTreeNode);
      }
      if (viewStateContext && viewStateContext.viewState.expanded && viewStateContext.viewState.expanded.indexOf(id) > -1) {
        childrenToRefresh.push(childAsyncDataTreeNode);
      } else if (hasChildren && childAsyncDataTreeNode.defaultCollapseState === ObjectTreeElementCollapseState.PreserveOrExpanded) {
        childrenToRefresh.push(childAsyncDataTreeNode);
      }
      return childAsyncDataTreeNode;
    });
    for (const node2 of nodesToForget.values()) {
      dfs(node2, (node3) => this.nodes.delete(node3.element));
    }
    for (const child of children) {
      this.nodes.set(child.element, child);
    }
    node.children.splice(0, node.children.length, ...children);
    if (node !== this.root && this.autoExpandSingleChildren && children.length === 1 && childrenToRefresh.length === 0) {
      children[0].forceExpanded = true;
      childrenToRefresh.push(children[0]);
    }
    return childrenToRefresh;
  }
  render(node, viewStateContext, options) {
    const children = node.children.map((node2) => this.asTreeElement(node2, viewStateContext));
    const objectTreeOptions = options && {
      ...options,
      diffIdentityProvider: options.diffIdentityProvider && {
        getId(node2) {
          return options.diffIdentityProvider.getId(node2.element);
        }
      }
    };
    this.model.setChildren(node === this.root ? null : node, children, objectTreeOptions);
    if (node !== this.root) {
      this.model.setCollapsible(node, node.hasChildren);
    }
    this._onDidRender.fire();
  }
  asTreeElement(node, viewStateContext) {
    if (node.stale) {
      return {
        element: node,
        collapsible: node.hasChildren,
        collapsed: true
      };
    }
    let collapsed;
    if (viewStateContext && viewStateContext.viewState.expanded && node.id && viewStateContext.viewState.expanded.indexOf(node.id) > -1) {
      collapsed = false;
    } else if (node.forceExpanded) {
      collapsed = false;
      node.forceExpanded = false;
    } else {
      collapsed = node.defaultCollapseState;
    }
    return {
      element: node,
      children: node.hasChildren ? Iterable.map(node.children, (child) => this.asTreeElement(child, viewStateContext)) : [],
      collapsible: node.hasChildren,
      collapsed
    };
  }
  processChildren(children) {
    if (this.sorter) {
      children = [...children].sort(this.sorter.compare.bind(this.sorter));
    }
    return children;
  }
  // view state
  getViewState() {
    if (!this.identityProvider) {
      throw new TreeError(this.user, "Can't get tree view state without an identity provider");
    }
    const getId = /* @__PURE__ */ __name((element) => this.identityProvider.getId(element).toString(), "getId");
    const focus = this.getFocus().map(getId);
    const selection = this.getSelection().map(getId);
    const expanded = [];
    const root = this.tree.getNode();
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node !== root && node.collapsible && !node.collapsed) {
        expanded.push(getId(node.element.element));
      }
      stack.push(...node.children);
    }
    return { focus, selection, expanded, scrollTop: this.scrollTop };
  }
  dispose() {
    this.disposables.dispose();
    this.tree.dispose();
  }
}
class CompressibleAsyncDataTreeNodeWrapper {
  constructor(node) {
    this.node = node;
  }
  static {
    __name(this, "CompressibleAsyncDataTreeNodeWrapper");
  }
  get element() {
    return {
      elements: this.node.element.elements.map((e) => e.element),
      incompressible: this.node.element.incompressible
    };
  }
  get children() {
    return this.node.children.map((node) => new CompressibleAsyncDataTreeNodeWrapper(node));
  }
  get depth() {
    return this.node.depth;
  }
  get visibleChildrenCount() {
    return this.node.visibleChildrenCount;
  }
  get visibleChildIndex() {
    return this.node.visibleChildIndex;
  }
  get collapsible() {
    return this.node.collapsible;
  }
  get collapsed() {
    return this.node.collapsed;
  }
  get visible() {
    return this.node.visible;
  }
  get filterData() {
    return this.node.filterData;
  }
}
class CompressibleAsyncDataTreeRenderer {
  constructor(renderer, nodeMapper, compressibleNodeMapperProvider, onDidChangeTwistieState) {
    this.renderer = renderer;
    this.nodeMapper = nodeMapper;
    this.compressibleNodeMapperProvider = compressibleNodeMapperProvider;
    this.onDidChangeTwistieState = onDidChangeTwistieState;
    this.templateId = renderer.templateId;
  }
  static {
    __name(this, "CompressibleAsyncDataTreeRenderer");
  }
  templateId;
  renderedNodes = /* @__PURE__ */ new Map();
  disposables = [];
  renderTemplate(container) {
    const templateData = this.renderer.renderTemplate(container);
    return { templateData };
  }
  renderElement(node, index, templateData, height) {
    this.renderer.renderElement(this.nodeMapper.map(node), index, templateData.templateData, height);
  }
  renderCompressedElements(node, index, templateData, height) {
    this.renderer.renderCompressedElements(this.compressibleNodeMapperProvider().map(node), index, templateData.templateData, height);
  }
  renderTwistie(element, twistieElement) {
    if (element.slow) {
      twistieElement.classList.add(...ThemeIcon.asClassNameArray(Codicon.treeItemLoading));
      return true;
    } else {
      twistieElement.classList.remove(...ThemeIcon.asClassNameArray(Codicon.treeItemLoading));
      return false;
    }
  }
  disposeElement(node, index, templateData, height) {
    this.renderer.disposeElement?.(this.nodeMapper.map(node), index, templateData.templateData, height);
  }
  disposeCompressedElements(node, index, templateData, height) {
    this.renderer.disposeCompressedElements?.(this.compressibleNodeMapperProvider().map(node), index, templateData.templateData, height);
  }
  disposeTemplate(templateData) {
    this.renderer.disposeTemplate(templateData.templateData);
  }
  dispose() {
    this.renderedNodes.clear();
    this.disposables = dispose(this.disposables);
  }
}
function asCompressibleObjectTreeOptions(options) {
  const objectTreeOptions = options && asObjectTreeOptions(options);
  return objectTreeOptions && {
    ...objectTreeOptions,
    keyboardNavigationLabelProvider: objectTreeOptions.keyboardNavigationLabelProvider && {
      ...objectTreeOptions.keyboardNavigationLabelProvider,
      getCompressedNodeKeyboardNavigationLabel(els) {
        return options.keyboardNavigationLabelProvider.getCompressedNodeKeyboardNavigationLabel(els.map((e) => e.element));
      }
    }
  };
}
__name(asCompressibleObjectTreeOptions, "asCompressibleObjectTreeOptions");
class CompressibleAsyncDataTree extends AsyncDataTree {
  constructor(user, container, virtualDelegate, compressionDelegate, renderers, dataSource, options = {}) {
    super(user, container, virtualDelegate, renderers, dataSource, options);
    this.compressionDelegate = compressionDelegate;
    this.filter = options.filter;
  }
  static {
    __name(this, "CompressibleAsyncDataTree");
  }
  compressibleNodeMapper = new WeakMapper((node) => new CompressibleAsyncDataTreeNodeWrapper(node));
  filter;
  getCompressedTreeNode(e) {
    const node = this.getDataNode(e);
    return this.tree.getCompressedTreeNode(node).element;
  }
  createTree(user, container, delegate, renderers, options) {
    const objectTreeDelegate = new ComposedTreeDelegate(delegate);
    const objectTreeRenderers = renderers.map((r) => new CompressibleAsyncDataTreeRenderer(r, this.nodeMapper, () => this.compressibleNodeMapper, this._onDidChangeNodeSlowState.event));
    const objectTreeOptions = asCompressibleObjectTreeOptions(options) || {};
    return new CompressibleObjectTree(user, container, objectTreeDelegate, objectTreeRenderers, objectTreeOptions);
  }
  asTreeElement(node, viewStateContext) {
    return {
      incompressible: this.compressionDelegate.isIncompressible(node.element),
      ...super.asTreeElement(node, viewStateContext)
    };
  }
  updateOptions(options = {}) {
    this.tree.updateOptions(options);
  }
  getViewState() {
    if (!this.identityProvider) {
      throw new TreeError(this.user, "Can't get tree view state without an identity provider");
    }
    const getId = /* @__PURE__ */ __name((element) => this.identityProvider.getId(element).toString(), "getId");
    const focus = this.getFocus().map(getId);
    const selection = this.getSelection().map(getId);
    const expanded = [];
    const root = this.tree.getCompressedTreeNode();
    const stack = [root];
    while (stack.length > 0) {
      const node = stack.pop();
      if (node !== root && node.collapsible && !node.collapsed) {
        for (const asyncNode of node.element.elements) {
          expanded.push(getId(asyncNode.element));
        }
      }
      stack.push(...node.children);
    }
    return { focus, selection, expanded, scrollTop: this.scrollTop };
  }
  render(node, viewStateContext, options) {
    if (!this.identityProvider) {
      return super.render(node, viewStateContext);
    }
    const getId = /* @__PURE__ */ __name((element) => this.identityProvider.getId(element).toString(), "getId");
    const getUncompressedIds = /* @__PURE__ */ __name((nodes) => {
      const result = /* @__PURE__ */ new Set();
      for (const node2 of nodes) {
        const compressedNode = this.tree.getCompressedTreeNode(node2 === this.root ? null : node2);
        if (!compressedNode.element) {
          continue;
        }
        for (const node3 of compressedNode.element.elements) {
          result.add(getId(node3.element));
        }
      }
      return result;
    }, "getUncompressedIds");
    const oldSelection = getUncompressedIds(this.tree.getSelection());
    const oldFocus = getUncompressedIds(this.tree.getFocus());
    super.render(node, viewStateContext, options);
    const selection = this.getSelection();
    let didChangeSelection = false;
    const focus = this.getFocus();
    let didChangeFocus = false;
    const visit = /* @__PURE__ */ __name((node2) => {
      const compressedNode = node2.element;
      if (compressedNode) {
        for (let i = 0; i < compressedNode.elements.length; i++) {
          const id = getId(compressedNode.elements[i].element);
          const element = compressedNode.elements[compressedNode.elements.length - 1].element;
          if (oldSelection.has(id) && selection.indexOf(element) === -1) {
            selection.push(element);
            didChangeSelection = true;
          }
          if (oldFocus.has(id) && focus.indexOf(element) === -1) {
            focus.push(element);
            didChangeFocus = true;
          }
        }
      }
      node2.children.forEach(visit);
    }, "visit");
    visit(this.tree.getCompressedTreeNode(node === this.root ? null : node));
    if (didChangeSelection) {
      this.setSelection(selection);
    }
    if (didChangeFocus) {
      this.setFocus(focus);
    }
  }
  // For compressed async data trees, `TreeVisibility.Recurse` doesn't currently work
  // and we have to filter everything beforehand
  // Related to #85193 and #85835
  processChildren(children) {
    if (this.filter) {
      children = Iterable.filter(children, (e) => {
        const result = this.filter.filter(e, TreeVisibility.Visible);
        const visibility = getVisibility(result);
        if (visibility === TreeVisibility.Recurse) {
          throw new Error("Recursive tree visibility not supported in async data compressed trees");
        }
        return visibility === TreeVisibility.Visible;
      });
    }
    return super.processChildren(children);
  }
  navigate(start) {
    return super.navigate(start);
  }
}
function getVisibility(filterResult) {
  if (typeof filterResult === "boolean") {
    return filterResult ? TreeVisibility.Visible : TreeVisibility.Hidden;
  } else if (isFilterResult(filterResult)) {
    return getVisibleState(filterResult.visibility);
  } else {
    return getVisibleState(filterResult);
  }
}
__name(getVisibility, "getVisibility");
class AsyncDataTreeNavigator {
  constructor(navigator) {
    this.navigator = navigator;
  }
  static {
    __name(this, "AsyncDataTreeNavigator");
  }
  current() {
    const current = this.navigator.current();
    if (current === null) {
      return null;
    }
    return current.element;
  }
  previous() {
    this.navigator.previous();
    return this.current();
  }
  first() {
    this.navigator.first();
    return this.current();
  }
  last() {
    this.navigator.last();
    return this.current();
  }
  next() {
    this.navigator.next();
    return this.current();
  }
}
export {
  AsyncDataTree,
  CompressibleAsyncDataTree
};
//# sourceMappingURL=asyncDataTree.js.map
