declare function r(l: any): {
    id: string;
    label: any;
    settings: any;
};
declare namespace o {
    let id: string;
    let label: string;
    let children: ({
        id: string;
        label: any;
        settings: string[];
        children: {
            id: string;
            label: any;
            settings: string[];
        }[];
    } | {
        id: string;
        label: any;
        children: ({
            id: string;
            label: any;
            settings: string[];
            hide?: never;
        } | {
            id: string;
            label: any;
            settings: string[];
            hide: boolean;
        })[];
        settings?: never;
    })[];
}
export { r as $v0b, o as $w0b };
//# sourceMappingURL=settingsLayout.d.ts.map