var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
import * as nls from "../../../../nls.js";
import { isObject } from "../../../../base/common/types.js";
import { IJSONSchema, IJSONSchemaMap, IJSONSchemaSnippet } from "../../../../base/common/jsonSchema.js";
import { IWorkspaceFolder } from "../../../../platform/workspace/common/workspace.js";
import { IConfig, IDebuggerContribution, IDebugAdapter, IDebugger, IDebugSession, IAdapterManager, IDebugService, debuggerDisabledMessage, IDebuggerMetadata, DebugConfigurationProviderTriggerKind } from "./debug.js";
import { IConfigurationService } from "../../../../platform/configuration/common/configuration.js";
import { IConfigurationResolverService } from "../../../services/configurationResolver/common/configurationResolver.js";
import * as ConfigurationResolverUtils from "../../../services/configurationResolver/common/configurationResolverUtils.js";
import { ITextResourcePropertiesService } from "../../../../editor/common/services/textResourceConfiguration.js";
import { URI } from "../../../../base/common/uri.js";
import { Schemas } from "../../../../base/common/network.js";
import { isDebuggerMainContribution } from "./debugUtils.js";
import { IExtensionDescription } from "../../../../platform/extensions/common/extensions.js";
import { ITelemetryEndpoint } from "../../../../platform/telemetry/common/telemetry.js";
import { cleanRemoteAuthority } from "../../../../platform/telemetry/common/telemetryUtils.js";
import { IWorkbenchEnvironmentService } from "../../../services/environment/common/environmentService.js";
import { ContextKeyExpr, ContextKeyExpression, IContextKeyService } from "../../../../platform/contextkey/common/contextkey.js";
import { filter } from "../../../../base/common/objects.js";
let Debugger = class {
  constructor(adapterManager, dbgContribution, extensionDescription, configurationService, resourcePropertiesService, configurationResolverService, environmentService, debugService, contextKeyService) {
    this.adapterManager = adapterManager;
    this.configurationService = configurationService;
    this.resourcePropertiesService = resourcePropertiesService;
    this.configurationResolverService = configurationResolverService;
    this.environmentService = environmentService;
    this.debugService = debugService;
    this.contextKeyService = contextKeyService;
    this.debuggerContribution = { type: dbgContribution.type };
    this.merge(dbgContribution, extensionDescription);
    this.debuggerWhen = typeof this.debuggerContribution.when === "string" ? ContextKeyExpr.deserialize(this.debuggerContribution.when) : void 0;
    this.debuggerHiddenWhen = typeof this.debuggerContribution.hiddenWhen === "string" ? ContextKeyExpr.deserialize(this.debuggerContribution.hiddenWhen) : void 0;
  }
  static {
    __name(this, "Debugger");
  }
  debuggerContribution;
  mergedExtensionDescriptions = [];
  mainExtensionDescription;
  debuggerWhen;
  debuggerHiddenWhen;
  merge(otherDebuggerContribution, extensionDescription) {
    function mixin(destination, source, overwrite, level = 0) {
      if (!isObject(destination)) {
        return source;
      }
      if (isObject(source)) {
        Object.keys(source).forEach((key) => {
          if (key !== "__proto__") {
            if (isObject(destination[key]) && isObject(source[key])) {
              mixin(destination[key], source[key], overwrite, level + 1);
            } else {
              if (key in destination) {
                if (overwrite) {
                  if (level === 0 && key === "type") {
                  } else {
                    destination[key] = source[key];
                  }
                }
              } else {
                destination[key] = source[key];
              }
            }
          }
        });
      }
      return destination;
    }
    __name(mixin, "mixin");
    if (this.mergedExtensionDescriptions.indexOf(extensionDescription) < 0) {
      this.mergedExtensionDescriptions.push(extensionDescription);
      mixin(this.debuggerContribution, otherDebuggerContribution, extensionDescription.isBuiltin);
      if (isDebuggerMainContribution(otherDebuggerContribution)) {
        this.mainExtensionDescription = extensionDescription;
      }
    }
  }
  async startDebugging(configuration, parentSessionId) {
    const parentSession = this.debugService.getModel().getSession(parentSessionId);
    return await this.debugService.startDebugging(void 0, configuration, { parentSession }, void 0);
  }
  async createDebugAdapter(session) {
    await this.adapterManager.activateDebuggers("onDebugAdapterProtocolTracker", this.type);
    const da = this.adapterManager.createDebugAdapter(session);
    if (da) {
      return Promise.resolve(da);
    }
    throw new Error(nls.localize("cannot.find.da", "Cannot find debug adapter for type '{0}'.", this.type));
  }
  async substituteVariables(folder, config) {
    const substitutedConfig = await this.adapterManager.substituteVariables(this.type, folder, config);
    return await this.configurationResolverService.resolveWithInteractionReplace(folder, substitutedConfig, "launch", this.variables, substitutedConfig.__configurationTarget);
  }
  runInTerminal(args, sessionId) {
    return this.adapterManager.runInTerminal(this.type, args, sessionId);
  }
  get label() {
    return this.debuggerContribution.label || this.debuggerContribution.type;
  }
  get type() {
    return this.debuggerContribution.type;
  }
  get variables() {
    return this.debuggerContribution.variables;
  }
  get configurationSnippets() {
    return this.debuggerContribution.configurationSnippets;
  }
  get languages() {
    return this.debuggerContribution.languages;
  }
  get when() {
    return this.debuggerWhen;
  }
  get hiddenWhen() {
    return this.debuggerHiddenWhen;
  }
  get enabled() {
    return !this.debuggerWhen || this.contextKeyService.contextMatchesRules(this.debuggerWhen);
  }
  get isHiddenFromDropdown() {
    if (!this.debuggerHiddenWhen) {
      return false;
    }
    return this.contextKeyService.contextMatchesRules(this.debuggerHiddenWhen);
  }
  get strings() {
    return this.debuggerContribution.strings ?? this.debuggerContribution.uiMessages;
  }
  interestedInLanguage(languageId) {
    return !!(this.languages && this.languages.indexOf(languageId) >= 0);
  }
  hasInitialConfiguration() {
    return !!this.debuggerContribution.initialConfigurations;
  }
  hasDynamicConfigurationProviders() {
    return this.debugService.getConfigurationManager().hasDebugConfigurationProvider(this.type, DebugConfigurationProviderTriggerKind.Dynamic);
  }
  hasConfigurationProvider() {
    return this.debugService.getConfigurationManager().hasDebugConfigurationProvider(this.type);
  }
  getInitialConfigurationContent(initialConfigs) {
    let initialConfigurations = this.debuggerContribution.initialConfigurations || [];
    if (initialConfigs) {
      initialConfigurations = initialConfigurations.concat(initialConfigs);
    }
    const eol = this.resourcePropertiesService.getEOL(URI.from({ scheme: Schemas.untitled, path: "1" })) === "\r\n" ? "\r\n" : "\n";
    const configs = JSON.stringify(initialConfigurations, null, "	").split("\n").map((line) => "	" + line).join(eol).trim();
    const comment1 = nls.localize("launch.config.comment1", "Use IntelliSense to learn about possible attributes.");
    const comment2 = nls.localize("launch.config.comment2", "Hover to view descriptions of existing attributes.");
    const comment3 = nls.localize("launch.config.comment3", "For more information, visit: {0}", "https://go.microsoft.com/fwlink/?linkid=830387");
    let content = [
      "{",
      `	// ${comment1}`,
      `	// ${comment2}`,
      `	// ${comment3}`,
      `	"version": "0.2.0",`,
      `	"configurations": ${configs}`,
      "}"
    ].join(eol);
    const editorConfig = this.configurationService.getValue();
    if (editorConfig.editor && editorConfig.editor.insertSpaces) {
      content = content.replace(new RegExp("	", "g"), " ".repeat(editorConfig.editor.tabSize));
    }
    return Promise.resolve(content);
  }
  getMainExtensionDescriptor() {
    return this.mainExtensionDescription || this.mergedExtensionDescriptions[0];
  }
  getCustomTelemetryEndpoint() {
    const aiKey = this.debuggerContribution.aiKey;
    if (!aiKey) {
      return void 0;
    }
    const sendErrorTelemtry = cleanRemoteAuthority(this.environmentService.remoteAuthority) !== "other";
    return {
      id: `${this.getMainExtensionDescriptor().publisher}.${this.type}`,
      aiKey,
      sendErrorTelemetry: sendErrorTelemtry
    };
  }
  getSchemaAttributes(definitions) {
    if (!this.debuggerContribution.configurationAttributes) {
      return null;
    }
    return Object.keys(this.debuggerContribution.configurationAttributes).map((request) => {
      const definitionId = `${this.type}:${request}`;
      const platformSpecificDefinitionId = `${this.type}:${request}:platform`;
      const attributes = this.debuggerContribution.configurationAttributes[request];
      const defaultRequired = ["name", "type", "request"];
      attributes.required = attributes.required && attributes.required.length ? defaultRequired.concat(attributes.required) : defaultRequired;
      attributes.additionalProperties = false;
      attributes.type = "object";
      if (!attributes.properties) {
        attributes.properties = {};
      }
      const properties = attributes.properties;
      properties["type"] = {
        enum: [this.type],
        enumDescriptions: [this.label],
        description: nls.localize("debugType", "Type of configuration."),
        pattern: "^(?!node2)",
        deprecationMessage: this.debuggerContribution.deprecated || (this.enabled ? void 0 : debuggerDisabledMessage(this.type)),
        doNotSuggest: !!this.debuggerContribution.deprecated,
        errorMessage: nls.localize("debugTypeNotRecognised", "The debug type is not recognized. Make sure that you have a corresponding debug extension installed and that it is enabled."),
        patternErrorMessage: nls.localize("node2NotSupported", '"node2" is no longer supported, use "node" instead and set the "protocol" attribute to "inspector".')
      };
      properties["request"] = {
        enum: [request],
        description: nls.localize("debugRequest", 'Request type of configuration. Can be "launch" or "attach".')
      };
      for (const prop in definitions["common"].properties) {
        properties[prop] = {
          $ref: `#/definitions/common/properties/${prop}`
        };
      }
      Object.keys(properties).forEach((name) => {
        ConfigurationResolverUtils.applyDeprecatedVariableMessage(properties[name]);
      });
      definitions[definitionId] = { ...attributes };
      definitions[platformSpecificDefinitionId] = {
        type: "object",
        additionalProperties: false,
        properties: filter(properties, (key) => key !== "type" && key !== "request" && key !== "name")
      };
      const attributesCopy = { ...attributes };
      attributesCopy.properties = {
        ...properties,
        ...{
          windows: {
            $ref: `#/definitions/${platformSpecificDefinitionId}`,
            description: nls.localize("debugWindowsConfiguration", "Windows specific launch configuration attributes.")
          },
          osx: {
            $ref: `#/definitions/${platformSpecificDefinitionId}`,
            description: nls.localize("debugOSXConfiguration", "OS X specific launch configuration attributes.")
          },
          linux: {
            $ref: `#/definitions/${platformSpecificDefinitionId}`,
            description: nls.localize("debugLinuxConfiguration", "Linux specific launch configuration attributes.")
          }
        }
      };
      return attributesCopy;
    });
  }
};
Debugger = __decorateClass([
  __decorateParam(3, IConfigurationService),
  __decorateParam(4, ITextResourcePropertiesService),
  __decorateParam(5, IConfigurationResolverService),
  __decorateParam(6, IWorkbenchEnvironmentService),
  __decorateParam(7, IDebugService),
  __decorateParam(8, IContextKeyService)
], Debugger);
export {
  Debugger
};
//# sourceMappingURL=debugger.js.map
