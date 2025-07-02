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
var McpServerRenderer_1;
import "./media/mcpServersView.css";
import * as dom from "../../../../base/browser/dom.js";
import { ActionBar } from "../../../../base/browser/ui/actionbar/actionbar.js";
import { Event } from "../../../../base/common/event.js";
import { combinedDisposable, Disposable, DisposableStore, dispose, isDisposable } from "../../../../base/common/lifecycle.js";
import { DelayedPagedModel, PagedModel } from "../../../../base/common/paging.js";
import { localize, localize2 } from "../../../../nls.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ContextKeyExpr, IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IContextMenuService } from "../../../../platform/contextview/browser/contextView.js";
import { IHoverService } from "../../../../platform/hover/browser/hover.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { WorkbenchPagedList } from "../../../../platform/list/browser/listService.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IThemeService } from "../../../../platform/theme/common/themeService.js";
import { getLocationBasedViewColors, ViewPane } from "../../../browser/parts/views/viewPane.js";
import { IViewDescriptorService, Extensions as ViewExtensions } from "../../../common/views.js";
import { HasInstalledMcpServersContext, IMcpWorkbenchService, InstalledMcpServersViewId, McpServerContainers, mcpServerIcon } from "../common/mcpTypes.js";
import { DropDownAction, InstallAction, ManageMcpServerAction } from "./mcpServerActions.js";
import { PublisherWidget, InstallCountWidget, RatingsWidget, McpServerIconWidget } from "./mcpServerWidgets.js";
import { ActionRunner, Separator } from "../../../../base/common/actions.js";
import { IMcpGalleryService } from "../../../../platform/mcp/common/mcpManagement.js";
import { URI } from "../../../../base/common/uri.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { IProductService } from "../../../../platform/product/common/productService.js";
import { Registry } from "../../../../platform/registry/common/platform.js";
import { SyncDescriptor } from "../../../../platform/instantiation/common/descriptors.js";
import { DefaultViewsContext, SearchMcpServersContext } from "../../extensions/common/extensions.js";
import { VIEW_CONTAINER } from "../../extensions/browser/extensions.contribution.js";
import { renderMarkdown } from "../../../../base/browser/markdownRenderer.js";
import { MarkdownString } from "../../../../base/common/htmlContent.js";
import { ChatContextKeys } from "../../chat/common/chatContextKeys.js";
let McpServersListView = class McpServersListView2 extends ViewPane {
  static {
    __name(this, "McpServersListView");
  }
  constructor(mpcViewOptions, options, keybindingService, contextMenuService, instantiationService, themeService, hoverService, configurationService, contextKeyService, viewDescriptorService, openerService, mcpWorkbenchService, mcpGalleryService, productService) {
    super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
    this.mpcViewOptions = mpcViewOptions;
    this.mcpWorkbenchService = mcpWorkbenchService;
    this.mcpGalleryService = mcpGalleryService;
    this.productService = productService;
    this.list = null;
    this.listContainer = null;
    this.welcomeContainer = null;
    this.contextMenuActionRunner = this._register(new ActionRunner());
  }
  renderBody(container) {
    super.renderBody(container);
    this.welcomeContainer = dom.append(container, dom.$(".mcp-welcome-container.hide"));
    this.createWelcomeContent(this.welcomeContainer);
    this.listContainer = dom.append(container, dom.$(".mcp-servers-list"));
    this.list = this._register(this.instantiationService.createInstance(WorkbenchPagedList, `${this.id}-MCP-Servers`, this.listContainer, {
      getHeight() {
        return 72;
      },
      getTemplateId: /* @__PURE__ */ __name(() => McpServerRenderer.templateId, "getTemplateId")
    }, [this.instantiationService.createInstance(McpServerRenderer)], {
      multipleSelectionSupport: false,
      setRowLineHeight: false,
      horizontalScrolling: false,
      accessibilityProvider: {
        getAriaLabel(mcpServer) {
          return mcpServer?.label ?? "";
        },
        getWidgetAriaLabel() {
          return localize("mcp servers", "MCP Servers");
        }
      },
      overrideStyles: getLocationBasedViewColors(this.viewDescriptorService.getViewLocationById(this.id)).listOverrideStyles,
      openOnSingleClick: true
    }));
    this._register(Event.debounce(Event.filter(this.list.onDidOpen, (e) => e.element !== null), (_, event) => event, 75, true)((options) => {
      this.mcpWorkbenchService.open(options.element, options.editorOptions);
    }));
    this._register(this.list.onContextMenu((e) => this.onContextMenu(e), this));
    if (this.input) {
      this.renderInput();
    }
  }
  async onContextMenu(e) {
    if (e.element) {
      const disposables = new DisposableStore();
      const manageExtensionAction = disposables.add(this.instantiationService.createInstance(ManageMcpServerAction, false));
      const extension = e.element ? this.mcpWorkbenchService.local.find((local) => local.name === e.element.name) || e.element : e.element;
      manageExtensionAction.mcpServer = extension;
      let groups = [];
      if (manageExtensionAction.enabled) {
        groups = await manageExtensionAction.getActionGroups();
      }
      const actions = [];
      for (const menuActions of groups) {
        for (const menuAction of menuActions) {
          actions.push(menuAction);
          if (isDisposable(menuAction)) {
            disposables.add(menuAction);
          }
        }
        actions.push(new Separator());
      }
      actions.pop();
      this.contextMenuService.showContextMenu({
        getAnchor: /* @__PURE__ */ __name(() => e.anchor, "getAnchor"),
        getActions: /* @__PURE__ */ __name(() => actions, "getActions"),
        actionRunner: this.contextMenuActionRunner,
        onHide: /* @__PURE__ */ __name(() => disposables.dispose(), "onHide")
      });
    }
  }
  layoutBody(height, width) {
    super.layoutBody(height, width);
    this.list?.layout(height, width);
  }
  async show(query) {
    if (this.input) {
      this.input = void 0;
    }
    query = query.trim();
    const servers = query ? await this.mcpWorkbenchService.queryGallery({ text: query.replace("@mcp", "") }) : await this.mcpWorkbenchService.queryLocal();
    const showWelcomeContent = !this.mcpGalleryService.isEnabled() && servers.length === 0 && !!this.mpcViewOptions.showWelcomeOnEmpty;
    const model = new PagedModel(servers);
    this.input = { model, showWelcomeContent };
    this.renderInput();
    return model;
  }
  renderInput() {
    if (!this.input) {
      return;
    }
    if (this.list) {
      this.list.model = new DelayedPagedModel(this.input.model);
    }
    this.showWelcomeContent(this.input.showWelcomeContent);
  }
  showWelcomeContent(show) {
    this.welcomeContainer?.classList.toggle("hide", !show);
    this.listContainer?.classList.toggle("hide", show);
  }
  createWelcomeContent(welcomeContainer) {
    const welcomeContent = dom.append(welcomeContainer, dom.$(".mcp-welcome-content"));
    const iconContainer = dom.append(welcomeContent, dom.$(".mcp-welcome-icon"));
    const iconElement = dom.append(iconContainer, dom.$("span"));
    iconElement.className = ThemeIcon.asClassName(mcpServerIcon);
    const title = dom.append(welcomeContent, dom.$(".mcp-welcome-title"));
    title.textContent = localize("mcp.welcome.title", "MCP Servers");
    const description = dom.append(welcomeContent, dom.$(".mcp-welcome-description"));
    const browseUrl = this.productService.quality === "insider" ? "https://code.visualstudio.com/insider/mcp" : "https://code.visualstudio.com/mcp";
    const markdownResult = this._register(renderMarkdown(new MarkdownString(localize("mcp.welcome.descriptionWithLink", "Extend agent mode by installing [MCP servers]({0}) to bring extra tools for connecting to databases, invoking APIs and performing specialized tasks.", browseUrl), { isTrusted: true }), {
      actionHandler: {
        callback: /* @__PURE__ */ __name((content) => {
          this.openerService.open(URI.parse(content));
        }, "callback"),
        disposables: this._store
      }
    }));
    description.appendChild(markdownResult.element);
  }
};
McpServersListView = __decorate([
  __param(2, IKeybindingService),
  __param(3, IContextMenuService),
  __param(4, IInstantiationService),
  __param(5, IThemeService),
  __param(6, IHoverService),
  __param(7, IConfigurationService),
  __param(8, IContextKeyService),
  __param(9, IViewDescriptorService),
  __param(10, IOpenerService),
  __param(11, IMcpWorkbenchService),
  __param(12, IMcpGalleryService),
  __param(13, IProductService)
], McpServersListView);
let McpServerRenderer = class McpServerRenderer2 {
  static {
    __name(this, "McpServerRenderer");
  }
  static {
    McpServerRenderer_1 = this;
  }
  static {
    this.templateId = "mcpServer";
  }
  constructor(instantiationService, notificationService) {
    this.instantiationService = instantiationService;
    this.notificationService = notificationService;
    this.templateId = McpServerRenderer_1.templateId;
  }
  renderTemplate(root) {
    const element = dom.append(root, dom.$(".mcp-server-item.extension-list-item"));
    const iconContainer = dom.append(element, dom.$(".icon-container"));
    const iconWidget = this.instantiationService.createInstance(McpServerIconWidget, iconContainer);
    const details = dom.append(element, dom.$(".details"));
    const headerContainer = dom.append(details, dom.$(".header-container"));
    const header = dom.append(headerContainer, dom.$(".header"));
    const name = dom.append(header, dom.$("span.name"));
    const installCount = dom.append(header, dom.$("span.install-count"));
    const ratings = dom.append(header, dom.$("span.ratings"));
    const description = dom.append(details, dom.$(".description.ellipsis"));
    const footer = dom.append(details, dom.$(".footer"));
    const publisherWidget = this.instantiationService.createInstance(PublisherWidget, dom.append(footer, dom.$(".publisher-container")), true);
    const actionbar = new ActionBar(footer, {
      actionViewItemProvider: /* @__PURE__ */ __name((action, options) => {
        if (action instanceof DropDownAction) {
          return action.createActionViewItem(options);
        }
        return void 0;
      }, "actionViewItemProvider"),
      focusOnlyEnabledItems: true
    });
    actionbar.setFocusable(false);
    const actionBarListener = actionbar.onDidRun(({ error }) => error && this.notificationService.error(error));
    const actions = [
      this.instantiationService.createInstance(InstallAction),
      this.instantiationService.createInstance(ManageMcpServerAction, false)
    ];
    const widgets = [
      iconWidget,
      publisherWidget,
      this.instantiationService.createInstance(InstallCountWidget, installCount, true),
      this.instantiationService.createInstance(RatingsWidget, ratings, true)
    ];
    const extensionContainers = this.instantiationService.createInstance(McpServerContainers, [...actions, ...widgets]);
    actionbar.push(actions, { icon: true, label: true });
    const disposable = combinedDisposable(...actions, ...widgets, actionbar, actionBarListener, extensionContainers);
    return {
      root,
      element,
      name,
      description,
      installCount,
      ratings,
      disposables: [disposable],
      actionbar,
      mcpServerDisposables: [],
      set mcpServer(mcpServer) {
        extensionContainers.mcpServer = mcpServer;
      }
    };
  }
  renderElement(mcpServer, index, data) {
    data.element.classList.remove("loading");
    data.mcpServerDisposables = dispose(data.mcpServerDisposables);
    data.root.setAttribute("data-mcp-server-id", mcpServer.id);
    data.name.textContent = mcpServer.label;
    data.description.textContent = mcpServer.description;
    data.installCount.style.display = "";
    data.ratings.style.display = "";
    data.mcpServer = mcpServer;
  }
  disposeElement(mcpServer, index, data) {
    data.mcpServerDisposables = dispose(data.mcpServerDisposables);
  }
  disposeTemplate(data) {
    data.mcpServerDisposables = dispose(data.mcpServerDisposables);
    data.disposables = dispose(data.disposables);
  }
};
McpServerRenderer = McpServerRenderer_1 = __decorate([
  __param(0, IInstantiationService),
  __param(1, INotificationService)
], McpServerRenderer);
class DefaultBrowseMcpServersView extends McpServersListView {
  static {
    __name(this, "DefaultBrowseMcpServersView");
  }
  async show() {
    return super.show("@mcp");
  }
}
class McpServersViewsContribution extends Disposable {
  static {
    __name(this, "McpServersViewsContribution");
  }
  static {
    this.ID = "workbench.mcp.servers.views.contribution";
  }
  constructor() {
    super();
    Registry.as(ViewExtensions.ViewsRegistry).registerViews([
      {
        id: InstalledMcpServersViewId,
        name: localize2("mcp-installed", "MCP Servers - Installed"),
        ctorDescriptor: new SyncDescriptor(McpServersListView, [{ showWelcomeOnEmpty: false }]),
        when: ContextKeyExpr.and(DefaultViewsContext, HasInstalledMcpServersContext),
        weight: 40,
        order: 4,
        canToggleVisibility: true
      },
      {
        id: "workbench.views.mcp.default.marketplace",
        name: localize2("mcp", "MCP Servers"),
        ctorDescriptor: new SyncDescriptor(DefaultBrowseMcpServersView, [{ showWelcomeOnEmpty: true }]),
        when: ContextKeyExpr.and(DefaultViewsContext, HasInstalledMcpServersContext.toNegated(), ChatContextKeys.Setup.hidden.negate()),
        weight: 40,
        order: 4,
        canToggleVisibility: true
      },
      {
        id: "workbench.views.mcp.marketplace",
        name: localize2("mcp", "MCP Servers"),
        ctorDescriptor: new SyncDescriptor(McpServersListView, [{ showWelcomeOnEmpty: true }]),
        when: ContextKeyExpr.and(SearchMcpServersContext)
      }
    ], VIEW_CONTAINER);
  }
}
export {
  DefaultBrowseMcpServersView,
  McpServersListView,
  McpServersViewsContribution
};
//# sourceMappingURL=mcpServersView.js.map
