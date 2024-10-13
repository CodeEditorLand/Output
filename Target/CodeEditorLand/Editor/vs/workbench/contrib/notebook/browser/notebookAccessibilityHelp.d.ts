import {
	AccessibleContentProvider,
	AccessibleViewType,
} from "../../../../platform/accessibility/browser/accessibleView.js";
import { IAccessibleViewImplentation } from "../../../../platform/accessibility/browser/accessibleViewRegistry.js";
import { ServicesAccessor } from "../../../../platform/instantiation/common/instantiation.js";

export declare class NotebookAccessibilityHelp
	implements IAccessibleViewImplentation
{
	readonly priority = 105;
	readonly name = "notebook";
	readonly when:
		| import("../../../../platform/contextkey/common/contextkey.js").ContextKeyExpression
		| undefined;
	readonly type: AccessibleViewType;
	getProvider(
		accessor: ServicesAccessor,
	): AccessibleContentProvider | undefined;
}
