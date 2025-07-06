declare function W(e: any, t: any): void;
declare function B(e: any, t: any): any;
declare const M: Readonly<{
    identifier: m;
    name: "Null Extension Description";
    version: "0.0.0";
    publisher: "vscode";
    engines: {
        vscode: string;
    };
    extensionLocation: {
        _formatted: string | null;
        _fsPath: any;
        readonly fsPath: any;
        toString(e?: boolean): string;
        toJSON(): {
            $mid: number;
        };
        scheme: any;
        authority: any;
        path: any;
        query: any;
        fragment: any;
        with(e: any): /*elided*/ any;
    };
    isBuiltin: false;
    targetPlatform: "undefined";
    isUserBuiltin: false;
    isUnderDevelopment: false;
    preRelease: false;
}>;
declare const _: "extensions.webWorker";
declare const j: any;
declare class z {
    constructor(t: any);
    dependency: any;
}
declare class D {
    constructor(t: any, n: any, r: any);
    get versionId(): any;
    get allExtensions(): any;
    get myExtensions(): any;
    c: any;
    d: any;
    e: any;
    f: Set<any> | null;
    toSnapshot(): {
        versionId: any;
        allExtensions: any;
        myExtensions: any;
        activationEvents: any;
    };
    set(t: any, n: any, r: any): {
        versionId: any;
        toRemove: any[];
        toAdd: any[];
        addActivationEvents: any;
        myToRemove: any[];
        myToAdd: any[];
    };
    delta(t: any): any;
    containsExtension(t: any): boolean;
    containsActivationEvent(t: any): boolean;
    g(): Set<any>;
}
declare class k {
    constructor(t: any, n: any, r: any, a: any);
    codeLoadingTime: any;
    activateCallTime: any;
    activateResolvedTime: any;
    activationReason: any;
}
declare class q {
    constructor(t: any, n: any);
    description: any;
    value: any;
}
declare function V(e: any): {
    type: number;
    isBuiltin: any;
    identifier: {
        id: any;
        uuid: any;
    };
    manifest: any;
    location: any;
    targetPlatform: any;
    validations: never[];
    isValid: boolean;
    preRelease: any;
    publisherDisplayName: any;
};
declare function F(e: any, t: any): any;
declare class G {
    onDidRegisterExtensions: any;
    onDidChangeExtensionsStatus: any;
    onDidChangeExtensions: any;
    onWillActivateByEvent: any;
    onDidChangeResponsiveChange: any;
    onWillStop: any;
    extensions: any[];
    activateByEvent(t: any): Promise<undefined>;
    activateById(t: any, n: any): Promise<undefined>;
    activationEventIsDone(t: any): boolean;
    whenInstalledExtensionsRegistered(): Promise<boolean>;
    getExtension(): Promise<undefined>;
    readExtensionPointContributions(t: any): Promise<any>;
    getExtensionsStatus(): any;
    getInspectPorts(t: any, n: any): Promise<never[]>;
    stopExtensionHosts(): Promise<boolean>;
    startExtensionHosts(): Promise<void>;
    setRemoteEnvironment(t: any): Promise<void>;
    canAddExtension(): boolean;
    canRemoveExtension(): boolean;
}
declare var x: any;
declare var E: any;
import { $Sy as m } from "../../../../platform/extensions/common/extensions.js";
export { W as $$O, B as $0O, M as $5O, _ as $6O, j as $7O, z as $8O, D as $9O, k as $_O, q as $aP, V as $bP, F as $cP, G as $dP, x as ActivationKind, E as ExtensionHostStartup };
//# sourceMappingURL=extensions.d.ts.map