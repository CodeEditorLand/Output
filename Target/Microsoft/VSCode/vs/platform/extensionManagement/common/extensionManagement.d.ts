declare const N: "skipPublisherTrust";
declare const S: "skipWalkthrough";
declare const x: "^([a-z0-9A-Z][a-z0-9-A-Z]*)\\.([a-z0-9A-Z][a-z0-9-A-Z]*)$";
declare const R: RegExp;
declare const D: "__web_extension";
declare const P: "extensionInstallSource";
declare const F: "dependecyOrPackExtensionInstall";
declare const Z: "clientTargetPlatform";
declare function T(e: any): "Web" | "Mac" | "unknown" | "undefined" | "Windows 64 bit" | "Windows ARM" | "Linux 64 bit" | "Linux ARM 64" | "Linux ARM" | "Alpine Linux 64 bit" | "Alpine ARM 64" | "Mac Silicon" | "universal" | undefined;
declare function W(e: any): "unknown" | "universal" | "win32-x64" | "win32-arm64" | "linux-x64" | "linux-arm64" | "linux-armhf" | "alpine-x64" | "alpine-arm64" | "darwin-x64" | "darwin-arm64" | "web";
declare function L(e: any, n: any): "unknown" | "win32-x64" | "win32-arm64" | "linux-x64" | "linux-arm64" | "linux-armhf" | "alpine-x64" | "alpine-arm64" | "darwin-x64" | "darwin-arm64" | "web" | undefined;
declare function A(e: any, n: any): boolean;
declare function j(e: any, n: any, a: any): boolean;
declare function _(e: any): any;
declare const H: any;
declare class q extends Error {
    constructor(n: any, a: any);
    code: any;
    name: any;
}
declare class G extends Error {
    constructor(n: any, a: any);
    code: any;
    name: any;
}
declare const Y: any;
declare const J: "extensionsIdentifiers/disabled";
declare const K: "extensionsIdentifiers/enabled";
declare const Q: any;
declare const X: any;
declare const M: any;
declare function z(e: any, n: any): Promise<any>;
declare const O: {
    value: any;
    original: any;
};
declare const B: {
    value: any;
    original: any;
};
declare const $: "extensions.allowed";
declare const V: "extensions.verifySignature";
declare function C(e: any, n: any): boolean;
declare var I: any;
declare var s: any;
declare var f: any;
declare var w: any;
declare var p: any;
declare var o: any;
declare var u: any;
declare var c: any;
declare var d: any;
export { N as $$y, S as $0y, x as $7y, R as $8y, D as $9y, P as $_y, F as $az, Z as $bz, T as $cz, W as $dz, L as $ez, A as $fz, j as $gz, _ as $hz, H as $iz, q as $jz, G as $kz, Y as $lz, J as $mz, K as $nz, Q as $oz, X as $pz, M as $qz, z as $rz, O as $sz, B as $tz, $ as $uz, V as $vz, C as $wz, I as ExtensionGalleryErrorCode, s as ExtensionInstallSource, f as ExtensionManagementErrorCode, w as ExtensionSignatureVerificationCode, p as FilterType, o as InstallOperation, u as SortBy, c as SortOrder, d as StatisticType };
//# sourceMappingURL=extensionManagement.d.ts.map