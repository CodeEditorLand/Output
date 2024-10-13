import { MenuId } from "../../../../../../platform/actions/common/actions.js";
import { RawContextKey } from "../../../../../../platform/contextkey/common/contextkey.js";

export declare const CTX_NOTEBOOK_CELL_CHAT_FOCUSED: RawContextKey<boolean>;
export declare const CTX_NOTEBOOK_CHAT_HAS_ACTIVE_REQUEST: RawContextKey<boolean>;
export declare const CTX_NOTEBOOK_CHAT_USER_DID_EDIT: RawContextKey<boolean>;
export declare const CTX_NOTEBOOK_CHAT_OUTER_FOCUS_POSITION: RawContextKey<
	"" | "above" | "below"
>;
export declare const MENU_CELL_CHAT_INPUT: MenuId;
export declare const MENU_CELL_CHAT_WIDGET: MenuId;
export declare const MENU_CELL_CHAT_WIDGET_STATUS: MenuId;
export declare const MENU_CELL_CHAT_WIDGET_FEEDBACK: MenuId;
export declare const MENU_CELL_CHAT_WIDGET_TOOLBAR: MenuId;
export declare const CTX_NOTEBOOK_CHAT_HAS_AGENT: RawContextKey<boolean>;
