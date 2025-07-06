declare class S extends G {
    constructor(t: any, e: any, r: any, a: any, i: any, n: any, s: any, l: any);
    get defaultProfileName(): any;
    f: any;
    g: any;
    h: any;
    j: any;
    m: any;
    n: any;
    r: any;
    s: any;
    b: {
        a: any;
        onDidChange: any;
        f: {
            definitions: {
                icons: {
                    type: string;
                    properties: {
                        fontId: {
                            type: string;
                            description: any;
                            pattern: string;
                            patternErrorMessage: any;
                        };
                        fontCharacter: {
                            type: string;
                            description: any;
                        };
                    };
                    additionalProperties: boolean;
                    defaultSnippets: {
                        body: {
                            fontCharacter: string;
                        };
                    }[];
                };
            };
            type: string;
            properties: {};
        };
        g: {
            type: string;
            pattern: string;
            enum: never[];
            enumDescriptions: never[];
        };
        b: {};
        h: {};
        registerIcon(t: any, n: any, o: any, i: any): any;
        deregisterIcon(t: any): void;
        getIcons(): any[];
        getIcon(t: any): any;
        getIconSchema(): {
            definitions: {
                icons: {
                    type: string;
                    properties: {
                        fontId: {
                            type: string;
                            description: any;
                            pattern: string;
                            patternErrorMessage: any;
                        };
                        fontCharacter: {
                            type: string;
                            description: any;
                        };
                    };
                    additionalProperties: boolean;
                    defaultSnippets: {
                        body: {
                            fontCharacter: string;
                        };
                    }[];
                };
            };
            type: string;
            properties: {};
        };
        getIconReferenceSchema(): {
            type: string;
            pattern: string;
            enum: never[];
            enumDescriptions: never[];
        };
        registerIconFont(t: any, n: any): any;
        deregisterIconFont(t: any): void;
        getIconFont(t: any): any;
        toString(): string;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    a: number | undefined;
    t(): Promise<void>;
    c: any;
    resolveIcon(t: any, e: any): void;
    getDefaultIcon(t: any): any;
    resolveShellLaunchConfig(t: any, e: any): Promise<void>;
    getDefaultShell(t: any): Promise<any>;
    getDefaultShellArgs(t: any): Promise<any>;
    getDefaultProfile(t: any): Promise<any>;
    getEnvironment(t: any): any;
    u(t: any): any;
    w(t: any): Promise<any>;
    y(t: any, e: any): any;
    z(t: any): any;
    C(t: any): Promise<any>;
    D(t: any): any;
    F(t: any, e: any): Promise<any>;
    G(t: any, e: any, r: any): Promise<any>;
    H(t: any): "linux" | "windows" | "osx" | undefined;
    I(t: any): {
        id: any;
    } | undefined;
    J(t: any, e: any): boolean;
}
declare let D: {
    new (t: any, e: any, r: any, a: any, i: any, n: any, s: any, l: any): {
        readonly defaultProfileName: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        r: any;
        s: any;
        b: {
            a: any;
            onDidChange: any;
            f: {
                definitions: {
                    icons: {
                        type: string;
                        properties: {
                            fontId: {
                                type: string;
                                description: any;
                                pattern: string;
                                patternErrorMessage: any;
                            };
                            fontCharacter: {
                                type: string;
                                description: any;
                            };
                        };
                        additionalProperties: boolean;
                        defaultSnippets: {
                            body: {
                                fontCharacter: string;
                            };
                        }[];
                    };
                };
                type: string;
                properties: {};
            };
            g: {
                type: string;
                pattern: string;
                enum: never[];
                enumDescriptions: never[];
            };
            b: {};
            h: {};
            registerIcon(t: any, n: any, o: any, i: any): any;
            deregisterIcon(t: any): void;
            getIcons(): any[];
            getIcon(t: any): any;
            getIconSchema(): {
                definitions: {
                    icons: {
                        type: string;
                        properties: {
                            fontId: {
                                type: string;
                                description: any;
                                pattern: string;
                                patternErrorMessage: any;
                            };
                            fontCharacter: {
                                type: string;
                                description: any;
                            };
                        };
                        additionalProperties: boolean;
                        defaultSnippets: {
                            body: {
                                fontCharacter: string;
                            };
                        }[];
                    };
                };
                type: string;
                properties: {};
            };
            getIconReferenceSchema(): {
                type: string;
                pattern: string;
                enum: never[];
                enumDescriptions: never[];
            };
            registerIconFont(t: any, n: any): any;
            deregisterIconFont(t: any): void;
            getIconFont(t: any): any;
            toString(): string;
            q: import("../../../../base/common/lifecycle.js").$ud;
            dispose(): void;
            B(t: any): any;
        };
        a: number | undefined;
        t(): Promise<void>;
        c: any;
        resolveIcon(t: any, e: any): void;
        getDefaultIcon(t: any): any;
        resolveShellLaunchConfig(t: any, e: any): Promise<void>;
        getDefaultShell(t: any): Promise<any>;
        getDefaultShellArgs(t: any): Promise<any>;
        getDefaultProfile(t: any): Promise<any>;
        getEnvironment(t: any): any;
        u(t: any): any;
        w(t: any): Promise<any>;
        y(t: any, e: any): any;
        z(t: any): any;
        C(t: any): Promise<any>;
        D(t: any): any;
        F(t: any, e: any): Promise<any>;
        G(t: any, e: any, r: any): Promise<any>;
        H(t: any): "linux" | "windows" | "osx" | undefined;
        I(t: any): {
            id: any;
        } | undefined;
        J(t: any, e: any): boolean;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $vd as G } from "../../../../base/common/lifecycle.js";
export { S as $sDc, D as $tDc };
//# sourceMappingURL=terminalProfileResolverService.d.ts.map