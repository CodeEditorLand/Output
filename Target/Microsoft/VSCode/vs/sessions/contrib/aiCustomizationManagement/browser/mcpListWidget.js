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
import "./media/aiCustomizationManagement.css";
import * as DOM from "../../../../base/browser/dom.js";
import { Disposable, DisposableStore, isDisposable } from "../../../../base/common/lifecycle.js";
import { localize } from "../../../../nls.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { WorkbenchList } from "../../../../platform/list/browser/listService.js";
import { ThemeIcon } from "../../../../base/common/themables.js";
import { Codicon } from "../../../../base/common/codicons.js";
import { Button } from "../../../../base/browser/ui/button/button.js";
import { defaultButtonStyles, defaultInputBoxStyles } from "../../../../platform/theme/browser/defaultStyles.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IMcpWorkbenchService, IMcpService } from "../../../../workbench/contrib/mcp/common/mcpTypes.js";
import { autorun } from "../../../../base/common/observable.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { URI } from "../../../../base/common/uri.js";
import { InputBox } from "../../../../base/browser/ui/inputbox/inputBox.js";
import { IContextMenuService, IContextViewService } from "../../../../platform/contextview/browser/contextView.js";
import { Delayer } from "../../../../base/common/async.js";
import { Separator } from "../../../../base/common/actions.js";
import { getContextMenuActions } from "../../../../workbench/contrib/mcp/browser/mcpServerActions.js";
const $ = DOM.$;
const MCP_ITEM_HEIGHT = 60;
class McpServerItemDelegate {
  static {
    __name(this, "McpServerItemDelegate");
  }
  getHeight() {
    return MCP_ITEM_HEIGHT;
  }
  getTemplateId() {
    return "mcpServerItem";
  }
}
let McpServerItemRenderer = class McpServerItemRenderer2 {
  static {
    __name(this, "McpServerItemRenderer");
  }
  constructor(mcpService) {
    this.mcpService = mcpService;
    this.templateId = "mcpServerItem";
  }
  renderTemplate(container) {
    container.classList.add("mcp-server-item");
    const icon = DOM.append(container, $(".mcp-server-icon"));
    icon.classList.add(...ThemeIcon.asClassNameArray(Codicon.server));
    const details = DOM.append(container, $(".mcp-server-details"));
    const name = DOM.append(details, $(".mcp-server-name"));
    const description = DOM.append(details, $(".mcp-server-description"));
    const status = DOM.append(container, $(".mcp-server-status"));
    return { container, icon, name, description, status, disposables: new DisposableStore() };
  }
  renderElement(element, index, templateData) {
    templateData.disposables.clear();
    templateData.name.textContent = element.label;
    templateData.description.textContent = element.description || "";
    const server = this.mcpService.servers.get().find((s) => s.definition.id === element.id);
    templateData.disposables.add(autorun((reader) => {
      const connectionState = server?.connectionState.read(reader);
      this.updateStatus(templateData.status, connectionState?.state);
    }));
  }
  updateStatus(statusElement, state) {
    statusElement.className = "mcp-server-status";
    switch (state) {
      case 2:
        statusElement.textContent = localize("running", "Running");
        statusElement.classList.add("running");
        break;
      case 1:
        statusElement.textContent = localize("starting", "Starting");
        statusElement.classList.add("starting");
        break;
      case 3:
        statusElement.textContent = localize("error", "Error");
        statusElement.classList.add("error");
        break;
      case 0:
      default:
        statusElement.textContent = localize("stopped", "Stopped");
        statusElement.classList.add("stopped");
        break;
    }
  }
  disposeTemplate(templateData) {
    templateData.disposables.dispose();
  }
};
McpServerItemRenderer = __decorate([
  __param(0, IMcpService)
], McpServerItemRenderer);
let McpListWidget = class McpListWidget2 extends Disposable {
  static {
    __name(this, "McpListWidget");
  }
  constructor(instantiationService, mcpWorkbenchService, mcpService, commandService, openerService, contextViewService, contextMenuService) {
    super();
    this.instantiationService = instantiationService;
    this.mcpWorkbenchService = mcpWorkbenchService;
    this.mcpService = mcpService;
    this.commandService = commandService;
    this.openerService = openerService;
    this.contextViewService = contextViewService;
    this.contextMenuService = contextMenuService;
    this.filteredServers = [];
    this.searchQuery = "";
    this.delayedFilter = new Delayer(200);
    this.element = $(".mcp-list-widget");
    this.create();
  }
  create() {
    this.searchAndButtonContainer = DOM.append(this.element, $(".list-search-and-button-container"));
    const searchContainer = DOM.append(this.searchAndButtonContainer, $(".list-search-container"));
    this.searchInput = this._register(new InputBox(searchContainer, this.contextViewService, {
      placeholder: localize("searchMcpPlaceholder", "Type to search..."),
      inputBoxStyles: defaultInputBoxStyles
    }));
    this._register(this.searchInput.onDidChange(() => {
      this.searchQuery = this.searchInput.value;
      this.delayedFilter.trigger(() => this.filterServers());
    }));
    const addButtonContainer = DOM.append(this.searchAndButtonContainer, $(".list-add-button-container"));
    const addButton = this._register(new Button(addButtonContainer, { ...defaultButtonStyles, supportIcons: true }));
    addButton.label = `$(${Codicon.add.id}) ${localize("addServer", "Add Server")}`;
    addButton.element.classList.add("list-add-button");
    this._register(addButton.onDidClick(() => {
      this.commandService.executeCommand(
        "workbench.mcp.addConfiguration"
        /* McpCommandIds.AddConfiguration */
      );
    }));
    this.emptyContainer = DOM.append(this.element, $(".mcp-empty-state"));
    const emptyIcon = DOM.append(this.emptyContainer, $(".empty-icon"));
    emptyIcon.classList.add(...ThemeIcon.asClassNameArray(Codicon.server));
    this.emptyText = DOM.append(this.emptyContainer, $(".empty-text"));
    this.emptySubtext = DOM.append(this.emptyContainer, $(".empty-subtext"));
    this.listContainer = DOM.append(this.element, $(".mcp-list-container"));
    this.sectionHeader = DOM.append(this.element, $(".section-footer"));
    this.sectionDescription = DOM.append(this.sectionHeader, $("p.section-footer-description"));
    this.sectionDescription.textContent = localize("mcpServersDescription", "An open standard that lets AI use external tools and services. MCP servers provide tools for file operations, databases, APIs, and more.");
    this.sectionLink = DOM.append(this.sectionHeader, $("a.section-footer-link"));
    this.sectionLink.textContent = localize("learnMoreMcp", "Learn more about MCP servers");
    this.sectionLink.href = "https://code.visualstudio.com/docs/copilot/chat/mcp-servers";
    this._register(DOM.addDisposableListener(this.sectionLink, "click", (e) => {
      e.preventDefault();
      const href = this.sectionLink.href;
      if (href) {
        this.openerService.open(URI.parse(href));
      }
    }));
    const delegate = new McpServerItemDelegate();
    const renderer = this.instantiationService.createInstance(McpServerItemRenderer);
    this.list = this._register(this.instantiationService.createInstance(WorkbenchList, "McpManagementList", this.listContainer, delegate, [renderer], {
      multipleSelectionSupport: false,
      setRowLineHeight: false,
      horizontalScrolling: false,
      accessibilityProvider: {
        getAriaLabel(element) {
          return element.label;
        },
        getWidgetAriaLabel() {
          return localize("mcpServersListAriaLabel", "MCP Servers");
        }
      },
      openOnSingleClick: true,
      identityProvider: {
        getId(element) {
          return element.id;
        }
      }
    }));
    this._register(this.list.onDidOpen((e) => {
      if (e.element) {
        this.mcpWorkbenchService.open(e.element);
      }
    }));
    this._register(this.list.onContextMenu((e) => this.onContextMenu(e)));
    this._register(this.mcpWorkbenchService.onChange(() => this.refresh()));
    this._register(autorun((reader) => {
      this.mcpService.servers.read(reader);
      this.refresh();
    }));
    void this.refresh();
  }
  async refresh() {
    this.filterServers();
  }
  filterServers() {
    const query = this.searchQuery.toLowerCase().trim();
    if (query) {
      this.filteredServers = this.mcpWorkbenchService.local.filter((server) => server.label.toLowerCase().includes(query) || server.description?.toLowerCase().includes(query));
    } else {
      this.filteredServers = [...this.mcpWorkbenchService.local];
    }
    if (this.filteredServers.length === 0) {
      this.emptyContainer.style.display = "flex";
      this.listContainer.style.display = "none";
      if (this.searchQuery.trim()) {
        this.emptyText.textContent = localize("noMatchingServers", "No servers match '{0}'", this.searchQuery);
        this.emptySubtext.textContent = localize("tryDifferentSearch", "Try a different search term");
      } else {
        this.emptyText.textContent = localize("noMcpServers", "No MCP servers configured");
        this.emptySubtext.textContent = localize("addMcpServer", "Add an MCP server configuration to get started");
      }
    } else {
      this.emptyContainer.style.display = "none";
      this.listContainer.style.display = "";
    }
    this.list.splice(0, this.list.length, this.filteredServers);
  }
  /**
   * Layouts the widget.
   */
  layout(height, width) {
    const sectionFooterHeight = this.sectionHeader.offsetHeight || 100;
    const searchBarHeight = this.searchAndButtonContainer.offsetHeight || 40;
    const margins = 12;
    const listHeight = height - sectionFooterHeight - searchBarHeight - margins;
    this.listContainer.style.height = `${Math.max(0, listHeight)}px`;
    this.list.layout(Math.max(0, listHeight), width);
  }
  /**
   * Focuses the search input.
   */
  focusSearch() {
    this.searchInput.focus();
  }
  /**
   * Focuses the list.
   */
  focus() {
    this.list.domFocus();
    const servers = this.list.length;
    if (servers > 0) {
      this.list.setFocus([0]);
    }
  }
  /**
   * Handles context menu for MCP server items.
   */
  onContextMenu(e) {
    if (!e.element) {
      return;
    }
    const disposables = new DisposableStore();
    const mcpServer = this.mcpWorkbenchService.local.find((local) => local.id === e.element.id) || e.element;
    const groups = getContextMenuActions(mcpServer, false, this.instantiationService);
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
    if (actions.length > 0 && actions[actions.length - 1] instanceof Separator) {
      actions.pop();
    }
    this.contextMenuService.showContextMenu({
      getAnchor: /* @__PURE__ */ __name(() => e.anchor, "getAnchor"),
      getActions: /* @__PURE__ */ __name(() => actions, "getActions"),
      onHide: /* @__PURE__ */ __name(() => disposables.dispose(), "onHide")
    });
  }
};
McpListWidget = __decorate([
  __param(0, IInstantiationService),
  __param(1, IMcpWorkbenchService),
  __param(2, IMcpService),
  __param(3, ICommandService),
  __param(4, IOpenerService),
  __param(5, IContextViewService),
  __param(6, IContextMenuService)
], McpListWidget);
export {
  McpListWidget
};
//# sourceMappingURL=mcpListWidget.js.map
