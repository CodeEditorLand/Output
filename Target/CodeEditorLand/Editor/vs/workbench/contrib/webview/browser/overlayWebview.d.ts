import { Dimension } from "../../../../base/browser/dom.js";
import { IMouseWheelEvent } from "../../../../base/browser/mouseEvent.js";
import { CodeWindow } from "../../../../base/browser/window.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { ExtensionIdentifier } from "../../../../platform/extensions/common/extensions.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import {
	IOverlayWebview,
	IWebviewService,
	WebviewContentOptions,
	WebviewExtensionDescription,
	WebviewInitInfo,
	WebviewMessageReceivedEvent,
	WebviewOptions,
} from "./webview.js";

/**
 * Webview that is absolutely positioned over another element and that can creates and destroys an underlying webview as needed.
 */
export declare class OverlayWebview
	extends Disposable
	implements IOverlayWebview
{
	private readonly _layoutService;
	private readonly _webviewService;
	private readonly _baseContextKeyService;
	private _isFirstLoad;
	private readonly _firstLoadPendingMessages;
	private readonly _webview;
	private readonly _webviewEvents;
	private _html;
	private _title;
	private _initialScrollProgress;
	private _state;
	private _extension;
	private _contentOptions;
	private _options;
	private _owner;
	private _windowId;
	private get window();
	private readonly _scopedContextKeyService;
	private _findWidgetVisible;
	private _findWidgetEnabled;
	private _shouldShowFindWidgetOnRestore;
	readonly providedViewType?: string;
	origin: string;
	private _container;
	constructor(
		initInfo: WebviewInitInfo,
		_layoutService: IWorkbenchLayoutService,
		_webviewService: IWebviewService,
		_baseContextKeyService: IContextKeyService,
	);
	get isFocused(): boolean;
	private _isDisposed;
	private readonly _onDidDispose;
	onDidDispose: import("../../../workbench.web.main.internal.js").Event<void>;
	dispose(): void;
	get container(): HTMLElement;
	claim(
		owner: any,
		targetWindow: CodeWindow,
		scopedContextKeyService: IContextKeyService | undefined,
	): void;
	release(owner: any): void;
	layoutWebviewOverElement(
		element: HTMLElement,
		dimension?: Dimension,
		clippingContainer?: HTMLElement,
	): void;
	private doLayoutWebviewOverElement;
	private _show;
	setHtml(html: string): void;
	setTitle(title: string): void;
	get initialScrollProgress(): number;
	set initialScrollProgress(value: number);
	get state(): string | undefined;
	set state(value: string | undefined);
	get extension(): WebviewExtensionDescription | undefined;
	set extension(value: WebviewExtensionDescription | undefined);
	get options(): WebviewOptions;
	set options(value: WebviewOptions);
	get contentOptions(): WebviewContentOptions;
	set contentOptions(value: WebviewContentOptions);
	set localResourcesRoot(resources: URI[]);
	private readonly _onDidFocus;
	readonly onDidFocus: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidBlur;
	readonly onDidBlur: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidClickLink;
	readonly onDidClickLink: import("../../../workbench.web.main.internal.js").Event<string>;
	private readonly _onDidReload;
	readonly onDidReload: import("../../../workbench.web.main.internal.js").Event<void>;
	private readonly _onDidScroll;
	readonly onDidScroll: import("../../../workbench.web.main.internal.js").Event<{
		readonly scrollYPercentage: number;
	}>;
	private readonly _onDidUpdateState;
	readonly onDidUpdateState: import("../../../workbench.web.main.internal.js").Event<
		string | undefined
	>;
	private readonly _onMessage;
	readonly onMessage: import("../../../workbench.web.main.internal.js").Event<WebviewMessageReceivedEvent>;
	private readonly _onMissingCsp;
	readonly onMissingCsp: import("../../../workbench.web.main.internal.js").Event<ExtensionIdentifier>;
	private readonly _onDidWheel;
	readonly onDidWheel: import("../../../workbench.web.main.internal.js").Event<IMouseWheelEvent>;
	private readonly _onFatalError;
	onFatalError: import("../../../workbench.web.main.internal.js").Event<{
		readonly message: string;
	}>;
	postMessage(
		message: any,
		transfer?: readonly ArrayBuffer[],
	): Promise<boolean>;
	focus(): void;
	reload(): void;
	selectAll(): void;
	copy(): void;
	paste(): void;
	cut(): void;
	undo(): void;
	redo(): void;
	showFind(animated?: boolean): void;
	hideFind(animated?: boolean): void;
	runFindAction(previous: boolean): void;
	private _withWebview;
	windowDidDragStart(): void;
	windowDidDragEnd(): void;
	setContextKeyService(contextKeyService: IContextKeyService): void;
}
