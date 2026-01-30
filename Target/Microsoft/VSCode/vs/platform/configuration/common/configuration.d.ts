export var ConfigurationTarget: any;
export function ConfigurationTargetToString(configurationTarget: any): "APPLICATION" | "WORKSPACE" | "USER" | "USER_LOCAL" | "USER_REMOTE" | "WORKSPACE_FOLDER" | "DEFAULT" | "MEMORY" | undefined;
export const IConfigurationService: any;
export function addToValueTree(settingsTreeRoot: any, key: any, value: any, conflictReporter: any): void;
export function getConfigValueInTarget(configValue: any, scope: any): any;
export function getConfigurationValue(config: any, settingPath: any, defaultValue: any): any;
export function getLanguageTagSettingPlainKey(settingKey: any): any;
export function isConfigurationOverrides(obj: any): any;
export function isConfigurationUpdateOverrides(obj: any): any;
export function isConfigured(configValue: any): boolean;
export function merge(base: any, add: any, overwrite: any): void;
export function removeFromValueTree(valueTree: any, key: any): void;
export function toValuesTree(properties: any, conflictReporter: any): any;
//# sourceMappingURL=configuration.d.ts.map