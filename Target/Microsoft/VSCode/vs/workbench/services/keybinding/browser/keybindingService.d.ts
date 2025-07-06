export { E as $h6b };
declare let E: {
    new (t: any, e: any, i: any, s: any, n: any, r: any, o: any, l: any, h: any, m: any, b: any): {
        U: any;
        W: any;
        R: any[];
        P: any;
        S: w;
        r: any;
        Q: T | null;
        C: fe | null;
        O: any;
        dispose(): void;
        X(t: any): B;
        registerSchemaContribution(t: any): any;
        Y(): void;
        Z(t: any): string;
        $(t: any): any;
        ab(t: any, e: any, i: any): void;
        bb(): string;
        _dumpDebugInfo(): string;
        _dumpDebugInfoJSON(): string;
        enableKeybindingHoldMode(t: any): Promise<any> | undefined;
        cb(): void;
        customKeybindingsCount(): any;
        db(): void;
        D(): fe;
        F(): any;
        gb(t: any, e: any): D[];
        hb(t: any, e: any): D[];
        ib(t: any): boolean;
        resolveKeybinding(t: any): any;
        resolveKeyboardEvent(t: any): any;
        resolveUserBinding(t: any): any;
        jb(t: any, e: any, i: any, s: any, n: any): void;
        lb(t: any, e: any, i: any, s: any, n: any, r: any): void;
        nb(t: any, e: any, i: any, s: any): {
            id: any;
            args: any;
            when: any;
            weight: any;
            keybinding: import("../../../../base/common/keybindings.js").$px | null;
            extensionId: any;
            isBuiltinExtension: any;
        } | undefined;
        getDefaultKeybindingsContent(): string;
        mightProducePrintableCharacter(t: any): boolean;
        readonly onDidUpdateKeybindings: any;
        readonly inChordMode: boolean;
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        a: any;
        b: any[];
        f: import("../../../../base/common/async.js").$Yh;
        g: any;
        h: {
            a: any;
            b: any;
            c: any;
            d: any;
            has(t: any): any;
        } | undefined;
        j: any;
        m: import("../../../../base/common/async.js").$Xh;
        n: any;
        s: boolean;
        toggleLogging(): boolean;
        G(t: any): void;
        getDefaultKeybindings(): any;
        getKeybindings(): any;
        lookupKeybindings(t: any): any;
        lookupKeybinding(t: any, i: any, s?: boolean): any;
        dispatchEvent(t: any, i: any): boolean | undefined;
        softDispatch(t: any, i: any): any;
        H(): void;
        I(t: any, i: any): void;
        J(): void;
        dispatchByUserSettingsLabel(t: any, i: any): void;
        L(t: any, i: any): boolean | undefined;
        M(t: any, i: any): boolean | undefined;
        N(t: any, i: any, s?: boolean): boolean | undefined;
        q: B;
        B(t: any): any;
    };
    mb(t: any, e: any, i: any, s: any): any;
    ob(t: any): string;
    pb(t: any): string;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class w {
    b: any[];
    d: any[];
    f: any[];
    g: any[];
    h: {
        id: string | undefined;
        type: string;
        title: any;
        allowTrailingCommas: boolean;
        allowComments: boolean;
        definitions: {
            editorGroupsSchema: {
                type: string;
                items: {
                    type: string;
                    properties: {
                        groups: {
                            $ref: string;
                            default: {}[];
                        };
                        size: {
                            type: string;
                            default: number;
                        };
                    };
                };
            };
            commandNames: {
                type: string;
                enum: any[];
                enumDescriptions: any[];
                description: any;
            };
            commandType: {
                anyOf: ({
                    $ref: string;
                    type?: never;
                    enum?: never;
                    enumDescriptions?: never;
                    description?: never;
                } | {
                    type: string;
                    enum: any[];
                    enumDescriptions: any[];
                    description: any;
                    $ref?: never;
                } | {
                    type: string;
                    $ref?: never;
                    enum?: never;
                    enumDescriptions?: never;
                    description?: never;
                })[];
            };
            commandsSchemas: {
                allOf: any[];
            };
        };
        items: {
            required: string[];
            type: string;
            defaultSnippets: {
                body: {
                    key: string;
                    command: string;
                    when: string;
                };
            }[];
            properties: {
                key: {
                    type: string;
                    description: any;
                };
                command: {
                    anyOf: ({
                        if: {
                            type: string;
                        };
                        then: {
                            not: {
                                type: string;
                            };
                            errorMessage: any;
                        };
                        else: {
                            $ref: string;
                        };
                        $ref?: never;
                    } | {
                        $ref: string;
                        if?: never;
                        then?: never;
                        else?: never;
                    })[];
                };
                when: {
                    type: string;
                    description: any;
                };
                args: {
                    description: any;
                };
            };
            $ref: string;
        };
    };
    j: any;
    updateSchema(t: any): void;
}
import { $$h as T } from "../../../../base/common/async.js";
import { $vx as fe } from "../../../../platform/keybinding/common/keybindingResolver.js";
import { $ud as B } from "../../../../base/common/lifecycle.js";
import { $sx as D } from "../../../../platform/keybinding/common/resolvedKeybindingItem.js";
//# sourceMappingURL=keybindingService.d.ts.map