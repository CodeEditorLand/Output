export { d as $swc };
declare let d: {
    new (e: any, t: any, n: any, r: any, i: any): {
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        c: Map<any, any>;
        d: Map<any, any>;
        e: Map<any, any>;
        a: RegExp;
        b: RegExp;
        readonly featuredSettingStates: Map<any, any>;
        k(e: any): any;
        l(e: any): any;
        getHtmlRenderer(): ({ raw: e }: {
            raw: any;
        }) => any;
        getCodeSpanRenderer(): ({ text: e }: {
            text: any;
        }) => any;
        settingToUriString(e: any, t: any): string;
        m(e: any): any;
        parseValue(e: any, t: any): any;
        n(e: any, t: any): string;
        o(e: any, t: any): any;
        p(e: any): any;
        q(e: any, t: any): boolean;
        r(e: any, t: any): any;
        s(e: any, t: any): any;
        t(e: any, t: any): any;
        u(e: any, t: any): string;
        v(e: any, t: any): any;
        restoreSetting(e: any): Promise<any>;
        setSetting(e: any, t: any, n: any): Promise<any>;
        getActions(e: any): {
            class: undefined;
            id: string;
            enabled: boolean;
            tooltip: any;
            label: any;
            run: () => void;
        }[] | undefined;
        w(e: any, t: any, n: any): void;
        updateSetting(e: any, t: any, n: any): Promise<void>;
    };
};
//# sourceMappingURL=markdownSettingRenderer.d.ts.map