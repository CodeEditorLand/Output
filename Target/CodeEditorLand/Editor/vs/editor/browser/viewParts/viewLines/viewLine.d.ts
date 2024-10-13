import { StringBuilder } from "../../../common/core/stringBuilder.js";
import { CharacterMapping } from "../../../common/viewLayout/viewLineRenderer.js";
import { ViewportData } from "../../../common/viewLayout/viewLinesViewportData.js";
import { VisibleRanges } from "../../view/renderingContext.js";
import { IVisibleLine } from "../../view/viewLayer.js";
import { DomReadingContext } from "./domReadingContext.js";
import type { ViewLineOptions } from "./viewLineOptions.js";

export declare class ViewLine implements IVisibleLine {
	static readonly CLASS_NAME = "view-line";
	private _options;
	private _isMaybeInvalid;
	private _renderedViewLine;
	constructor(options: ViewLineOptions);
	getDomNode(): HTMLElement | null;
	setDomNode(domNode: HTMLElement): void;
	onContentChanged(): void;
	onTokensChanged(): void;
	onDecorationsChanged(): void;
	onOptionsChanged(newOptions: ViewLineOptions): void;
	onSelectionChanged(): boolean;
	renderLine(
		lineNumber: number,
		deltaTop: number,
		lineHeight: number,
		viewportData: ViewportData,
		sb: StringBuilder,
	): boolean;
	layoutLine(lineNumber: number, deltaTop: number, lineHeight: number): void;
	getWidth(context: DomReadingContext | null): number;
	getWidthIsFast(): boolean;
	needsMonospaceFontCheck(): boolean;
	monospaceAssumptionsAreValid(): boolean;
	onMonospaceAssumptionsInvalidated(): void;
	getVisibleRangesForRange(
		lineNumber: number,
		startColumn: number,
		endColumn: number,
		context: DomReadingContext,
	): VisibleRanges | null;
	getColumnOfNodeOffset(spanNode: HTMLElement, offset: number): number;
}
export declare function getColumnOfNodeOffset(
	characterMapping: CharacterMapping,
	spanNode: HTMLElement,
	offset: number,
): number;
