import { Emitter, Event } from "../../../base/common/event.js";
import { Disposable } from "../../../base/common/lifecycle.js";
import { IConfigurationService } from "../../configuration/common/configuration.js";
import { IContextKeyService } from "../../contextkey/common/contextkey.js";
import { ILayoutService } from "../../layout/browser/layoutService.js";
import {
	AccessibilitySupport,
	IAccessibilityService,
} from "../common/accessibility.js";

export declare class AccessibilityService
	extends Disposable
	implements IAccessibilityService
{
	private readonly _contextKeyService;
	private readonly _layoutService;
	protected readonly _configurationService: IConfigurationService;
	readonly _serviceBrand: undefined;
	private _accessibilityModeEnabledContext;
	protected _accessibilitySupport: AccessibilitySupport;
	protected readonly _onDidChangeScreenReaderOptimized: Emitter<void>;
	protected _configMotionReduced: "auto" | "on" | "off";
	protected _systemMotionReduced: boolean;
	protected readonly _onDidChangeReducedMotion: Emitter<void>;
	private _linkUnderlinesEnabled;
	protected readonly _onDidChangeLinkUnderline: Emitter<void>;
	constructor(
		_contextKeyService: IContextKeyService,
		_layoutService: ILayoutService,
		_configurationService: IConfigurationService,
	);
	private initReducedMotionListeners;
	private initLinkUnderlineListeners;
	onDidChangeLinkUnderlines(
		listener: () => void,
	): import("../../../base/common/lifecycle.js").IDisposable;
	get onDidChangeScreenReaderOptimized(): Event<void>;
	isScreenReaderOptimized(): boolean;
	get onDidChangeReducedMotion(): Event<void>;
	isMotionReduced(): boolean;
	alwaysUnderlineAccessKeys(): Promise<boolean>;
	getAccessibilitySupport(): AccessibilitySupport;
	setAccessibilitySupport(accessibilitySupport: AccessibilitySupport): void;
	alert(message: string): void;
	status(message: string): void;
}
