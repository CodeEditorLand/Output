declare class Pt {
    getKeyboardNavigationLabel(t: any): any;
}
declare class d {
    constructor(t: any, e: any);
    parent: any;
    category: any;
    isChecked(): boolean;
    setChecked(t: any): void;
}
declare class l {
    constructor(t: any, e: any);
    parent: any;
    edit: any;
    isChecked(): boolean;
    setChecked(t: any): void;
    isDisabled(): boolean;
}
declare class g {
    constructor(t: any, e: any, i: any, s: any, r: any, c: any, o: any);
    parent: any;
    idx: any;
    edit: any;
    prefix: any;
    selecting: any;
    inserting: any;
    suffix: any;
    isChecked(): any;
    setChecked(t: any): void;
    isDisabled(): any;
}
declare let R: {
    new (t: any, e: any): {
        c: any;
        d: any;
        groupByFile: boolean;
        hasChildren(t: any): boolean;
        getChildren(t: any): Promise<any>;
    };
};
declare class bt {
    compare(t: any, e: any): number;
}
declare function Y(n: any, t: any): 0 | 1 | -1;
declare let D: {
    new (t: any): {
        c: any;
        getWidgetAriaLabel(): any;
        getRole(t: any): string;
        getAriaLabel(t: any): any;
    };
};
declare class mt {
    getId(t: any): any;
}
declare let N: {
    new (t: any): {
        c: any;
        templateId: any;
        renderTemplate(t: any): G;
        renderElement(t: any, e: any, i: any): void;
        disposeTemplate(t: any): void;
    };
    id: string | undefined;
};
declare let w: {
    new (t: any, e: any): {
        c: any;
        d: any;
        templateId: any;
        renderTemplate(t: any): {
            i: any;
            c: b;
            d: b;
            f: HTMLInputElement;
            g: any;
            h: HTMLSpanElement;
            dispose(): void;
            set(t: any, e: any): void;
        };
        renderElement(t: any, e: any, i: any): void;
        disposeTemplate(t: any): void;
    };
    id: string | undefined;
};
declare let I: {
    new (t: any): {
        c: any;
        templateId: any;
        renderTemplate(t: any): {
            i: any;
            c: b;
            d: b;
            f: HTMLInputElement;
            g: HTMLDivElement;
            h: any;
            dispose(): void;
            set(t: any): void;
        };
        renderElement({ element: t }: {
            element: any;
        }, e: any, i: any): void;
        disposeTemplate(t: any): void;
    };
    id: string | undefined;
};
declare class Nt {
    getHeight(): number;
    getTemplateId(t: any): string | undefined;
}
declare class G {
    constructor(t: any);
    icon: HTMLDivElement;
    label: K;
}
import { $ud as b } from "../../../../../base/common/lifecycle.js";
import { $o0 as K } from "../../../../../base/browser/ui/iconLabel/iconLabel.js";
export { Pt as $Aoc, d as $ooc, l as $poc, g as $qoc, R as $roc, bt as $soc, Y as $toc, D as $uoc, mt as $voc, N as $woc, w as $xoc, I as $yoc, Nt as $zoc };
//# sourceMappingURL=bulkEditTree.d.ts.map