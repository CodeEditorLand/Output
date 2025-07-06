declare let d: {
    new (e: any): {
        a: any;
        canSerialize(e: any): any;
        serialize(e: any): string | undefined;
        deserialize(e: any, i: any): any;
        b(e: any): any;
        c(e: any): {
            origin: any;
            viewType: any;
            providedId: any;
            title: any;
            options: any;
            extensionLocation: any;
            extensionId: any;
            state: any;
            iconPath: {
                light: any;
                dark: any;
            } | undefined;
            group: any;
        };
    };
    ID: string | undefined;
};
declare function w(t: any, e: any): {
    id: l;
    location: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
} | undefined;
declare function R(t: any): any;
declare function m(t: any): any;
import { $Sy as l } from "../../../../platform/extensions/common/extensions.js";
export { d as $41b, w as $51b, R as $61b, m as $71b };
//# sourceMappingURL=webviewEditorInputSerializer.d.ts.map