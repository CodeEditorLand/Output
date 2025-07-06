declare const ut: any;
declare let S: {
    new (t: any, e: any, o: any, n: any, i: any, r: any): {
        window: any;
        container: any;
        z: any;
        n: any;
        onWillLayout: any;
        r: any;
        onDidLayout: any;
        s: any;
        onBeforeUnload: any;
        t: any;
        onUnload: any;
        u: any;
        onWillDispose: any;
        w: boolean;
        whenStylesHaveLoaded: any;
        updateOptions(t: any): void;
        C(): void;
        D(t: any): void;
        F(t: any, e: any): void;
        G(t: any): void;
        H(t: any): void;
        I(): void;
        layout(): void;
        createState(): {
            bounds: {
                x: any;
                y: any;
                width: any;
                height: any;
            };
            zoomLevel: any;
            compact: boolean;
        };
        dispose(): void;
        c: any;
        f: any;
        g(t: any): void;
        h(t: any): void;
        j(t: any, e?: {
            getWindowsCount: () => number;
            getWindows: () => MapIterator<any>;
        }): void;
        m(t: any): void;
        q: x;
        B(t: any): any;
    };
    a: number | undefined;
    b: Map<any, any> | undefined;
    confirmOnShutdown(t: any, e: any): Promise<any>;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let B: {
    new (t: any, e: any, o: any, n: any, i: any, r: any): {
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        b: any;
        onDidOpenAuxiliaryWindow: any;
        c: Map<any, any>;
        open(t: any): Promise<{
            window: any;
            container: any;
            z: any;
            n: any;
            onWillLayout: any;
            r: any;
            onDidLayout: any;
            s: any;
            onBeforeUnload: any;
            t: any;
            onUnload: any;
            u: any;
            onWillDispose: any;
            w: boolean;
            whenStylesHaveLoaded: any;
            updateOptions(t: any): void;
            C(): void;
            D(t: any): void;
            F(t: any, e: any): void;
            G(t: any): void;
            H(t: any): void;
            I(): void;
            layout(): void;
            createState(): {
                bounds: {
                    x: any;
                    y: any;
                    width: any;
                    height: any;
                };
                zoomLevel: any;
                compact: boolean;
            };
            dispose(): void;
            c: any;
            f: any;
            g(t: any): void;
            h(t: any): void;
            j(t: any, e?: {
                getWindowsCount: () => number;
                getWindows: () => MapIterator<any>;
            }): void;
            m(t: any): void;
            q: x;
            B(t: any): any;
        }>;
        r(t: any, e: any, o: any): {
            window: any;
            container: any;
            z: any;
            n: any;
            onWillLayout: any;
            r: any;
            onDidLayout: any;
            s: any;
            onBeforeUnload: any;
            t: any;
            onUnload: any;
            u: any;
            onWillDispose: any;
            w: boolean;
            whenStylesHaveLoaded: any;
            updateOptions(t: any): void;
            C(): void;
            D(t: any): void;
            F(t: any, e: any): void;
            G(t: any): void;
            H(t: any): void;
            I(): void;
            layout(): void;
            createState(): {
                bounds: {
                    x: any;
                    y: any;
                    width: any;
                    height: any;
                };
                zoomLevel: any;
                compact: boolean;
            };
            dispose(): void;
            c: any;
            f: any;
            g(t: any): void;
            h(t: any): void;
            j(t: any, e?: {
                getWindowsCount: () => number;
                getWindows: () => MapIterator<any>;
            }): void;
            m(t: any): void;
            q: x;
            B(t: any): any;
        };
        s(t: any): Promise<any>;
        t(t: any): Promise<number>;
        u(t: any, e: any, o: any): {
            stylesLoaded: Z;
            container: HTMLElement;
        };
        w(t: any): void;
        z(t: any, e: any): {
            stylesLoaded: Z;
        };
        C(t: any, e: any): HTMLElement;
        getWindow(t: any): any;
        q: x;
        dispose(): void;
        B(t: any): any;
    };
    a: any;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare var g: any;
import { $ud as x } from "../../../../base/common/lifecycle.js";
import { $Lh as Z } from "../../../../base/common/async.js";
export { ut as $Gxb, S as $Hxb, B as $Ixb, g as AuxiliaryWindowMode };
//# sourceMappingURL=auxiliaryWindowService.d.ts.map