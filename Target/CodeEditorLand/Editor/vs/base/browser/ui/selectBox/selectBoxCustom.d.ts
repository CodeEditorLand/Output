import { Event } from "../../../common/event.js";
import { Disposable } from "../../../common/lifecycle.js";
import { IContextViewProvider } from "../contextview/contextview.js";
import { IListVirtualDelegate } from "../list/list.js";
import {
	ISelectBoxDelegate,
	ISelectBoxOptions,
	ISelectBoxStyles,
	ISelectData,
	ISelectOptionItem,
} from "./selectBox.js";

import "./selectBoxCustom.css";

export declare class SelectBoxList
	extends Disposable
	implements ISelectBoxDelegate, IListVirtualDelegate<ISelectOptionItem>
{
	private static readonly DEFAULT_DROPDOWN_MINIMUM_BOTTOM_MARGIN;
	private static readonly DEFAULT_DROPDOWN_MINIMUM_TOP_MARGIN;
	private static readonly DEFAULT_MINIMUM_VISIBLE_OPTIONS;
	private _isVisible;
	private selectBoxOptions;
	private selectElement;
	private container?;
	private options;
	private selected;
	private readonly _onDidSelect;
	private readonly styles;
	private listRenderer;
	private contextViewProvider;
	private selectDropDownContainer;
	private styleElement;
	private selectList;
	private selectDropDownListContainer;
	private widthControlElement;
	private _currentSelection;
	private _dropDownPosition;
	private _hasDetails;
	private selectionDetailsPane;
	private _skipLayout;
	private _cachedMaxDetailsHeight?;
	private _hover?;
	private _sticky;
	constructor(
		options: ISelectOptionItem[],
		selected: number,
		contextViewProvider: IContextViewProvider,
		styles: ISelectBoxStyles,
		selectBoxOptions?: ISelectBoxOptions,
	);
	private setTitle;
	getHeight(): number;
	getTemplateId(): string;
	private constructSelectDropDown;
	private registerListeners;
	get onDidSelect(): Event<ISelectData>;
	setOptions(options: ISelectOptionItem[], selected?: number): void;
	setEnabled(enable: boolean): void;
	private setOptionsList;
	select(index: number): void;
	setAriaLabel(label: string): void;
	focus(): void;
	blur(): void;
	setFocusable(focusable: boolean): void;
	render(container: HTMLElement): void;
	private initStyleSheet;
	private styleSelectElement;
	private styleList;
	private createOption;
	private showSelectDropDown;
	private hideSelectDropDown;
	private renderSelectDropDown;
	private measureMaxDetailsHeight;
	private layoutSelectDropDown;
	private setWidthControlElement;
	private createSelectList;
	private onPointerUp;
	private onListBlur;
	private renderDescriptionMarkdown;
	private onListFocus;
	private updateDetail;
	private onEscape;
	private onEnter;
	private onDownArrow;
	private onUpArrow;
	private onPageUp;
	private onPageDown;
	private onHome;
	private onEnd;
	private onCharacter;
	dispose(): void;
}
