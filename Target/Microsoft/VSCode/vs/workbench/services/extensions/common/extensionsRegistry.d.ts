declare class D {
    constructor(i: any, l: any, n: any);
    name: any;
    defaultExtensionKind: any;
    canHandleResolver: any;
    a: any;
    b: any;
    c: t | null;
    setHandler(i: any): {
        dispose: () => void;
    };
    acceptUsers(i: any): void;
    d(): void;
}
declare namespace p {
    namespace properties {
        namespace engines {
            export let type: string;
            export let description: any;
            export namespace properties_1 {
                namespace vscode {
                    let type_1: string;
                    export { type_1 as type };
                    let description_1: any;
                    export { description_1 as description };
                    let _default: string;
                    export { _default as default };
                }
            }
            export { properties_1 as properties };
        }
        namespace publisher {
            let description_2: any;
            export { description_2 as description };
            let type_2: string;
            export { type_2 as type };
        }
        namespace displayName {
            let description_3: any;
            export { description_3 as description };
            let type_3: string;
            export { type_3 as type };
        }
        namespace categories {
            let description_4: any;
            export { description_4 as description };
            let type_4: string;
            export { type_4 as type };
            export let uniqueItems: boolean;
            export namespace items {
                let oneOf: ({
                    type: string;
                    enum: string[];
                    const?: never;
                    deprecationMessage?: never;
                } | {
                    type: string;
                    const: string;
                    deprecationMessage: any;
                    enum?: never;
                })[];
            }
        }
        namespace galleryBanner {
            let type_5: string;
            export { type_5 as type };
            let description_5: any;
            export { description_5 as description };
            export namespace properties_2 {
                namespace color {
                    let description_6: any;
                    export { description_6 as description };
                    let type_6: string;
                    export { type_6 as type };
                }
                namespace theme {
                    let description_7: any;
                    export { description_7 as description };
                    let type_7: string;
                    export { type_7 as type };
                    let _enum: string[];
                    export { _enum as enum };
                }
            }
            export { properties_2 as properties };
        }
        namespace contributes {
            let description_8: any;
            export { description_8 as description };
            let type_8: string;
            export { type_8 as type };
            let properties_3: {};
            export { properties_3 as properties };
            let _default_1: {};
            export { _default_1 as default };
        }
        namespace preview {
            let type_9: string;
            export { type_9 as type };
            let description_9: any;
            export { description_9 as description };
        }
        namespace enableProposedApi {
            let type_10: string;
            export { type_10 as type };
            export let deprecationMessage: any;
        }
        namespace enabledApiProposals {
            export let markdownDescription: any;
            let type_11: string;
            export { type_11 as type };
            let uniqueItems_1: boolean;
            export { uniqueItems_1 as uniqueItems };
            export namespace items_1 {
                let type_12: string;
                export { type_12 as type };
                let _enum_1: string[];
                export { _enum_1 as enum };
                export let markdownEnumDescriptions: string[];
            }
            export { items_1 as items };
        }
        namespace api {
            let markdownDescription_1: any;
            export { markdownDescription_1 as markdownDescription };
            let type_13: string;
            export { type_13 as type };
            let _enum_2: string[];
            export { _enum_2 as enum };
            export let enumDescriptions: any[];
        }
        namespace activationEvents {
            let description_10: any;
            export { description_10 as description };
            let type_14: string;
            export { type_14 as type };
            export namespace items_2 {
                let type_15: string;
                export { type_15 as type };
                export let defaultSnippets: {
                    label: string;
                    description: any;
                    body: string;
                }[];
            }
            export { items_2 as items };
        }
        namespace badges {
            let type_16: string;
            export { type_16 as type };
            let description_11: any;
            export { description_11 as description };
            export namespace items_3 {
                let type_17: string;
                export { type_17 as type };
                export let required: string[];
                export namespace properties_4 {
                    export namespace url {
                        let type_18: string;
                        export { type_18 as type };
                        let description_12: any;
                        export { description_12 as description };
                    }
                    export namespace href {
                        let type_19: string;
                        export { type_19 as type };
                        let description_13: any;
                        export { description_13 as description };
                    }
                    export namespace description_14 {
                        let type_20: string;
                        export { type_20 as type };
                        let description_15: any;
                        export { description_15 as description };
                    }
                    export { description_14 as description };
                }
                export { properties_4 as properties };
            }
            export { items_3 as items };
        }
        namespace markdown {
            let type_21: string;
            export { type_21 as type };
            let description_16: any;
            export { description_16 as description };
            let _enum_3: string[];
            export { _enum_3 as enum };
            let _default_2: string;
            export { _default_2 as default };
        }
        namespace qna {
            let _default_3: string;
            export { _default_3 as default };
            let description_17: any;
            export { description_17 as description };
            export let anyOf: ({
                type: string[];
                enum: (string | boolean)[];
            } | {
                type: string;
                enum?: never;
            })[];
        }
        namespace extensionDependencies {
            let description_18: any;
            export { description_18 as description };
            let type_22: string;
            export { type_22 as type };
            let uniqueItems_2: boolean;
            export { uniqueItems_2 as uniqueItems };
            export namespace items_4 {
                let type_23: string;
                export { type_23 as type };
                export { y as pattern };
            }
            export { items_4 as items };
        }
        namespace extensionPack {
            let description_19: any;
            export { description_19 as description };
            let type_24: string;
            export { type_24 as type };
            let uniqueItems_3: boolean;
            export { uniqueItems_3 as uniqueItems };
            export namespace items_5 {
                let type_25: string;
                export { type_25 as type };
                export { y as pattern };
            }
            export { items_5 as items };
        }
        namespace extensionKind {
            let description_20: any;
            export { description_20 as description };
            let type_26: string;
            export { type_26 as type };
            export { v as items };
            let _default_4: string[];
            export { _default_4 as default };
            let defaultSnippets_1: {
                body: string[];
                description: any;
            }[];
            export { defaultSnippets_1 as defaultSnippets };
        }
        namespace capabilities {
            let description_21: any;
            export { description_21 as description };
            let type_27: string;
            export { type_27 as type };
            export namespace properties_5 {
                namespace virtualWorkspaces {
                    let description_22: any;
                    export { description_22 as description };
                    let type_28: string[];
                    export { type_28 as type };
                    let defaultSnippets_2: ({
                        label: string;
                        body: {
                            supported: string;
                            description: string;
                        };
                    } | {
                        label: string;
                        body: {
                            supported: boolean;
                            description: string;
                        };
                    })[];
                    export { defaultSnippets_2 as defaultSnippets };
                    let _default_5: () => boolean;
                    export { _default_5 as default };
                    export namespace properties_6 {
                        export namespace supported {
                            let markdownDescription_2: any;
                            export { markdownDescription_2 as markdownDescription };
                            let type_29: string[];
                            export { type_29 as type };
                            let _enum_4: (string | boolean)[];
                            export { _enum_4 as enum };
                            let enumDescriptions_1: any[];
                            export { enumDescriptions_1 as enumDescriptions };
                        }
                        export namespace description_23 {
                            let type_30: string;
                            export { type_30 as type };
                            let markdownDescription_3: any;
                            export { markdownDescription_3 as markdownDescription };
                        }
                        export { description_23 as description };
                    }
                    export { properties_6 as properties };
                }
                namespace untrustedWorkspaces {
                    let description_24: any;
                    export { description_24 as description };
                    let type_31: string;
                    export { type_31 as type };
                    let required_1: string[];
                    export { required_1 as required };
                    let defaultSnippets_3: {
                        body: {
                            supported: string;
                            description: string;
                        };
                    }[];
                    export { defaultSnippets_3 as defaultSnippets };
                    export namespace properties_7 {
                        export namespace supported_1 {
                            let markdownDescription_4: any;
                            export { markdownDescription_4 as markdownDescription };
                            let type_32: string[];
                            export { type_32 as type };
                            let _enum_5: (string | boolean)[];
                            export { _enum_5 as enum };
                            let enumDescriptions_2: any[];
                            export { enumDescriptions_2 as enumDescriptions };
                        }
                        export { supported_1 as supported };
                        export namespace restrictedConfigurations {
                            let description_25: any;
                            export { description_25 as description };
                            let type_33: string;
                            export { type_33 as type };
                            export namespace items_6 {
                                let type_34: string;
                                export { type_34 as type };
                            }
                            export { items_6 as items };
                        }
                        export namespace description_26 {
                            let type_35: string;
                            export { type_35 as type };
                            let markdownDescription_5: any;
                            export { markdownDescription_5 as markdownDescription };
                        }
                        export { description_26 as description };
                    }
                    export { properties_7 as properties };
                }
            }
            export { properties_5 as properties };
        }
        namespace sponsor {
            let description_27: any;
            export { description_27 as description };
            let type_36: string;
            export { type_36 as type };
            let defaultSnippets_4: {
                body: {
                    url: string;
                };
            }[];
            export { defaultSnippets_4 as defaultSnippets };
            export namespace properties_8 {
                export namespace url_1 {
                    let description_28: any;
                    export { description_28 as description };
                    let type_37: string;
                    export { type_37 as type };
                }
                export { url_1 as url };
            }
            export { properties_8 as properties };
        }
        namespace scripts {
            let type_38: string;
            export { type_38 as type };
            let properties_9: {
                "vscode:prepublish": {
                    description: any;
                    type: string;
                };
                "vscode:uninstall": {
                    description: any;
                    type: string;
                };
            };
            export { properties_9 as properties };
        }
        namespace icon {
            let type_39: string;
            export { type_39 as type };
            let description_29: any;
            export { description_29 as description };
        }
        namespace l10n {
            let type_40: string;
            export { type_40 as type };
            let description_30: any;
            export { description_30 as description };
        }
        namespace pricing {
            let type_41: string;
            export { type_41 as type };
            let markdownDescription_6: any;
            export { markdownDescription_6 as markdownDescription };
            let _enum_6: string[];
            export { _enum_6 as enum };
            let _default_6: string;
            export { _default_6 as default };
        }
    }
}
declare class P {
    a: Map<any, any>;
    registerExtensionPoint(i: any): D;
    getExtensionPoints(): any[];
}
declare const F: any;
declare class A {
    constructor(i: any, l: any, n: any);
    a: any;
    b: any;
    c: any;
    d(i: any, l: any): void;
    error(i: any): void;
    warn(i: any): void;
    info(i: any): void;
}
declare class t {
    static a(i: any): w;
    static compute(i: any, l: any): t;
    constructor(i: any, l: any);
    added: any;
    removed: any;
}
import { $7y as y } from "../../../../platform/extensionManagement/common/extensionManagement.js";
declare namespace v {
    let type_42: string;
    export { type_42 as type };
    let _enum_7: string[];
    export { _enum_7 as enum };
    let enumDescriptions_3: any[];
    export { enumDescriptions_3 as enumDescriptions };
}
import { $Ty as w } from "../../../../platform/extensions/common/extensions.js";
export { D as $1O, p as $2O, P as $3O, F as $4O, A as $YO, t as $ZO };
//# sourceMappingURL=extensionsRegistry.d.ts.map