declare class H extends C {
    constructor();
    runEditorCommand(t: any, i: any): void;
}
declare class l extends C {
    constructor();
    runEditorCommand(t: any, i: any): void;
}
declare class F extends y {
    constructor(t: any, i: any);
    b: any;
    suppressMouseDown: boolean;
    allowEditorOverflow: boolean;
    a: HTMLDivElement;
    getId(): string;
    getDomNode(): HTMLDivElement;
    getPosition(): {
        position: any;
        preference: number[];
    } | null;
    beforeRender(): null;
    show(): void;
    layout(): void;
    active(): void;
    hide(): void;
}
declare let c: {
    new (t: any, i: any, e: any, o: any): {
        f: any;
        g: any;
        c: any;
        a: any;
        b: any;
        start(): Promise<void>;
        stop(): void;
        q: S;
        dispose(): void;
        B(t: any): any;
    };
    ID: string | undefined;
    get(t: any): any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Gab as C } from "../../../../../editor/browser/editorExtensions.js";
import { $vd as y } from "../../../../../base/common/lifecycle.js";
import { $ud as S } from "../../../../../base/common/lifecycle.js";
export { H as $4Tb, l as $5Tb, F as $6Tb, c as $7Tb };
//# sourceMappingURL=editorDictation.d.ts.map