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
import "./media/scm.css";
import { localize } from "../../../../nls.js";
import { ViewPane } from "../../../browser/parts/views/viewPane.js";
import { append, $ } from "../../../../base/browser/dom.js";
import { WorkbenchCompressibleAsyncDataTree } from "../../../../platform/list/browser/listService.js";
import { ISCMViewService } from "../common/scm.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { Disposable, DisposableStore } from "../../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { RepositoryActionRunner, RepositoryRenderer } from "./scmRepositoryRenderer.js";
import { collectContextMenuActions, getActionViewItemProvider } from "./util.js";
import { Iterable } from "../../../../base/common/iterator.js";
import { MenuId } from "../../../../platform/actions/common/actions.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { observableConfigValue } from "../../../../platform/observable/common/platformObservableUtils.js";
import { autorun, observableSignalFromEvent } from "../../../../base/common/observable.js";
class ListDelegate {
  static {
    __name(this, "ListDelegate");
  }
  getHeight() {
    return 22;
  }
  getTemplateId() {
    return RepositoryRenderer.TEMPLATE_ID;
  }
}
class RepositoryTreeDataSource extends Disposable {
  static {
    __name(this, "RepositoryTreeDataSource");
  }
  async getChildren(inputOrElement) {
    if (inputOrElement instanceof SCMRepositoriesViewModel) {
      return inputOrElement.repositories;
    }
    return [];
  }
  hasChildren(inputOrElement) {
    return inputOrElement instanceof SCMRepositoriesViewModel;
  }
}
class RepositoryTreeIdentityProvider {
  static {
    __name(this, "RepositoryTreeIdentityProvider");
  }
  getId(element) {
    return element.provider.id;
  }
}
let SCMRepositoriesViewModel = class SCMRepositoriesViewModel2 extends Disposable {
  static {
    __name(this, "SCMRepositoriesViewModel");
  }
  constructor(scmViewService) {
    super();
    this.scmViewService = scmViewService;
    this.onDidChangeRepositoriesSignal = observableSignalFromEvent(this, this.scmViewService.onDidChangeRepositories);
    this.onDidChangeVisibleRepositoriesSignal = observableSignalFromEvent(this, this.scmViewService.onDidChangeVisibleRepositories);
  }
  get repositories() {
    return this.scmViewService.repositories;
  }
};
SCMRepositoriesViewModel = __decorate([
  __param(0, ISCMViewService)
], SCMRepositoriesViewModel);
let SCMRepositoriesViewPane = class SCMRepositoriesViewPane2 extends ViewPane {
  static {
    __name(this, "SCMRepositoriesViewPane");
  }
  constructor(options, scmViewService, keybindingService, contextMenuService, instantiationService, viewDescriptorService, contextKeyService, configurationService, openerService, themeService, hoverService) {
    super({ ...options, titleMenuId: MenuId.SCMSourceControlTitle }, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
    this.scmViewService = scmViewService;
    this.visibilityDisposables = new DisposableStore();
    this.visibleCountObs = observableConfigValue("scm.repositories.visible", 10, this.configurationService);
    this.providerCountBadgeObs = observableConfigValue("scm.providerCountBadge", "hidden", this.configurationService);
  }
  renderBody(container) {
    super.renderBody(container);
    const treeContainer = append(container, $(".scm-view.scm-repositories-view"));
    this._register(autorun((reader) => {
      const providerCountBadge = this.providerCountBadgeObs.read(reader);
      treeContainer.classList.toggle("hide-provider-counts", providerCountBadge === "hidden");
      treeContainer.classList.toggle("auto-provider-counts", providerCountBadge === "auto");
    }));
    this.createTree(treeContainer);
    this.onDidChangeBodyVisibility((visible) => {
      if (!visible) {
        this.visibilityDisposables.clear();
        return;
      }
      this.treeViewModel = this.instantiationService.createInstance(SCMRepositoriesViewModel);
      this._register(this.treeViewModel);
      this.tree.setInput(this.treeViewModel);
      this.visibilityDisposables.add(autorun((reader) => {
        const visibleCount = this.visibleCountObs.read(reader);
        this.updateBodySize(visibleCount);
      }));
      this.visibilityDisposables.add(autorun(async (reader) => {
        this.treeViewModel.onDidChangeRepositoriesSignal.read(reader);
        await this.updateChildren();
      }));
      this.visibilityDisposables.add(autorun(async (reader) => {
        this.treeViewModel.onDidChangeVisibleRepositoriesSignal.read(reader);
        this.updateTreeSelection();
      }));
    }, this, this._store);
  }
  layoutBody(height, width) {
    super.layoutBody(height, width);
    this.tree.layout(height, width);
  }
  focus() {
    super.focus();
    this.tree.domFocus();
  }
  createTree(container) {
    this.treeIdentityProvider = new RepositoryTreeIdentityProvider();
    this.treeDataSource = this.instantiationService.createInstance(RepositoryTreeDataSource);
    this._register(this.treeDataSource);
    const compressionEnabled = observableConfigValue("scm.compactFolders", true, this.configurationService);
    this.tree = this.instantiationService.createInstance(WorkbenchCompressibleAsyncDataTree, "SCM Repositories", container, new ListDelegate(), {
      isIncompressible: /* @__PURE__ */ __name(() => true, "isIncompressible")
    }, [
      this.instantiationService.createInstance(RepositoryRenderer, MenuId.SCMSourceControlInline, getActionViewItemProvider(this.instantiationService))
    ], this.treeDataSource, {
      identityProvider: this.treeIdentityProvider,
      horizontalScrolling: false,
      compressionEnabled: compressionEnabled.get(),
      overrideStyles: this.getLocationBasedColors().listOverrideStyles,
      accessibilityProvider: {
        getAriaLabel(r) {
          return r.provider.label;
        },
        getWidgetAriaLabel() {
          return localize("scm", "Source Control Repositories");
        }
      }
    });
    this._register(this.tree);
    this._register(this.tree.onDidChangeSelection(this.onTreeSelectionChange, this));
    this._register(this.tree.onDidChangeFocus(this.onTreeDidChangeFocus, this));
    this._register(this.tree.onContextMenu(this.onTreeContextMenu, this));
  }
  onTreeContextMenu(e) {
    if (!e.element) {
      return;
    }
    const provider = e.element.provider;
    const menus = this.scmViewService.menus.getRepositoryMenus(provider);
    const menu = menus.repositoryContextMenu;
    const actions = collectContextMenuActions(menu);
    const disposables = new DisposableStore();
    const actionRunner = new RepositoryActionRunner(() => {
      return this.tree.getSelection();
    });
    disposables.add(actionRunner);
    disposables.add(actionRunner.onWillRun(() => this.tree.domFocus()));
    this.contextMenuService.showContextMenu({
      actionRunner,
      getAnchor: /* @__PURE__ */ __name(() => e.anchor, "getAnchor"),
      getActions: /* @__PURE__ */ __name(() => actions, "getActions"),
      getActionsContext: /* @__PURE__ */ __name(() => provider, "getActionsContext"),
      onHide: /* @__PURE__ */ __name(() => disposables.dispose(), "onHide")
    });
  }
  onTreeSelectionChange(e) {
    if (e.browserEvent && e.elements.length > 0) {
      const scrollTop = this.tree.scrollTop;
      this.scmViewService.visibleRepositories = e.elements;
      this.tree.scrollTop = scrollTop;
    }
  }
  onTreeDidChangeFocus(e) {
    if (e.browserEvent && e.elements.length > 0) {
      this.scmViewService.focus(e.elements[0]);
    }
  }
  async updateChildren() {
    await this.tree.updateChildren(this.treeViewModel);
    this.updateBodySize(this.visibleCountObs.get());
  }
  updateBodySize(visibleCount) {
    if (this.orientation === 1) {
      return;
    }
    const empty = this.scmViewService.repositories.length === 0;
    const size = Math.min(this.scmViewService.repositories.length, visibleCount) * 22;
    this.minimumBodySize = visibleCount === 0 ? 22 : size;
    this.maximumBodySize = visibleCount === 0 ? Number.POSITIVE_INFINITY : empty ? Number.POSITIVE_INFINITY : size;
  }
  updateTreeSelection() {
    const oldSelection = this.tree.getSelection();
    const oldSet = new Set(oldSelection);
    const set = new Set(this.scmViewService.visibleRepositories);
    const added = new Set(Iterable.filter(set, (r) => !oldSet.has(r)));
    const removed = new Set(Iterable.filter(oldSet, (r) => !set.has(r)));
    if (added.size === 0 && removed.size === 0) {
      return;
    }
    const selection = oldSelection.filter((repo) => !removed.has(repo));
    for (const repo of this.scmViewService.repositories) {
      if (added.has(repo)) {
        selection.push(repo);
      }
    }
    this.tree.setSelection(selection);
    if (selection.length > 0 && !this.tree.getFocus().includes(selection[0])) {
      this.tree.setAnchor(selection[0]);
      this.tree.setFocus([selection[0]]);
    }
  }
  dispose() {
    this.visibilityDisposables.dispose();
    super.dispose();
  }
};
SCMRepositoriesViewPane = __decorate([
  __param(1, ISCMViewService),
  __param(2, IKeybindingService),
  __param(3, IContextMenuService),
  __param(4, IInstantiationService),
  __param(5, IViewDescriptorService),
  __param(6, IContextKeyService),
  __param(7, IConfigurationService),
  __param(8, IOpenerService),
  __param(9, IThemeService),
  __param(10, IHoverService)
], SCMRepositoriesViewPane);
export {
  SCMRepositoriesViewPane
};
//# sourceMappingURL=scmRepositoriesViewPane.js.map
