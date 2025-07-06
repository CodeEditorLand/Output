declare let m: {
    new (s: any, e: any, t: any): {
        a: any;
        b: any;
        c: any;
        initialize(s: any): Promise<void>;
    };
};
declare let p: {
    new (s: any, e: any): {
        a: any;
        b: any;
        getContent(s: any, e: any): Promise<string>;
        apply(s: any, e: any): Promise<void>;
        c(s: any, e: any): Promise<{}>;
        getSnippetsResources(s: any, e: any): Promise<any[]>;
    };
};
declare let b: {
    new (s: any, e: any, t: any): {
        b: any;
        c: any;
        d: any;
        type: string;
        label: {
            label: any;
        };
        collapsibleState: any;
        a: y;
        handle: any;
        getChildren(): Promise<any>;
        hasContent(): Promise<boolean>;
        getContent(): Promise<any>;
        isFromDefaultProfile(): boolean;
    };
};
import { $Jc as y } from "../../../../base/common/map.js";
export { m as $76b, p as $86b, b as $96b };
//# sourceMappingURL=snippetsResource.d.ts.map