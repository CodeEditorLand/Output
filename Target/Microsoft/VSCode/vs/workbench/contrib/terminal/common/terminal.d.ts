declare const k: "terminal";
declare const u: string[];
declare const p: "terminal.integrated";
declare const v: 0;
declare const f: -5;
declare const g: 1 | 1.1;
declare const S: 1;
declare const x: 1000;
declare const P: "normal";
declare const A: "bold";
declare const L: string[];
declare const E: any;
declare const y: 633;
declare const R: any;
declare function z(e: any): boolean;
declare const N: "workbench.action.terminal.profile.choice";
declare const m: string[];
declare namespace W {
    let extensionPoint: string;
    let defaultExtensionKind: string[];
    function activationEventsGenerator(e: any, i: any): void;
    namespace jsonSchema {
        let description: any;
        let type: string;
        namespace properties {
            namespace profiles {
                let type_1: string;
                export { type_1 as type };
                let description_1: any;
                export { description_1 as description };
                export namespace items {
                    let type_2: string;
                    export { type_2 as type };
                    export let required: string[];
                    export let defaultSnippets: {
                        body: {
                            id: string;
                            title: string;
                        };
                    }[];
                    export namespace properties_1 {
                        namespace id {
                            let description_2: any;
                            export { description_2 as description };
                            let type_3: string;
                            export { type_3 as type };
                        }
                        namespace title {
                            let description_3: any;
                            export { description_3 as description };
                            let type_4: string;
                            export { type_4 as type };
                        }
                        namespace icon {
                            let description_4: any;
                            export { description_4 as description };
                            export let anyOf: ({
                                type: string;
                                properties?: never;
                            } | {
                                type: string;
                                properties: {
                                    light: {
                                        description: any;
                                        type: string;
                                    };
                                    dark: {
                                        description: any;
                                        type: string;
                                    };
                                };
                            })[];
                        }
                    }
                    export { properties_1 as properties };
                }
            }
        }
    }
}
declare var t: any;
declare var n: any;
export { k as $A4, u as $B4, p as $C4, v as $D4, f as $E4, g as $F4, S as $G4, x as $H4, P as $I4, A as $J4, L as $K4, E as $L4, y as $M4, R as $N4, z as $O4, N as $P4, m as $Q4, W as $R4, t as ProcessState, n as TerminalCommandId };
//# sourceMappingURL=terminal.d.ts.map