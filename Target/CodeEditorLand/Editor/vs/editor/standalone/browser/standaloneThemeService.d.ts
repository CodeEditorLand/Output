import { Color } from "../../../base/common/color.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import {
	IFileIconTheme,
	IProductIconTheme,
} from "../../../platform/theme/common/themeService.js";
import {
	IStandaloneTheme,
	IStandaloneThemeData,
	IStandaloneThemeService,
} from "../common/standaloneTheme.js";

export declare const VS_LIGHT_THEME_NAME = "vs";
export declare const VS_DARK_THEME_NAME = "vs-dark";
export declare const HC_BLACK_THEME_NAME = "hc-black";
export declare const HC_LIGHT_THEME_NAME = "hc-light";
export declare class StandaloneThemeService
	extends Disposable
	implements IStandaloneThemeService
{
	readonly _serviceBrand: undefined;
	private readonly _onColorThemeChange;
	readonly onDidColorThemeChange: import("../../../workbench/workbench.web.main.internal.js").Event<IStandaloneTheme>;
	private readonly _onFileIconThemeChange;
	readonly onDidFileIconThemeChange: import("../../../workbench/workbench.web.main.internal.js").Event<IFileIconTheme>;
	private readonly _onProductIconThemeChange;
	readonly onDidProductIconThemeChange: import("../../../workbench/workbench.web.main.internal.js").Event<IProductIconTheme>;
	private readonly _environment;
	private readonly _knownThemes;
	private _autoDetectHighContrast;
	private _codiconCSS;
	private _themeCSS;
	private _allCSS;
	private _globalStyleElement;
	private _styleElements;
	private _colorMapOverride;
	private _theme;
	private _builtInProductIconTheme;
	constructor();
	registerEditorContainer(domNode: HTMLElement): IDisposable;
	private _registerRegularEditorContainer;
	private _registerShadowDomContainer;
	defineTheme(themeName: string, themeData: IStandaloneThemeData): void;
	getColorTheme(): IStandaloneTheme;
	setColorMapOverride(colorMapOverride: Color[] | null): void;
	setTheme(themeName: string): void;
	private _updateActualTheme;
	private _onOSSchemeChanged;
	setAutoDetectHighContrast(autoDetectHighContrast: boolean): void;
	private _updateThemeOrColorMap;
	private _updateCSS;
	getFileIconTheme(): IFileIconTheme;
	getProductIconTheme(): IProductIconTheme;
}
