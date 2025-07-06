declare const ee: "_notebook.selectKernel";
declare const x: {
    value: any;
    original: any;
};
declare const te: "inline/cell";
declare const oe: "inline/output";
declare const ne: 100;
declare const re: 201;
declare function k(o: any): {
    cell: any;
    selectedCells: any;
    notebookEditor: any;
} | undefined;
declare function U(o: any, e: any): {
    notebookEditor: any;
} | undefined;
declare function ie(o: any, e: any): any;
declare class j extends E {
    run(e: any, t: any, ...n: any[]): Promise<any>;
    c(e: any): boolean;
    getEditorContextFromArgsOrActive(e: any, t: any, ...n: any[]): {
        cell: any;
        selectedCells: any;
        notebookEditor: any;
    } | undefined;
}
declare class ue extends E {
    parseArgs(e: any, ...t: any[]): void;
    run(e: any, ...t: any[]): Promise<any>;
}
declare class le extends j {
    d(e: any): boolean;
    g(e: any, t: any, ...n: any[]): void;
}
declare const se: any;
declare function d(o: any, e: any): any;
declare function fe(o: any, ...e: any[]): {
    ui: boolean;
    notebookEditor: any;
    selectedCells: any;
    autoReveal: any;
    cell?: never;
} | {
    ui: boolean;
    notebookEditor: any;
    selectedCells: any;
    autoReveal?: never;
    cell?: never;
} | {
    ui: boolean;
    notebookEditor: any;
    selectedCells: any;
    cell: any;
    autoReveal?: never;
} | undefined;
declare const de: {
    isOptional: boolean;
    name: string;
    description: string;
    schema: {
        type: string;
        required: string[];
        properties: {
            ranges: {
                type: string;
                items: {
                    type: string;
                    required: string[];
                    properties: {
                        start: {
                            type: string;
                        };
                        end: {
                            type: string;
                        };
                    };
                }[];
            };
            document: {
                type: string;
                description: string;
            };
            autoReveal: {
                type: string;
                description: string;
            };
        };
    };
}[];
declare var h: any;
declare var g: any;
import { $KI as E } from "../../../../../platform/actions/common/actions.js";
export { ee as $BWb, x as $CWb, te as $DWb, oe as $EWb, ne as $FWb, re as $GWb, k as $HWb, U as $IWb, ie as $JWb, j as $KWb, ue as $LWb, le as $MWb, se as $NWb, d as $OWb, fe as $PWb, de as $QWb, h as CellOverflowToolbarGroups, g as CellToolbarOrder };
//# sourceMappingURL=coreActions.d.ts.map