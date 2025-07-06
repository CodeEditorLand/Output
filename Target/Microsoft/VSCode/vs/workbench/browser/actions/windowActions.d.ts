declare const X: "inRecentFilesPicker";
declare class P extends Y {
    constructor();
    d(): boolean;
}
declare class D extends h {
    constructor();
    run(t: any): Promise<any>;
}
declare class Y extends h {
    a: {
        iconClass: any;
        tooltip: any;
    };
    b: {
        iconClass: string;
        tooltip: any;
        alwaysVisible: boolean;
    };
    c: {
        tooltip: any;
        iconClass: string;
        alwaysVisible: boolean;
    };
    run(t: any): Promise<any>;
    e(t: any, i: any, f: any, n: any, u: any): {
        iconClasses: string[];
        label: any;
        ariaLabel: any;
        description: any;
        buttons: {
            iconClass: any;
            tooltip: any;
        }[];
        openable: {
            folderUri: any;
            workspaceUri?: never;
            fileUri?: never;
        } | {
            workspaceUri: any;
            folderUri?: never;
            fileUri?: never;
        } | {
            fileUri: any;
            folderUri?: never;
            workspaceUri?: never;
        };
        resource: any;
        remoteAuthority: any;
    };
}
import { $KI as h } from "../../../platform/actions/common/actions.js";
export { X as $1Lb, P as $2Lb, D as $3Lb };
//# sourceMappingURL=windowActions.d.ts.map