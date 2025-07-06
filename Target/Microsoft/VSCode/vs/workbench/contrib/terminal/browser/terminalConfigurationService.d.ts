declare let d: {
    new (t: any): {
        readonly config: any;
        readonly onConfigChanged: any;
        g: any;
        f: F;
        a: any;
        setPanelContainer(t: any): any;
        configFontIsMonospace(): any;
        getFont(t: any, i: any, h: any): any;
        h(): void;
        b: any;
        j(t: any, i: any): any;
        q: import("../../../../base/common/lifecycle.js").$ud;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare class z extends m {
    constructor(t: any, i: any);
    f: any;
    g: any;
    linuxDistro: number;
    setPanelContainer(t: any): void;
    a: any;
    configFontIsMonospace(): boolean;
    getFont(t: any, i: any, h: any): {
        fontFamily: any;
        fontSize: any;
        letterSpacing: any;
        lineHeight: any;
        charWidth: number;
        charHeight: number;
    } | {
        fontFamily: any;
        fontSize: any;
        letterSpacing: number;
        lineHeight: number;
    };
    h(): HTMLDivElement;
    b: HTMLDivElement | undefined;
    j(t: any, i: any, h: any): DOMRect | undefined;
    m(t: any, i: any, h: any, e: any, n: any): {
        fontFamily: any;
        fontSize: any;
        letterSpacing: any;
        lineHeight: any;
        charWidth: number;
        charHeight: number;
    };
    c: {
        fontFamily: any;
        fontSize: any;
        letterSpacing: any;
        lineHeight: any;
        charWidth: number;
        charHeight: number;
    } | undefined;
}
import { $ef as F } from "../../../../base/common/event.js";
import { $vd as m } from "../../../../base/common/lifecycle.js";
export { d as $jsc, z as $ksc };
//# sourceMappingURL=terminalConfigurationService.d.ts.map