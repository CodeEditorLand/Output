import { Disposable } from "../../../../base/common/lifecycle.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ILanguageFeaturesService } from "../../../../editor/common/services/languageFeatures.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IDialogService } from "../../../../platform/dialogs/common/dialogs.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IQuickInputService } from "../../../../platform/quickinput/common/quickInput.js";
import { IWorkbenchContribution } from "../../../common/contributions.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IWorkbenchExtensionEnablementService } from "../../../services/extensionManagement/common/extensionManagement.js";
import { IExtensionService } from "../../../services/extensions/common/extensions.js";
import { ILanguageStatusService } from "../../../services/languageStatus/common/languageStatusService.js";

export declare class DefaultFormatter
	extends Disposable
	implements IWorkbenchContribution
{
	private readonly _extensionService;
	private readonly _extensionEnablementService;
	private readonly _configService;
	private readonly _notificationService;
	private readonly _dialogService;
	private readonly _quickInputService;
	private readonly _languageService;
	private readonly _languageFeaturesService;
	private readonly _languageStatusService;
	private readonly _editorService;
	static readonly configName = "editor.defaultFormatter";
	static extensionIds: (string | null)[];
	static extensionItemLabels: string[];
	static extensionDescriptions: string[];
	private readonly _languageStatusStore;
	constructor(
		_extensionService: IExtensionService,
		_extensionEnablementService: IWorkbenchExtensionEnablementService,
		_configService: IConfigurationService,
		_notificationService: INotificationService,
		_dialogService: IDialogService,
		_quickInputService: IQuickInputService,
		_languageService: ILanguageService,
		_languageFeaturesService: ILanguageFeaturesService,
		_languageStatusService: ILanguageStatusService,
		_editorService: IEditorService,
	);
	private _updateConfigValues;
	static _maybeQuotes(s: string): string;
	private _analyzeFormatter;
	private _selectFormatter;
	private _pickAndPersistDefaultFormatter;
	private _updateStatus;
}
