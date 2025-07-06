export { g as $Lpc };
declare let g: {
    new (e: any, t: any, r: any, n: any, i: any, a: any, o: any, s: any, l: any): {
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        b: any[];
        a: {
            type: any;
        };
        d: any;
        e: any;
        merge(e: any, t: any): void;
        c: any;
        startDebugging(e: any, t: any): Promise<any>;
        createDebugAdapter(e: any): Promise<any>;
        substituteVariables(e: any, t: any): Promise<any>;
        runInTerminal(e: any, t: any): any;
        readonly label: any;
        readonly type: any;
        readonly variables: any;
        readonly configurationSnippets: any;
        readonly languages: any;
        readonly when: any;
        readonly hiddenWhen: any;
        readonly enabled: any;
        readonly isHiddenFromDropdown: any;
        readonly strings: any;
        interestedInLanguage(e: any): boolean;
        hasInitialConfiguration(): boolean;
        hasDynamicConfigurationProviders(): any;
        hasConfigurationProvider(): any;
        getInitialConfigurationContent(e: any): Promise<string>;
        getMainExtensionDescriptor(): any;
        getCustomTelemetryEndpoint(): {
            id: string;
            aiKey: any;
            sendErrorTelemetry: boolean;
        } | undefined;
        getSchemaAttributes(e: any): any[] | null;
    };
};
//# sourceMappingURL=debugger.d.ts.map