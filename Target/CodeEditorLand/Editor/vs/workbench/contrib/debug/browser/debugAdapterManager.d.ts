import { Event } from "../../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../../base/common/lifecycle.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ITextModel } from "../../../../editor/common/model.js";
import { IMenuService } from "../../../../platform/actions/common/actions.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IWorkspaceFolder } from "../../../../platform/workspace/common/workspace.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { ILifecycleService } from "../../../services/lifecycle/common/lifecycle.js";
import { ITaskService } from "../../tasks/common/taskService.js";
import {
	IAdapterDescriptor,
	IAdapterManager,
	IConfig,
	IDebugAdapter,
	IDebugAdapterDescriptorFactory,
	IDebugAdapterFactory,
	IDebugSession,
} from "../common/debug.js";
import { Debugger } from "../common/debugger.js";

export interface IAdapterManagerDelegate {
	onDidNewSession: Event<IDebugSession>;
}
export declare class AdapterManager
	extends Disposable
	implements IAdapterManager
{
	private readonly editorService;
	private readonly configurationService;
	private readonly quickInputService;
	private readonly instantiationService;
	private readonly commandService;
	private readonly extensionService;
	private readonly contextKeyService;
	private readonly languageService;
	private readonly dialogService;
	private readonly lifecycleService;
	private readonly tasksService;
	private readonly menuService;
	private debuggers;
	private adapterDescriptorFactories;
	private debugAdapterFactories;
	private debuggersAvailable;
	private debugExtensionsAvailable;
	private readonly _onDidRegisterDebugger;
	private readonly _onDidDebuggersExtPointRead;
	private breakpointContributions;
	private debuggerWhenKeys;
	private taskLabels;
	/** Extensions that were already active before any debugger activation events */
	private earlyActivatedExtensions;
	private usedDebugTypes;
	constructor(
		delegate: IAdapterManagerDelegate,
		editorService: IEditorService,
		configurationService: IConfigurationService,
		quickInputService: IQuickInputService,
		instantiationService: IInstantiationService,
		commandService: ICommandService,
		extensionService: IExtensionService,
		contextKeyService: IContextKeyService,
		languageService: ILanguageService,
		dialogService: IDialogService,
		lifecycleService: ILifecycleService,
		tasksService: ITaskService,
		menuService: IMenuService,
	);
	private registerListeners;
	private updateTaskLabels;
	private updateDebugAdapterSchema;
	registerDebugAdapterFactory(
		debugTypes: string[],
		debugAdapterLauncher: IDebugAdapterFactory,
	): IDisposable;
	hasEnabledDebuggers(): boolean;
	createDebugAdapter(session: IDebugSession): IDebugAdapter | undefined;
	substituteVariables(
		debugType: string,
		folder: IWorkspaceFolder | undefined,
		config: IConfig,
	): Promise<IConfig>;
	runInTerminal(
		debugType: string,
		args: DebugProtocol.RunInTerminalRequestArguments,
		sessionId: string,
	): Promise<number | undefined>;
	registerDebugAdapterDescriptorFactory(
		debugAdapterProvider: IDebugAdapterDescriptorFactory,
	): IDisposable;
	unregisterDebugAdapterDescriptorFactory(
		debugAdapterProvider: IDebugAdapterDescriptorFactory,
	): void;
	getDebugAdapterDescriptor(
		session: IDebugSession,
	): Promise<IAdapterDescriptor | undefined>;
	getDebuggerLabel(type: string): string | undefined;
	get onDidRegisterDebugger(): Event<void>;
	get onDidDebuggersExtPointRead(): Event<void>;
	canSetBreakpointsIn(model: ITextModel): boolean;
	getDebugger(type: string): Debugger | undefined;
	getEnabledDebugger(type: string): Debugger | undefined;
	someDebuggerInterestedInLanguage(languageId: string): boolean;
	guessDebugger(
		gettingConfigurations: boolean,
	): Promise<Debugger | undefined>;
	private initExtensionActivationsIfNeeded;
	activateDebuggers(
		activationEvent: string,
		debugType?: string,
	): Promise<void>;
}
