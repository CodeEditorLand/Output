export { w as $ODc };
declare let w: {
    new (e: any, t: any, s: any, n: any, r: any, o: any, i: any, h: any, u: any, d: any): {
        e: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        n: any;
        d: any;
        getRemoteSyncedProfiles(): Promise<any>;
        getLocalSyncedProfiles(e: any): Promise<any>;
        getLocalSyncedMachines(e: any): Promise<any>;
        getRemoteSyncResourceHandles(e: any, t: any): Promise<any>;
        getLocalSyncResourceHandles(e: any, t: any, s: any): Promise<any>;
        resolveUserDataSyncResource({ uri: e }: {
            uri: any;
        }): {
            profile: any;
            syncResource: any;
        } | undefined;
        getAssociatedResources({ uri: e }: {
            uri: any;
        }): Promise<{
            resource: any;
            comparableResource: any;
        }[] | undefined>;
        getMachineId({ uri: e }: {
            uri: any;
        }): Promise<any>;
        resolveContent(e: any): Promise<any>;
        o(e: any, t: any, s: any, n: any, r: any): Promise<any>;
        q(e: any, t: any, s: any): any;
        r(e: any, t: any): Promise<string | null | undefined>;
        s(e: any, t: any): {
            resource: any;
            comparableResource: any;
        }[];
        t(e: any, t: any): any;
        u(e: any, t: any): {
            resource: any;
            comparableResource: any;
        }[];
        v(e: any, t: any): any;
        w(e: any, t: any): {
            resource: any;
            comparableResource: any;
        }[];
        x(e: any, t: any): any;
        y(e: any, t: any): Promise<{
            resource: any;
            comparableResource: any;
        }[]>;
        z(e: any, t: any): any;
        A(e: any, t: any): Promise<{
            resource: any;
            comparableResource: any;
        }[]>;
        B(e: any, t: any): any;
        C(e: any, t: any): {
            resource: any;
            comparableResource: any;
        }[];
        D(e: any, t: any): string | null;
        E(e: any): Promise<string>;
        F(e: any, t: any): {
            resource: any;
            comparableResource: any;
        }[];
        G(e: any, t: any): string | null;
        H(e: any): Promise<string>;
        I(e: any, t: any): {
            resource: any;
            comparableResource: any;
        }[];
        J(e: any, t: any): string | null;
        K(e: any): Promise<string>;
        L(e: any): any;
        M(e: any): {
            remote: boolean;
            syncResource: any;
            profile: any;
            collection: any;
            ref: any;
            node: any;
            location: any;
        } | undefined;
        N(e: any, t: any): any;
        O(e: any, t: any, s: any): Promise<{
            ref: any;
            content: any;
        }>;
        P(e: any, t: any): {
            resource: any;
            comparableResource: any;
        }[];
        Q(e: any, t: any): any;
    };
    a: string | undefined;
    b: string | undefined;
    c: string | undefined;
};
//# sourceMappingURL=userDataSyncResourceProvider.d.ts.map