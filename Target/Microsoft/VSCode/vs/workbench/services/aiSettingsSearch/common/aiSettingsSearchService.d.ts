export { n as $a6b };
declare class n extends d {
    constructor(...args: any[]);
    b: any[];
    c: Map<any, any>;
    f: Map<any, any>;
    g: any;
    onProviderRegistered: any;
    isEnabled(): boolean;
    registerSettingsSearchProvider(e: any): {
        dispose: () => void;
    };
    startSearch(e: any, t: any, s: any): void;
    getEmbeddingsResults(e: any, t: any): Promise<any>;
    getLLMRankedResults(e: any, t: any): Promise<any>;
    handleSearchResult(e: any): void;
}
import { $vd as d } from "../../../../base/common/lifecycle.js";
//# sourceMappingURL=aiSettingsSearchService.d.ts.map