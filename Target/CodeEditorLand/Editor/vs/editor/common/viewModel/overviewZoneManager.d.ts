export declare class ColorZone {
	_colorZoneBrand: void;
	readonly from: number;
	readonly to: number;
	readonly colorId: number;
	constructor(from: number, to: number, colorId: number);
	static compare(a: ColorZone, b: ColorZone): number;
}
/**
 * A zone in the overview ruler
 */
export declare class OverviewRulerZone {
	_overviewRulerZoneBrand: void;
	readonly startLineNumber: number;
	readonly endLineNumber: number;
	/**
	 * If set to 0, the height in lines will be determined based on `endLineNumber`.
	 */
	readonly heightInLines: number;
	readonly color: string;
	private _colorZone;
	constructor(
		startLineNumber: number,
		endLineNumber: number,
		heightInLines: number,
		color: string,
	);
	static compare(a: OverviewRulerZone, b: OverviewRulerZone): number;
	setColorZone(colorZone: ColorZone): void;
	getColorZones(): ColorZone | null;
}
export declare class OverviewZoneManager {
	private readonly _getVerticalOffsetForLine;
	private _zones;
	private _colorZonesInvalid;
	private _lineHeight;
	private _domWidth;
	private _domHeight;
	private _outerHeight;
	private _pixelRatio;
	private _lastAssignedId;
	private readonly _color2Id;
	private readonly _id2Color;
	constructor(getVerticalOffsetForLine: (lineNumber: number) => number);
	getId2Color(): string[];
	setZones(newZones: OverviewRulerZone[]): void;
	setLineHeight(lineHeight: number): boolean;
	setPixelRatio(pixelRatio: number): void;
	getDOMWidth(): number;
	getCanvasWidth(): number;
	setDOMWidth(width: number): boolean;
	getDOMHeight(): number;
	getCanvasHeight(): number;
	setDOMHeight(height: number): boolean;
	getOuterHeight(): number;
	setOuterHeight(outerHeight: number): boolean;
	resolveColorZones(): ColorZone[];
}
