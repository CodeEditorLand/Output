import { Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { URI } from "../../../../base/common/uri.js";
import { IModelService } from "../../../../editor/common/services/model.js";
import { ITextModelService } from "../../../../editor/common/services/resolverService.js";
import {
	ConfigurationTarget,
	IConfigurationService,
} from "../../../../platform/configuration/common/configuration.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { IKeybindingService } from "../../../../platform/keybinding/common/keybinding.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { INotificationService } from "../../../../platform/notification/common/notification.js";
import { IProgressService } from "../../../../platform/progress/common/progress.js";
import { IURLService } from "../../../../platform/url/common/url.js";
import { IUserDataProfilesService } from "../../../../platform/userDataProfile/common/userDataProfile.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IEditorPane } from "../../../common/editor.js";
import { EditorInput } from "../../../common/editor/editorInput.js";
import { IJSONEditingService } from "../../configuration/common/jsonEditing.js";
import { IEditorGroupsService } from "../../editor/common/editorGroupsService.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IExtensionService } from "../../extensions/common/extensions.js";
import { IRemoteAgentService } from "../../remote/common/remoteAgentService.js";
import { ITextEditorService } from "../../textfile/common/textEditorService.js";
import { ITextFileService } from "../../textfile/common/textfiles.js";
import { IUserDataProfileService } from "../../userDataProfile/common/userDataProfile.js";
import {
	IKeybindingsEditorOptions,
	IOpenSettingsOptions,
	IPreferencesEditorModel,
	IPreferencesService,
	ISetting,
} from "../common/preferences.js";
import { SettingsEditor2Input } from "../common/preferencesEditorInput.js";
import { Settings2EditorModel } from "../common/preferencesModels.js";

export declare class PreferencesService
	extends Disposable
	implements IPreferencesService
{
	private readonly editorService;
	private readonly editorGroupService;
	private readonly textFileService;
	private readonly configurationService;
	private readonly notificationService;
	private readonly contextService;
	private readonly instantiationService;
	private readonly userDataProfileService;
	private readonly userDataProfilesService;
	private readonly textModelResolverService;
	private readonly jsonEditingService;
	private readonly labelService;
	private readonly remoteAgentService;
	private readonly textEditorService;
	private readonly extensionService;
	private readonly progressService;
	readonly _serviceBrand: undefined;
	private readonly _onDispose;
	private readonly _onDidDefaultSettingsContentChanged;
	readonly onDidDefaultSettingsContentChanged: Event<URI>;
	private _defaultUserSettingsContentModel;
	private _defaultWorkspaceSettingsContentModel;
	private _defaultFolderSettingsContentModel;
	private _defaultRawSettingsEditorModel;
	private readonly _requestedDefaultSettings;
	private _settingsGroups;
	constructor(
		editorService: IEditorService,
		editorGroupService: IEditorGroupsService,
		textFileService: ITextFileService,
		configurationService: IConfigurationService,
		notificationService: INotificationService,
		contextService: IWorkspaceContextService,
		instantiationService: IInstantiationService,
		userDataProfileService: IUserDataProfileService,
		userDataProfilesService: IUserDataProfilesService,
		textModelResolverService: ITextModelService,
		keybindingService: IKeybindingService,
		modelService: IModelService,
		jsonEditingService: IJSONEditingService,
		labelService: ILabelService,
		remoteAgentService: IRemoteAgentService,
		textEditorService: ITextEditorService,
		urlService: IURLService,
		extensionService: IExtensionService,
		progressService: IProgressService,
	);
	readonly defaultKeybindingsResource: URI;
	private readonly defaultSettingsRawResource;
	get userSettingsResource(): URI;
	get workspaceSettingsResource(): URI | null;
	createSettingsEditor2Input(): SettingsEditor2Input;
	getFolderSettingsResource(resource: URI): URI | null;
	hasDefaultSettingsContent(uri: URI): boolean;
	getDefaultSettingsContent(uri: URI): string | undefined;
	createPreferencesEditorModel(
		uri: URI,
	): Promise<IPreferencesEditorModel<ISetting> | null>;
	openRawDefaultSettings(): Promise<IEditorPane | undefined>;
	openRawUserSettings(): Promise<IEditorPane | undefined>;
	private shouldOpenJsonByDefault;
	openSettings(
		options?: IOpenSettingsOptions,
	): Promise<IEditorPane | undefined>;
	openLanguageSpecificSettings(
		languageId: string,
		options?: IOpenSettingsOptions,
	): Promise<IEditorPane | undefined>;
	private open;
	private openSettings2;
	openApplicationSettings(
		options?: IOpenSettingsOptions,
	): Promise<IEditorPane | undefined>;
	openUserSettings(
		options?: IOpenSettingsOptions,
	): Promise<IEditorPane | undefined>;
	openRemoteSettings(
		options?: IOpenSettingsOptions,
	): Promise<IEditorPane | undefined>;
	openWorkspaceSettings(
		options?: IOpenSettingsOptions,
	): Promise<IEditorPane | undefined>;
	openFolderSettings(
		options?: IOpenSettingsOptions,
	): Promise<IEditorPane | undefined>;
	openGlobalKeybindingSettings(
		textual: boolean,
		options?: IKeybindingsEditorOptions,
	): Promise<void>;
	openDefaultKeybindingsFile(): Promise<IEditorPane | undefined>;
	private openSettingsJson;
	private doOpenSettingsJson;
	private doOpenSplitJSON;
	createSplitJsonEditorInput(
		configurationTarget: ConfigurationTarget,
		resource: URI,
	): EditorInput;
	createSettings2EditorModel(): Settings2EditorModel;
	private getConfigurationTargetFromDefaultSettingsResource;
	private isDefaultSettingsResource;
	private isDefaultUserSettingsResource;
	private isDefaultWorkspaceSettingsResource;
	private isDefaultFolderSettingsResource;
	private getDefaultSettingsResource;
	private getOrCreateEditableSettingsEditorInput;
	private createEditableSettingsEditorModel;
	private createDefaultSettingsEditorModel;
	private getDefaultSettings;
	getEditableSettingsURI(
		configurationTarget: ConfigurationTarget,
		resource?: URI,
	): Promise<URI | null>;
	private createSettingsIfNotExists;
	private createIfNotExists;
	private getMostCommonlyUsedSettings;
	private revealSetting;
	private getPositionToReveal;
	getSetting(settingId: string): ISetting | undefined;
	/**
	 * Should be of the format:
	 * 	code://settings/settingName
	 * Examples:
	 * 	code://settings/files.autoSave
	 *
	 */
	handleURL(uri: URI): Promise<boolean>;
	dispose(): void;
}
