export { O as $K8b };
declare let O: {
    new (e: any, t: any): {
        a: f;
        b: f;
        c: f;
        d: b;
        f: f;
        e: {
            openExternal: (r: any) => Promise<boolean>;
        };
        registerOpener(e: any): {
            dispose: () => void;
        };
        registerValidator(e: any): {
            dispose: () => void;
        };
        registerExternalUriResolver(e: any): {
            dispose: () => void;
        };
        setDefaultExternalOpener(e: any): void;
        registerExternalOpener(e: any): {
            dispose: () => void;
        };
        open(e: any, t: any): Promise<boolean>;
        resolveExternalUri(e: any, t: any): Promise<any>;
        g(e: any, t: any): Promise<boolean>;
        dispose(): void;
    };
};
import { $Gd as f } from "../../../base/common/linkedList.js";
import { $Ic as b } from "../../../base/common/map.js";
//# sourceMappingURL=openerService.d.ts.map