import { IBreadcrumbsWidgetStyles } from "../../../base/browser/ui/breadcrumbs/breadcrumbsWidget.js";
import { IButtonStyles } from "../../../base/browser/ui/button/button.js";
import { ICountBadgeStyles } from "../../../base/browser/ui/countBadge/countBadge.js";
import { IDialogStyles } from "../../../base/browser/ui/dialog/dialog.js";
import { IInputBoxStyles } from "../../../base/browser/ui/inputbox/inputBox.js";
import { IKeybindingLabelStyles } from "../../../base/browser/ui/keybindingLabel/keybindingLabel.js";
import { IListStyles } from "../../../base/browser/ui/list/listWidget.js";
import { IMenuStyles } from "../../../base/browser/ui/menu/menu.js";
import { IProgressBarStyles } from "../../../base/browser/ui/progressbar/progressbar.js";
import { IRadioStyles } from "../../../base/browser/ui/radio/radio.js";
import { ISelectBoxStyles } from "../../../base/browser/ui/selectBox/selectBox.js";
import {
	ICheckboxStyles,
	IToggleStyles,
} from "../../../base/browser/ui/toggle/toggle.js";
import { IFindWidgetStyles } from "../../../base/browser/ui/tree/abstractTree.js";
import { ColorIdentifier } from "../common/colorRegistry.js";

export type IStyleOverride<T> = {
	[P in keyof T]?: ColorIdentifier | undefined;
};
export declare const defaultKeybindingLabelStyles: IKeybindingLabelStyles;
export declare function getKeybindingLabelStyles(
	override: IStyleOverride<IKeybindingLabelStyles>,
): IKeybindingLabelStyles;
export declare const defaultButtonStyles: IButtonStyles;
export declare function getButtonStyles(
	override: IStyleOverride<IButtonStyles>,
): IButtonStyles;
export declare const defaultProgressBarStyles: IProgressBarStyles;
export declare function getProgressBarStyles(
	override: IStyleOverride<IProgressBarStyles>,
): IProgressBarStyles;
export declare const defaultToggleStyles: IToggleStyles;
export declare const defaultRadioStyles: IRadioStyles;
export declare function getToggleStyles(
	override: IStyleOverride<IToggleStyles>,
): IToggleStyles;
export declare const defaultCheckboxStyles: ICheckboxStyles;
export declare function getCheckboxStyles(
	override: IStyleOverride<ICheckboxStyles>,
): ICheckboxStyles;
export declare const defaultDialogStyles: IDialogStyles;
export declare function getDialogStyle(
	override: IStyleOverride<IDialogStyles>,
): IDialogStyles;
export declare const defaultInputBoxStyles: IInputBoxStyles;
export declare function getInputBoxStyle(
	override: IStyleOverride<IInputBoxStyles>,
): IInputBoxStyles;
export declare const defaultFindWidgetStyles: IFindWidgetStyles;
export declare const defaultCountBadgeStyles: ICountBadgeStyles;
export declare function getCountBadgeStyle(
	override: IStyleOverride<ICountBadgeStyles>,
): ICountBadgeStyles;
export declare const defaultBreadcrumbsWidgetStyles: IBreadcrumbsWidgetStyles;
export declare function getBreadcrumbsWidgetStyles(
	override: IStyleOverride<IBreadcrumbsWidgetStyles>,
): IBreadcrumbsWidgetStyles;
export declare const defaultListStyles: IListStyles;
export declare function getListStyles(
	override: IStyleOverride<IListStyles>,
): IListStyles;
export declare const defaultSelectBoxStyles: ISelectBoxStyles;
export declare function getSelectBoxStyles(
	override: IStyleOverride<ISelectBoxStyles>,
): ISelectBoxStyles;
export declare const defaultMenuStyles: IMenuStyles;
export declare function getMenuStyles(
	override: IStyleOverride<IMenuStyles>,
): IMenuStyles;
