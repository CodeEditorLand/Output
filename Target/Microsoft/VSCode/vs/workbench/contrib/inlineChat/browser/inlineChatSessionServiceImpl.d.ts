declare class L extends Error {
    constructor(e: any);
    name: string | undefined;
}
declare let D: {
    new (e: any, t: any, o: any, i: any, n: any, r: any, s: any, d: any, h: any, u: any, g: any, c: any, p: any): {
        i: any;
        j: any;
        k: any;
        l: any;
        m: any;
        n: any;
        o: any;
        p: any;
        q: any;
        s: any;
        t: any;
        u: any;
        v: any;
        a: S;
        b: any;
        onWillStartSession: any;
        c: any;
        onDidMoveSession: any;
        d: any;
        onDidEndSession: any;
        f: any;
        onDidStashSession: any;
        g: Map<any, any>;
        h: Map<any, any>;
        z: F;
        A: any;
        onDidChangeSessions: any;
        hideOnRequest: any;
        dispose(): void;
        createSession(e: any, t: any, o: any): Promise<fe | undefined>;
        moveSession(e: any, t: any): void;
        releaseSession(e: any): void;
        w(e: any, t: any): void;
        stashSession(e: any, t: any, o: any): any;
        getCodeEditor(e: any): any;
        getSession(e: any, t: any): any;
        y(e: any, t: any): any;
        registerSessionKeyComputer(e: any, t: any): any;
        createSession2(e: any, t: any, o: any): Promise<{
            uri: any;
            initialPosition: any;
            chatModel: any;
            editingSession: any;
            dispose: () => void;
        }>;
        getSession2(e: any): any;
    };
};
declare let x: {
    new (e: any, t: any, o: any, i: any): {
        d: S;
        a: any;
        b: any;
        c: any;
        dispose(): void;
    };
    Id: string | undefined;
};
import { $ud as S } from "../../../../base/common/lifecycle.js";
import { $Ic as F } from "../../../../base/common/map.js";
import { $kDb as fe } from "./inlineChatSession.js";
export { L as $f_b, D as $g_b, x as $h_b };
//# sourceMappingURL=inlineChatSessionServiceImpl.d.ts.map