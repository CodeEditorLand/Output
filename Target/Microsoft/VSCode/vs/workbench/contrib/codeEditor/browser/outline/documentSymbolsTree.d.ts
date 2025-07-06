declare let x: {
    new (e: any, o: any, t: any, s: any): {
        c: any;
        d: any;
        e: any;
        templateId: string | undefined;
        renderTemplate(e: any): y;
        renderElement(e: any, o: any, t: any): void;
        f(e: any, o: any): void;
        disposeTemplate(e: any): void;
    };
};
declare let C: {
    new (e: any, o: any): {
        c: any;
        d: any;
        filter(e: any): any;
    };
    kindToConfigName: Readonly<{
        0: "showFiles";
        1: "showModules";
        2: "showNamespaces";
        3: "showPackages";
        4: "showClasses";
        5: "showMethods";
        6: "showProperties";
        7: "showFields";
        8: "showConstructors";
        9: "showEnums";
        10: "showInterfaces";
        11: "showFunctions";
        12: "showVariables";
        13: "showConstants";
        14: "showStrings";
        15: "showNumbers";
        16: "showBooleans";
        17: "showArrays";
        18: "showObjects";
        19: "showKeys";
        20: "showNull";
        21: "showEnumMembers";
        22: "showStructs";
        23: "showEvents";
        24: "showOperators";
        25: "showTypeParameters";
    }> | undefined;
};
declare class ye {
    c: import("../../../../../base/common/lazy.js").$wf;
    compareByPosition(e: any, o: any): any;
    compareByType(e: any, o: any): any;
    compareByName(e: any, o: any): any;
}
declare class ae {
    getKeyboardNavigationLabel(e: any): any;
}
declare class me {
    constructor(e: any);
    c: any;
    getWidgetAriaLabel(): any;
    getAriaLabel(e: any): any;
}
declare class ue {
    getId(e: any): any;
}
declare let w: {
    new (e: any): {
        c: any;
        getDragURI(e: any): any;
        getDragLabel(e: any, o: any): any;
        onDragStart(e: any, o: any): void;
        onDragOver(): boolean;
        drop(): void;
        dispose(): void;
    };
};
declare class de {
    getHeight(e: any): number;
    getTemplateId(e: any): string | undefined;
}
declare class he {
    templateId: string | undefined;
    renderTemplate(e: any): b;
    renderElement(e: any, o: any, t: any): void;
    disposeTemplate(e: any): void;
}
declare class y {
    constructor(e: any, o: any, t: any, s: any);
    container: any;
    iconLabel: any;
    iconClass: any;
    decoration: any;
}
declare class b {
    constructor(e: any, o: any);
    labelContainer: any;
    label: any;
    dispose(): void;
}
export { x as $Axc, C as $Bxc, ye as $Cxc, ae as $uxc, me as $vxc, ue as $wxc, w as $xxc, de as $yxc, he as $zxc };
//# sourceMappingURL=documentSymbolsTree.d.ts.map