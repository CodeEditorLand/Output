import { Color } from "../../../../base/common/color.js";
import * as languages from "../../../../editor/common/languages.js";
import { IColorTheme } from "../../../../platform/theme/common/themeService.js";

export declare const commentThreadRangeBackground: string;
export declare const commentThreadRangeActiveBackground: string;
export declare const commentThreadStateColorVar =
	"--comment-thread-state-color";
export declare const commentViewThreadStateColorVar =
	"--comment-view-thread-state-color";
export declare const commentThreadStateBackgroundColorVar =
	"--comment-thread-state-background-color";
export declare function getCommentThreadStateBorderColor(
	state: languages.CommentThreadState | undefined,
	theme: IColorTheme,
): Color | undefined;
export declare function getCommentThreadStateIconColor(
	state: languages.CommentThreadState | undefined,
	theme: IColorTheme,
): Color | undefined;
