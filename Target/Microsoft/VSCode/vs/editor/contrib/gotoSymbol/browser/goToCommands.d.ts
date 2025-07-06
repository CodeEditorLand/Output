declare class D {
    static is(e: any): boolean;
    constructor(e: any, t: any);
    model: any;
    position: any;
}
declare class u extends re {
    static all(): MapIterator<any>;
    static g(e: any): any;
    constructor(e: any, t: any);
    configuration: any;
    runEditorCommand(e: any, t: any, o: any, n: any): Promise<void>;
    m(e: any, t: any, o: any, n: any, l: any): Promise<void>;
    n(e: any, t: any, o: any, n: any, l: any): Promise<any>;
    o(e: any, t: any, o: any): void;
}
declare class R extends u {
    h(e: any, t: any, o: any, n: any): Promise<k>;
    j(e: any): any;
    k(e: any): any;
    l(e: any): any;
}
import { $Gab as re } from "../../../browser/editorExtensions.js";
import { $jnb as k } from "./referencesModel.js";
export { D as $Cnb, u as $Dnb, R as $Enb };
//# sourceMappingURL=goToCommands.d.ts.map