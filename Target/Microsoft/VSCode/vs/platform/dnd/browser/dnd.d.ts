declare namespace f {
    let EDITORS: string;
    let FILES: string;
    let SYMBOLS: string;
    let MARKERS: string;
    let NOTEBOOK_CELL_OUTPUT: string;
}
declare function M(e: any): any[];
declare function ct(e: any, t: any): Promise<any[]>;
declare function N(e: any): {
    resource: any;
    options: {
        selection: {
            startLineNumber: number;
            startColumn: number;
            endLineNumber: number | undefined;
            endColumn: number | undefined;
        } | undefined;
    };
}[];
declare function J(e: any, t: any): Promise<any>;
declare function H(e: any, ...t: any[]): boolean;
declare namespace $ {
    let DragAndDropContribution: string;
}
declare class m {
    static getInstance(): m | undefined;
    hasData(t: any): any;
    clearData(t: any): void;
    getData(t: any): any;
    setData(t: any, o: any): void;
    b: any;
    c: any;
}
declare function ft(e: any): any;
declare function lt(e: any, t: any): void;
declare function ut(e: any): any;
declare function dt(e: any, t: any): void;
declare function pt(e: any): any;
declare function y(e: any): any;
export { f as $ihb, M as $jhb, ct as $khb, N as $lhb, J as $mhb, H as $nhb, $ as $ohb, m as $phb, ft as $qhb, lt as $rhb, ut as $shb, dt as $thb, pt as $uhb, y as $vhb };
//# sourceMappingURL=dnd.d.ts.map