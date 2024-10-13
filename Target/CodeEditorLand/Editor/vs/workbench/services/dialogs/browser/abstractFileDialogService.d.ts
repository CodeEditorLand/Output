import { URI } from "../../../../base/common/uri.js";
import { ICodeEditorService } from "../../../../editor/browser/services/codeEditorService.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
	ConfirmResult,
	IDialogService,
	IFileDialogService,
	IOpenDialogOptions,
	IPickAndOpenOptions,
	ISaveDialogOptions,
} from "../../../../platform/dialogs/common/dialogs.js";
import { IFileService } from "../../../../platform/files/common/files.js";
import { IInstantiationService } from "../../../../platform/instantiation/common/instantiation.js";
import { ILabelService } from "../../../../platform/label/common/label.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspacesService } from "../../../../platform/workspaces/common/workspaces.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";
import { IHistoryService } from "../../history/common/history.js";
import { IHostService } from "../../host/browser/host.js";
import { IPathService } from "../../path/common/pathService.js";
import { ISimpleFileDialog } from "./simpleFileDialog.js";

export declare abstract class AbstractFileDialogService
	implements IFileDialogService
{
	protected readonly hostService: IHostService;
	protected readonly contextService: IWorkspaceContextService;
	protected readonly historyService: IHistoryService;
	protected readonly environmentService: IWorkbenchEnvironmentService;
	protected readonly instantiationService: IInstantiationService;
	protected readonly configurationService: IConfigurationService;
	protected readonly fileService: IFileService;
	protected readonly openerService: IOpenerService;
	protected readonly dialogService: IDialogService;
	private readonly languageService;
	private readonly workspacesService;
	private readonly labelService;
	private readonly pathService;
	protected readonly commandService: ICommandService;
	protected readonly editorService: IEditorService;
	protected readonly codeEditorService: ICodeEditorService;
	private readonly logService;
	readonly _serviceBrand: undefined;
	constructor(
		hostService: IHostService,
		contextService: IWorkspaceContextService,
		historyService: IHistoryService,
		environmentService: IWorkbenchEnvironmentService,
		instantiationService: IInstantiationService,
		configurationService: IConfigurationService,
		fileService: IFileService,
		openerService: IOpenerService,
		dialogService: IDialogService,
		languageService: ILanguageService,
		workspacesService: IWorkspacesService,
		labelService: ILabelService,
		pathService: IPathService,
		commandService: ICommandService,
		editorService: IEditorService,
		codeEditorService: ICodeEditorService,
		logService: ILogService,
	);
	defaultFilePath(
		schemeFilter?: string,
		authorityFilter?: string | undefined,
	): Promise<URI>;
	defaultFolderPath(
		schemeFilter?: string,
		authorityFilter?: string | undefined,
	): Promise<URI>;
	preferredHome(schemeFilter?: string): Promise<URI>;
	defaultWorkspacePath(schemeFilter?: string): Promise<URI>;
	showSaveConfirm(
		fileNamesOrResources: (string | URI)[],
	): Promise<ConfirmResult>;
	private skipDialogs;
	private doShowSaveConfirm;
	protected addFileSchemaIfNeeded(
		schema: string,
		_isFolder?: boolean,
	): string[];
	protected pickFileFolderAndOpenSimplified(
		schema: string,
		options: IPickAndOpenOptions,
		preferNewWindow: boolean,
	): Promise<void>;
	protected pickFileAndOpenSimplified(
		schema: string,
		options: IPickAndOpenOptions,
		preferNewWindow: boolean,
	): Promise<void>;
	protected addFileToRecentlyOpened(uri: URI): void;
	protected pickFolderAndOpenSimplified(
		schema: string,
		options: IPickAndOpenOptions,
	): Promise<void>;
	protected pickWorkspaceAndOpenSimplified(
		schema: string,
		options: IPickAndOpenOptions,
	): Promise<void>;
	protected pickFileToSaveSimplified(
		schema: string,
		options: ISaveDialogOptions,
	): Promise<URI | undefined>;
	protected showSaveDialogSimplified(
		schema: string,
		options: ISaveDialogOptions,
	): Promise<URI | undefined>;
	protected showOpenDialogSimplified(
		schema: string,
		options: IOpenDialogOptions,
	): Promise<URI[] | undefined>;
	protected getSimpleFileDialog(): ISimpleFileDialog;
	private pickResource;
	private saveRemoteResource;
	private getSchemeFilterForWindow;
	private getAuthorityFilterForWindow;
	protected getFileSystemSchema(options: {
		availableFileSystems?: readonly string[];
		defaultUri?: URI;
	}): string;
	abstract pickFileFolderAndOpen(options: IPickAndOpenOptions): Promise<void>;
	abstract pickFileAndOpen(options: IPickAndOpenOptions): Promise<void>;
	abstract pickFolderAndOpen(options: IPickAndOpenOptions): Promise<void>;
	abstract pickWorkspaceAndOpen(options: IPickAndOpenOptions): Promise<void>;
	protected getWorkspaceAvailableFileSystems(
		options: IPickAndOpenOptions,
	): string[];
	abstract showSaveDialog(
		options: ISaveDialogOptions,
	): Promise<URI | undefined>;
	abstract showOpenDialog(
		options: IOpenDialogOptions,
	): Promise<URI[] | undefined>;
	abstract pickFileToSave(
		defaultUri: URI,
		availableFileSystems?: string[],
	): Promise<URI | undefined>;
	protected getPickFileToSaveDialogOptions(
		defaultUri: URI,
		availableFileSystems?: string[],
	): ISaveDialogOptions;
}
