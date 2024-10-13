import * as dom from "../../../../base/browser/dom.js";
import { Event } from "../../../../base/common/event.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import {
	ICodeEditor,
	IOverlayWidget,
	IOverlayWidgetPosition,
} from "../../../browser/editorBrowser.js";
import { CompletionItem } from "./suggest.js";

export declare function canExpandCompletionItem(
	item: CompletionItem | undefined,
): boolean;
export declare class SuggestDetailsWidget {
	private readonly _editor;
	readonly domNode: HTMLDivElement;
	private readonly _onDidClose;
	readonly onDidClose: Event<void>;
	private readonly _onDidChangeContents;
	readonly onDidChangeContents: Event<this>;
	private readonly _close;
	private readonly _scrollbar;
	private readonly _body;
	private readonly _header;
	private readonly _type;
	private readonly _docs;
	private readonly _disposables;
	private readonly _markdownRenderer;
	private readonly _renderDisposeable;
	private _borderWidth;
	private _size;
	constructor(_editor: ICodeEditor, instaService: IInstantiationService);
	dispose(): void;
	private _configureFont;
	getLayoutInfo(): {
		lineHeight: number;
		borderWidth: number;
		borderHeight: number;
		verticalPadding: number;
		horizontalPadding: number;
	};
	renderLoading(): void;
	renderItem(item: CompletionItem, explainMode: boolean): void;
	clearContents(): void;
	get isEmpty(): boolean;
	get size(): dom.Dimension;
	layout(width: number, height: number): void;
	scrollDown(much?: number): void;
	scrollUp(much?: number): void;
	scrollTop(): void;
	scrollBottom(): void;
	pageDown(): void;
	pageUp(): void;
	set borderWidth(width: number);
	get borderWidth(): number;
	focus(): void;
}
export declare class SuggestDetailsOverlay implements IOverlayWidget {
	readonly widget: SuggestDetailsWidget;
	private readonly _editor;
	readonly allowEditorOverflow = true;
	private readonly _disposables;
	private readonly _resizable;
	private _added;
	private _anchorBox?;
	private _preferAlignAtTop;
	private _userSize?;
	private _topLeft?;
	constructor(widget: SuggestDetailsWidget, _editor: ICodeEditor);
	dispose(): void;
	getId(): string;
	getDomNode(): HTMLElement;
	getPosition(): IOverlayWidgetPosition | null;
	show(): void;
	hide(sessionEnded?: boolean): void;
	placeAtAnchor(anchor: HTMLElement, preferAlignAtTop: boolean): void;
	_placeAtAnchor(
		anchorBox: dom.IDomNodePagePosition,
		size: dom.Dimension,
		preferAlignAtTop: boolean,
	): void;
	private _applyTopLeft;
}
