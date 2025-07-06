declare const w: any;
declare const S: any;
declare namespace g {
    export let type: string;
    export let description: any;
    export namespace properties {
        namespace hidden {
            let type_1: string;
            export { type_1 as type };
            let _default: boolean;
            export { _default as default };
            let description_1: any;
            export { description_1 as description };
        }
        namespace group {
            let type_2: string;
            export { type_2 as type };
            let _default_1: string;
            export { _default_1 as default };
            let description_2: any;
            export { description_2 as description };
        }
        namespace order {
            let type_3: string;
            export { type_3 as type };
            let _default_2: number;
            export { _default_2 as default };
            let description_3: any;
            export { description_3 as description };
        }
    }
    namespace _default_3 {
        let hidden_1: boolean;
        export { hidden_1 as hidden };
        let group_1: string;
        export { group_1 as group };
        let order_1: number;
        export { order_1 as order };
    }
    export { _default_3 as default };
}
declare namespace P {
    export { a as id };
    let type_4: string;
    export { type_4 as type };
    export let title: any;
    export let allowTrailingCommas: boolean;
    export let allowComments: boolean;
    export let required: never[];
    namespace _default_4 {
        let version: string;
        let configurations: never[];
        let compounds: never[];
    }
    export { _default_4 as default };
    export namespace properties_1 {
        export namespace version_1 {
            let type_5: string;
            export { type_5 as type };
            let description_4: any;
            export { description_4 as description };
            let _default_5: string;
            export { _default_5 as default };
        }
        export { version_1 as version };
        export namespace configurations_1 {
            let type_6: string;
            export { type_6 as type };
            let description_5: any;
            export { description_5 as description };
            export namespace items {
                export let defaultSnippets: never[];
                let type_7: string;
                export { type_7 as type };
                export let oneOf: never[];
            }
        }
        export { configurations_1 as configurations };
        export namespace compounds_1 {
            let type_8: string;
            export { type_8 as type };
            let description_6: any;
            export { description_6 as description };
            export namespace items_1 {
                let type_9: string;
                export { type_9 as type };
                let required_1: string[];
                export { required_1 as required };
                export namespace properties_2 {
                    export namespace name {
                        let type_10: string;
                        export { type_10 as type };
                        let description_7: any;
                        export { description_7 as description };
                    }
                    export { g as presentation };
                    export namespace configurations_2 {
                        let type_11: string;
                        export { type_11 as type };
                        let _default_6: never[];
                        export { _default_6 as default };
                        export namespace items_2 {
                            let oneOf_1: ({
                                enum: never[];
                                description: any;
                                type?: never;
                                required?: never;
                                properties?: never;
                            } | {
                                type: string;
                                required: string[];
                                properties: {
                                    name: {
                                        enum: never[];
                                        description: any;
                                    };
                                    folder: {
                                        enum: never[];
                                        description: any;
                                    };
                                };
                                enum?: never;
                                description?: never;
                            })[];
                            export { oneOf_1 as oneOf };
                        }
                        export { items_2 as items };
                        let description_8: any;
                        export { description_8 as description };
                    }
                    export { configurations_2 as configurations };
                    export namespace stopAll {
                        let type_12: string;
                        export { type_12 as type };
                        let _default_7: boolean;
                        export { _default_7 as default };
                        let description_9: any;
                        export { description_9 as description };
                    }
                    export namespace preLaunchTask {
                        let type_13: string;
                        export { type_13 as type };
                        let _default_8: string;
                        export { _default_8 as default };
                        let description_10: any;
                        export { description_10 as description };
                    }
                }
                export { properties_2 as properties };
                export { n as default };
            }
            export { items_1 as items };
            let _default_9: {
                name: string;
                configurations: never[];
            }[];
            export { _default_9 as default };
        }
        export { compounds_1 as compounds };
        export let inputs: {
            type: string;
            description: any;
            items: {
                oneOf: ({
                    type: string;
                    required: string[];
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                            description: any;
                        };
                        type: {
                            type: string;
                            description: any;
                            enum: string[];
                            enumDescriptions: any[];
                        };
                        description: {
                            type: string;
                            description: any;
                        };
                        default: {
                            type: string;
                            description: any;
                        };
                        password: {
                            type: string;
                            description: any;
                        };
                        options?: never;
                        command?: never;
                        args?: never;
                    };
                } | {
                    type: string;
                    required: string[];
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                            description: any;
                        };
                        type: {
                            type: string;
                            description: any;
                            enum: string[];
                            enumDescriptions: any[];
                        };
                        description: {
                            type: string;
                            description: any;
                        };
                        default: {
                            type: string;
                            description: any;
                        };
                        options: {
                            type: string;
                            description: any;
                            items: {
                                oneOf: ({
                                    type: string;
                                    required?: never;
                                    additionalProperties?: never;
                                    properties?: never;
                                } | {
                                    type: string;
                                    required: string[];
                                    additionalProperties: boolean;
                                    properties: {
                                        label: {
                                            type: string;
                                            description: any;
                                        };
                                        value: {
                                            type: string;
                                            description: any;
                                        };
                                    };
                                })[];
                            };
                        };
                        password?: never;
                        command?: never;
                        args?: never;
                    };
                } | {
                    type: string;
                    required: string[];
                    additionalProperties: boolean;
                    properties: {
                        id: {
                            type: string;
                            description: any;
                        };
                        type: {
                            type: string;
                            description: any;
                            enum: string[];
                            enumDescriptions: any[];
                        };
                        command: {
                            type: string;
                            description: any;
                        };
                        args: {
                            oneOf: {
                                type: string;
                                description: any;
                            }[];
                        };
                        description?: never;
                        default?: never;
                        password?: never;
                        options?: never;
                    };
                })[];
            };
        };
    }
    export { properties_1 as properties };
}
import { $WJ as a } from "../../../services/configuration/common/configuration.js";
declare namespace n {
    let name_1: string;
    export { name_1 as name };
    let configurations_3: never[];
    export { configurations_3 as configurations };
}
export { w as $Ppc, S as $Qpc, g as $Rpc, P as $Spc };
//# sourceMappingURL=debugSchemas.d.ts.map