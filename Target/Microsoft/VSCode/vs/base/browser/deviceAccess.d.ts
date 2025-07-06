declare function i(o: any): Promise<{
    deviceClass: any;
    deviceProtocol: any;
    deviceSubclass: any;
    deviceVersionMajor: any;
    deviceVersionMinor: any;
    deviceVersionSubminor: any;
    manufacturerName: any;
    productId: any;
    productName: any;
    serialNumber: any;
    usbVersionMajor: any;
    usbVersionMinor: any;
    usbVersionSubminor: any;
    vendorId: any;
} | undefined>;
declare function d(o: any): Promise<{
    usbVendorId: any;
    usbProductId: any;
} | undefined>;
declare function s(o: any): Promise<{
    opened: any;
    vendorId: any;
    productId: any;
    productName: any;
    collections: any;
} | undefined>;
export { i as $o9, d as $p9, s as $q9 };
//# sourceMappingURL=deviceAccess.d.ts.map