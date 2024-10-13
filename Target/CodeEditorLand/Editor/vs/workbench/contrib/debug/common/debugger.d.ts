import {
	IJSONSchema,
	IJSONSchemaMap,
	IJSONSchemaSnippet,
} from "../../../../base/common/jsonSchema.js";
import { ITextResourcePropertiesService } from "../../../../editor/common/services/textResourceConfiguration.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	ContextKeyExpression,
	IContextKeyService,
} from "../../../../platform/contextkey/common/contextkey.js";
import { IExtensionDescription } from "../../../../platform/extensions/common/extensions.js";
import { ITelemetryEndpoint } from "../../../../platform/telemetry/common/telemetry.js";
import { IWorkspaceFolder } from "../../../../platform/workspace/common/workspace.js";
import { IConfigurationResolverService } from "../../../services/configurationResolver/common/configurationResolver.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import {
	IAdapterManager,
	IConfig,
	IDebugAdapter,
	IDebugger,
	IDebuggerContribution,
	IDebuggerMetadata,
	IDebugService,
	IDebugSession,
} from "./debug.js";

export declare class Debugger implements IDebugger, IDebuggerMetadata {
	private adapterManager;
	private readonly configurationService;
	private readonly resourcePropertiesService;
	private readonly configurationResolverService;
	private readonly environmentService;
	private readonly debugService;
	private readonly contextKeyService;
	private debuggerContribution;
	private mergedExtensionDescriptions;
	private mainExtensionDescription;
	private debuggerWhen;
	private debuggerHiddenWhen;
	constructor(
		adapterManager: IAdapterManager,
		dbgContribution: IDebuggerContribution,
		extensionDescription: IExtensionDescription,
		configurationService: IConfigurationService,
		resourcePropertiesService: ITextResourcePropertiesService,
		configurationResolverService: IConfigurationResolverService,
		environmentService: IWorkbenchEnvironmentService,
		debugService: IDebugService,
		contextKeyService: IContextKeyService,
	);
	merge(
		otherDebuggerContribution: IDebuggerContribution,
		extensionDescription: IExtensionDescription,
	): void;
	startDebugging(
		configuration: IConfig,
		parentSessionId: string,
	): Promise<boolean>;
	createDebugAdapter(session: IDebugSession): Promise<IDebugAdapter>;
	substituteVariables(
		folder: IWorkspaceFolder | undefined,
		config: IConfig,
	): Promise<IConfig>;
	runInTerminal(
		args: DebugProtocol.RunInTerminalRequestArguments,
		sessionId: string,
	): Promise<number | undefined>;
	get label(): string;
	get type(): string;
	get variables():
		| {
				[key: string]: string;
		  }
		| undefined;
	get configurationSnippets(): IJSONSchemaSnippet[] | undefined;
	get languages(): string[] | undefined;
	get when(): ContextKeyExpression | undefined;
	get hiddenWhen(): ContextKeyExpression | undefined;
	get enabled(): boolean;
	get isHiddenFromDropdown(): boolean;
	get strings(): any;
	interestedInLanguage(languageId: string): boolean;
	hasInitialConfiguration(): boolean;
	hasDynamicConfigurationProviders(): boolean;
	hasConfigurationProvider(): boolean;
	getInitialConfigurationContent(initialConfigs?: IConfig[]): Promise<string>;
	getMainExtensionDescriptor(): IExtensionDescription;
	getCustomTelemetryEndpoint(): ITelemetryEndpoint | undefined;
	getSchemaAttributes(definitions: IJSONSchemaMap): IJSONSchema[] | null;
}
