declare class V {
    getHeight(t: any): number | undefined;
    getTemplateId(t: any): string | undefined;
}
declare let w: {
    new (t: any, n: any, e: any, s: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        templateId: any;
        renderTemplate(t: any): {
            label: any;
            disposables: g;
            actions: any;
            contextKeyService: any;
        };
        renderElement(t: any, n: any, e: any): Promise<void>;
        disposeTemplate(t: any): void;
        renderCompressedElements(t: any, n: any, e: any): void;
        q: g;
        dispose(): void;
        B(t: any): any;
    };
    TEMPLATE_ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let C: {
    new (t: any, n: any, e: any, s: any, o: any, r: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        h: any;
        j: any;
        templateId: any;
        renderCompressedElements(t: any, n: any, e: any): void;
        renderTemplate(t: any): {
            label: any;
            badge: P;
            actions: any;
            disposables: g;
            elementDisposables: g;
            contextKeyService: any;
        };
        renderElement(t: any, n: any, e: any): void;
        disposeElement(t: any, n: any, e: any): void;
        disposeCompressedElements(t: any, n: any, e: any): void;
        disposeTemplate(t: any): void;
        m(t: any, n: any): void;
        q: g;
        dispose(): void;
        B(t: any): any;
    };
    TEMPLATE_ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let A: {
    new (t: any, n: any, e: any, s: any, o: any, r: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        h: any;
        j: any;
        templateId: any;
        renderCompressedElements(t: any, n: any, e: any): void;
        renderTemplate(t: any): {
            el: any;
            label: any;
            badge: P;
            actions: any;
            disposables: g;
            elementDisposables: g;
            contextKeyService: any;
        };
        renderElement(t: any, n: any, e: any): void;
        disposeElement(t: any, n: any, e: any): void;
        disposeTemplate(t: any): void;
        q: g;
        dispose(): void;
        B(t: any): any;
    };
    TEMPLATE_ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let O: {
    new (t: any, n: any, e: any, s: any, o: any, r: any): {
        a: any;
        b: any;
        c: any;
        f: any;
        h: any;
        j: any;
        templateId: any;
        renderCompressedElements(t: any, n: any, e: any): void;
        renderTemplate(t: any): {
            parent: any;
            before: any;
            match: any;
            replace: any;
            after: any;
            lineNumber: any;
            actions: any;
            disposables: g;
            contextKeyService: any;
        };
        renderElement(t: any, n: any, e: any): void;
        disposeTemplate(t: any): void;
        m(t: any, n: any): string;
        q: g;
        dispose(): void;
        B(t: any): any;
    };
    TEMPLATE_ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let _: {
    new (t: any, n: any): {
        a: any;
        b: any;
        getWidgetAriaLabel(): any;
        getAriaLabel(t: any): any;
    };
};
import { $ud as g } from "../../../../base/common/lifecycle.js";
import { $$9 as P } from "../../../../base/browser/ui/countBadge/countBadge.js";
export { V as $Edc, w as $Fdc, C as $Gdc, A as $Hdc, O as $Idc, _ as $Jdc };
//# sourceMappingURL=searchResultsView.d.ts.map