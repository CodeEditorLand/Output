import { Orientation } from "../../../../base/browser/ui/splitview/splitview.js";
import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import {
	IShellLaunchConfig,
	ITerminalTabLayoutInfoById,
} from "../../../../platform/terminal/common/terminal.js";
import { IViewDescriptorService } from "../../../common/views.js";
import { IWorkbenchLayoutService } from "../../../services/layout/browser/layoutService.js";
import {
	Direction,
	ITerminalConfigurationService,
	ITerminalGroup,
	ITerminalInstance,
	ITerminalInstanceService,
} from "./terminal.js";

export declare class TerminalGroup
	extends Disposable
	implements ITerminalGroup
{
	private _container;
	private readonly _terminalConfigurationService;
	private readonly _terminalInstanceService;
	private readonly _layoutService;
	private readonly _viewDescriptorService;
	private readonly _instantiationService;
	private _terminalInstances;
	private _splitPaneContainer;
	private _groupElement;
	private _panelPosition;
	private _terminalLocation;
	private _instanceDisposables;
	private _activeInstanceIndex;
	get terminalInstances(): ITerminalInstance[];
	private _initialRelativeSizes;
	private _visible;
	private readonly _onDidDisposeInstance;
	readonly onDidDisposeInstance: Event<ITerminalInstance>;
	private readonly _onDidFocusInstance;
	readonly onDidFocusInstance: Event<ITerminalInstance>;
	private readonly _onDidChangeInstanceCapability;
	readonly onDidChangeInstanceCapability: Event<ITerminalInstance>;
	private readonly _onDisposed;
	readonly onDisposed: Event<ITerminalGroup>;
	private readonly _onInstancesChanged;
	readonly onInstancesChanged: Event<void>;
	private readonly _onDidChangeActiveInstance;
	readonly onDidChangeActiveInstance: Event<ITerminalInstance | undefined>;
	private readonly _onPanelOrientationChanged;
	readonly onPanelOrientationChanged: Event<Orientation>;
	constructor(
		_container: HTMLElement | undefined,
		shellLaunchConfigOrInstance:
			| IShellLaunchConfig
			| ITerminalInstance
			| undefined,
		_terminalConfigurationService: ITerminalConfigurationService,
		_terminalInstanceService: ITerminalInstanceService,
		_layoutService: IWorkbenchLayoutService,
		_viewDescriptorService: IViewDescriptorService,
		_instantiationService: IInstantiationService,
	);
	addInstance(
		shellLaunchConfigOrInstance: IShellLaunchConfig | ITerminalInstance,
		parentTerminalId?: number,
	): void;
	dispose(): void;
	get activeInstance(): ITerminalInstance | undefined;
	getLayoutInfo(isActive: boolean): ITerminalTabLayoutInfoById;
	private _initInstanceListeners;
	private _handleOnDidDisposeInstance;
	removeInstance(instance: ITerminalInstance): void;
	private _removeInstance;
	moveInstance(
		instances: ITerminalInstance | ITerminalInstance[],
		index: number,
		position: "before" | "after",
	): void;
	private _setActiveInstance;
	private _getIndexFromId;
	setActiveInstanceByIndex(index: number, force?: boolean): void;
	attachToElement(element: HTMLElement): void;
	get title(): string;
	private _getBellTitle;
	setVisible(visible: boolean): void;
	split(shellLaunchConfig: IShellLaunchConfig): ITerminalInstance;
	addDisposable(disposable: IDisposable): void;
	layout(width: number, height: number): void;
	focusPreviousPane(): void;
	focusNextPane(): void;
	private _getPosition;
	private _getOrientation;
	resizePane(direction: Direction): void;
	resizePanes(relativeSizes: number[]): void;
}
