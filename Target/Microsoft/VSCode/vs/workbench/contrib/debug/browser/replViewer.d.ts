declare class R {
    get templateId(): string | undefined;
    renderTemplate(e: any): {
        label: T;
    };
    renderElement(e: any, r: any, s: any): void;
    disposeTemplate(e: any): void;
}
declare let x: {
    new (e: any, r: any): {
        a: any;
        b: any;
        readonly templateId: any;
        renderTemplate(e: any): {
            label: any;
            source: any;
        };
        renderElement(e: any, r: any, s: any): void;
        disposeTemplate(e: any): void;
    };
    ID: string | undefined;
};
declare class D {
    constructor(e: any);
    get templateId(): string | undefined;
    a: any;
    renderTemplate(e: any): {
        value: any;
        elementStore: w;
    };
    renderElement(e: any, r: any, s: any): void;
    disposeTemplate(e: any): void;
}
declare let S: {
    new (e: any, r: any): {
        a: any;
        b: any;
        readonly templateId: any;
        renderTemplate(e: any): any;
        renderElement({ element: e }: {
            element: any;
        }, r: any, s: any): void;
        c(e: any, r: any): void;
        disposeTemplate(e: any): void;
        disposeElement(e: any, r: any, s: any): void;
    };
    ID: string | undefined;
};
declare let C: {
    new (e: any, r: any, s: any, t: any): {
        readonly templateId: any;
        i: any;
        renderElement(e: any, r: any, s: any): void;
        f(e: any, r: any, s: any): void;
        g(e: any): void;
        a: any;
        b: any;
        c: any;
        renderTemplate(t: any): {
            expression: any;
            name: any;
            type: any;
            value: any;
            label: any;
            inputBoxContainer: any;
            actionBar: any;
            elementDisposable: w;
            templateDisposable: w;
            lazyButton: any;
            currentElement: undefined;
        };
        d(t: any, n: any, e: any): void;
        renderInputBox(t: any, n: any, e: any, o: any): any;
        disposeElement(t: any, n: any, e: any): void;
        disposeTemplate(t: any): void;
    };
    ID: string | undefined;
};
declare class N {
    constructor(e: any);
    a: any;
    get templateId(): string | undefined;
    renderTemplate(e: any): {
        container: any;
        expression: any;
        name: any;
        label: T;
        value: any;
        elementStore: w;
    };
    renderElement(e: any, r: any, s: any): void;
    disposeTemplate(e: any): void;
}
declare class xe extends P {
    constructor(e: any, r: any);
    a: any;
    b: any;
    d(e: any, r?: boolean): any;
    getTemplateId(e: any): string | undefined;
    hasDynamicHeight(e: any): boolean;
}
declare class Se {
    hasChildren(e: any): boolean;
    getChildren(e: any): Promise<any>;
}
declare class Ce {
    getWidgetAriaLabel(): any;
    getAriaLabel(e: any): any;
}
import { $n0 as T } from "../../../../base/browser/ui/highlightedlabel/highlightedLabel.js";
import { $ud as w } from "../../../../base/common/lifecycle.js";
import { $Q8 as P } from "../../../../base/browser/ui/list/list.js";
export { R as $Jkc, x as $Kkc, D as $Lkc, S as $Mkc, C as $Nkc, N as $Okc, xe as $Pkc, Se as $Qkc, Ce as $Rkc };
//# sourceMappingURL=replViewer.d.ts.map