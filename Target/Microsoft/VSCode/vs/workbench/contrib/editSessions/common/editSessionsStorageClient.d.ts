export { s as $_xc };
declare const s_base: {
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
        f: import("../../../../platform/userDataSync/common/userDataSyncStoreService.js").$P7b;
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
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class s extends s_base {
}
//# sourceMappingURL=editSessionsStorageClient.d.ts.map