export const DefaultURITransformer: {
    transformIncoming(uri: any): any;
    transformOutgoing(uri: any): any;
    transformOutgoingURI(uri: any): any;
    transformOutgoingScheme(scheme: any): any;
};
export class URITransformer {
    constructor(uriTransformer: any);
    _uriTransformer: any;
    transformIncoming(uri: any): any;
    transformOutgoing(uri: any): any;
    transformOutgoingURI(uri: any): any;
    transformOutgoingScheme(scheme: any): any;
}
export function transformAndReviveIncomingURIs(obj: any, transformer: any): any;
export function transformIncomingURIs(obj: any, transformer: any): any;
export function transformOutgoingURIs(obj: any, transformer: any): any;
//# sourceMappingURL=uriIpc.d.ts.map