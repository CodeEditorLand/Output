declare class d extends c {
    getFilePath({ homedir: t }: {
        homedir: any;
    }): any;
}
declare class c {
    constructor(t: any);
    remoteAuthority: any;
    order: number;
    discoverySource: string;
    id: string;
    getFilePath({ platform: t, winAppData: i, xdgHome: n, homedir: o }: {
        platform: any;
        winAppData: any;
        xdgHome: any;
        homedir: any;
    }): any;
    adaptFile(t: any, { homedir: i }: {
        homedir: any;
    }): {
        id: string;
        label: string;
        launch: {
            type: number;
            uri: {
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
            headers: never[];
            args?: never;
            command?: never;
            env?: never;
            envFile?: never;
            cwd?: never;
        } | {
            type: number;
            args: any;
            command: any;
            env: any;
            envFile: undefined;
            cwd: any;
            uri?: never;
            headers?: never;
        };
    }[] | undefined;
}
declare function a(s: any, t: any, i: any): {
    id: string;
    label: string;
    launch: {
        type: number;
        uri: {
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
        headers: never[];
        args?: never;
        command?: never;
        env?: never;
        envFile?: never;
        cwd?: never;
    } | {
        type: number;
        args: any;
        command: any;
        env: any;
        envFile: undefined;
        cwd: any;
        uri?: never;
        headers?: never;
    };
}[] | undefined;
declare class h extends c {
    getFilePath({ homedir: t }: {
        homedir: any;
    }): any;
}
export { d as $$hc, c as $0hc, a as $9hc, h as $_hc };
//# sourceMappingURL=nativeMcpDiscoveryAdapters.d.ts.map