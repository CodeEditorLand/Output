import './media/aiCustomizationManagement.css';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IMcpWorkbenchService, IMcpService } from '../../../../workbench/contrib/mcp/common/mcpTypes.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IContextMenuService, IContextViewService } from '../../../../platform/contextview/browser/contextView.js';
/**
 * Widget that displays a list of MCP servers.
 */
export declare class McpListWidget extends Disposable {
    private readonly instantiationService;
    private readonly mcpWorkbenchService;
    private readonly mcpService;
    private readonly commandService;
    private readonly openerService;
    private readonly contextViewService;
    private readonly contextMenuService;
    readonly element: HTMLElement;
    private sectionHeader;
    private sectionDescription;
    private sectionLink;
    private searchAndButtonContainer;
    private searchInput;
    private listContainer;
    private list;
    private emptyContainer;
    private emptyText;
    private emptySubtext;
    private filteredServers;
    private searchQuery;
    private readonly delayedFilter;
    constructor(instantiationService: IInstantiationService, mcpWorkbenchService: IMcpWorkbenchService, mcpService: IMcpService, commandService: ICommandService, openerService: IOpenerService, contextViewService: IContextViewService, contextMenuService: IContextMenuService);
    private create;
    private refresh;
    private filterServers;
    /**
     * Layouts the widget.
     */
    layout(height: number, width: number): void;
    /**
     * Focuses the search input.
     */
    focusSearch(): void;
    /**
     * Focuses the list.
     */
    focus(): void;
    /**
     * Handles context menu for MCP server items.
     */
    private onContextMenu;
}
