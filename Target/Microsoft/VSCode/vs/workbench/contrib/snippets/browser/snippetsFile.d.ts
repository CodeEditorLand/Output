declare class j {
    constructor(t: any, e: any, a: any, i: any, o: any, s: any, r: any, h: any, l: any, p: any);
    isFileTemplate: any;
    scopes: any;
    name: any;
    prefix: any;
    description: any;
    body: any;
    source: any;
    snippetSource: any;
    snippetIdentifier: any;
    extensionId: any;
    prefixLow: any;
    a: B;
    get codeSnippet(): any;
    get isBogous(): any;
    get isTrivial(): any;
    get needsClipboard(): any;
    get usesSelection(): any;
}
declare class G {
    constructor(t: any, e: any, a: any, i: any, o: any, s: any);
    source: any;
    location: any;
    defaultScopes: any;
    b: any;
    c: any;
    d: any;
    data: any[];
    isGlobalSnippets: boolean;
    isUserSnippets: boolean;
    select(t: any, e: any): void;
    e(t: any, e: any): void;
    f(t: any, e: any): void;
    g(): Promise<any>;
    load(): Promise<this>;
    a: Promise<this> | undefined;
    reset(): void;
    h(t: any, e: any, a: any): void;
}
declare var u: any;
import { $g6 as B } from "../../../../base/browser/dom.js";
export { j as $EFb, G as $FFb, u as SnippetSource };
//# sourceMappingURL=snippetsFile.d.ts.map