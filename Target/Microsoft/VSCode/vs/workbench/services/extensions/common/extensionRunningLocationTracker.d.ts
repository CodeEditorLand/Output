declare let k: {
    new (n: any, i: any, t: any, s: any, o: any, r: any): {
        readonly maxLocalProcessAffinity: number;
        readonly maxLocalWebWorkerAffinity: number;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        a: y;
        b: number;
        c: number;
        set(n: any, i: any): void;
        readExtensionKinds(n: any): any;
        getRunningLocation(n: any): any;
        filterByRunningLocation(n: any, i: any): any;
        filterByExtensionHostKind(n: any, i: any): any;
        filterByExtensionHostManager(n: any, i: any): any;
        k(n: any, i: any, t: any): {
            affinities: y;
            maxAffinity: number;
        };
        computeRunningLocation(n: any, i: any, t: any): y;
        l(n: any, i: any, t: any, s: any): {
            runningLocation: y;
            maxLocalProcessAffinity: number;
            maxLocalWebWorkerAffinity: number;
        };
        initializeRunningLocation(n: any, i: any): void;
        deltaExtensions(n: any, i: any): y;
        m(n: any): void;
    };
};
declare function w(g: any, n: any, i: any): any;
declare function V(g: any, n: any, i: any): any;
import { $Uy as y } from "../../../../platform/extensions/common/extensions.js";
export { k as $TBc, w as $UBc, V as $VBc };
//# sourceMappingURL=extensionRunningLocationTracker.d.ts.map