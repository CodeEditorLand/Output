import type * as vscode from "vscode";

import { CancellationToken } from "../../../base/common/cancellation.js";
import { Event } from "../../../base/common/event.js";
import { Disposable as DisposableCls } from "../../../base/common/lifecycle.js";
import { URI, UriComponents } from "../../../base/common/uri.js";
import { IExtensionDescription } from "../../../platform/extensions/common/extensions.js";
import { ISignService } from "../../../platform/sign/common/sign.js";
import { AbstractDebugAdapter } from "../../contrib/debug/common/abstractDebugAdapter.js";
import {
	IAdapterDescriptor,
	IConfig,
	IDebugAdapterExecutable,
	IDebugAdapterImpl,
	IDebugAdapterNamedPipeServer,
	IDebugAdapterServer,
	IDebugVisualization,
	IDebugVisualizationContext,
	IDebugVisualizationTreeItem,
	MainThreadDebugVisualization,
} from "../../contrib/debug/common/debug.js";
import { ExtensionDescriptionRegistry } from "../../services/extensions/common/extensionDescriptionRegistry.js";
import { Dto } from "../../services/extensions/common/proxyIdentifier.js";
import {
	DebugSessionUUID,
	ExtHostDebugServiceShape,
	IBreakpointsDeltaDto,
	IDebugSessionDto,
	IStackFrameFocusDto,
	IThreadFocusDto,
	MainThreadDebugServiceShape,
} from "./extHost.protocol.js";
import { IExtHostCommands } from "./extHostCommands.js";
import { IExtHostConfiguration } from "./extHostConfiguration.js";
import { IExtHostEditorTabs } from "./extHostEditorTabs.js";
import { IExtHostExtensionService } from "./extHostExtensionService.js";
import { IExtHostRpcService } from "./extHostRpcService.js";
import { IExtHostTesting } from "./extHostTesting.js";
import {
	DebugAdapterExecutable,
	DebugAdapterInlineImplementation,
	DebugAdapterNamedPipeServer,
	DebugAdapterServer,
} from "./extHostTypes.js";
import { IExtHostVariableResolverProvider } from "./extHostVariableResolverService.js";
import { IExtHostWorkspace } from "./extHostWorkspace.js";

