export { o as default };
declare namespace o {
    namespace definitions {
        namespace showOutputType {
            export let type: string;
            let _enum: string[];
            export { _enum as enum };
        }
        namespace options {
            let type_1: string;
            export { type_1 as type };
            export let description: any;
            export namespace properties {
                namespace cwd {
                    let type_2: string;
                    export { type_2 as type };
                    let description_1: any;
                    export { description_1 as description };
                }
                namespace env {
                    let type_3: string;
                    export { type_3 as type };
                    export namespace additionalProperties {
                        let type_4: string;
                        export { type_4 as type };
                    }
                    let description_2: any;
                    export { description_2 as description };
                }
            }
            export namespace additionalProperties_1 {
                let type_5: string[];
                export { type_5 as type };
            }
            export { additionalProperties_1 as additionalProperties };
        }
        namespace problemMatcherType {
            let oneOf: any[];
        }
        namespace shellConfiguration {
            let type_6: string;
            export { type_6 as type };
            let additionalProperties_2: boolean;
            export { additionalProperties_2 as additionalProperties };
            let description_3: any;
            export { description_3 as description };
            export namespace properties_1 {
                namespace executable {
                    let type_7: string;
                    export { type_7 as type };
                    let description_4: any;
                    export { description_4 as description };
                }
                namespace args {
                    let type_8: string;
                    export { type_8 as type };
                    let description_5: any;
                    export { description_5 as description };
                    export namespace items {
                        let type_9: string;
                        export { type_9 as type };
                    }
                }
            }
            export { properties_1 as properties };
        }
        namespace commandConfiguration {
            let type_10: string;
            export { type_10 as type };
            let additionalProperties_3: boolean;
            export { additionalProperties_3 as additionalProperties };
            export namespace properties_2 {
                export namespace command {
                    let type_11: string;
                    export { type_11 as type };
                    let description_6: any;
                    export { description_6 as description };
                }
                export namespace args_1 {
                    let type_12: string;
                    export { type_12 as type };
                    let description_7: any;
                    export { description_7 as description };
                    export namespace items_1 {
                        let type_13: string;
                        export { type_13 as type };
                    }
                    export { items_1 as items };
                }
                export { args_1 as args };
                export namespace options_1 {
                    let $ref: string;
                }
                export { options_1 as options };
            }
            export { properties_2 as properties };
        }
        namespace taskDescription {
            let type_14: string;
            export { type_14 as type };
            export let required: string[];
            let additionalProperties_4: boolean;
            export { additionalProperties_4 as additionalProperties };
            export namespace properties_3 {
                export namespace taskName {
                    let type_15: string;
                    export { type_15 as type };
                    let description_8: any;
                    export { description_8 as description };
                }
                export namespace command_1 {
                    let type_16: string;
                    export { type_16 as type };
                    let description_9: any;
                    export { description_9 as description };
                }
                export { command_1 as command };
                export namespace args_2 {
                    let type_17: string;
                    export { type_17 as type };
                    let description_10: any;
                    export { description_10 as description };
                    export namespace items_2 {
                        let type_18: string;
                        export { type_18 as type };
                    }
                    export { items_2 as items };
                }
                export { args_2 as args };
                export namespace options_2 {
                    let $ref_1: string;
                    export { $ref_1 as $ref };
                }
                export { options_2 as options };
                export namespace windows {
                    let anyOf: ({
                        $ref: string;
                        description: any;
                        properties?: never;
                    } | {
                        properties: {
                            problemMatcher: {
                                $ref: string;
                                description: any;
                            };
                        };
                        $ref?: never;
                        description?: never;
                    })[];
                }
                export namespace osx {
                    let anyOf_1: ({
                        $ref: string;
                        description: any;
                        properties?: never;
                    } | {
                        properties: {
                            problemMatcher: {
                                $ref: string;
                                description: any;
                            };
                        };
                        $ref?: never;
                        description?: never;
                    })[];
                    export { anyOf_1 as anyOf };
                }
                export namespace linux {
                    let anyOf_2: ({
                        $ref: string;
                        description: any;
                        properties?: never;
                    } | {
                        properties: {
                            problemMatcher: {
                                $ref: string;
                                description: any;
                            };
                        };
                        $ref?: never;
                        description?: never;
                    })[];
                    export { anyOf_2 as anyOf };
                }
                export namespace suppressTaskName {
                    let type_19: string;
                    export { type_19 as type };
                    let description_11: any;
                    export { description_11 as description };
                    let _default: boolean;
                    export { _default as default };
                }
                export namespace showOutput {
                    let $ref_2: string;
                    export { $ref_2 as $ref };
                    let description_12: any;
                    export { description_12 as description };
                }
                export namespace echoCommand {
                    let type_20: string;
                    export { type_20 as type };
                    let description_13: any;
                    export { description_13 as description };
                    let _default_1: boolean;
                    export { _default_1 as default };
                }
                export namespace isWatching {
                    let type_21: string;
                    export { type_21 as type };
                    export let deprecationMessage: any;
                    let description_14: any;
                    export { description_14 as description };
                    let _default_2: boolean;
                    export { _default_2 as default };
                }
                export namespace isBackground {
                    let type_22: string;
                    export { type_22 as type };
                    let description_15: any;
                    export { description_15 as description };
                    let _default_3: boolean;
                    export { _default_3 as default };
                }
                export namespace promptOnClose {
                    let type_23: string;
                    export { type_23 as type };
                    let description_16: any;
                    export { description_16 as description };
                    let _default_4: boolean;
                    export { _default_4 as default };
                }
                export namespace isBuildCommand {
                    let type_24: string;
                    export { type_24 as type };
                    let description_17: any;
                    export { description_17 as description };
                    let _default_5: boolean;
                    export { _default_5 as default };
                }
                export namespace isTestCommand {
                    let type_25: string;
                    export { type_25 as type };
                    let description_18: any;
                    export { description_18 as description };
                    let _default_6: boolean;
                    export { _default_6 as default };
                }
                export namespace problemMatcher {
                    let $ref_3: string;
                    export { $ref_3 as $ref };
                    let description_19: any;
                    export { description_19 as description };
                }
            }
            export { properties_3 as properties };
        }
        namespace taskRunnerConfiguration {
            let type_26: string;
            export { type_26 as type };
            let required_1: never[];
            export { required_1 as required };
            export namespace properties_4 {
                export namespace command_2 {
                    let type_27: string;
                    export { type_27 as type };
                    let description_20: any;
                    export { description_20 as description };
                }
                export { command_2 as command };
                export namespace args_3 {
                    let type_28: string;
                    export { type_28 as type };
                    let description_21: any;
                    export { description_21 as description };
                    export namespace items_3 {
                        let type_29: string;
                        export { type_29 as type };
                    }
                    export { items_3 as items };
                }
                export { args_3 as args };
                export namespace options_3 {
                    let $ref_4: string;
                    export { $ref_4 as $ref };
                }
                export { options_3 as options };
                export namespace showOutput_1 {
                    let $ref_5: string;
                    export { $ref_5 as $ref };
                    let description_22: any;
                    export { description_22 as description };
                }
                export { showOutput_1 as showOutput };
                export namespace isWatching_1 {
                    let type_30: string;
                    export { type_30 as type };
                    let deprecationMessage_1: any;
                    export { deprecationMessage_1 as deprecationMessage };
                    let description_23: any;
                    export { description_23 as description };
                    let _default_7: boolean;
                    export { _default_7 as default };
                }
                export { isWatching_1 as isWatching };
                export namespace isBackground_1 {
                    let type_31: string;
                    export { type_31 as type };
                    let description_24: any;
                    export { description_24 as description };
                    let _default_8: boolean;
                    export { _default_8 as default };
                }
                export { isBackground_1 as isBackground };
                export namespace promptOnClose_1 {
                    let type_32: string;
                    export { type_32 as type };
                    let description_25: any;
                    export { description_25 as description };
                    let _default_9: boolean;
                    export { _default_9 as default };
                }
                export { promptOnClose_1 as promptOnClose };
                export namespace echoCommand_1 {
                    let type_33: string;
                    export { type_33 as type };
                    let description_26: any;
                    export { description_26 as description };
                    let _default_10: boolean;
                    export { _default_10 as default };
                }
                export { echoCommand_1 as echoCommand };
                export namespace suppressTaskName_1 {
                    let type_34: string;
                    export { type_34 as type };
                    let description_27: any;
                    export { description_27 as description };
                    let _default_11: boolean;
                    export { _default_11 as default };
                }
                export { suppressTaskName_1 as suppressTaskName };
                export namespace taskSelector {
                    let type_35: string;
                    export { type_35 as type };
                    let description_28: any;
                    export { description_28 as description };
                }
                export namespace problemMatcher_1 {
                    let $ref_6: string;
                    export { $ref_6 as $ref };
                    let description_29: any;
                    export { description_29 as description };
                }
                export { problemMatcher_1 as problemMatcher };
                export namespace tasks {
                    let type_36: string;
                    export { type_36 as type };
                    let description_30: any;
                    export { description_30 as description };
                    export namespace items_4 {
                        let type_37: string;
                        export { type_37 as type };
                        let $ref_7: string;
                        export { $ref_7 as $ref };
                    }
                    export { items_4 as items };
                }
            }
            export { properties_4 as properties };
        }
    }
}
//# sourceMappingURL=jsonSchemaCommon.d.ts.map