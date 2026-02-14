import { ITreeRenderer, ITreeNode, IObjectTreeElement } from '../../../../../../base/browser/ui/tree/tree.js';
import { IIdentityProvider, IListVirtualDelegate } from '../../../../../../base/browser/ui/list/list.js';
import { Event } from '../../../../../../base/common/event.js';
import { Disposable, DisposableStore } from '../../../../../../base/common/lifecycle.js';
import { URI } from '../../../../../../base/common/uri.js';
import { MenuId } from '../../../../../../platform/actions/common/actions.js';
import { IContextKeyService } from '../../../../../../platform/contextkey/common/contextkey.js';
import { IInstantiationService } from '../../../../../../platform/instantiation/common/instantiation.js';
import { ILabelService } from '../../../../../../platform/label/common/label.js';
import { IOpenEvent } from '../../../../../../platform/list/browser/listService.js';
import { IProductService } from '../../../../../../platform/product/common/productService.js';
import { IStorageService } from '../../../../../../platform/storage/common/storage.js';
import { IThemeService } from '../../../../../../platform/theme/common/themeService.js';
import { IResourceLabel, ResourceLabels } from '../../../../../browser/labels.js';
import { IChatEditingSession } from '../../../common/editing/chatEditingService.js';
import { IChatCollapsibleListItem, ICollapsibleListTemplate } from '../chatContentParts/chatReferencesContentPart.js';
/**
 * Represents a folder node in the tree view.
 */
export interface IChatEditsFolderElement {
    readonly kind: 'folder';
    readonly uri: URI;
    readonly children: IChatCollapsibleListItem[];
}
/**
 * Union type for elements in the chat edits tree.
 */
export type IChatEditsTreeElement = IChatCollapsibleListItem | IChatEditsFolderElement;
/**
 * Convert a flat list of chat edits items into a tree grouped by directory.
 * Files at the common ancestor directory are shown at the root level without a folder row.
 */
export declare function buildEditsTree(items: readonly IChatCollapsibleListItem[]): IObjectTreeElement<IChatEditsTreeElement>[];
/**
 * Convert a flat list into tree elements without grouping (list mode).
 */
export declare function buildEditsList(items: readonly IChatCollapsibleListItem[]): IObjectTreeElement<IChatEditsTreeElement>[];
/**
 * Delegate for the chat edits tree that returns element heights and template IDs.
 */
export declare class ChatEditsTreeDelegate implements IListVirtualDelegate<IChatEditsTreeElement> {
    getHeight(_element: IChatEditsTreeElement): number;
    getTemplateId(element: IChatEditsTreeElement): string;
}
/**
 * Identity provider for the chat edits tree.
 * Provides stable string IDs so the tree can preserve collapse/selection state across updates.
 */
export declare class ChatEditsTreeIdentityProvider implements IIdentityProvider<IChatEditsTreeElement> {
    getId(element: IChatEditsTreeElement): string;
}
interface IChatEditsFolderTemplate {
    readonly label: IResourceLabel;
    readonly templateDisposables: DisposableStore;
}
/**
 * Renderer for folder elements in the chat edits tree.
 */
export declare class ChatEditsFolderRenderer implements ITreeRenderer<IChatEditsTreeElement, void, IChatEditsFolderTemplate> {
    private readonly labels;
    private readonly labelService;
    static readonly TEMPLATE_ID = "chatEditsFolderRenderer";
    readonly templateId = "chatEditsFolderRenderer";
    constructor(labels: ResourceLabels, labelService: ILabelService);
    renderTemplate(container: HTMLElement): IChatEditsFolderTemplate;
    renderElement(node: ITreeNode<IChatEditsTreeElement, void>, _index: number, templateData: IChatEditsFolderTemplate): void;
    disposeTemplate(templateData: IChatEditsFolderTemplate): void;
}
/**
 * Tree renderer for file elements in the chat edits tree.
 * Adapted from CollapsibleListRenderer to work with ITreeNode.
 */
export declare class ChatEditsFileTreeRenderer implements ITreeRenderer<IChatEditsTreeElement, void, ICollapsibleListTemplate> {
    private readonly labels;
    private readonly menuId;
    private readonly themeService;
    private readonly productService;
    private readonly instantiationService;
    private readonly contextKeyService;
    static readonly TEMPLATE_ID = "chatEditsFileRenderer";
    readonly templateId = "chatEditsFileRenderer";
    constructor(labels: ResourceLabels, menuId: MenuId | undefined, themeService: IThemeService, productService: IProductService, instantiationService: IInstantiationService, contextKeyService: IContextKeyService);
    renderTemplate(container: HTMLElement): ICollapsibleListTemplate;
    private getReferenceIcon;
    renderElement(node: ITreeNode<IChatEditsTreeElement, void>, _index: number, templateData: ICollapsibleListTemplate): void;
    disposeTemplate(templateData: ICollapsibleListTemplate): void;
}
/**
 * Widget that renders the chat edits file list, supporting both flat list and tree views.
 * Manages the lifecycle of the underlying tree or list widget, and handles toggling between modes.
 */
export declare class ChatEditsListWidget extends Disposable {
    private readonly onDidChangeVisibility;
    private readonly instantiationService;
    private readonly storageService;
    private readonly themeService;
    private readonly labelService;
    private readonly _onDidFocus;
    readonly onDidFocus: Event<void>;
    private readonly _onDidOpen;
    readonly onDidOpen: Event<IOpenEvent<IChatEditsTreeElement | undefined>>;
    private _tree;
    private _list;
    private readonly _listPool;
    private readonly _widgetDisposables;
    private readonly _chatEditsInTreeView;
    private _currentContainer;
    private _currentSession;
    private _lastEntries;
    get currentSession(): IChatEditingSession | null;
    get selectedElements(): URI[];
    constructor(onDidChangeVisibility: Event<boolean>, instantiationService: IInstantiationService, contextKeyService: IContextKeyService, storageService: IStorageService, themeService: IThemeService, labelService: ILabelService);
    private get _isTreeMode();
    /**
     * Creates the appropriate widget (tree or list) inside the given container.
     * Must be called before {@link setEntries}.
     */
    create(container: HTMLElement, chatEditingSession: IChatEditingSession | null): void;
    /**
     * Rebuild the widget (e.g. after a view mode toggle).
     */
    rebuild(container: HTMLElement, chatEditingSession: IChatEditingSession | null): void;
    /**
     * Whether the current view mode has changed since the widget was last created.
     */
    get needsRebuild(): boolean;
    /**
     * Update the displayed entries.
     */
    setEntries(entries: readonly IChatCollapsibleListItem[]): void;
    /**
     * Dispose the current tree or list widget without disposing the outer widget.
     */
    clear(): void;
    private _createTree;
    private _createList;
    dispose(): void;
}
export {};
