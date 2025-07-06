declare namespace p {
    let startLineNumber: number;
    let startColumn: number;
    let endLineNumber: number;
    let endColumn: number;
}
declare class W extends R {
    constructor(e: any, t: any);
    C: any;
    z: any;
    onDidChangeGroups: any;
    y: any;
    get uri(): any;
    get configurationTarget(): any;
    get settingsGroups(): {
        id: any;
        sections: {
            settings: any[];
        }[];
        title: string;
        titleRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        range: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
    }[] | undefined;
    get content(): any;
    D(e: any, t: any): boolean;
    F(): void;
    w: {
        id: any;
        sections: {
            settings: any[];
        }[];
        title: string;
        titleRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        range: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
    }[] | undefined;
    u(): {
        allGroups: {
            id: any;
            sections: {
                settings: any[];
            }[];
            title: string;
            titleRange: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
            };
            range: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
            };
        }[] | undefined;
        filteredGroups: {
            id: any;
            range: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
            };
            sections: {
                settings: any[];
            }[];
            title: string;
            titleRange: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
            };
            order: any;
            extensionInfo: any;
        }[];
        matches: any[];
        metadata: any;
    } | undefined;
}
declare let M: {
    new (e: any, t: any): {
        C: any;
        w: any;
        onDidChangeGroups: any;
        y: any[];
        z: boolean;
        readonly t: any[];
        readonly settingsGroups: any[];
        setAdditionalGroups(e: any): void;
        u(): void;
        j: Map<any, any>;
        updateResultGroup(e: any, t: any): any;
        n(): void;
        filterSettings(e: any, t: any, n: any): {
            setting: any;
            matches: any;
            matchType: any;
            keyMatchScore: any;
            score: any;
        }[];
        getPreference(e: any): any;
        r(e: any): any;
        f: any;
        onWillDispose: any;
        h: boolean;
        resolve(): Promise<void>;
        isResolved(): boolean;
        isDisposed(): boolean;
        dispose(): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class fe extends W {
    constructor(...args: any[]);
    H: any[];
    get configurationGroups(): any[];
}
declare class ge extends G {
    constructor(e: any, t: any, n: any);
    t: any;
    target: any;
    configurationService: any;
    n: Map<any, any>;
    r: any;
    onDidChange: any;
    getContent(e?: boolean): string | undefined;
    getContentWithoutMostCommonlyUsed(e?: boolean): string | undefined;
    getSettingsGroups(e?: boolean): any[] | undefined;
    u(): void;
    f: any[] | undefined;
    h: string | undefined;
    j: string | undefined;
    w(): void;
    y(): any[];
    getRegisteredGroups(): any;
    z(e: any): any;
    C(e: any): void;
    D(): {
        id: string;
        range: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        title: any;
        titleRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        sections: {
            settings: any;
        }[];
    };
    F(e: any, t: any, n: any, i: any, o: any): any;
    G(e: any): any[];
    H(e: any): {
        key: string;
        value: any;
        description: any;
        descriptionIsMarkdown: boolean;
        range: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        keyRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        valueRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        descriptionRanges: never[];
        overrides: {
            key: string;
            value: any;
            description: never[];
            descriptionIsMarkdown: boolean;
            range: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
            };
            keyRange: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
            };
            valueRange: {
                startLineNumber: number;
                startColumn: number;
                endLineNumber: number;
                endColumn: number;
            };
            descriptionRanges: never[];
            overrides: never[];
        }[];
        scope: any;
        type: any;
        arrayItemType: any;
        objectProperties: any;
        objectPatternProperties: any;
        objectAdditionalProperties: any;
        enum: any;
        enumDescriptions: any;
        enumDescriptionsAreMarkdown: boolean;
        enumItemLabels: any;
        uniqueItems: any;
        tags: any;
        disallowSyncIgnore: any;
        restricted: any;
        extensionInfo: any;
        deprecationMessage: any;
        deprecationMessageIsMarkdown: boolean;
        validator: (m: any) => string;
        allKeysAreBoolean: boolean;
        editPresentation: any;
        order: any;
        nonLanguageSpecificDefaultValueSource: any;
        isLanguageTagSetting: boolean;
        categoryLabel: any;
    }[];
    I(e: any): {
        key: string;
        value: any;
        description: never[];
        descriptionIsMarkdown: boolean;
        range: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        keyRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        valueRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        descriptionRanges: never[];
        overrides: never[];
    }[];
    J(e: any): boolean;
    L(e: any, t: any): any;
    M(e: any, t: any): string;
}
declare class me extends R {
    constructor(e: any, t: any, n: any);
    z: any;
    C: any;
    y: any;
    onDidChangeGroups: any;
    w: any;
    get uri(): any;
    get target(): any;
    get settingsGroups(): any;
    u(): {
        allGroups: any;
        filteredGroups: any[];
        matches: any[];
        metadata: any;
    } | undefined;
    G(e: any, t: any): {
        matches: any[];
        settingsGroups: any[];
    };
    H(e: any, t: any, n: any): any;
    I(e: any): {
        description: any;
        scope: any;
        type: any;
        enum: any;
        enumDescriptions: any;
        key: any;
        value: any;
        range: any;
        overrides: never[];
        overrideOf: any;
        tags: any;
        deprecationMessage: any;
        keyRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        valueRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        descriptionIsMarkdown: undefined;
        descriptionRanges: never[];
    };
    J(e: any): {
        id: any;
        range: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        title: any;
        titleRange: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number;
            endColumn: number;
        };
        sections: {
            settings: any;
        }[];
    };
}
declare class ye extends G {
    constructor(e: any);
    j: any;
    f: string | null;
    h: any;
    onDidContentChanged: any;
    get content(): string;
}
declare function Y(u: any): string;
declare let P: {
    new (e: any, t: any): {
        f: any;
        h: any;
        readonly uri: any;
        readonly content: string;
        d: string | undefined;
        getPreference(): null;
        dispose(): void;
    };
};
declare class R extends J {
    j: Map<any, any>;
    updateResultGroup(e: any, t: any): any;
    n(): void;
    filterSettings(e: any, t: any, n: any): {
        setting: any;
        matches: any;
        matchType: any;
        keyMatchScore: any;
        score: any;
    }[];
    getPreference(e: any): any;
    r(e: any): any;
    get t(): any;
}
import { $vd as G } from "../../../../base/common/lifecycle.js";
import { $HF as J } from "../../../common/editor/editorModel.js";
export { p as $eK, W as $fK, M as $gK, fe as $hK, ge as $iK, me as $jK, ye as $kK, Y as $lK, P as $mK };
//# sourceMappingURL=preferencesModels.d.ts.map