declare const $: "%";
declare let A: {
    new (e: any, t: any, i: any, o: any, n: any, s: any): {
        s(e: any): {
            extraFileResources: any;
            maxResults: any;
            isSmartCase: any;
            previewOptions: {
                matchLines: number;
                charsPerLine: any;
            };
            _reason: string;
            disregardIgnoreFiles: boolean;
            disregardExcludeSettings: boolean;
            onlyOpenEditors: boolean;
            expandPatterns: boolean;
        };
        t: any;
        u: any;
        w: any;
        y: any;
        z: any;
        C: any;
        n: Promise<{
            results: never[];
            messages: never[];
        }>;
        j: any;
        m: any;
        r: any;
        h: te;
        dispose(): void;
        provide(e: any, t: any, i: any): x;
        readonly D: {
            openEditorPinned: boolean;
            preserveInput: any;
            maxResults: any;
            smartCase: any;
            sortOrder: any;
        };
        readonly defaultFilterValue: any;
        F(e: any, t: any): {
            syncResults: any;
            asyncResults: Promise<any>;
        } | undefined;
        G(e: any): Promise<void>;
        H(e: any, t: any, i: any): ({
            label: any;
            type: string;
            description: any;
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            trigger: () => Promise<any>;
            highlights?: never;
            ariaLabel?: never;
            accept?: never;
            match?: never;
            iconClass?: never;
        } | {
            label: string;
            highlights: {
                label: {
                    start: any;
                    end: any;
                }[];
            };
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            ariaLabel: string;
            accept: {};
            trigger: () => Promise<any>;
            match: any;
            type?: never;
            description?: never;
            iconClass?: never;
        } | {
            label: any;
            iconClass: any;
            accept: () => Promise<void>;
            type?: never;
            description?: never;
            buttons?: never;
            trigger?: never;
            highlights?: never;
            ariaLabel?: never;
            match?: never;
        } | {
            type: string;
            label?: never;
            description?: never;
            buttons?: never;
            trigger?: never;
            highlights?: never;
            ariaLabel?: never;
            accept?: never;
            match?: never;
            iconClass?: never;
        })[];
        I(e: any, t: any): Promise<void>;
        g(e: any, t: any, i: any): ({
            label: any;
            type: string;
            description: any;
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            trigger: () => Promise<any>;
            highlights?: never;
            ariaLabel?: never;
            accept?: never;
            match?: never;
            iconClass?: never;
        } | {
            label: string;
            highlights: {
                label: {
                    start: any;
                    end: any;
                }[];
            };
            buttons: {
                iconClass: any;
                tooltip: any;
            }[];
            ariaLabel: string;
            accept: {};
            trigger: () => Promise<any>;
            match: any;
            type?: never;
            description?: never;
            iconClass?: never;
        } | {
            label: any;
            iconClass: any;
            accept: () => Promise<void>;
            type?: never;
            description?: never;
            buttons?: never;
            trigger?: never;
            highlights?: never;
            ariaLabel?: never;
            match?: never;
        } | {
            type: string;
            label?: never;
            description?: never;
            buttons?: never;
            trigger?: never;
            highlights?: never;
            ariaLabel?: never;
            accept?: never;
            match?: never;
            iconClass?: never;
        })[] | {
            label: any;
        }[] | {
            picks: ({
                label: any;
                type: string;
                description: any;
                buttons: {
                    iconClass: any;
                    tooltip: any;
                }[];
                trigger: () => Promise<any>;
                highlights?: never;
                ariaLabel?: never;
                accept?: never;
                match?: never;
                iconClass?: never;
            } | {
                label: string;
                highlights: {
                    label: {
                        start: any;
                        end: any;
                    }[];
                };
                buttons: {
                    iconClass: any;
                    tooltip: any;
                }[];
                ariaLabel: string;
                accept: {};
                trigger: () => Promise<any>;
                match: any;
                type?: never;
                description?: never;
                iconClass?: never;
            } | {
                label: any;
                iconClass: any;
                accept: () => Promise<void>;
                type?: never;
                description?: never;
                buttons?: never;
                trigger?: never;
                highlights?: never;
                ariaLabel?: never;
                match?: never;
            } | {
                type: string;
                label?: never;
                description?: never;
                buttons?: never;
                trigger?: never;
                highlights?: never;
                ariaLabel?: never;
                accept?: never;
                match?: never;
                iconClass?: never;
            })[];
            additionalPicks: Promise<any>;
        } | null;
        c: any;
        f: any;
        q: x;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $Hh as te } from "../../../../../base/common/async.js";
import { $ud as x } from "../../../../../base/common/lifecycle.js";
export { $ as $Joc, A as $Koc };
//# sourceMappingURL=textSearchQuickAccess.d.ts.map