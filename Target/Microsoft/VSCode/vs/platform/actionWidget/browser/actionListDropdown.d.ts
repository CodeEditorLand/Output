import { Disposable } from '../../../base/common/lifecycle.js';
import { ThemeIcon } from '../../../base/common/themables.js';
import { IContextViewService } from '../../contextview/browser/contextView.js';
import { ILayoutService } from '../../layout/browser/layoutService.js';
import './actionListDropdown.css';
/**
 * Represents an item in the action list dropdown.
 */
export interface IActionListDropdownItem {
    readonly id: string;
    readonly label: string;
    readonly description?: string;
    readonly icon?: ThemeIcon;
    readonly checked?: boolean;
    readonly disabled?: boolean;
    readonly tooltip?: string;
    readonly className?: string;
    readonly badge?: string;
    readonly descriptionButton?: {
        readonly label: string;
        readonly onDidClick: () => void;
    };
    readonly section?: string;
    readonly isSectionToggle?: boolean;
    readonly run: () => void;
}
/**
 * The kind of entry in the action list dropdown.
 */
export declare const enum ActionListDropdownItemKind {
    Action = "action",
    Separator = "separator"
}
/**
 * An entry in the action list dropdown, either an action item or a separator.
 */
export interface IActionListDropdownEntry {
    readonly item?: IActionListDropdownItem;
    readonly kind: ActionListDropdownItemKind;
}
/**
 * Options for the action list dropdown.
 */
export interface IActionListDropdownOptions {
    readonly collapsedByDefault?: ReadonlySet<string>;
    readonly minWidth?: number;
}
/**
 * Delegate that receives callbacks from the action list dropdown.
 */
export interface IActionListDropdownDelegate {
    onSelect(item: IActionListDropdownItem): void;
    onHide(): void;
}
/**
 * A DOM-based dropdown widget with filtering and collapsible groups.
 * Renders items directly as DOM elements without using the List widget.
 */
export declare class ActionListDropdown extends Disposable {
    private readonly _contextViewService;
    private readonly _layoutService;
    private _isVisible;
    private _domNode;
    private _previousFocusedElement;
    private readonly _showDisposables;
    private readonly _collapsedSections;
    get isVisible(): boolean;
    constructor(_contextViewService: IContextViewService, _layoutService: ILayoutService);
    /**
     * Show the dropdown anchored to the given element.
     */
    show(entries: IActionListDropdownEntry[], delegate: IActionListDropdownDelegate, anchor: HTMLElement, options?: IActionListDropdownOptions): void;
    /**
     * Hide the dropdown.
     */
    hide(): void;
    private _getVisibleEntries;
    private _renderEntry;
    private _toggleSection;
    private _moveFocus;
    private _focusedIndex;
    private _setFocusedIndex;
    private _constrainHeight;
    private _updateWidth;
}
