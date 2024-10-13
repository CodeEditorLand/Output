import { Event } from "../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import {
	INewScrollPosition,
	IScrollPosition,
	Scrollable,
	ScrollEvent,
} from "../../../base/common/scrollable.js";
import { IEditorConfiguration } from "../config/editorConfiguration.js";
import { ConfigurationChangedEvent } from "../config/editorOptions.js";
import { ScrollType } from "../editorCommon.js";
import {
	IEditorWhitespace,
	IPartialViewLinesViewportData,
	IViewLayout,
	IViewWhitespaceViewportData,
	IWhitespaceChangeAccessor,
	Viewport,
} from "../viewModel.js";
import { ContentSizeChangedEvent } from "../viewModelEventDispatcher.js";

export declare class ViewLayout extends Disposable implements IViewLayout {
	private readonly _configuration;
	private readonly _linesLayout;
	private _maxLineWidth;
	private _overlayWidgetsMinWidth;
	private readonly _scrollable;
	readonly onDidScroll: Event<ScrollEvent>;
	readonly onDidContentSizeChange: Event<ContentSizeChangedEvent>;
	constructor(
		configuration: IEditorConfiguration,
		lineCount: number,
		scheduleAtNextAnimationFrame: (callback: () => void) => IDisposable,
	);
	dispose(): void;
	getScrollable(): Scrollable;
	onHeightMaybeChanged(): void;
	private _configureSmoothScrollDuration;
	onConfigurationChanged(e: ConfigurationChangedEvent): void;
	onFlushed(lineCount: number): void;
	onLinesDeleted(fromLineNumber: number, toLineNumber: number): void;
	onLinesInserted(fromLineNumber: number, toLineNumber: number): void;
	private _getHorizontalScrollbarHeight;
	private _getContentHeight;
	private _updateHeight;
	getCurrentViewport(): Viewport;
	getFutureViewport(): Viewport;
	private _computeContentWidth;
	setMaxLineWidth(maxLineWidth: number): void;
	setOverlayWidgetsMinWidth(maxMinWidth: number): void;
	private _updateContentWidth;
	saveState(): {
		scrollTop: number;
		scrollTopWithoutViewZones: number;
		scrollLeft: number;
	};
	changeWhitespace(
		callback: (accessor: IWhitespaceChangeAccessor) => void,
	): boolean;
	getVerticalOffsetForLineNumber(
		lineNumber: number,
		includeViewZones?: boolean,
	): number;
	getVerticalOffsetAfterLineNumber(
		lineNumber: number,
		includeViewZones?: boolean,
	): number;
	isAfterLines(verticalOffset: number): boolean;
	isInTopPadding(verticalOffset: number): boolean;
	isInBottomPadding(verticalOffset: number): boolean;
	getLineNumberAtVerticalOffset(verticalOffset: number): number;
	getWhitespaceAtVerticalOffset(
		verticalOffset: number,
	): IViewWhitespaceViewportData | null;
	getLinesViewportData(): IPartialViewLinesViewportData;
	getLinesViewportDataAtScrollTop(
		scrollTop: number,
	): IPartialViewLinesViewportData;
	getWhitespaceViewportData(): IViewWhitespaceViewportData[];
	getWhitespaces(): IEditorWhitespace[];
	getContentWidth(): number;
	getScrollWidth(): number;
	getContentHeight(): number;
	getScrollHeight(): number;
	getCurrentScrollLeft(): number;
	getCurrentScrollTop(): number;
	validateScrollPosition(scrollPosition: INewScrollPosition): IScrollPosition;
	setScrollPosition(position: INewScrollPosition, type: ScrollType): void;
	hasPendingScrollAnimation(): boolean;
	deltaScrollNow(deltaScrollLeft: number, deltaScrollTop: number): void;
}
