declare class $ {
    constructor(t: any, e: any, i: any, r: any, s: any, a: any, v: any, w: any, R: any, T: any);
    range: any;
    editorRange: any;
    text: any;
    id: any;
    modelDescription: any;
    data: any;
    fullName: any;
    icon: any;
    isFile: any;
    isDirectory: any;
    kind: string | undefined;
    get referenceText(): any;
    get promptText(): any;
    toVariableEntry(): any;
}
declare class f {
    constructor(t: any, e: any, i: any);
    range: any;
    editorRange: any;
    slashPromptCommand: any;
    kind: string | undefined;
    get text(): string;
    get promptText(): string;
}
declare class c {
    constructor(t: any, e: any, i: any);
    range: any;
    editorRange: any;
    text: any;
    kind: string | undefined;
    get promptText(): any;
}
declare const K: "#";
declare const k: "@";
declare const d: "/";
declare class g {
    constructor(t: any, e: any, i: any, r: any, s: any, a: any);
    range: any;
    editorRange: any;
    toolName: any;
    toolId: any;
    displayName: any;
    icon: any;
    kind: string | undefined;
    get text(): string;
    get promptText(): string;
    toVariableEntry(): {
        kind: string;
        id: any;
        name: any;
        range: any;
        value: undefined;
        icon: any;
        fullName: any;
    };
}
declare class u {
    constructor(t: any, e: any, i: any, r: any, s: any, a: any);
    range: any;
    editorRange: any;
    id: any;
    name: any;
    icon: any;
    tools: any;
    kind: string | undefined;
    get text(): string;
    get promptText(): string;
    toVariableEntry(): {
        kind: string;
        id: any;
        name: any;
        range: any;
        icon: any;
        value: any;
    };
}
declare class h {
    constructor(t: any, e: any, i: any);
    range: any;
    editorRange: any;
    agent: any;
    kind: string | undefined;
    get text(): string;
    get promptText(): string;
}
declare class l {
    constructor(t: any, e: any, i: any);
    range: any;
    editorRange: any;
    command: any;
    kind: string | undefined;
    get text(): string;
    get promptText(): string;
}
declare class x {
    constructor(t: any, e: any, i: any);
    range: any;
    editorRange: any;
    slashCommand: any;
    kind: string | undefined;
    get text(): string;
    get promptText(): string;
}
declare function S(n: any): {
    message: any;
    diff: number;
};
declare function F(n: any): {
    text: any;
    parts: any;
};
declare function V(n: any): {
    agentPart: any;
    commandPart: any;
};
declare function j(n: any, t: any, e: any, i?: null, r?: null): string | undefined;
export { $ as $$S, f as $0S, c as $1S, K as $2S, k as $3S, d as $4S, g as $5S, u as $6S, h as $7S, l as $8S, x as $9S, S as $ZS, F as $_S, V as $aT, j as $bT };
//# sourceMappingURL=chatParserTypes.d.ts.map