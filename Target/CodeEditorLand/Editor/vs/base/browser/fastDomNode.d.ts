export declare class FastDomNode<T extends HTMLElement> {
	readonly domNode: T;
	private _maxWidth;
	private _width;
	private _height;
	private _top;
	private _left;
	private _bottom;
	private _right;
	private _paddingTop;
	private _paddingLeft;
	private _paddingBottom;
	private _paddingRight;
	private _fontFamily;
	private _fontWeight;
	private _fontSize;
	private _fontStyle;
	private _fontFeatureSettings;
	private _fontVariationSettings;
	private _textDecoration;
	private _lineHeight;
	private _letterSpacing;
	private _className;
	private _display;
	private _position;
	private _visibility;
	private _color;
	private _backgroundColor;
	private _layerHint;
	private _contain;
	private _boxShadow;
	constructor(domNode: T);
	setMaxWidth(_maxWidth: number | string): void;
	setWidth(_width: number | string): void;
	setHeight(_height: number | string): void;
	setTop(_top: number | string): void;
	setLeft(_left: number | string): void;
	setBottom(_bottom: number | string): void;
	setRight(_right: number | string): void;
	setPaddingTop(_paddingTop: number | string): void;
	setPaddingLeft(_paddingLeft: number | string): void;
	setPaddingBottom(_paddingBottom: number | string): void;
	setPaddingRight(_paddingRight: number | string): void;
	setFontFamily(fontFamily: string): void;
	setFontWeight(fontWeight: string): void;
	setFontSize(_fontSize: number | string): void;
	setFontStyle(fontStyle: string): void;
	setFontFeatureSettings(fontFeatureSettings: string): void;
	setFontVariationSettings(fontVariationSettings: string): void;
	setTextDecoration(textDecoration: string): void;
	setLineHeight(_lineHeight: number | string): void;
	setLetterSpacing(_letterSpacing: number | string): void;
	setClassName(className: string): void;
	toggleClassName(className: string, shouldHaveIt?: boolean): void;
	setDisplay(display: string): void;
	setPosition(position: string): void;
	setVisibility(visibility: string): void;
	setColor(color: string): void;
	setBackgroundColor(backgroundColor: string): void;
	setLayerHinting(layerHint: boolean): void;
	setBoxShadow(boxShadow: string): void;
	setContain(
		contain:
			| "none"
			| "strict"
			| "content"
			| "size"
			| "layout"
			| "style"
			| "paint",
	): void;
	setAttribute(name: string, value: string): void;
	removeAttribute(name: string): void;
	appendChild(child: FastDomNode<T>): void;
	removeChild(child: FastDomNode<T>): void;
}
export declare function createFastDomNode<T extends HTMLElement>(
	domNode: T,
): FastDomNode<T>;
