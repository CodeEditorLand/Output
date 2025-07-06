declare class po extends S {
    constructor(e: any);
    a: any;
}
declare let v: {
    new (e: any, s: any, o: any, t: any, r: any, i: any, n: any, c: any, d: any, f: any): {
        readonly templateId: any;
        a: any;
        b: any;
        d: any;
        f: any;
        g: any;
        h: any;
        i: any;
        j: any;
        k: any;
        l: any;
        renderTemplate(e: any): {
            label: any;
            labelCustomHover: any;
            name: any;
            description: any;
            countContainer: any;
            count: P;
            toolBar: {
                I: any;
                J: any;
                L: any;
                M: any;
                N: any;
                O: any;
                H: any;
                setActions(l: any, n: any[] | undefined, e: any): void;
                w: any[];
                y: boolean;
                C: any;
                onDidChangeDropdownVisibility: any;
                D: any;
                f: {
                    orientation: number;
                };
                t: any;
                z: HTMLDivElement;
                m: any;
                u: import("../../../../base/browser/ui/dropdown/dropdownActionViewItem").$g0;
                actionRunner: any;
                context: any;
                getElement(): HTMLDivElement;
                focus(): void;
                getItemsWidth(): number;
                getItemAction(e: any): any;
                getItemWidth(e: any): any;
                getItemsLength(): any;
                setAriaLabel(e: any): void;
                isEmpty(): any;
                F(e: any): any;
                G(): void;
                dispose(): void;
                q: M;
                B(t: any): any;
            };
            elementDisposables: M;
            templateDisposable: any;
        };
        renderElement(e: any, s: any, o: any): void;
        renderCompressedElements(): void;
        disposeElement(e: any, s: any, o: any): void;
        disposeTemplate(e: any): void;
    };
    TEMPLATE_ID: string | undefined;
};
import { $cm as S } from "../../../../base/common/actions.js";
import { $$9 as P } from "../../../../base/browser/ui/countBadge/countBadge.js";
import { $ud as M } from "../../../../base/common/lifecycle.js";
export { po as $Uoc, v as $Voc };
//# sourceMappingURL=scmRepositoryRenderer.d.ts.map