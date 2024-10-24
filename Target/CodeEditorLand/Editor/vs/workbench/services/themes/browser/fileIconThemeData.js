var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { URI } from "../../../../base/common/uri.js";
import * as nls from "../../../../nls.js";
import * as paths from "../../../../base/common/path.js";
import * as resources from "../../../../base/common/resources.js";
import * as Json from "../../../../base/common/json.js";
import { ExtensionData, IThemeExtensionPoint, IWorkbenchFileIconTheme } from "../common/workbenchThemeService.js";
import { getParseErrorMessage } from "../../../../base/common/jsonErrorMessages.js";
import { asCSSUrl } from "../../../../base/browser/cssValue.js";
import { IStorageService, StorageScope, StorageTarget } from "../../../../platform/storage/common/storage.js";
import { IExtensionResourceLoaderService } from "../../../../platform/extensionResourceLoader/common/extensionResourceLoader.js";
import { ILanguageService } from "../../../../editor/common/languages/language.js";
import { mainWindow } from "../../../../base/browser/window.js";
class FileIconThemeData {
  static {
    __name(this, "FileIconThemeData");
  }
  static STORAGE_KEY = "iconThemeData";
  id;
  label;
  settingsId;
  description;
  hasFileIcons;
  hasFolderIcons;
  hidesExplorerArrows;
  isLoaded;
  location;
  extensionData;
  watch;
  styleSheetContent;
  constructor(id, label, settingsId) {
    this.id = id;
    this.label = label;
    this.settingsId = settingsId;
    this.isLoaded = false;
    this.hasFileIcons = false;
    this.hasFolderIcons = false;
    this.hidesExplorerArrows = false;
  }
  ensureLoaded(themeLoader) {
    return !this.isLoaded ? this.load(themeLoader) : Promise.resolve(this.styleSheetContent);
  }
  reload(themeLoader) {
    return this.load(themeLoader);
  }
  load(themeLoader) {
    return themeLoader.load(this);
  }
  static fromExtensionTheme(iconTheme, iconThemeLocation, extensionData) {
    const id = extensionData.extensionId + "-" + iconTheme.id;
    const label = iconTheme.label || paths.basename(iconTheme.path);
    const settingsId = iconTheme.id;
    const themeData = new FileIconThemeData(id, label, settingsId);
    themeData.description = iconTheme.description;
    themeData.location = iconThemeLocation;
    themeData.extensionData = extensionData;
    themeData.watch = iconTheme._watch;
    themeData.isLoaded = false;
    return themeData;
  }
  static _noIconTheme = null;
  static get noIconTheme() {
    let themeData = FileIconThemeData._noIconTheme;
    if (!themeData) {
      themeData = FileIconThemeData._noIconTheme = new FileIconThemeData("", "", null);
      themeData.hasFileIcons = false;
      themeData.hasFolderIcons = false;
      themeData.hidesExplorerArrows = false;
      themeData.isLoaded = true;
      themeData.extensionData = void 0;
      themeData.watch = false;
    }
    return themeData;
  }
  static createUnloadedTheme(id) {
    const themeData = new FileIconThemeData(id, "", "__" + id);
    themeData.isLoaded = false;
    themeData.hasFileIcons = false;
    themeData.hasFolderIcons = false;
    themeData.hidesExplorerArrows = false;
    themeData.extensionData = void 0;
    themeData.watch = false;
    return themeData;
  }
  static fromStorageData(storageService) {
    const input = storageService.get(FileIconThemeData.STORAGE_KEY, StorageScope.PROFILE);
    if (!input) {
      return void 0;
    }
    try {
      const data = JSON.parse(input);
      const theme = new FileIconThemeData("", "", null);
      for (const key in data) {
        switch (key) {
          case "id":
          case "label":
          case "description":
          case "settingsId":
          case "styleSheetContent":
          case "hasFileIcons":
          case "hidesExplorerArrows":
          case "hasFolderIcons":
          case "watch":
            theme[key] = data[key];
            break;
          case "location":
            break;
          case "extensionData":
            theme.extensionData = ExtensionData.fromJSONObject(data.extensionData);
            break;
        }
      }
      return theme;
    } catch (e) {
      return void 0;
    }
  }
  toStorage(storageService) {
    const data = JSON.stringify({
      id: this.id,
      label: this.label,
      description: this.description,
      settingsId: this.settingsId,
      styleSheetContent: this.styleSheetContent,
      hasFileIcons: this.hasFileIcons,
      hasFolderIcons: this.hasFolderIcons,
      hidesExplorerArrows: this.hidesExplorerArrows,
      extensionData: ExtensionData.toJSONObject(this.extensionData),
      watch: this.watch
    });
    storageService.store(FileIconThemeData.STORAGE_KEY, data, StorageScope.PROFILE, StorageTarget.MACHINE);
  }
}
class FileIconThemeLoader {
  constructor(fileService, languageService) {
    this.fileService = fileService;
    this.languageService = languageService;
  }
  static {
    __name(this, "FileIconThemeLoader");
  }
  load(data) {
    if (!data.location) {
      return Promise.resolve(data.styleSheetContent);
    }
    return this.loadIconThemeDocument(data.location).then((iconThemeDocument) => {
      const result = this.processIconThemeDocument(data.id, data.location, iconThemeDocument);
      data.styleSheetContent = result.content;
      data.hasFileIcons = result.hasFileIcons;
      data.hasFolderIcons = result.hasFolderIcons;
      data.hidesExplorerArrows = result.hidesExplorerArrows;
      data.isLoaded = true;
      return data.styleSheetContent;
    });
  }
  loadIconThemeDocument(location) {
    return this.fileService.readExtensionResource(location).then((content) => {
      const errors = [];
      const contentValue = Json.parse(content, errors);
      if (errors.length > 0) {
        return Promise.reject(new Error(nls.localize("error.cannotparseicontheme", "Problems parsing file icons file: {0}", errors.map((e) => getParseErrorMessage(e.error)).join(", "))));
      } else if (Json.getNodeType(contentValue) !== "object") {
        return Promise.reject(new Error(nls.localize("error.invalidformat", "Invalid format for file icons theme file: Object expected.")));
      }
      return Promise.resolve(contentValue);
    });
  }
  processIconThemeDocument(id, iconThemeDocumentLocation, iconThemeDocument) {
    const result = { content: "", hasFileIcons: false, hasFolderIcons: false, hidesExplorerArrows: !!iconThemeDocument.hidesExplorerArrows };
    let hasSpecificFileIcons = false;
    if (!iconThemeDocument.iconDefinitions) {
      return result;
    }
    const selectorByDefinitionId = {};
    const coveredLanguages = {};
    const iconThemeDocumentLocationDirname = resources.dirname(iconThemeDocumentLocation);
    function resolvePath(path) {
      return resources.joinPath(iconThemeDocumentLocationDirname, path);
    }
    __name(resolvePath, "resolvePath");
    function collectSelectors(associations, baseThemeClassName) {
      function addSelector(selector, defId) {
        if (defId) {
          let list = selectorByDefinitionId[defId];
          if (!list) {
            list = selectorByDefinitionId[defId] = [];
          }
          list.push(selector);
        }
      }
      __name(addSelector, "addSelector");
      if (associations) {
        let qualifier = ".show-file-icons";
        if (baseThemeClassName) {
          qualifier = baseThemeClassName + " " + qualifier;
        }
        const expanded = ".monaco-tl-twistie.collapsible:not(.collapsed) + .monaco-tl-contents";
        if (associations.folder) {
          addSelector(`${qualifier} .folder-icon::before`, associations.folder);
          result.hasFolderIcons = true;
        }
        if (associations.folderExpanded) {
          addSelector(`${qualifier} ${expanded} .folder-icon::before`, associations.folderExpanded);
          result.hasFolderIcons = true;
        }
        const rootFolder = associations.rootFolder || associations.folder;
        const rootFolderExpanded = associations.rootFolderExpanded || associations.folderExpanded;
        if (rootFolder) {
          addSelector(`${qualifier} .rootfolder-icon::before`, rootFolder);
          result.hasFolderIcons = true;
        }
        if (rootFolderExpanded) {
          addSelector(`${qualifier} ${expanded} .rootfolder-icon::before`, rootFolderExpanded);
          result.hasFolderIcons = true;
        }
        if (associations.file) {
          addSelector(`${qualifier} .file-icon::before`, associations.file);
          result.hasFileIcons = true;
        }
        const folderNames = associations.folderNames;
        if (folderNames) {
          for (const key in folderNames) {
            const selectors = [];
            const name = handleParentFolder(key.toLowerCase(), selectors);
            selectors.push(`.${escapeCSS(name)}-name-folder-icon`);
            addSelector(`${qualifier} ${selectors.join("")}.folder-icon::before`, folderNames[key]);
            result.hasFolderIcons = true;
          }
        }
        const folderNamesExpanded = associations.folderNamesExpanded;
        if (folderNamesExpanded) {
          for (const key in folderNamesExpanded) {
            const selectors = [];
            const name = handleParentFolder(key.toLowerCase(), selectors);
            selectors.push(`.${escapeCSS(name)}-name-folder-icon`);
            addSelector(`${qualifier} ${expanded} ${selectors.join("")}.folder-icon::before`, folderNamesExpanded[key]);
            result.hasFolderIcons = true;
          }
        }
        const rootFolderNames = associations.rootFolderNames;
        if (rootFolderNames) {
          for (const key in rootFolderNames) {
            const name = key.toLowerCase();
            addSelector(`${qualifier} .${escapeCSS(name)}-root-name-folder-icon.rootfolder-icon::before`, rootFolderNames[key]);
            result.hasFolderIcons = true;
          }
        }
        const rootFolderNamesExpanded = associations.rootFolderNamesExpanded;
        if (rootFolderNamesExpanded) {
          for (const key in rootFolderNamesExpanded) {
            const name = key.toLowerCase();
            addSelector(`${qualifier} ${expanded} .${escapeCSS(name)}-root-name-folder-icon.rootfolder-icon::before`, rootFolderNamesExpanded[key]);
            result.hasFolderIcons = true;
          }
        }
        const languageIds = associations.languageIds;
        if (languageIds) {
          if (!languageIds.jsonc && languageIds.json) {
            languageIds.jsonc = languageIds.json;
          }
          for (const languageId in languageIds) {
            addSelector(`${qualifier} .${escapeCSS(languageId)}-lang-file-icon.file-icon::before`, languageIds[languageId]);
            result.hasFileIcons = true;
            hasSpecificFileIcons = true;
            coveredLanguages[languageId] = true;
          }
        }
        const fileExtensions = associations.fileExtensions;
        if (fileExtensions) {
          for (const key in fileExtensions) {
            const selectors = [];
            const name = handleParentFolder(key.toLowerCase(), selectors);
            const segments = name.split(".");
            if (segments.length) {
              for (let i = 0; i < segments.length; i++) {
                selectors.push(`.${escapeCSS(segments.slice(i).join("."))}-ext-file-icon`);
              }
              selectors.push(".ext-file-icon");
            }
            addSelector(`${qualifier} ${selectors.join("")}.file-icon::before`, fileExtensions[key]);
            result.hasFileIcons = true;
            hasSpecificFileIcons = true;
          }
        }
        const fileNames = associations.fileNames;
        if (fileNames) {
          for (const key in fileNames) {
            const selectors = [];
            const fileName = handleParentFolder(key.toLowerCase(), selectors);
            selectors.push(`.${escapeCSS(fileName)}-name-file-icon`);
            selectors.push(".name-file-icon");
            const segments = fileName.split(".");
            if (segments.length) {
              for (let i = 1; i < segments.length; i++) {
                selectors.push(`.${escapeCSS(segments.slice(i).join("."))}-ext-file-icon`);
              }
              selectors.push(".ext-file-icon");
            }
            addSelector(`${qualifier} ${selectors.join("")}.file-icon::before`, fileNames[key]);
            result.hasFileIcons = true;
            hasSpecificFileIcons = true;
          }
        }
      }
    }
    __name(collectSelectors, "collectSelectors");
    collectSelectors(iconThemeDocument);
    collectSelectors(iconThemeDocument.light, ".vs");
    collectSelectors(iconThemeDocument.highContrast, ".hc-black");
    collectSelectors(iconThemeDocument.highContrast, ".hc-light");
    if (!result.hasFileIcons && !result.hasFolderIcons) {
      return result;
    }
    const showLanguageModeIcons = iconThemeDocument.showLanguageModeIcons === true || hasSpecificFileIcons && iconThemeDocument.showLanguageModeIcons !== false;
    const cssRules = [];
    const fonts = iconThemeDocument.fonts;
    const fontSizes = /* @__PURE__ */ new Map();
    if (Array.isArray(fonts)) {
      const defaultFontSize = this.tryNormalizeFontSize(fonts[0].size) || "150%";
      fonts.forEach((font) => {
        const src = font.src.map((l) => `${asCSSUrl(resolvePath(l.path))} format('${l.format}')`).join(", ");
        cssRules.push(`@font-face { src: ${src}; font-family: '${font.id}'; font-weight: ${font.weight}; font-style: ${font.style}; font-display: block; }`);
        const fontSize = this.tryNormalizeFontSize(font.size);
        if (fontSize !== void 0 && fontSize !== defaultFontSize) {
          fontSizes.set(font.id, fontSize);
        }
      });
      cssRules.push(`.show-file-icons .file-icon::before, .show-file-icons .folder-icon::before, .show-file-icons .rootfolder-icon::before { font-family: '${fonts[0].id}'; font-size: ${defaultFontSize}; }`);
    }
    const emQuad = "\\2001";
    for (const defId in selectorByDefinitionId) {
      const selectors = selectorByDefinitionId[defId];
      const definition = iconThemeDocument.iconDefinitions[defId];
      if (definition) {
        if (definition.iconPath) {
          cssRules.push(`${selectors.join(", ")} { content: '${emQuad}'; background-image: ${asCSSUrl(resolvePath(definition.iconPath))}; }`);
        } else if (definition.fontCharacter || definition.fontColor) {
          const body = [];
          if (definition.fontColor) {
            body.push(`color: ${definition.fontColor};`);
          }
          if (definition.fontCharacter) {
            body.push(`content: '${definition.fontCharacter}';`);
          }
          const fontSize = definition.fontSize ?? (definition.fontId ? fontSizes.get(definition.fontId) : void 0);
          if (fontSize) {
            body.push(`font-size: ${fontSize};`);
          }
          if (definition.fontId) {
            body.push(`font-family: ${definition.fontId};`);
          }
          if (showLanguageModeIcons) {
            body.push(`background-image: unset;`);
          }
          cssRules.push(`${selectors.join(", ")} { ${body.join(" ")} }`);
        }
      }
    }
    if (showLanguageModeIcons) {
      for (const languageId of this.languageService.getRegisteredLanguageIds()) {
        if (!coveredLanguages[languageId]) {
          const icon = this.languageService.getIcon(languageId);
          if (icon) {
            const selector = `.show-file-icons .${escapeCSS(languageId)}-lang-file-icon.file-icon::before`;
            cssRules.push(`${selector} { content: '${emQuad}'; background-image: ${asCSSUrl(icon.dark)}; }`);
            cssRules.push(`.vs ${selector} { content: '${emQuad}'; background-image: ${asCSSUrl(icon.light)}; }`);
          }
        }
      }
    }
    result.content = cssRules.join("\n");
    return result;
  }
  /**
   * Try converting absolute font sizes to relative values.
   *
   * This allows them to be scaled nicely depending on where they are used.
   */
  tryNormalizeFontSize(size) {
    if (!size) {
      return void 0;
    }
    const defaultFontSizeInPx = 13;
    if (size.endsWith("px")) {
      const value = parseInt(size, 10);
      if (!isNaN(value)) {
        return Math.round(value / defaultFontSizeInPx * 100) + "%";
      }
    }
    return size;
  }
}
function handleParentFolder(key, selectors) {
  const lastIndexOfSlash = key.lastIndexOf("/");
  if (lastIndexOfSlash >= 0) {
    const parentFolder = key.substring(0, lastIndexOfSlash);
    selectors.push(`.${escapeCSS(parentFolder)}-name-dir-icon`);
    return key.substring(lastIndexOfSlash + 1);
  }
  return key;
}
__name(handleParentFolder, "handleParentFolder");
function escapeCSS(str) {
  str = str.replace(/[\s]/g, "/");
  return mainWindow.CSS.escape(str);
}
__name(escapeCSS, "escapeCSS");
export {
  FileIconThemeData,
  FileIconThemeLoader
};
//# sourceMappingURL=fileIconThemeData.js.map
