declare namespace P {
    let extensionPoint: string;
    function activationEventsGenerator(t: any, n: any): void;
    namespace jsonSchema {
        let description: any;
        let type: string;
        let defaultSnippets: {
            body: {
                id: string;
                label: string;
            }[];
        }[];
        namespace items {
            export let additionalProperties: boolean;
            let type_1: string;
            export { type_1 as type };
            let defaultSnippets_1: {
                body: {
                    id: string;
                    label: string;
                };
            }[];
            export { defaultSnippets_1 as defaultSnippets };
            export namespace properties {
                namespace id {
                    let description_1: any;
                    export { description_1 as description };
                    let type_2: string;
                    export { type_2 as type };
                }
                namespace label {
                    let description_2: any;
                    export { description_2 as description };
                    let type_3: string;
                    export { type_3 as type };
                }
            }
        }
    }
}
declare const f: string[];
declare const b: {
    "claude-desktop": any;
    windsurf: any;
    "cursor-global": any;
    "cursor-workspace": any;
};
declare const x: "mcp";
declare const v: "chat.mcp.discovery.enabled";
declare const h: "chat.mcp.enabled";
declare const w: "chat.mcp.serverSampling";
declare const p: {
    "mcp-server-time": {
        command: string;
        args: string[];
        env: {};
    };
};
declare namespace u {
    let type_4: string;
    export { type_4 as type };
    let additionalProperties_1: boolean;
    export { additionalProperties_1 as additionalProperties };
    export let examples: {
        command: string;
        args: string[];
        env: {};
    }[];
    export namespace properties_1 {
        export namespace dev {
            let type_5: string;
            export { type_5 as type };
            export let markdownDescription: any;
            let examples_1: {
                watch: string;
                debug: {
                    type: string;
                };
            }[];
            export { examples_1 as examples };
            let properties_2: any;
            export { properties_2 as properties };
        }
        export namespace type_6 {
            let type_7: string;
            export { type_7 as type };
            let _enum: string[];
            export { _enum as enum };
            let description_3: any;
            export { description_3 as description };
        }
        export { type_6 as type };
        export namespace command {
            let type_8: string;
            export { type_8 as type };
            let description_4: any;
            export { description_4 as description };
        }
        export namespace cwd {
            let type_9: string;
            export { type_9 as type };
            let description_5: any;
            export { description_5 as description };
            let examples_2: string[];
            export { examples_2 as examples };
        }
        export namespace args {
            let type_10: string;
            export { type_10 as type };
            let description_6: any;
            export { description_6 as description };
            export namespace items_1 {
                let type_11: string;
                export { type_11 as type };
            }
            export { items_1 as items };
        }
        export namespace envFile {
            let type_12: string;
            export { type_12 as type };
            let description_7: any;
            export { description_7 as description };
            let examples_3: string[];
            export { examples_3 as examples };
        }
        export namespace env {
            let description_8: any;
            export { description_8 as description };
            export namespace additionalProperties_2 {
                let anyOf: {
                    type: string;
                }[];
            }
            export { additionalProperties_2 as additionalProperties };
        }
    }
    export { properties_1 as properties };
}
declare namespace $ {
    export { l as id };
    let type_13: string;
    export { type_13 as type };
    export let title: any;
    export let allowTrailingCommas: boolean;
    export let allowComments: boolean;
    let additionalProperties_3: boolean;
    export { additionalProperties_3 as additionalProperties };
    export namespace properties_3 {
        namespace servers {
            let examples_4: ({
                "mcp-server-time": {
                    command: string;
                    args: string[];
                    env: {};
                };
            } | {
                "my-mcp-server": {
                    url: string;
                    headers: {};
                };
            })[];
            export { examples_4 as examples };
            export namespace additionalProperties_4 {
                let oneOf: ({
                    type: string;
                    additionalProperties: boolean;
                    examples: {
                        command: string;
                        args: string[];
                        env: {};
                    }[];
                    properties: {
                        dev: {
                            type: string;
                            markdownDescription: any;
                            examples: {
                                watch: string;
                                debug: {
                                    type: string;
                                };
                            }[];
                            properties: any;
                        };
                        type: {
                            type: string;
                            enum: string[];
                            description: any;
                        };
                        command: {
                            type: string;
                            description: any;
                        };
                        cwd: {
                            type: string;
                            description: any;
                            examples: string[];
                        };
                        args: {
                            type: string;
                            description: any;
                            items: {
                                type: string;
                            };
                        };
                        envFile: {
                            type: string;
                            description: any;
                            examples: string[];
                        };
                        env: {
                            description: any;
                            additionalProperties: {
                                anyOf: {
                                    type: string;
                                }[];
                            };
                        };
                    };
                } | {
                    type: string;
                    additionalProperties: boolean;
                    required: string[];
                    examples: {
                        url: string;
                        headers: {};
                    }[];
                    properties: {
                        dev: {
                            type: string;
                            markdownDescription: any;
                            examples: {
                                watch: string;
                                debug: {
                                    type: string;
                                };
                            }[];
                            properties: any;
                        };
                        type: {
                            type: string;
                            enum: string[];
                            description: any;
                        };
                        url: {
                            type: string;
                            format: string;
                            pattern: string;
                            patternErrorMessage: any;
                            description: any;
                        };
                        headers: {
                            type: string;
                            description: any;
                            additionalProperties: {
                                type: string;
                            };
                        };
                    };
                })[];
            }
            export { additionalProperties_4 as additionalProperties };
        }
        let inputs: {
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
    export { properties_3 as properties };
}
declare function d(t: any): string;
declare var o: any;
import { $YJ as l } from "../../../services/configuration/common/configuration.js";
export { P as $0W, f as $1W, b as $2W, x as $3W, v as $4W, h as $5W, w as $6W, p as $7W, u as $8W, $ as $9W, d as $ZW, o as DiscoverySource };
//# sourceMappingURL=mcpConfiguration.d.ts.map