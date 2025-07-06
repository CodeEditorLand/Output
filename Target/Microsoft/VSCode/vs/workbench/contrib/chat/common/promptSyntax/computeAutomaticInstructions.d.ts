export { y as $rRb };
declare let y: {
    new (i: any, o: any, e: any, s: any, t: any, n: any, r: any): {
        c: any;
        d: any;
        _logService: any;
        e: any;
        f: any;
        g: any;
        h: any;
        a: P;
        b: any[];
        readonly autoAddedInstructions: any[];
        j(i: any, o: any): Promise<any>;
        collect(i: any, o: any): Promise<void>;
        findInstructionFilesFor(i: any, o: any, e: any): Promise<{
            id: string;
            name: string;
            value: any;
            kind: string;
            modelDescription: string;
            isRoot: boolean;
            originLabel: any;
            automaticallyAdded: boolean;
        }[]>;
        k(i: any): {
            files: m;
            instructions: m;
        };
        l(): Promise<{
            id: string;
            name: string;
            value: any;
            kind: string;
            modelDescription: string;
            isRoot: boolean;
            originLabel: any;
            automaticallyAdded: boolean;
        }[]>;
        m(i: any, o: any): {
            pattern: any;
            file?: never;
        } | {
            pattern: any;
            file: any;
        } | undefined;
        n(i: any, o: any, e: any): Promise<string[]>;
        o(i: any, o: any): Promise<void>;
    };
};
import { $Ic as P } from "../../../../../base/common/map.js";
import { $Jc as m } from "../../../../../base/common/map.js";
//# sourceMappingURL=computeAutomaticInstructions.d.ts.map