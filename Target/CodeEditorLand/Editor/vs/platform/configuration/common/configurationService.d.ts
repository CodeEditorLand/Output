import { Event } from "../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import { URI } from "../../../base/common/uri.js";
import { IFileService } from "../../files/common/files.js";
import { ILogService } from "../../log/common/log.js";
import { IPolicyService } from "../../policy/common/policy.js";
import {
	ConfigurationTarget,
	IConfigurationChangeEvent,
	IConfigurationData,
	IConfigurationOverrides,
	IConfigurationService,
	IConfigurationUpdateOptions,
	IConfigurationUpdateOverrides,
	IConfigurationValue,
} from "./configuration.js";

export declare class ConfigurationService
	extends Disposable
	implements IConfigurationService, IDisposable
{
	private readonly settingsResource;
	private readonly logService;
	readonly _serviceBrand: undefined;
	private configuration;
	private readonly defaultConfiguration;
	private readonly policyConfiguration;
	private readonly userConfiguration;
	private readonly reloadConfigurationScheduler;
	private readonly _onDidChangeConfiguration;
	readonly onDidChangeConfiguration: Event<IConfigurationChangeEvent>;
	private readonly configurationEditing;
	constructor(
		settingsResource: URI,
		fileService: IFileService,
		policyService: IPolicyService,
		logService: ILogService,
	);
	initialize(): Promise<void>;
	getConfigurationData(): IConfigurationData;
	getValue<T>(): T;
	getValue<T>(section: string): T;
	getValue<T>(overrides: IConfigurationOverrides): T;
	getValue<T>(section: string, overrides: IConfigurationOverrides): T;
	updateValue(key: string, value: any): Promise<void>;
	updateValue(
		key: string,
		value: any,
		overrides: IConfigurationOverrides | IConfigurationUpdateOverrides,
	): Promise<void>;
	updateValue(
		key: string,
		value: any,
		target: ConfigurationTarget,
	): Promise<void>;
	updateValue(
		key: string,
		value: any,
		overrides: IConfigurationOverrides | IConfigurationUpdateOverrides,
		target: ConfigurationTarget,
		options?: IConfigurationUpdateOptions,
	): Promise<void>;
	inspect<T>(
		key: string,
		overrides?: IConfigurationOverrides,
	): IConfigurationValue<T>;
	keys(): {
		default: string[];
		user: string[];
		workspace: string[];
		workspaceFolder: string[];
	};
	reloadConfiguration(): Promise<void>;
	private onDidChangeUserConfiguration;
	private onDidDefaultConfigurationChange;
	private onDidPolicyConfigurationChange;
	private trigger;
}
