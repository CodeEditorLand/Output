import * as nls from "../../../../nls.js";
import { RawContextKey } from "../../../../platform/contextkey/common/contextkey.js";
const REVEAL_IN_EXPLORER_COMMAND_ID = "revealInExplorer";
const REVERT_FILE_COMMAND_ID = "workbench.action.files.revert";
const OPEN_TO_SIDE_COMMAND_ID = "explorer.openToSide";
const OPEN_WITH_EXPLORER_COMMAND_ID = "explorer.openWith";
const SELECT_FOR_COMPARE_COMMAND_ID = "selectForCompare";
const COMPARE_SELECTED_COMMAND_ID = "compareSelected";
const COMPARE_RESOURCE_COMMAND_ID = "compareFiles";
const COMPARE_WITH_SAVED_COMMAND_ID = "workbench.files.action.compareWithSaved";
const COPY_PATH_COMMAND_ID = "copyFilePath";
const COPY_RELATIVE_PATH_COMMAND_ID = "copyRelativeFilePath";
const SAVE_FILE_AS_COMMAND_ID = "workbench.action.files.saveAs";
const SAVE_FILE_AS_LABEL = nls.localize2("saveAs", "Save As...");
const SAVE_FILE_COMMAND_ID = "workbench.action.files.save";
const SAVE_FILE_LABEL = nls.localize2("save", "Save");
const SAVE_FILE_WITHOUT_FORMATTING_COMMAND_ID = "workbench.action.files.saveWithoutFormatting";
const SAVE_FILE_WITHOUT_FORMATTING_LABEL = nls.localize2("saveWithoutFormatting", "Save without Formatting");
const SAVE_ALL_COMMAND_ID = "saveAll";
const SAVE_ALL_LABEL = nls.localize2("saveAll", "Save All");
const SAVE_ALL_IN_GROUP_COMMAND_ID = "workbench.files.action.saveAllInGroup";
const SAVE_FILES_COMMAND_ID = "workbench.action.files.saveFiles";
const OpenEditorsGroupContext = new RawContextKey("groupFocusedInOpenEditors", false);
const OpenEditorsDirtyEditorContext = new RawContextKey("dirtyEditorFocusedInOpenEditors", false);
const OpenEditorsReadonlyEditorContext = new RawContextKey("readonlyEditorFocusedInOpenEditors", false);
const OpenEditorsSelectedFileOrUntitledContext = new RawContextKey("openEditorsSelectedFileOrUntitled", true);
const ResourceSelectedForCompareContext = new RawContextKey("resourceSelectedForCompare", false);
const REMOVE_ROOT_FOLDER_COMMAND_ID = "removeRootFolder";
const REMOVE_ROOT_FOLDER_LABEL = nls.localize("removeFolderFromWorkspace", "Remove Folder from Workspace");
const PREVIOUS_COMPRESSED_FOLDER = "previousCompressedFolder";
const NEXT_COMPRESSED_FOLDER = "nextCompressedFolder";
const FIRST_COMPRESSED_FOLDER = "firstCompressedFolder";
const LAST_COMPRESSED_FOLDER = "lastCompressedFolder";
const NEW_UNTITLED_FILE_COMMAND_ID = "workbench.action.files.newUntitledFile";
const NEW_UNTITLED_FILE_LABEL = nls.localize2("newUntitledFile", "New Untitled Text File");
const NEW_FILE_COMMAND_ID = "workbench.action.files.newFile";
export {
  COMPARE_RESOURCE_COMMAND_ID,
  COMPARE_SELECTED_COMMAND_ID,
  COMPARE_WITH_SAVED_COMMAND_ID,
  COPY_PATH_COMMAND_ID,
  COPY_RELATIVE_PATH_COMMAND_ID,
  FIRST_COMPRESSED_FOLDER,
  LAST_COMPRESSED_FOLDER,
  NEW_FILE_COMMAND_ID,
  NEW_UNTITLED_FILE_COMMAND_ID,
  NEW_UNTITLED_FILE_LABEL,
  NEXT_COMPRESSED_FOLDER,
  OPEN_TO_SIDE_COMMAND_ID,
  OPEN_WITH_EXPLORER_COMMAND_ID,
  OpenEditorsDirtyEditorContext,
  OpenEditorsGroupContext,
  OpenEditorsReadonlyEditorContext,
  OpenEditorsSelectedFileOrUntitledContext,
  PREVIOUS_COMPRESSED_FOLDER,
  REMOVE_ROOT_FOLDER_COMMAND_ID,
  REMOVE_ROOT_FOLDER_LABEL,
  REVEAL_IN_EXPLORER_COMMAND_ID,
  REVERT_FILE_COMMAND_ID,
  ResourceSelectedForCompareContext,
  SAVE_ALL_COMMAND_ID,
  SAVE_ALL_IN_GROUP_COMMAND_ID,
  SAVE_ALL_LABEL,
  SAVE_FILES_COMMAND_ID,
  SAVE_FILE_AS_COMMAND_ID,
  SAVE_FILE_AS_LABEL,
  SAVE_FILE_COMMAND_ID,
  SAVE_FILE_LABEL,
  SAVE_FILE_WITHOUT_FORMATTING_COMMAND_ID,
  SAVE_FILE_WITHOUT_FORMATTING_LABEL,
  SELECT_FOR_COMPARE_COMMAND_ID
};
//# sourceMappingURL=fileConstants.js.map
