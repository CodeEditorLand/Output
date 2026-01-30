export var ConfigurationScope: any;
export const EXTENSION_UNIFICATION_EXTENSION_IDS: Set<any>;
export var EditPresentationTypes: any;
export namespace Extensions {
    let Configuration: string;
}
export const OVERRIDE_PROPERTY_PATTERN: "^(\\[([^\\]]+)\\])+$";
export const OVERRIDE_PROPERTY_REGEX: RegExp;
export namespace allSettings {
    let properties: {};
    let patternProperties: {};
}
export namespace applicationMachineSettings {
    let properties_1: {};
    export { properties_1 as properties };
    let patternProperties_1: {};
    export { patternProperties_1 as patternProperties };
}
export namespace applicationSettings {
    let properties_2: {};
    export { properties_2 as properties };
    let patternProperties_2: {};
    export { patternProperties_2 as patternProperties };
}
export const configurationDefaultsSchemaId: "vscode://schemas/settings/configurationDefaults";
export function getAllConfigurationProperties(configurationNode: any): {};
export function getDefaultValue(type: any): {} | null;
export function getScopes(): any[][];
export function keyFromOverrideIdentifiers(overrideIdentifiers: any): any;
export namespace machineOverridableSettings {
    let properties_3: {};
    export { properties_3 as properties };
    let patternProperties_3: {};
    export { patternProperties_3 as patternProperties };
}
export namespace machineSettings {
    let properties_4: {};
    export { properties_4 as properties };
    let patternProperties_4: {};
    export { patternProperties_4 as patternProperties };
}
export function overrideIdentifiersFromKey(key: any): any;
export function parseScope(scope: any): 1 | 2 | 5 | 7 | 4 | 6;
export const resourceLanguageSettingsSchemaId: "vscode://schemas/settings/resourceLanguage";
export namespace resourceSettings {
    let properties_5: {};
    export { properties_5 as properties };
    let patternProperties_5: {};
    export { patternProperties_5 as patternProperties };
}
export function validateProperty(property: any, schema: any, extensionId: any): any;
export namespace windowSettings {
    let properties_6: {};
    export { properties_6 as properties };
    let patternProperties_6: {};
    export { patternProperties_6 as patternProperties };
}
//# sourceMappingURL=configurationRegistry.d.ts.map