import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IExtensionResourceLoaderService } from "../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IStorageService } from "../../../../platform/storage/common/storage.js";
import { ITelemetryService } from "../../../../platform/telemetry/common/telemetry.js";
import { ColorScheme } from "../../../../platform/theme/common/theme.js";
import { IBrowserWorkbenchEnvironmentService } from "../../environment/browser/environmentService.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { IWorkbenchLayoutService } from "../../layout/browser/layoutService.js";
import { IUserDataInitializationService } from "../../userData/browser/userDataInit.js";
import { IHostColorSchemeService } from "../common/hostColorSchemeService.js";
import {
	IWorkbenchColorTheme,
	IWorkbenchFileIconTheme,
	IWorkbenchProductIconTheme,
	IWorkbenchThemeService,
	ThemeSettingTarget,
} from "../common/workbenchThemeService.js";
import { FileIconThemeData } from "./fileIconThemeData.js";
import { ProductIconThemeData } from "./productIconThemeData.js";

export declare class WorkbenchThemeService
	extends Disposable
	implements IWorkbenchThemeService
{
	private readonly storageService;
	private readonly configurationService;
	private readonly telemetryService;
	private readonly environmentService;
	private readonly extensionResourceLoaderService;
	private readonly logService;
	private readonly hostColorService;
	private readonly userDataInitializationService;
	private readonly languageService;
	readonly _serviceBrand: undefined;
	private readonly container;
	private settings;
	private readonly colorThemeRegistry;
	private currentColorTheme;
	private readonly onColorThemeChange;
	private readonly colorThemeWatcher;
	private colorThemingParticipantChangeListener;
	private readonly colorThemeSequencer;
	private readonly fileIconThemeRegistry;
	private currentFileIconTheme;
	private readonly onFileIconThemeChange;
	private readonly fileIconThemeLoader;
	private readonly fileIconThemeWatcher;
	private readonly fileIconThemeSequencer;
	private readonly productIconThemeRegistry;
	private currentProductIconTheme;
	private readonly onProductIconThemeChange;
	private readonly productIconThemeWatcher;
	private readonly productIconThemeSequencer;
	private hasDefaultUpdated;
	constructor(
		extensionService: IExtensionService,
		storageService: IStorageService,
		configurationService: IConfigurationService,
		telemetryService: ITelemetryService,
		environmentService: IBrowserWorkbenchEnvironmentService,
		fileService: IFileService,
		extensionResourceLoaderService: IExtensionResourceLoaderService,
		layoutService: IWorkbenchLayoutService,
		logService: ILogService,
		hostColorService: IHostColorSchemeService,
		userDataInitializationService: IUserDataInitializationService,
		languageService: ILanguageService,
	);
	private initialize;
	private installConfigurationListener;
	private installRegistryListeners;
	private installPreferredSchemeListener;
	hasUpdatedDefaultThemes(): boolean;
	getColorTheme(): IWorkbenchColorTheme;
	getColorThemes(): Promise<IWorkbenchColorTheme[]>;
	getPreferredColorScheme(): ColorScheme | undefined;
	getMarketplaceColorThemes(
		publisher: string,
		name: string,
		version: string,
	): Promise<IWorkbenchColorTheme[]>;
	get onDidColorThemeChange(): Event<IWorkbenchColorTheme>;
	setColorTheme(
		themeIdOrTheme: string | undefined | IWorkbenchColorTheme,
		settingsTarget: ThemeSettingTarget,
	): Promise<IWorkbenchColorTheme | null>;
	private internalSetColorTheme;
	private reloadCurrentColorTheme;
	restoreColorTheme(): Promise<boolean>;
	private updateDynamicCSSRules;
	private applyTheme;
	private themeExtensionsActivated;
	private sendTelemetry;
	getFileIconThemes(): Promise<IWorkbenchFileIconTheme[]>;
	getFileIconTheme(): FileIconThemeData;
	get onDidFileIconThemeChange(): Event<IWorkbenchFileIconTheme>;
	setFileIconTheme(
		iconThemeOrId: string | undefined | IWorkbenchFileIconTheme,
		settingsTarget: ThemeSettingTarget,
	): Promise<IWorkbenchFileIconTheme>;
	private internalSetFileIconTheme;
	getMarketplaceFileIconThemes(
		publisher: string,
		name: string,
		version: string,
	): Promise<IWorkbenchFileIconTheme[]>;
	private reloadCurrentFileIconTheme;
	restoreFileIconTheme(): Promise<boolean>;
	private applyAndSetFileIconTheme;
	getProductIconThemes(): Promise<IWorkbenchProductIconTheme[]>;
	getProductIconTheme(): ProductIconThemeData;
	get onDidProductIconThemeChange(): Event<IWorkbenchProductIconTheme>;
	setProductIconTheme(
		iconThemeOrId: string | undefined | IWorkbenchProductIconTheme,
		settingsTarget: ThemeSettingTarget,
	): Promise<IWorkbenchProductIconTheme>;
	private internalSetProductIconTheme;
	getMarketplaceProductIconThemes(
		publisher: string,
		name: string,
		version: string,
	): Promise<IWorkbenchProductIconTheme[]>;
	private reloadCurrentProductIconTheme;
	restoreProductIconTheme(): Promise<boolean>;
	private applyAndSetProductIconTheme;
}
