var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Emitter, Event } from "../../../base/common/event.js";
import { Disposable, IDisposable } from "../../../base/common/lifecycle.js";
import { compareIgnoreCase, regExpLeadsToEndlessLoop } from "../../../base/common/strings.js";
import { clearPlatformLanguageAssociations, getLanguageIds, registerPlatformLanguageAssociation } from "./languagesAssociations.js";
import { URI } from "../../../base/common/uri.js";
import { ILanguageIdCodec } from "../languages.js";
import { LanguageId } from "../encodedTokenAttributes.js";
import { ModesRegistry, PLAINTEXT_LANGUAGE_ID } from "../languages/modesRegistry.js";
import { ILanguageExtensionPoint, ILanguageNameIdPair, ILanguageIcon } from "../languages/language.js";
import { Extensions, IConfigurationRegistry } from "../../../platform/configuration/common/configurationRegistry.js";
import { Registry } from "../../../platform/registry/common/platform.js";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const NULL_LANGUAGE_ID = "vs.editor.nullLanguage";
class LanguageIdCodec {
  static {
    __name(this, "LanguageIdCodec");
  }
  _nextLanguageId;
  _languageIdToLanguage = [];
  _languageToLanguageId = /* @__PURE__ */ new Map();
  constructor() {
    this._register(NULL_LANGUAGE_ID, LanguageId.Null);
    this._register(PLAINTEXT_LANGUAGE_ID, LanguageId.PlainText);
    this._nextLanguageId = 2;
  }
  _register(language, languageId) {
    this._languageIdToLanguage[languageId] = language;
    this._languageToLanguageId.set(language, languageId);
  }
  register(language) {
    if (this._languageToLanguageId.has(language)) {
      return;
    }
    const languageId = this._nextLanguageId++;
    this._register(language, languageId);
  }
  encodeLanguageId(languageId) {
    return this._languageToLanguageId.get(languageId) || LanguageId.Null;
  }
  decodeLanguageId(languageId) {
    return this._languageIdToLanguage[languageId] || NULL_LANGUAGE_ID;
  }
}
class LanguagesRegistry extends Disposable {
  static {
    __name(this, "LanguagesRegistry");
  }
  static instanceCount = 0;
  _onDidChange = this._register(new Emitter());
  onDidChange = this._onDidChange.event;
  _warnOnOverwrite;
  languageIdCodec;
  _dynamicLanguages;
  _languages;
  _mimeTypesMap;
  _nameMap;
  _lowercaseNameMap;
  constructor(useModesRegistry = true, warnOnOverwrite = false) {
    super();
    LanguagesRegistry.instanceCount++;
    this._warnOnOverwrite = warnOnOverwrite;
    this.languageIdCodec = new LanguageIdCodec();
    this._dynamicLanguages = [];
    this._languages = {};
    this._mimeTypesMap = {};
    this._nameMap = {};
    this._lowercaseNameMap = {};
    if (useModesRegistry) {
      this._initializeFromRegistry();
      this._register(ModesRegistry.onDidChangeLanguages((m) => {
        this._initializeFromRegistry();
      }));
    }
  }
  dispose() {
    LanguagesRegistry.instanceCount--;
    super.dispose();
  }
  setDynamicLanguages(def) {
    this._dynamicLanguages = def;
    this._initializeFromRegistry();
  }
  _initializeFromRegistry() {
    this._languages = {};
    this._mimeTypesMap = {};
    this._nameMap = {};
    this._lowercaseNameMap = {};
    clearPlatformLanguageAssociations();
    const desc = [].concat(ModesRegistry.getLanguages()).concat(this._dynamicLanguages);
    this._registerLanguages(desc);
  }
  registerLanguage(desc) {
    return ModesRegistry.registerLanguage(desc);
  }
  _registerLanguages(desc) {
    for (const d of desc) {
      this._registerLanguage(d);
    }
    this._mimeTypesMap = {};
    this._nameMap = {};
    this._lowercaseNameMap = {};
    Object.keys(this._languages).forEach((langId) => {
      const language = this._languages[langId];
      if (language.name) {
        this._nameMap[language.name] = language.identifier;
      }
      language.aliases.forEach((alias) => {
        this._lowercaseNameMap[alias.toLowerCase()] = language.identifier;
      });
      language.mimetypes.forEach((mimetype) => {
        this._mimeTypesMap[mimetype] = language.identifier;
      });
    });
    Registry.as(Extensions.Configuration).registerOverrideIdentifiers(this.getRegisteredLanguageIds());
    this._onDidChange.fire();
  }
  _registerLanguage(lang) {
    const langId = lang.id;
    let resolvedLanguage;
    if (hasOwnProperty.call(this._languages, langId)) {
      resolvedLanguage = this._languages[langId];
    } else {
      this.languageIdCodec.register(langId);
      resolvedLanguage = {
        identifier: langId,
        name: null,
        mimetypes: [],
        aliases: [],
        extensions: [],
        filenames: [],
        configurationFiles: [],
        icons: []
      };
      this._languages[langId] = resolvedLanguage;
    }
    this._mergeLanguage(resolvedLanguage, lang);
  }
  _mergeLanguage(resolvedLanguage, lang) {
    const langId = lang.id;
    let primaryMime = null;
    if (Array.isArray(lang.mimetypes) && lang.mimetypes.length > 0) {
      resolvedLanguage.mimetypes.push(...lang.mimetypes);
      primaryMime = lang.mimetypes[0];
    }
    if (!primaryMime) {
      primaryMime = `text/x-${langId}`;
      resolvedLanguage.mimetypes.push(primaryMime);
    }
    if (Array.isArray(lang.extensions)) {
      if (lang.configuration) {
        resolvedLanguage.extensions = lang.extensions.concat(resolvedLanguage.extensions);
      } else {
        resolvedLanguage.extensions = resolvedLanguage.extensions.concat(lang.extensions);
      }
      for (const extension of lang.extensions) {
        registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, extension }, this._warnOnOverwrite);
      }
    }
    if (Array.isArray(lang.filenames)) {
      for (const filename of lang.filenames) {
        registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, filename }, this._warnOnOverwrite);
        resolvedLanguage.filenames.push(filename);
      }
    }
    if (Array.isArray(lang.filenamePatterns)) {
      for (const filenamePattern of lang.filenamePatterns) {
        registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, filepattern: filenamePattern }, this._warnOnOverwrite);
      }
    }
    if (typeof lang.firstLine === "string" && lang.firstLine.length > 0) {
      let firstLineRegexStr = lang.firstLine;
      if (firstLineRegexStr.charAt(0) !== "^") {
        firstLineRegexStr = "^" + firstLineRegexStr;
      }
      try {
        const firstLineRegex = new RegExp(firstLineRegexStr);
        if (!regExpLeadsToEndlessLoop(firstLineRegex)) {
          registerPlatformLanguageAssociation({ id: langId, mime: primaryMime, firstline: firstLineRegex }, this._warnOnOverwrite);
        }
      } catch (err) {
        console.warn(`[${lang.id}]: Invalid regular expression \`${firstLineRegexStr}\`: `, err);
      }
    }
    resolvedLanguage.aliases.push(langId);
    let langAliases = null;
    if (typeof lang.aliases !== "undefined" && Array.isArray(lang.aliases)) {
      if (lang.aliases.length === 0) {
        langAliases = [null];
      } else {
        langAliases = lang.aliases;
      }
    }
    if (langAliases !== null) {
      for (const langAlias of langAliases) {
        if (!langAlias || langAlias.length === 0) {
          continue;
        }
        resolvedLanguage.aliases.push(langAlias);
      }
    }
    const containsAliases = langAliases !== null && langAliases.length > 0;
    if (containsAliases && langAliases[0] === null) {
    } else {
      const bestName = (containsAliases ? langAliases[0] : null) || langId;
      if (containsAliases || !resolvedLanguage.name) {
        resolvedLanguage.name = bestName;
      }
    }
    if (lang.configuration) {
      resolvedLanguage.configurationFiles.push(lang.configuration);
    }
    if (lang.icon) {
      resolvedLanguage.icons.push(lang.icon);
    }
  }
  isRegisteredLanguageId(languageId) {
    if (!languageId) {
      return false;
    }
    return hasOwnProperty.call(this._languages, languageId);
  }
  getRegisteredLanguageIds() {
    return Object.keys(this._languages);
  }
  getSortedRegisteredLanguageNames() {
    const result = [];
    for (const languageName in this._nameMap) {
      if (hasOwnProperty.call(this._nameMap, languageName)) {
        result.push({
          languageName,
          languageId: this._nameMap[languageName]
        });
      }
    }
    result.sort((a, b) => compareIgnoreCase(a.languageName, b.languageName));
    return result;
  }
  getLanguageName(languageId) {
    if (!hasOwnProperty.call(this._languages, languageId)) {
      return null;
    }
    return this._languages[languageId].name;
  }
  getMimeType(languageId) {
    if (!hasOwnProperty.call(this._languages, languageId)) {
      return null;
    }
    const language = this._languages[languageId];
    return language.mimetypes[0] || null;
  }
  getExtensions(languageId) {
    if (!hasOwnProperty.call(this._languages, languageId)) {
      return [];
    }
    return this._languages[languageId].extensions;
  }
  getFilenames(languageId) {
    if (!hasOwnProperty.call(this._languages, languageId)) {
      return [];
    }
    return this._languages[languageId].filenames;
  }
  getIcon(languageId) {
    if (!hasOwnProperty.call(this._languages, languageId)) {
      return null;
    }
    const language = this._languages[languageId];
    return language.icons[0] || null;
  }
  getConfigurationFiles(languageId) {
    if (!hasOwnProperty.call(this._languages, languageId)) {
      return [];
    }
    return this._languages[languageId].configurationFiles || [];
  }
  getLanguageIdByLanguageName(languageName) {
    const languageNameLower = languageName.toLowerCase();
    if (!hasOwnProperty.call(this._lowercaseNameMap, languageNameLower)) {
      return null;
    }
    return this._lowercaseNameMap[languageNameLower];
  }
  getLanguageIdByMimeType(mimeType) {
    if (!mimeType) {
      return null;
    }
    if (hasOwnProperty.call(this._mimeTypesMap, mimeType)) {
      return this._mimeTypesMap[mimeType];
    }
    return null;
  }
  guessLanguageIdByFilepathOrFirstLine(resource, firstLine) {
    if (!resource && !firstLine) {
      return [];
    }
    return getLanguageIds(resource, firstLine);
  }
}
export {
  LanguageIdCodec,
  LanguagesRegistry
};
//# sourceMappingURL=languagesRegistry.js.map
