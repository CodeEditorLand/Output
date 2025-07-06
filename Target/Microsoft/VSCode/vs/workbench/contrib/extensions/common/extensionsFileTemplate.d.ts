declare const o: "vscode://schemas/extensions";
declare namespace r {
    export { o as id };
    export let allowComments: boolean;
    export let allowTrailingCommas: boolean;
    export let type: string;
    export let title: any;
    export let additionalProperties: boolean;
    export namespace properties {
        namespace recommendations {
            let type_1: string;
            export { type_1 as type };
            export let description: any;
            export namespace items {
                let type_2: string;
                export { type_2 as type };
                export { t as pattern };
                export let errorMessage: any;
            }
        }
        namespace unwantedRecommendations {
            let type_3: string;
            export { type_3 as type };
            let description_1: any;
            export { description_1 as description };
            export namespace items_1 {
                let type_4: string;
                export { type_4 as type };
                export { t as pattern };
                let errorMessage_1: any;
                export { errorMessage_1 as errorMessage };
            }
            export { items_1 as items };
        }
    }
}
declare const i: string;
import { $7y as t } from "../../../../platform/extensionManagement/common/extensionManagement.js";
export { o as $dNb, r as $eNb, i as $fNb };
//# sourceMappingURL=extensionsFileTemplate.d.ts.map