import { URI } from "../../../../base/common/uri.js";
import { ICodeEditorService } from "../../../../editor/browser/services/codeEditorService.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { ICommandService } from "../../../../platform/commands/common/commands.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import {
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
import { INativeHostService } from "../../../../platform/native/common/native.js";
import { IOpenerService } from "../../../../platform/opener/common/opener.js";
import { IWorkspaceContextService } from "../../../../platform/workspace/common/workspace.js";
import { IWorkspacesService } from "../../../../platform/workspaces/common/workspaces.js";
import { IEditorService } from "../../editor/common/editorService.js";
import { IWorkbenchEnvironmentService } from "../../environment/common/environmentService.js";
import { IHistoryService } from "../../history/common/history.js";
import { IHostService } from "../../host/browser/host.js";
import { IPathService } from "../../path/common/pathService.js";
import { AbstractFileDialogService } from "../browser/abstractFileDialogService.js";

export declare class FileDialogService
	extends AbstractFileDialogService
	implements IFileDialogService
{
	private readonly nativeHostService;
	constructor(
		hostService: IHostService,
		contextService: IWorkspaceContextService,
		historyService: IHistoryService,
		environmentService: IWorkbenchEnvironmentService,
		instantiationService: IInstantiationService,
		configurationService: IConfigurationService,
		fileService: IFileService,
		openerService: IOpenerService,
		nativeHostService: INativeHostService,
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
	private toNativeOpenDialogOptions;
	private shouldUseSimplified;
	pickFileFolderAndOpen(options: IPickAndOpenOptions): Promise<void>;
	pickFileAndOpen(options: IPickAndOpenOptions): Promise<void>;
	pickFolderAndOpen(options: IPickAndOpenOptions): Promise<void>;
	pickWorkspaceAndOpen(options: IPickAndOpenOptions): Promise<void>;
	pickFileToSave(
		defaultUri: URI,
		availableFileSystems?: string[],
	): Promise<URI | undefined>;
	private toNativeSaveDialogOptions;
	showSaveDialog(options: ISaveDialogOptions): Promise<URI | undefined>;
	showOpenDialog(options: IOpenDialogOptions): Promise<URI[] | undefined>;
}
