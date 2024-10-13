export declare class DebugEditContext {
	private _isDebugging;
	private _controlBounds;
	private _selectionBounds;
	private _characterBounds;
	private _editContext;
	constructor(window: Window, options?: EditContextInit | undefined);
	get text(): DOMString;
	get selectionStart(): number;
	get selectionEnd(): number;
	get characterBoundsRangeStart(): number;
	updateText(rangeStart: number, rangeEnd: number, text: string): void;
	updateSelection(start: number, end: number): void;
	updateControlBounds(controlBounds: DOMRect): void;
	updateSelectionBounds(selectionBounds: DOMRect): void;
	updateCharacterBounds(rangeStart: number, characterBounds: DOMRect[]): void;
	attachedElements(): HTMLElement[];
	characterBounds(): DOMRect[];
	private readonly _ontextupdateWrapper;
	private readonly _ontextformatupdateWrapper;
	private readonly _oncharacterboundsupdateWrapper;
	private readonly _oncompositionstartWrapper;
	private readonly _oncompositionendWrapper;
	get ontextupdate(): EventHandler | null;
	set ontextupdate(value: EventHandler | null);
	get ontextformatupdate(): EventHandler | null;
	set ontextformatupdate(value: EventHandler | null);
	get oncharacterboundsupdate(): EventHandler | null;
	set oncharacterboundsupdate(value: EventHandler | null);
	get oncompositionstart(): EventHandler | null;
	set oncompositionstart(value: EventHandler | null);
	get oncompositionend(): EventHandler | null;
	set oncompositionend(value: EventHandler | null);
	private readonly _listenerMap;
	addEventListener<K extends keyof EditContextEventHandlersEventMap>(
		type: K,
		listener: (
			this: GlobalEventHandlers,
			ev: EditContextEventHandlersEventMap[K],
		) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject | null,
		options?: boolean | EventListenerOptions | undefined,
	): void;
	dispatchEvent(event: Event): boolean;
	startDebugging(): void;
	endDebugging(): void;
	private _disposables;
	renderDebug(): void;
}
