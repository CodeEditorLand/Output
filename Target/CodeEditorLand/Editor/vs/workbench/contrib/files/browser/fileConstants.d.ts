import * as nls from "../../../../nls.js";
import { RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";

export declare const REVEAL_IN_EXPLORER_COMMAND_ID = "revealInExplorer";
export declare const REVERT_FILE_COMMAND_ID = "workbench.action.files.revert";
export declare const OPEN_TO_SIDE_COMMAND_ID = "explorer.openToSide";
export declare const OPEN_WITH_EXPLORER_COMMAND_ID = "explorer.openWith";
export declare const SELECT_FOR_COMPARE_COMMAND_ID = "selectForCompare";
export declare const COMPARE_SELECTED_COMMAND_ID = "compareSelected";
export declare const COMPARE_RESOURCE_COMMAND_ID = "compareFiles";
export declare const COMPARE_WITH_SAVED_COMMAND_ID =
	"workbench.files.action.compareWithSaved";
export declare const COPY_PATH_COMMAND_ID = "copyFilePath";
export declare const COPY_RELATIVE_PATH_COMMAND_ID = "copyRelativeFilePath";
export declare const SAVE_FILE_AS_COMMAND_ID = "workbench.action.files.saveAs";
export declare const SAVE_FILE_AS_LABEL: nls.ILocalizedString;
export declare const SAVE_FILE_COMMAND_ID = "workbench.action.files.save";
export declare const SAVE_FILE_LABEL: nls.ILocalizedString;
export declare const SAVE_FILE_WITHOUT_FORMATTING_COMMAND_ID =
	"workbench.action.files.saveWithoutFormatting";
export declare const SAVE_FILE_WITHOUT_FORMATTING_LABEL: nls.ILocalizedString;
export declare const SAVE_ALL_COMMAND_ID = "saveAll";
export declare const SAVE_ALL_LABEL: nls.ILocalizedString;
export declare const SAVE_ALL_IN_GROUP_COMMAND_ID =
	"workbench.files.action.saveAllInGroup";
export declare const SAVE_FILES_COMMAND_ID = "workbench.action.files.saveFiles";
export declare const OpenEditorsGroupContext: RawContextKey<boolean>;
export declare const OpenEditorsDirtyEditorContext: RawContextKey<boolean>;
export declare const OpenEditorsReadonlyEditorContext: RawContextKey<boolean>;
export declare const OpenEditorsSelectedFileOrUntitledContext: RawContextKey<boolean>;
export declare const ResourceSelectedForCompareContext: RawContextKey<boolean>;
export declare const REMOVE_ROOT_FOLDER_COMMAND_ID = "removeRootFolder";
export declare const REMOVE_ROOT_FOLDER_LABEL: string;
export declare const PREVIOUS_COMPRESSED_FOLDER = "previousCompressedFolder";
export declare const NEXT_COMPRESSED_FOLDER = "nextCompressedFolder";
export declare const FIRST_COMPRESSED_FOLDER = "firstCompressedFolder";
export declare const LAST_COMPRESSED_FOLDER = "lastCompressedFolder";
export declare const NEW_UNTITLED_FILE_COMMAND_ID =
	"workbench.action.files.newUntitledFile";
export declare const NEW_UNTITLED_FILE_LABEL: nls.ILocalizedString;
export declare const NEW_FILE_COMMAND_ID = "workbench.action.files.newFile";
