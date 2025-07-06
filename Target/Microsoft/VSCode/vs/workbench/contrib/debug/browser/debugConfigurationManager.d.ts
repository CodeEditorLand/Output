export { R as $Upc };
declare let R: {
    new (e: any, t: any, i: any, n: any, s: any, r: any, o: any, h: any, a: any, u: any, g: any): {
        r: any;
        s: any;
        u: any;
        v: any;
        w: any;
        x: any;
        y: any;
        z: any;
        A: any;
        B: any;
        g: () => Promise<undefined>;
        j: boolean;
        m: O;
        q: O;
        onDidChangeConfigurationProviders: any;
        n: any[];
        k: O[];
        o: any;
        registerDebugConfigurationProvider(e: any): {
            dispose: () => void;
        };
        unregisterDebugConfigurationProvider(e: any): void;
        hasDebugConfigurationProvider(e: any, t: any): boolean;
        resolveConfigurationByProviders(e: any, t: any, i: any, n: any): Promise<any>;
        resolveDebugConfigurationWithSubstitutedVariables(e: any, t: any, i: any, n: any): Promise<any>;
        provideDebugConfigurations(e: any, t: any, i: any): Promise<any>;
        getDynamicProviders(): Promise<{
            label: any;
            getProvider: () => Promise<any>;
            type: any;
            pick: () => Promise<any>;
        }[]>;
        getDynamicConfigurationsByType(e: any, t?: any): Promise<any[]>;
        getAllConfigurations(): any;
        removeRecentDynamicConfigurations(e: any, t: any): void;
        getRecentDynamicConfigurations(): any;
        C(): void;
        D(): void;
        a: any;
        E(): void;
        getLaunches(): any;
        getLaunch(e: any): any;
        readonly selectedConfiguration: {
            launch: any;
            name: any;
            getConfig: () => Promise<undefined>;
            type: any;
        };
        readonly onDidSelectConfiguration: any;
        getWorkspaceLaunch(): any;
        selectConfiguration(e: any, t: any, i: any, n: any): Promise<void>;
        d: any;
        h: any;
        F(e: any): void;
        b: any;
        dispose(): void;
    };
};
import { $ef as O } from "../../../../base/common/event.js";
//# sourceMappingURL=debugConfigurationManager.d.ts.map