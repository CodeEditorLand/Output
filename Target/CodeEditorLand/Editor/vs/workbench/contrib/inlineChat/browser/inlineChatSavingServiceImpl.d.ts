import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { ILogService } from "../../../../platform/log/common/log.js";
import { IEditorGroupsService } from "../../../services/editor/common/editorGroupsService.js";
import { IEditorService } from "../../../services/editor/common/editorService.js";
import { IFilesConfigurationService } from "../../../services/filesConfiguration/common/filesConfigurationService.js";
import { ITextFileService } from "../../../services/textfile/common/textfiles.js";
import { IWorkingCopyFileService } from "../../../services/workingCopy/common/workingCopyFileService.js";
import { IInlineChatSavingService } from "./inlineChatSavingService.js";
import { Session } from "./inlineChatSession.js";
import { IInlineChatSessionService } from "./inlineChatSessionService.js";

export declare class InlineChatSavingServiceImpl
	implements IInlineChatSavingService
{
	private readonly _fileConfigService;
	private readonly _editorGroupService;
	private readonly _textFileService;
	private readonly _editorService;
	private readonly _inlineChatSessionService;
	private readonly _configService;
	private readonly _workingCopyFileService;
	private readonly _logService;
	readonly _serviceBrand: undefined;
	private readonly _store;
	private readonly _saveParticipant;
	private readonly _sessionData;
	constructor(
		_fileConfigService: IFilesConfigurationService,
		_editorGroupService: IEditorGroupsService,
		_textFileService: ITextFileService,
		_editorService: IEditorService,
		_inlineChatSessionService: IInlineChatSessionService,
		_configService: IConfigurationService,
		_workingCopyFileService: IWorkingCopyFileService,
		_logService: ILogService,
	);
	dispose(): void;
	markChanged(session: Session): void;
	private _installSaveParticpant;
	private _participate;
	private _getGroupsAndOrphans;
	private _openAndWait;
	private _whenSessionsEnded;
}
