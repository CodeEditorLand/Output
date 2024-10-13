import {
	GroupDirection,
	IEditorGroupsService,
} from "../../../services/editor/common/editorGroupsService.js";
import { IResolvedEditorCommandsContext } from "./editorCommandsContext.js";

export declare const CLOSE_SAVED_EDITORS_COMMAND_ID =
	"workbench.action.closeUnmodifiedEditors";
export declare const CLOSE_EDITORS_IN_GROUP_COMMAND_ID =
	"workbench.action.closeEditorsInGroup";
export declare const CLOSE_EDITORS_AND_GROUP_COMMAND_ID =
	"workbench.action.closeEditorsAndGroup";
export declare const CLOSE_EDITORS_TO_THE_RIGHT_COMMAND_ID =
	"workbench.action.closeEditorsToTheRight";
export declare const CLOSE_EDITOR_COMMAND_ID =
	"workbench.action.closeActiveEditor";
export declare const CLOSE_PINNED_EDITOR_COMMAND_ID =
	"workbench.action.closeActivePinnedEditor";
export declare const CLOSE_EDITOR_GROUP_COMMAND_ID =
	"workbench.action.closeGroup";
export declare const CLOSE_OTHER_EDITORS_IN_GROUP_COMMAND_ID =
	"workbench.action.closeOtherEditors";
export declare const MOVE_ACTIVE_EDITOR_COMMAND_ID = "moveActiveEditor";
export declare const COPY_ACTIVE_EDITOR_COMMAND_ID = "copyActiveEditor";
export declare const LAYOUT_EDITOR_GROUPS_COMMAND_ID = "layoutEditorGroups";
export declare const KEEP_EDITOR_COMMAND_ID = "workbench.action.keepEditor";
export declare const TOGGLE_KEEP_EDITORS_COMMAND_ID =
	"workbench.action.toggleKeepEditors";
export declare const TOGGLE_LOCK_GROUP_COMMAND_ID =
	"workbench.action.toggleEditorGroupLock";
export declare const LOCK_GROUP_COMMAND_ID = "workbench.action.lockEditorGroup";
export declare const UNLOCK_GROUP_COMMAND_ID =
	"workbench.action.unlockEditorGroup";
export declare const SHOW_EDITORS_IN_GROUP =
	"workbench.action.showEditorsInGroup";
export declare const REOPEN_WITH_COMMAND_ID =
	"workbench.action.reopenWithEditor";
export declare const PIN_EDITOR_COMMAND_ID = "workbench.action.pinEditor";
export declare const UNPIN_EDITOR_COMMAND_ID = "workbench.action.unpinEditor";
export declare const SPLIT_EDITOR = "workbench.action.splitEditor";
export declare const SPLIT_EDITOR_UP = "workbench.action.splitEditorUp";
export declare const SPLIT_EDITOR_DOWN = "workbench.action.splitEditorDown";
export declare const SPLIT_EDITOR_LEFT = "workbench.action.splitEditorLeft";
export declare const SPLIT_EDITOR_RIGHT = "workbench.action.splitEditorRight";
export declare const TOGGLE_MAXIMIZE_EDITOR_GROUP =
	"workbench.action.toggleMaximizeEditorGroup";
export declare const SPLIT_EDITOR_IN_GROUP =
	"workbench.action.splitEditorInGroup";
export declare const TOGGLE_SPLIT_EDITOR_IN_GROUP =
	"workbench.action.toggleSplitEditorInGroup";
export declare const JOIN_EDITOR_IN_GROUP =
	"workbench.action.joinEditorInGroup";
export declare const TOGGLE_SPLIT_EDITOR_IN_GROUP_LAYOUT =
	"workbench.action.toggleSplitEditorInGroupLayout";
export declare const FOCUS_FIRST_SIDE_EDITOR =
	"workbench.action.focusFirstSideEditor";
export declare const FOCUS_SECOND_SIDE_EDITOR =
	"workbench.action.focusSecondSideEditor";
export declare const FOCUS_OTHER_SIDE_EDITOR =
	"workbench.action.focusOtherSideEditor";
export declare const FOCUS_LEFT_GROUP_WITHOUT_WRAP_COMMAND_ID =
	"workbench.action.focusLeftGroupWithoutWrap";
export declare const FOCUS_RIGHT_GROUP_WITHOUT_WRAP_COMMAND_ID =
	"workbench.action.focusRightGroupWithoutWrap";
export declare const FOCUS_ABOVE_GROUP_WITHOUT_WRAP_COMMAND_ID =
	"workbench.action.focusAboveGroupWithoutWrap";
export declare const FOCUS_BELOW_GROUP_WITHOUT_WRAP_COMMAND_ID =
	"workbench.action.focusBelowGroupWithoutWrap";
export declare const OPEN_EDITOR_AT_INDEX_COMMAND_ID =
	"workbench.action.openEditorAtIndex";
export declare const MOVE_EDITOR_INTO_NEW_WINDOW_COMMAND_ID =
	"workbench.action.moveEditorToNewWindow";
export declare const COPY_EDITOR_INTO_NEW_WINDOW_COMMAND_ID =
	"workbench.action.copyEditorToNewWindow";
export declare const MOVE_EDITOR_GROUP_INTO_NEW_WINDOW_COMMAND_ID =
	"workbench.action.moveEditorGroupToNewWindow";
export declare const COPY_EDITOR_GROUP_INTO_NEW_WINDOW_COMMAND_ID =
	"workbench.action.copyEditorGroupToNewWindow";
export declare const NEW_EMPTY_EDITOR_WINDOW_COMMAND_ID =
	"workbench.action.newEmptyEditorWindow";
export declare const API_OPEN_EDITOR_COMMAND_ID = "_workbench.open";
export declare const API_OPEN_DIFF_EDITOR_COMMAND_ID = "_workbench.diff";
export declare const API_OPEN_WITH_EDITOR_COMMAND_ID = "_workbench.openWith";
export declare const EDITOR_CORE_NAVIGATION_COMMANDS: string[];
export interface ActiveEditorMoveCopyArguments {
	to?:
		| "first"
		| "last"
		| "left"
		| "right"
		| "up"
		| "down"
		| "center"
		| "position"
		| "previous"
		| "next";
	by?: "tab" | "group";
	value?: number;
}
export declare function splitEditor(
	editorGroupsService: IEditorGroupsService,
	direction: GroupDirection,
	resolvedContext: IResolvedEditorCommandsContext,
): void;
export declare function setup(): void;
