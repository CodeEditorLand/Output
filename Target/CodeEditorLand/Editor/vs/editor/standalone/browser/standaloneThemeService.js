var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as dom from "../../../base/browser/dom.js";
import { addMatchMediaChangeListener } from "../../../base/browser/browser.js";
import { Color } from "../../../base/common/color.js";
import { Emitter } from "../../../base/common/event.js";
import { TokenizationRegistry } from "../../common/languages.js";
import { FontStyle, TokenMetadata } from "../../common/encodedTokenAttributes.js";
import { ITokenThemeRule, TokenTheme, generateTokensCSSForColorMap } from "../../common/languages/supports/tokenization.js";
import { BuiltinTheme, IStandaloneTheme, IStandaloneThemeData, IStandaloneThemeService } from "../common/standaloneTheme.js";
import { hc_black, hc_light, vs, vs_dark } from "../common/themes.js";
import { IEnvironmentService } from "../../../platform/environment/common/environment.js";
import { Registry } from "../../../platform/registry/common/platform.js";
import { asCssVariableName, ColorIdentifier, Extensions, IColorRegistry } from "../../../platform/theme/common/colorRegistry.js";
import { Extensions as ThemingExtensions, ICssStyleCollector, IFileIconTheme, IProductIconTheme, IThemingRegistry, ITokenStyle } from "../../../platform/theme/common/themeService.js";
import { IDisposable, Disposable } from "../../../base/common/lifecycle.js";
import { ColorScheme, isDark, isHighContrast } from "../../../platform/theme/common/theme.js";
import { getIconsStyleSheet, UnthemedProductIconTheme } from "../../../platform/theme/browser/iconsStyleSheet.js";
import { mainWindow } from "../../../base/browser/window.js";
const VS_LIGHT_THEME_NAME = "vs";
const VS_DARK_THEME_NAME = "vs-dark";
const HC_BLACK_THEME_NAME = "hc-black";
const HC_LIGHT_THEME_NAME = "hc-light";
const colorRegistry = Registry.as(Extensions.ColorContribution);
const themingRegistry = Registry.as(ThemingExtensions.ThemingContribution);
class StandaloneTheme {
  static {
    __name(this, "StandaloneTheme");
  }
  id;
  themeName;
  themeData;
  colors;
  defaultColors;
  _tokenTheme;
  constructor(name, standaloneThemeData) {
    this.themeData = standaloneThemeData;
    const base = standaloneThemeData.base;
    if (name.length > 0) {
      if (isBuiltinTheme(name)) {
        this.id = name;
      } else {
        this.id = base + " " + name;
      }
      this.themeName = name;
    } else {
      this.id = base;
      this.themeName = base;
    }
    this.colors = null;
    this.defaultColors = /* @__PURE__ */ Object.create(null);
    this._tokenTheme = null;
  }
  get label() {
    return this.themeName;
  }
  get base() {
    return this.themeData.base;
  }
  notifyBaseUpdated() {
    if (this.themeData.inherit) {
      this.colors = null;
      this._tokenTheme = null;
    }
  }
  getColors() {
    if (!this.colors) {
      const colors = /* @__PURE__ */ new Map();
      for (const id in this.themeData.colors) {
        colors.set(id, Color.fromHex(this.themeData.colors[id]));
      }
      if (this.themeData.inherit) {
        const baseData = getBuiltinRules(this.themeData.base);
        for (const id in baseData.colors) {
          if (!colors.has(id)) {
            colors.set(id, Color.fromHex(baseData.colors[id]));
          }
        }
      }
      this.colors = colors;
    }
    return this.colors;
  }
  getColor(colorId, useDefault) {
    const color = this.getColors().get(colorId);
    if (color) {
      return color;
    }
    if (useDefault !== false) {
      return this.getDefault(colorId);
    }
    return void 0;
  }
  getDefault(colorId) {
    let color = this.defaultColors[colorId];
    if (color) {
      return color;
    }
    color = colorRegistry.resolveDefaultColor(colorId, this);
    this.defaultColors[colorId] = color;
    return color;
  }
  defines(colorId) {
    return this.getColors().has(colorId);
  }
  get type() {
    switch (this.base) {
      case VS_LIGHT_THEME_NAME:
        return ColorScheme.LIGHT;
      case HC_BLACK_THEME_NAME:
        return ColorScheme.HIGH_CONTRAST_DARK;
      case HC_LIGHT_THEME_NAME:
        return ColorScheme.HIGH_CONTRAST_LIGHT;
      default:
        return ColorScheme.DARK;
    }
  }
  get tokenTheme() {
    if (!this._tokenTheme) {
      let rules = [];
      let encodedTokensColors = [];
      if (this.themeData.inherit) {
        const baseData = getBuiltinRules(this.themeData.base);
        rules = baseData.rules;
        if (baseData.encodedTokensColors) {
          encodedTokensColors = baseData.encodedTokensColors;
        }
      }
      const editorForeground = this.themeData.colors["editor.foreground"];
      const editorBackground = this.themeData.colors["editor.background"];
      if (editorForeground || editorBackground) {
        const rule = { token: "" };
        if (editorForeground) {
          rule.foreground = editorForeground;
        }
        if (editorBackground) {
          rule.background = editorBackground;
        }
        rules.push(rule);
      }
      rules = rules.concat(this.themeData.rules);
      if (this.themeData.encodedTokensColors) {
        encodedTokensColors = this.themeData.encodedTokensColors;
      }
      this._tokenTheme = TokenTheme.createFromRawTokenTheme(rules, encodedTokensColors);
    }
    return this._tokenTheme;
  }
  getTokenStyleMetadata(type, modifiers, modelLanguage) {
    const style = this.tokenTheme._match([type].concat(modifiers).join("."));
    const metadata = style.metadata;
    const foreground = TokenMetadata.getForeground(metadata);
    const fontStyle = TokenMetadata.getFontStyle(metadata);
    return {
      foreground,
      italic: Boolean(fontStyle & FontStyle.Italic),
      bold: Boolean(fontStyle & FontStyle.Bold),
      underline: Boolean(fontStyle & FontStyle.Underline),
      strikethrough: Boolean(fontStyle & FontStyle.Strikethrough)
    };
  }
  get tokenColorMap() {
    return [];
  }
  semanticHighlighting = false;
}
function isBuiltinTheme(themeName) {
  return themeName === VS_LIGHT_THEME_NAME || themeName === VS_DARK_THEME_NAME || themeName === HC_BLACK_THEME_NAME || themeName === HC_LIGHT_THEME_NAME;
}
__name(isBuiltinTheme, "isBuiltinTheme");
function getBuiltinRules(builtinTheme) {
  switch (builtinTheme) {
    case VS_LIGHT_THEME_NAME:
      return vs;
    case VS_DARK_THEME_NAME:
      return vs_dark;
    case HC_BLACK_THEME_NAME:
      return hc_black;
    case HC_LIGHT_THEME_NAME:
      return hc_light;
  }
}
__name(getBuiltinRules, "getBuiltinRules");
function newBuiltInTheme(builtinTheme) {
  const themeData = getBuiltinRules(builtinTheme);
  return new StandaloneTheme(builtinTheme, themeData);
}
__name(newBuiltInTheme, "newBuiltInTheme");
class StandaloneThemeService extends Disposable {
  static {
    __name(this, "StandaloneThemeService");
  }
  _onColorThemeChange = this._register(new Emitter());
  onDidColorThemeChange = this._onColorThemeChange.event;
  _onFileIconThemeChange = this._register(new Emitter());
  onDidFileIconThemeChange = this._onFileIconThemeChange.event;
  _onProductIconThemeChange = this._register(new Emitter());
  onDidProductIconThemeChange = this._onProductIconThemeChange.event;
  _environment = /* @__PURE__ */ Object.create(null);
  _knownThemes;
  _autoDetectHighContrast;
  _codiconCSS;
  _themeCSS;
  _allCSS;
  _globalStyleElement;
  _styleElements;
  _colorMapOverride;
  _theme;
  _builtInProductIconTheme = new UnthemedProductIconTheme();
  constructor() {
    super();
    this._autoDetectHighContrast = true;
    this._knownThemes = /* @__PURE__ */ new Map();
    this._knownThemes.set(VS_LIGHT_THEME_NAME, newBuiltInTheme(VS_LIGHT_THEME_NAME));
    this._knownThemes.set(VS_DARK_THEME_NAME, newBuiltInTheme(VS_DARK_THEME_NAME));
    this._knownThemes.set(HC_BLACK_THEME_NAME, newBuiltInTheme(HC_BLACK_THEME_NAME));
    this._knownThemes.set(HC_LIGHT_THEME_NAME, newBuiltInTheme(HC_LIGHT_THEME_NAME));
    const iconsStyleSheet = this._register(getIconsStyleSheet(this));
    this._codiconCSS = iconsStyleSheet.getCSS();
    this._themeCSS = "";
    this._allCSS = `${this._codiconCSS}
${this._themeCSS}`;
    this._globalStyleElement = null;
    this._styleElements = [];
    this._colorMapOverride = null;
    this.setTheme(VS_LIGHT_THEME_NAME);
    this._onOSSchemeChanged();
    this._register(iconsStyleSheet.onDidChange(() => {
      this._codiconCSS = iconsStyleSheet.getCSS();
      this._updateCSS();
    }));
    addMatchMediaChangeListener(mainWindow, "(forced-colors: active)", () => {
      this._onOSSchemeChanged();
    });
  }
  registerEditorContainer(domNode) {
    if (dom.isInShadowDOM(domNode)) {
      return this._registerShadowDomContainer(domNode);
    }
    return this._registerRegularEditorContainer();
  }
  _registerRegularEditorContainer() {
    if (!this._globalStyleElement) {
      this._globalStyleElement = dom.createStyleSheet(void 0, (style) => {
        style.className = "monaco-colors";
        style.textContent = this._allCSS;
      });
      this._styleElements.push(this._globalStyleElement);
    }
    return Disposable.None;
  }
  _registerShadowDomContainer(domNode) {
    const styleElement = dom.createStyleSheet(domNode, (style) => {
      style.className = "monaco-colors";
      style.textContent = this._allCSS;
    });
    this._styleElements.push(styleElement);
    return {
      dispose: /* @__PURE__ */ __name(() => {
        for (let i = 0; i < this._styleElements.length; i++) {
          if (this._styleElements[i] === styleElement) {
            this._styleElements.splice(i, 1);
            return;
          }
        }
      }, "dispose")
    };
  }
  defineTheme(themeName, themeData) {
    if (!/^[a-z0-9\-]+$/i.test(themeName)) {
      throw new Error("Illegal theme name!");
    }
    if (!isBuiltinTheme(themeData.base) && !isBuiltinTheme(themeName)) {
      throw new Error("Illegal theme base!");
    }
    this._knownThemes.set(themeName, new StandaloneTheme(themeName, themeData));
    if (isBuiltinTheme(themeName)) {
      this._knownThemes.forEach((theme) => {
        if (theme.base === themeName) {
          theme.notifyBaseUpdated();
        }
      });
    }
    if (this._theme.themeName === themeName) {
      this.setTheme(themeName);
    }
  }
  getColorTheme() {
    return this._theme;
  }
  setColorMapOverride(colorMapOverride) {
    this._colorMapOverride = colorMapOverride;
    this._updateThemeOrColorMap();
  }
  setTheme(themeName) {
    let theme;
    if (this._knownThemes.has(themeName)) {
      theme = this._knownThemes.get(themeName);
    } else {
      theme = this._knownThemes.get(VS_LIGHT_THEME_NAME);
    }
    this._updateActualTheme(theme);
  }
  _updateActualTheme(desiredTheme) {
    if (!desiredTheme || this._theme === desiredTheme) {
      return;
    }
    this._theme = desiredTheme;
    this._updateThemeOrColorMap();
  }
  _onOSSchemeChanged() {
    if (this._autoDetectHighContrast) {
      const wantsHighContrast = mainWindow.matchMedia(`(forced-colors: active)`).matches;
      if (wantsHighContrast !== isHighContrast(this._theme.type)) {
        let newThemeName;
        if (isDark(this._theme.type)) {
          newThemeName = wantsHighContrast ? HC_BLACK_THEME_NAME : VS_DARK_THEME_NAME;
        } else {
          newThemeName = wantsHighContrast ? HC_LIGHT_THEME_NAME : VS_LIGHT_THEME_NAME;
        }
        this._updateActualTheme(this._knownThemes.get(newThemeName));
      }
    }
  }
  setAutoDetectHighContrast(autoDetectHighContrast) {
    this._autoDetectHighContrast = autoDetectHighContrast;
    this._onOSSchemeChanged();
  }
  _updateThemeOrColorMap() {
    const cssRules = [];
    const hasRule = {};
    const ruleCollector = {
      addRule: /* @__PURE__ */ __name((rule) => {
        if (!hasRule[rule]) {
          cssRules.push(rule);
          hasRule[rule] = true;
        }
      }, "addRule")
    };
    themingRegistry.getThemingParticipants().forEach((p) => p(this._theme, ruleCollector, this._environment));
    const colorVariables = [];
    for (const item of colorRegistry.getColors()) {
      const color = this._theme.getColor(item.id, true);
      if (color) {
        colorVariables.push(`${asCssVariableName(item.id)}: ${color.toString()};`);
      }
    }
    ruleCollector.addRule(`.monaco-editor, .monaco-diff-editor, .monaco-component { ${colorVariables.join("\n")} }`);
    const colorMap = this._colorMapOverride || this._theme.tokenTheme.getColorMap();
    ruleCollector.addRule(generateTokensCSSForColorMap(colorMap));
    this._themeCSS = cssRules.join("\n");
    this._updateCSS();
    TokenizationRegistry.setColorMap(colorMap);
    this._onColorThemeChange.fire(this._theme);
  }
  _updateCSS() {
    this._allCSS = `${this._codiconCSS}
${this._themeCSS}`;
    this._styleElements.forEach((styleElement) => styleElement.textContent = this._allCSS);
  }
  getFileIconTheme() {
    return {
      hasFileIcons: false,
      hasFolderIcons: false,
      hidesExplorerArrows: false
    };
  }
  getProductIconTheme() {
    return this._builtInProductIconTheme;
  }
}
export {
  HC_BLACK_THEME_NAME,
  HC_LIGHT_THEME_NAME,
  StandaloneThemeService,
  VS_DARK_THEME_NAME,
  VS_LIGHT_THEME_NAME
};
//# sourceMappingURL=standaloneThemeService.js.map
