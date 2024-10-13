import {
	AccessibleContentProvider,
	AccessibleViewType,
} from "../../../../platform/accessibility/browser/accessibleView.js";
import { IAccessibleViewImplentation } from "../../../../platform/accessibility/browser/accessibleViewRegistry.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";

export declare class ReplEditorAccessibilityHelp
	implements IAccessibleViewImplentation
{
	readonly priority = 105;
	readonly name = "REPL Editor";
	readonly when: import("../../../../platform/contextkey/common/contextkey.js").RawContextKey<boolean>;
	readonly type: AccessibleViewType;
	getProvider(
		accessor: ServicesAccessor,
	): AccessibleContentProvider | undefined;
}
