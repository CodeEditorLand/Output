import type {
	IBufferRange,
	ILink,
	ILinkDecorations,
	IViewportRange,
	Terminal,
} from "@xterm/xterm";

import type { IHoverAction } from "../../../../../base/browser/ui/hover/hover.js";
import { Event } from "../../../../../base/common/event.js";
import { Disposable } from "../../../../../base/common/lifecycle.js";
import type { URI } from "../../../../../base/common/uri.js";
import { IConfigurationService } from "../../../../../platform/configuration/common/configuration.js";
import { TerminalLinkType } from "./links.js";
import type { IParsedLink } from "./terminalLinkParsing.js";

export declare class TerminalLink extends Disposable implements ILink {
	private readonly _xterm;
	readonly range: IBufferRange;
	readonly text: string;
	readonly uri: URI | undefined;
	readonly parsedLink: IParsedLink | undefined;
	readonly actions: IHoverAction[] | undefined;
	private readonly _viewportY;
	private readonly _activateCallback;
	private readonly _tooltipCallback;
	private readonly _isHighConfidenceLink;
	readonly label: string | undefined;
	private readonly _type;
	private readonly _configurationService;
	decorations: ILinkDecorations;
	private readonly _tooltipScheduler;
	private readonly _hoverListeners;
	private readonly _onInvalidated;
	get onInvalidated(): Event<void>;
	get type(): TerminalLinkType;
	constructor(
		_xterm: Terminal,
		range: IBufferRange,
		text: string,
		uri: URI | undefined,
		parsedLink: IParsedLink | undefined,
		actions: IHoverAction[] | undefined,
		_viewportY: number,
		_activateCallback: (
			event: MouseEvent | undefined,
			uri: string,
		) => Promise<void>,
		_tooltipCallback: (
			link: TerminalLink,
			viewportRange: IViewportRange,
			modifierDownCallback?: () => void,
			modifierUpCallback?: () => void,
		) => void,
		_isHighConfidenceLink: boolean,
		label: string | undefined,
		_type: TerminalLinkType,
		_configurationService: IConfigurationService,
	);
	activate(event: MouseEvent | undefined, text: string): void;
	hover(event: MouseEvent, text: string): void;
	leave(): void;
	private _enableDecorations;
	private _disableDecorations;
	private _isModifierDown;
}