export declare const IExtHostDebugService: import("../../../platform/instantiation/common/instantiation.js").ServiceIdentifier<IExtHostDebugService>;
export interface IExtHostDebugService extends ExtHostDebugServiceShape {
	readonly _serviceBrand: undefined;
	onDidStartDebugSession: Event<vscode.DebugSession>;
	onDidTerminateDebugSession: Event<vscode.DebugSession>;
	onDidChangeActiveDebugSession: Event<vscode.DebugSession | undefined>;
	activeDebugSession: vscode.DebugSession | undefined;
	activeDebugConsole: vscode.DebugConsole;
	onDidReceiveDebugSessionCustomEvent: Event<vscode.DebugSessionCustomEvent>;
	onDidChangeBreakpoints: Event<vscode.BreakpointsChangeEvent>;
	breakpoints: vscode.Breakpoint[];
	onDidChangeActiveStackItem: Event<
		vscode.DebugThread | vscode.DebugStackFrame | undefined
	>;
	activeStackItem: vscode.DebugThread | vscode.DebugStackFrame | undefined;
	addBreakpoints(breakpoints0: readonly vscode.Breakpoint[]): Promise<void>;
	removeBreakpoints(
		breakpoints0: readonly vscode.Breakpoint[],
	): Promise<void>;
	startDebugging(
		folder: vscode.WorkspaceFolder | undefined,
		nameOrConfig: string | vscode.DebugConfiguration,
		options: vscode.DebugSessionOptions,
	): Promise<boolean>;
	stopDebugging(session?: vscode.DebugSession): Promise<void>;
	registerDebugConfigurationProvider(
		type: string,
		provider: vscode.DebugConfigurationProvider,
		trigger: vscode.DebugConfigurationProviderTriggerKind,
	): vscode.Disposable;
	registerDebugAdapterDescriptorFactory(
		extension: IExtensionDescription,
		type: string,
		factory: vscode.DebugAdapterDescriptorFactory,
	): vscode.Disposable;
	registerDebugAdapterTrackerFactory(
		type: string,
		factory: vscode.DebugAdapterTrackerFactory,
	): vscode.Disposable;
	registerDebugVisualizationProvider<T extends vscode.DebugVisualization>(
		extension: IExtensionDescription,
		id: string,
		provider: vscode.DebugVisualizationProvider<T>,
	): vscode.Disposable;
	registerDebugVisualizationTree<T extends vscode.DebugTreeItem>(
		extension: IExtensionDescription,
		id: string,
		provider: vscode.DebugVisualizationTree<T>,
	): vscode.Disposable;
	asDebugSourceUri(
		source: vscode.DebugProtocolSource,
		session?: vscode.DebugSession,
	): vscode.Uri;
}
export declare abstract class ExtHostDebugServiceBase
	extends DisposableCls
	implements IExtHostDebugService, ExtHostDebugServiceShape
{
	protected _workspaceService: IExtHostWorkspace;
	private _extensionService;
	protected _configurationService: IExtHostConfiguration;
	protected _editorTabs: IExtHostEditorTabs;
	private _variableResolver;
	private _commands;
	private _testing;
	readonly _serviceBrand: undefined;
	private _configProviderHandleCounter;
	private _configProviders;
	private _adapterFactoryHandleCounter;
	private _adapterFactories;
	private _trackerFactoryHandleCounter;
	private _trackerFactories;
	private _debugServiceProxy;
	private _debugSessions;
	private readonly _onDidStartDebugSession;
	get onDidStartDebugSession(): Event<vscode.DebugSession>;
	private readonly _onDidTerminateDebugSession;
	get onDidTerminateDebugSession(): Event<vscode.DebugSession>;
	private readonly _onDidChangeActiveDebugSession;
	get onDidChangeActiveDebugSession(): Event<vscode.DebugSession | undefined>;
	private _activeDebugSession;
	get activeDebugSession(): vscode.DebugSession | undefined;
	private readonly _onDidReceiveDebugSessionCustomEvent;
	get onDidReceiveDebugSessionCustomEvent(): Event<vscode.DebugSessionCustomEvent>;
	private _activeDebugConsole;
	get activeDebugConsole(): vscode.DebugConsole;
	private _breakpoints;
	private readonly _onDidChangeBreakpoints;
	private _activeStackItem;
	private readonly _onDidChangeActiveStackItem;
	private _debugAdapters;
	private _debugAdaptersTrackers;
	private _debugVisualizationTreeItemIdsCounter;
	private readonly _debugVisualizationProviders;
	private readonly _debugVisualizationTrees;
	private readonly _debugVisualizationTreeItemIds;
	private readonly _debugVisualizationElements;
	private _signService;
	private readonly _visualizers;
	private _visualizerIdCounter;
	constructor(
		extHostRpcService: IExtHostRpcService,
		_workspaceService: IExtHostWorkspace,
		_extensionService: IExtHostExtensionService,
		_configurationService: IExtHostConfiguration,
		_editorTabs: IExtHostEditorTabs,
		_variableResolver: IExtHostVariableResolverProvider,
		_commands: IExtHostCommands,
		_testing: IExtHostTesting,
	);
	$getVisualizerTreeItem(
		treeId: string,
		element: IDebugVisualizationContext,
	): Promise<IDebugVisualizationTreeItem | undefined>;
	registerDebugVisualizationTree<T extends vscode.DebugTreeItem>(
		manifest: IExtensionDescription,
		id: string,
		provider: vscode.DebugVisualizationTree<T>,
	): vscode.Disposable;
	$getVisualizerTreeItemChildren(
		treeId: string,
		element: number,
	): Promise<IDebugVisualizationTreeItem[]>;
	$editVisualizerTreeItem(
		element: number,
		value: string,
	): Promise<IDebugVisualizationTreeItem | undefined>;
	$disposeVisualizedTree(element: number): void;
	private convertVisualizerTreeItem;
	asDebugSourceUri(
		src: vscode.DebugProtocolSource,
		session?: vscode.DebugSession,
	): URI;
	private registerAllDebugTypes;
	get activeStackItem():
		| vscode.DebugThread
		| vscode.DebugStackFrame
		| undefined;
	get onDidChangeActiveStackItem(): Event<
		vscode.DebugThread | vscode.DebugStackFrame | undefined
	>;
	get onDidChangeBreakpoints(): Event<vscode.BreakpointsChangeEvent>;
	get breakpoints(): vscode.Breakpoint[];
	$resolveDebugVisualizer(
		id: number,
		token: CancellationToken,
	): Promise<MainThreadDebugVisualization>;
	$executeDebugVisualizerCommand(id: number): Promise<void>;
	private hydrateVisualizationContext;
	$provideDebugVisualizers(
		extensionId: string,
		id: string,
		context: IDebugVisualizationContext,
		token: CancellationToken,
	): Promise<IDebugVisualization.Serialized[]>;
	$disposeDebugVisualizers(ids: number[]): void;
	registerDebugVisualizationProvider<T extends vscode.DebugVisualization>(
		manifest: IExtensionDescription,
		id: string,
		provider: vscode.DebugVisualizationProvider<T>,
	): vscode.Disposable;
	addBreakpoints(breakpoints0: vscode.Breakpoint[]): Promise<void>;
	removeBreakpoints(breakpoints0: vscode.Breakpoint[]): Promise<void>;
	startDebugging(
		folder: vscode.WorkspaceFolder | undefined,
		nameOrConfig: string | vscode.DebugConfiguration,
		options: vscode.DebugSessionOptions,
	): Promise<boolean>;
	stopDebugging(session?: vscode.DebugSession): Promise<void>;
	registerDebugConfigurationProvider(
		type: string,
		provider: vscode.DebugConfigurationProvider,
		trigger: vscode.DebugConfigurationProviderTriggerKind,
	): vscode.Disposable;
	registerDebugAdapterDescriptorFactory(
		extension: IExtensionDescription,
		type: string,
		factory: vscode.DebugAdapterDescriptorFactory,
	): vscode.Disposable;
	registerDebugAdapterTrackerFactory(
		type: string,
		factory: vscode.DebugAdapterTrackerFactory,
	): vscode.Disposable;
	$runInTerminal(
		args: DebugProtocol.RunInTerminalRequestArguments,
		sessionId: string,
	): Promise<number | undefined>;
	$substituteVariables(
		folderUri: UriComponents | undefined,
		config: IConfig,
	): Promise<IConfig>;
	protected createDebugAdapter(
		adapter: vscode.DebugAdapterDescriptor,
		session: ExtHostDebugSession,
	): AbstractDebugAdapter | undefined;
	protected createSignService(): ISignService | undefined;
	$startDASession(
		debugAdapterHandle: number,
		sessionDto: IDebugSessionDto,
	): Promise<void>;
	$sendDAMessage(
		debugAdapterHandle: number,
		message: DebugProtocol.ProtocolMessage,
	): void;
	$stopDASession(debugAdapterHandle: number): Promise<void>;
	$acceptBreakpointsDelta(delta: IBreakpointsDeltaDto): void;
	$acceptStackFrameFocus(
		focusDto: IThreadFocusDto | IStackFrameFocusDto | undefined,
	): Promise<void>;
	$provideDebugConfigurations(
		configProviderHandle: number,
		folderUri: UriComponents | undefined,
		token: CancellationToken,
	): Promise<vscode.DebugConfiguration[]>;
	$resolveDebugConfiguration(
		configProviderHandle: number,
		folderUri: UriComponents | undefined,
		debugConfiguration: vscode.DebugConfiguration,
		token: CancellationToken,
	): Promise<vscode.DebugConfiguration | null | undefined>;
	$resolveDebugConfigurationWithSubstitutedVariables(
		configProviderHandle: number,
		folderUri: UriComponents | undefined,
		debugConfiguration: vscode.DebugConfiguration,
		token: CancellationToken,
	): Promise<vscode.DebugConfiguration | null | undefined>;
	$provideDebugAdapter(
		adapterFactoryHandle: number,
		sessionDto: IDebugSessionDto,
	): Promise<Dto<IAdapterDescriptor>>;
	$acceptDebugSessionStarted(sessionDto: IDebugSessionDto): Promise<void>;
	$acceptDebugSessionTerminated(sessionDto: IDebugSessionDto): Promise<void>;
	$acceptDebugSessionActiveChanged(
		sessionDto: IDebugSessionDto | undefined,
	): Promise<void>;
	$acceptDebugSessionNameChanged(
		sessionDto: IDebugSessionDto,
		name: string,
	): Promise<void>;
	$acceptDebugSessionCustomEvent(
		sessionDto: IDebugSessionDto,
		event: any,
	): Promise<void>;
	private convertToDto;
	protected convertExecutableToDto(
		x: DebugAdapterExecutable,
	): IDebugAdapterExecutable;
	protected convertServerToDto(x: DebugAdapterServer): IDebugAdapterServer;
	protected convertPipeServerToDto(
		x: DebugAdapterNamedPipeServer,
	): IDebugAdapterNamedPipeServer;
	protected convertImplementationToDto(
		x: DebugAdapterInlineImplementation,
	): IDebugAdapterImpl;
	private getAdapterDescriptorFactoryByType;
	private getAdapterDescriptorFactoryByHandle;
	private getConfigProviderByHandle;
	private definesDebugType;
	private getDebugAdapterTrackers;
	private getAdapterDescriptor;
	protected daExecutableFromPackage(
		session: ExtHostDebugSession,
		extensionRegistry: ExtensionDescriptionRegistry,
	): DebugAdapterExecutable | undefined;
	private fireBreakpointChanges;
	private getSession;
	private getFolder;
	private extensionVisKey;
	private serializeVisualization;
	private getIconPathOrClass;
	private getIconUris;
}
export declare class ExtHostDebugSession {
	private _debugServiceProxy;
	private _id;
	private _type;
	private _name;
	private _workspaceFolder;
	private _configuration;
	private _parentSession;
	private apiSession?;
	constructor(
		_debugServiceProxy: MainThreadDebugServiceShape,
		_id: DebugSessionUUID,
		_type: string,
		_name: string,
		_workspaceFolder: vscode.WorkspaceFolder | undefined,
		_configuration: vscode.DebugConfiguration,
		_parentSession: vscode.DebugSession | undefined,
	);
	get api(): vscode.DebugSession;
	get id(): string;
	get type(): string;
	_acceptNameChanged(name: string): void;
	get configuration(): vscode.DebugConfiguration;
}
export declare class ExtHostDebugConsole {
	readonly value: vscode.DebugConsole;
	constructor(proxy: MainThreadDebugServiceShape);
}
export declare class WorkerExtHostDebugService extends ExtHostDebugServiceBase {
	constructor(
		extHostRpcService: IExtHostRpcService,
		workspaceService: IExtHostWorkspace,
		extensionService: IExtHostExtensionService,
		configurationService: IExtHostConfiguration,
		editorTabs: IExtHostEditorTabs,
		variableResolver: IExtHostVariableResolverProvider,
		commands: IExtHostCommands,
		testing: IExtHostTesting,
	);
}
