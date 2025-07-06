declare const $: any;
declare let h: {
    new (e: any): {
        b: any;
        a: any[];
        isEnabled(): boolean;
        registerAiEmbeddingVectorProvider(e: any, r: any): {
            dispose: () => void;
        };
        getEmbeddingVector(e: any, r: any): Promise<any>;
    };
    DEFAULT_TIMEOUT: number | undefined;
};
export { $ as $X3b, h as $Y3b };
//# sourceMappingURL=aiEmbeddingVectorService.d.ts.map