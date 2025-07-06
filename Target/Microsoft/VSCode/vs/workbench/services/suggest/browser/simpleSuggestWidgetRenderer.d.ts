declare function Q(l: any): string;
declare let F: {
    new (t: any, o: any, e: any, s: any, i: any): {
        c: any;
        d: any;
        e: any;
        f: any;
        g: any;
        a: H;
        onDidToggleDetails: any;
        b: $;
        templateId: string;
        dispose(): void;
        renderTemplate(t: any): {
            root: any;
            left: any;
            right: any;
            icon: any;
            colorspan: any;
            iconLabel: k;
            iconContainer: any;
            parametersLabel: any;
            qualifierLabel: any;
            detailsLabel: any;
            disposables: $;
        };
        renderElement(t: any, o: any, e: any): void;
        disposeTemplate(t: any): void;
    };
};
import { $ef as H } from "../../../../base/common/event.js";
import { $ud as $ } from "../../../../base/common/lifecycle.js";
import { $o0 as k } from "../../../../base/browser/ui/iconLabel/iconLabel.js";
export { Q as $juc, F as $kuc };
//# sourceMappingURL=simpleSuggestWidgetRenderer.d.ts.map