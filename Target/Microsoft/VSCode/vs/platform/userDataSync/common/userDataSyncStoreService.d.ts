declare let _: {
    new (e: any, t: any, s: any): {
        readonly userDataSyncStore: {
            url: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            type: any;
            defaultType: string;
            defaultUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            stableUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            insidersUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            canSwitch: boolean;
            authenticationProviders: never[];
        } | undefined;
        c: any;
        f: any;
        g: any;
        h: any;
        a: any;
        onDidChangeUserDataSyncStore: any;
        j(): void;
        b: {
            url: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            type: any;
            defaultType: string;
            defaultUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            stableUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            insidersUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            canSwitch: boolean;
            authenticationProviders: never[];
        } | undefined;
        m(e: any): {
            url: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            type: any;
            defaultType: string;
            defaultUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            stableUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            insidersUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            canSwitch: boolean;
            authenticationProviders: never[];
        } | undefined;
        q: J;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let j: {
    new (e: any, t: any, s: any): {
        n: any;
        switch(e: any): Promise<void>;
        c: any;
        getPreviousUserDataSyncStore(): Promise<{
            url: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            type: any;
            defaultType: string;
            defaultUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            stableUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            insidersUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            canSwitch: boolean;
            authenticationProviders: never[];
        } | undefined>;
        readonly userDataSyncStore: {
            url: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            type: any;
            defaultType: string;
            defaultUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            stableUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            insidersUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            canSwitch: boolean;
            authenticationProviders: never[];
        } | undefined;
        f: any;
        g: any;
        h: any;
        a: any;
        onDidChangeUserDataSyncStore: any;
        j(): void;
        b: {
            url: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            type: any;
            defaultType: string;
            defaultUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            stableUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            insidersUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            canSwitch: boolean;
            authenticationProviders: never[];
        } | undefined;
        m(e: any): {
            url: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            type: any;
            defaultType: string;
            defaultUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            stableUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            insidersUrl: {
                _formatted: string | null;
                _fsPath: any;
                readonly fsPath: any;
                toString(e?: boolean): string;
                toJSON(): {
                    $mid: number;
                };
                scheme: any;
                authority: any;
                path: any;
                query: any;
                fragment: any;
                with(e: any): /*elided*/ any;
            };
            canSwitch: boolean;
            authenticationProviders: never[];
        } | undefined;
        q: J;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let x: {
    new (e: any, t: any, s: any, r: any, n: any, i: any, o: any): {
        readonly donotMakeRequestsUntil: any;
        n: any;
        r: any;
        s: any;
        g: any;
        onTokenFailed: any;
        h: any;
        onTokenSucceed: any;
        m: any;
        onDidChangeDonotMakeRequestsUntil: any;
        c: Promise<{
            "X-Client-Name": string;
            "X-Client-Version": any;
        }>;
        f: ue;
        setAuthToken(e: any, t: any): void;
        b: {
            token: any;
            type: any;
        } | undefined;
        t(e: any): void;
        a: any;
        u(): void;
        y(e: any): void;
        j: any;
        w: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | undefined;
        getAllCollections(e?: {}): Promise<any>;
        createCollection(e?: {}): Promise<any>;
        deleteCollection(e: any, t?: {}): Promise<void>;
        getAllResourceRefs(e: any, t: any): Promise<any>;
        resolveResourceContent(e: any, t: any, s: any, r?: {}): Promise<any>;
        deleteResource(e: any, t: any, s: any): Promise<void>;
        deleteResources(): Promise<void>;
        readResource(e: any, t: any, s: any, r?: {}): Promise<any>;
        writeResource(e: any, t: any, s: any, r: any, n?: {}): Promise<any>;
        manifest(e: any, t?: {}): Promise<any>;
        clear(): Promise<void>;
        getActivityData(): Promise<any>;
        z(e: any, t: any, s: any): any;
        C(): void;
        D(e: any, t: any, s: any, r: any): Promise<any>;
        F(e: any): void;
        q: J;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let A: {
    new (e: any, t: any, s: any, r: any, n: any, i: any, o: any): {
        readonly donotMakeRequestsUntil: any;
        n: any;
        r: any;
        s: any;
        g: any;
        onTokenFailed: any;
        h: any;
        onTokenSucceed: any;
        m: any;
        onDidChangeDonotMakeRequestsUntil: any;
        c: Promise<{
            "X-Client-Name": string;
            "X-Client-Version": any;
        }>;
        f: ue;
        setAuthToken(e: any, t: any): void;
        b: {
            token: any;
            type: any;
        } | undefined;
        t(e: any): void;
        a: any;
        u(): void;
        y(e: any): void;
        j: any;
        w: {
            cancel(): void;
            then(r: any, h: any): Promise<any>;
            catch(r: any): Promise<any>;
            finally(r: any): Promise<any>;
        } | undefined;
        getAllCollections(e?: {}): Promise<any>;
        createCollection(e?: {}): Promise<any>;
        deleteCollection(e: any, t?: {}): Promise<void>;
        getAllResourceRefs(e: any, t: any): Promise<any>;
        resolveResourceContent(e: any, t: any, s: any, r?: {}): Promise<any>;
        deleteResource(e: any, t: any, s: any): Promise<void>;
        deleteResources(): Promise<void>;
        readResource(e: any, t: any, s: any, r?: {}): Promise<any>;
        writeResource(e: any, t: any, s: any, r: any, n?: {}): Promise<any>;
        manifest(e: any, t?: {}): Promise<any>;
        clear(): Promise<void>;
        getActivityData(): Promise<any>;
        z(e: any, t: any, s: any): any;
        C(): void;
        D(e: any, t: any, s: any, r: any): Promise<any>;
        F(e: any): void;
        q: J;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class ue {
    constructor(e: any, t: any, s: any, r: any);
    c: any;
    d: any;
    f: any;
    g: any;
    a: any[];
    request(e: any, t: any, s: any): any;
    b: any;
    h(): boolean;
    i(): void;
}
import { $ud as J } from "../../../base/common/lifecycle.js";
export { _ as $L7b, j as $M7b, x as $N7b, A as $O7b, ue as $P7b };
//# sourceMappingURL=userDataSyncStoreService.d.ts.map