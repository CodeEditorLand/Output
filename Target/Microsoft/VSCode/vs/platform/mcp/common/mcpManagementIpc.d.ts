declare class w {
    constructor(t: any, r: any);
    a: any;
    b: any;
    onInstallMcpServer: any;
    onDidInstallMcpServers: any;
    onDidUpdateMcpServers: any;
    onUninstallMcpServer: any;
    onDidUninstallMcpServer: any;
    listen(t: any, r: any): any;
    call(t: any, r: any, e: any): Promise<any>;
}
declare class b extends M {
    constructor(t: any);
    get onInstallMcpServer(): any;
    get onDidInstallMcpServers(): any;
    get onUninstallMcpServer(): any;
    get onDidUninstallMcpServer(): any;
    get onDidUpdateMcpServers(): any;
    h: any;
    a: any;
    b: any;
    c: any;
    f: any;
    g: any;
    install(t: any, r: any): Promise<any>;
    installFromGallery(t: any, r: any): Promise<any>;
    uninstall(t: any, r: any): Promise<any>;
    getInstalled(t: any): Promise<any>;
    updateMetadata(t: any, r: any, e: any): Promise<any>;
}
import { $vd as M } from "../../../base/common/lifecycle.js";
export { w as $OW, b as $PW };
//# sourceMappingURL=mcpManagementIpc.d.ts.map