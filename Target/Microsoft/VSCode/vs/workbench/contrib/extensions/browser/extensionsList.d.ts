declare let y: {
    new (e: any, s: any, t: any, r: any, n: any, l: any, p: any, u: any): {
        a: any;
        b: any;
        c: any;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        readonly templateId: string;
        renderTemplate(e: any): {
            root: any;
            element: any;
            name: any;
            installCount: any;
            ratings: any;
            description: any;
            disposables: any[];
            actionbar: B;
            extensionDisposables: never[];
            extension: any;
        };
        renderPlaceholder(e: any, s: any): void;
        renderElement(e: any, s: any, t: any): void;
        disposeElement(e: any, s: any, t: any): void;
        disposeTemplate(e: any): void;
    };
};
declare class Ge {
    getHeight(): number;
    getTemplateId(): string;
}
import { $b8 as B } from "../../../../base/browser/ui/actionbar/actionbar.js";
export { y as $1Pb, Ge as $ZPb };
//# sourceMappingURL=extensionsList.d.ts.map