declare let $: {
    new (t: any, e: any, s: any, r: any, i: any, n: any, a: any, l: any, m: any, d: any): {
        n: any;
        r: any;
        s: any;
        t: any;
        u: any;
        w: any;
        b: boolean;
        c: Set<any>;
        f: Set<any>;
        g: w;
        h: w;
        j: boolean;
        m: {};
        a: any;
        y(): Promise<void>;
        isEnabledForLanguage(t: any): any;
        z(): {};
        detectLanguage(t: any, e: any): Promise<any>;
        C(t: any): void;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    enablementSettingKey: string | undefined;
    historyBasedEnablementConfig: string | undefined;
    preferHistoryConfig: string | undefined;
    workspaceOpenedLanguagesStorageKey: string | undefined;
    globalOpenedLanguagesStorageKey: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class V extends b {
    constructor(t: any, e: any, s: any, r: any, i: any, n: any, a: any);
    b: any;
    c: any;
    f: any;
    g: any;
    h: any;
    j: any;
    m: any;
    n(): {
        workerClient: any;
        workerTextModelSyncClient: T;
    };
    a: {
        workerClient: any;
        workerTextModelSyncClient: T;
    } | undefined;
    r(t: any): any;
    getIndexJsUri(): Promise<any>;
    getLanguageId(t: any): any;
    getModelJsonUri(): Promise<any>;
    getWeightsUri(): Promise<any>;
    getRegexpModelUri(): Promise<any>;
    sendTelemetryEvent(t: any, e: any, s: any): Promise<void>;
    detectLanguage(t: any, e: any, s: any, r: any): Promise<any>;
}
import { $Lc as w } from "../../../../base/common/map.js";
import { $vd as b } from "../../../../base/common/lifecycle.js";
import { $sfb as T } from "../../../../editor/common/services/textModelSync/textModelSync.impl.js";
export { $ as $c8b, V as $d8b };
//# sourceMappingURL=languageDetectionWorkerServiceImpl.d.ts.map