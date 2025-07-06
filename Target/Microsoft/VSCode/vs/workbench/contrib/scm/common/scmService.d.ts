export { w as $Soc };
declare let w: {
    new (t: any, s: any, i: any, e: any, r: any): {
        readonly repositories: MapIterator<any>;
        readonly repositoryCount: number;
        g: any;
        h: any;
        _repositories: Map<any, any>;
        d: n;
        onDidAddRepository: any;
        f: n;
        onDidRemoveRepository: any;
        a: {
            d: any;
            f: any;
            a: C;
            b: Map<any, any>;
            c: any;
            onWillSaveHistory: any;
            g(): void;
            getHistory(t: any, s: any): any;
            h(): boolean;
            dispose(): void;
        };
        b: any;
        c: any;
        registerSCMProvider(t: any): x;
        getRepository(t: any): any;
    };
};
import { $ef as n } from "../../../../base/common/event.js";
import { $ud as C } from "../../../../base/common/lifecycle.js";
declare class x {
    constructor(t: any, s: any, i: any, e: any);
    get selected(): boolean;
    id: any;
    provider: any;
    c: any;
    a: boolean;
    b: n;
    onDidChangeSelection: any;
    input: j;
    setSelected(t: any): void;
    dispose(): void;
}
declare class j extends _ {
    constructor(t: any, s: any);
    get value(): any;
    set placeholder(t: string);
    get placeholder(): string;
    c: string;
    set enabled(t: boolean);
    get enabled(): boolean;
    g: boolean;
    set visible(t: boolean);
    get visible(): boolean;
    j: boolean;
    setFocus(): void;
    showValidationMessage(t: any, s: any): void;
    set validateInput(t: () => Promise<undefined>);
    get validateInput(): () => Promise<undefined>;
    t: () => Promise<undefined>;
    repository: any;
    z: any;
    a: any;
    b: n;
    onDidChange: any;
    f: n;
    onDidChangePlaceholder: any;
    h: n;
    onDidChangeEnablement: any;
    m: n;
    onDidChangeVisibility: any;
    n: n;
    onDidChangeFocus: any;
    s: n;
    onDidChangeValidationMessage: any;
    u: n;
    onDidChangeValidateInput: any;
    y: boolean;
    w: any;
    setValue(t: any, s: any, i: any): void;
    showNextHistoryValue(): void;
    showPreviousHistoryValue(): void;
    C(): void;
}
import { $vd as _ } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=scmService.d.ts.map