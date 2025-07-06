declare let u: {
    new (n: any): {
        a: any;
        invoke(n: any, s: any, i: any, r: any): Promise<{
            content: {
                kind: string;
                value: any;
            }[];
            toolResultDetails?: never;
        } | {
            content: {
                kind: string;
                value: string;
            }[];
            toolResultDetails: {
                input: string;
                output: {
                    isText: boolean;
                    value: string;
                }[];
            };
        }>;
    };
};
declare const _: "vscode_searchExtensions_internal";
declare namespace S {
    export { _ as id };
    export let toolReferenceName: string;
    export let canBeReferencedInPrompt: boolean;
    export let icon: any;
    export let displayName: any;
    export let modelDescription: any;
    export let userDescription: any;
    export let source: any;
    export namespace inputSchema {
        let type: string;
        namespace properties {
            namespace category {
                let type_1: string;
                export { type_1 as type };
                export let description: string;
                export { x as enum };
            }
            namespace keywords {
                let type_2: string;
                export { type_2 as type };
                export namespace items {
                    let type_3: string;
                    export { type_3 as type };
                }
                let description_1: string;
                export { description_1 as description };
            }
            namespace ids {
                let type_4: string;
                export { type_4 as type };
                export namespace items_1 {
                    let type_5: string;
                    export { type_5 as type };
                }
                export { items_1 as items };
                let description_2: string;
                export { description_2 as description };
            }
        }
    }
}
import { $Ry as x } from "../../../../platform/extensions/common/extensions.js";
export { u as $Ajc, _ as $yjc, S as $zjc };
//# sourceMappingURL=searchExtensionsTool.d.ts.map