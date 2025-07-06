declare let z: {
    new (o: any, e: any): {
        b: any;
        a: number;
        getHeight(o: any): any;
        getDynamicHeight(o: any): any;
        getTemplateId(o: any): string | undefined;
        q: _;
        dispose(): void;
        B(t: any): any;
    };
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let A: {
    new (o: any, e: any, t: any, c: any, s: any, r: any, l: any, d: any, $: any, m: any, I: any): {
        s: any;
        r: any;
        readonly templateId: any;
        renderTemplate(o: any): {
            rootContainer: any;
            cellInputCollapsedContainer: any;
            instantiationService: any;
            container: any;
            cellContainer: any;
            editorPart: any;
            editorContainer: any;
            foldingIndicator: any;
            templateDisposables: _;
            elementDisposables: any;
            cellParts: et;
            toJSON: () => {};
        };
        renderElement(o: any, e: any, t: any, c: any): void;
        disposeTemplate(o: any): void;
        disposeElement(o: any, e: any, t: any): void;
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        a: any;
        dispose(): void;
        q: _;
        B(t: any): any;
    };
    TEMPLATE_ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
declare let H: {
    new (o: any, e: any, t: any, c: any, s: any, r: any, l: any, d: any, $: any, m: any, I: any): {
        r: any;
        s: any;
        readonly templateId: any;
        renderTemplate(o: any): {
            rootContainer: any;
            editorPart: any;
            cellInputCollapsedContainer: any;
            cellOutputCollapsedContainer: any;
            instantiationService: any;
            container: any;
            cellContainer: any;
            focusSinkElement: any;
            outputContainer: b;
            outputShowMoreContainer: b;
            editor: any;
            templateDisposables: _;
            elementDisposables: any;
            cellParts: et;
            toJSON: () => {};
        };
        renderElement(o: any, e: any, t: any, c: any): void;
        disposeTemplate(o: any): void;
        disposeElement(o: any, e: any, t: any): void;
        b: any;
        c: any;
        f: any;
        g: any;
        h: any;
        j: any;
        m: any;
        n: any;
        a: any;
        dispose(): void;
        q: _;
        B(t: any): any;
    };
    TEMPLATE_ID: string | undefined;
    None: Readonly<{
        dispose(): void;
    }> | undefined;
};
import { $ud as _ } from "../../../../../../base/common/lifecycle.js";
import { $pTb as et } from "../cellPart.js";
import { $N7 as b } from "../../../../../../base/browser/fastDomNode.js";
export { z as $nVb, A as $oVb, H as $pVb };
//# sourceMappingURL=cellRenderer.d.ts.map