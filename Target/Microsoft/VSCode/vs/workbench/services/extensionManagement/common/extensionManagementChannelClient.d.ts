export { L as $eCc };
declare class L extends f {
    constructor(t: any, i: any, e: any, s: any, r: any);
    get onProfileAwareDidInstallExtensions(): any;
    get onProfileAwareDidUninstallExtension(): any;
    get onProfileAwareDidUpdateExtensionMetadata(): any;
    M: any;
    N: any;
    H: any;
    onDidChangeProfile: any;
    I: any;
    J: any;
    L: any;
    w(t: any): Promise<void>;
    y(t: any): Promise<void>;
    z(t: any): Promise<void>;
    C(t: any): Promise<void>;
    D(t: any): Promise<void>;
    toggleApplicationScope(t: any, i: any): Promise<any>;
    copyExtensions(t: any, i: any): Promise<any>;
    W(t: any): Promise<void>;
    X(t: any, i: any, e: any): Promise<{
        removed: any[];
        added: any[];
    }>;
    Y(t: any): Promise<any>;
}
import { $N3 as f } from "../../../../platform/extensionManagement/common/extensionManagementIpc.js";
//# sourceMappingURL=extensionManagementChannelClient.d.ts.map