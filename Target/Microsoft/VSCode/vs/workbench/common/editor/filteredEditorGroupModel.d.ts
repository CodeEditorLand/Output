declare class h extends n {
    get count(): any;
    isSticky(t: any): boolean;
    getEditorByIndex(t: any): any;
    indexOf(t: any, i: any, e: any): any;
    contains(t: any, i: any): boolean;
    c(t: any): any;
}
declare class b extends n {
    get count(): number;
    get stickyCount(): number;
    isSticky(t: any): boolean;
    getEditorByIndex(t: any): any;
    indexOf(t: any, i: any, e: any): number;
    contains(t: any, i: any): boolean;
    c(t: any): boolean;
}
declare class n extends o {
    constructor(t: any);
    b: any;
    a: any;
    onDidModelChange: any;
    get id(): any;
    get isLocked(): any;
    get stickyCount(): any;
    get activeEditor(): any;
    get previewEditor(): any;
    get selectedEditors(): any;
    isPinned(t: any): any;
    isTransient(t: any): any;
    isSticky(t: any): any;
    isActive(t: any): any;
    isSelected(t: any): any;
    isFirst(t: any): any;
    isLast(t: any): any;
    getEditors(t: any, i: any): any;
    findEditor(t: any, i: any): any;
}
import { $vd as o } from "../../../base/common/lifecycle.js";
export { h as $ALb, b as $BLb };
//# sourceMappingURL=filteredEditorGroupModel.d.ts.map