declare const k: any;
declare class P {
    constructor(t: any, e: any);
    get name(): any;
    get iconPath(): any;
    get iconClass(): any;
    a: any;
    b: any;
    resolve(t: any): Promise<any>;
    execute(): Promise<void>;
}
declare let g: {
    new (t: any, e: any, i: any): {
        g: any;
        h: any;
        i: any;
        a: Map<any, any>;
        b: Map<any, any>;
        d: Map<any, any>;
        f: any[];
        getApplicableFor(t: any, e: any): Promise<{
            object: any[];
            dispose: () => void;
        }>;
        register(t: any): any;
        registerTree(t: any, e: any): any;
        getVisualizedNodeFor(t: any, e: any): Promise<m | undefined>;
        getVisualizedChildren(t: any, e: any, i: any): Promise<any>;
        editTreeItem(t: any, e: any, i: any): Promise<void>;
        j(t: any, e: any): {
            sessionId: any;
            containerId: any;
            threadId: any;
            variable: {
                name: any;
                value: any;
                type: any;
                evaluateName: any;
                variablesReference: any;
                indexedVariables: any;
                memoryReference: any;
                namedVariables: any;
                presentationHint: any;
            };
        };
        k(t: any): void;
    };
};
import { $1T as m } from "./debugModel.js";
export { k as $VT, P as $WT, g as $XT };
//# sourceMappingURL=debugVisualizers.d.ts.map