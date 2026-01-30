export class RPCProtocol extends Disposable {
    constructor(protocol: any, logger?: null, transformer?: null);
    _onDidChangeResponsiveState: any;
    onDidChangeResponsiveState: any;
    _protocol: any;
    _logger: any;
    _uriTransformer: any;
    _uriReplacer: ((key: any, value: any) => any) | null;
    _isDisposed: boolean;
    _locals: null[];
    _proxies: null[];
    _lastMessageId: number;
    _cancelInvokedHandlers: any;
    _pendingRPCReplies: {};
    _responsiveState: number;
    _unacknowledgedCount: number;
    _unresponsiveTime: number;
    _asyncCheckUresponsive: any;
    drain(): any;
    _onWillSendRequest(req: any): void;
    _onDidReceiveAcknowledge(req: any): void;
    _checkUnresponsive(): void;
    _setResponsiveState(newResponsiveState: any): void;
    get responsiveState(): number;
    transformIncomingURIs(obj: any): any;
    getProxy(identifier: any): null | undefined;
    _createProxy(rpcId: any, debugName: any): any;
    set(identifier: any, value: any): any;
    assertRegistered(identifiers: any): void;
    _receiveOneMessage(rawmsg: any): void;
    _receiveRequest(msgLength: any, req: any, rpcId: any, method: any, args: any, usesCancellationToken: any): void;
    _receiveCancel(msgLength: any, req: any): void;
    _receiveReply(msgLength: any, req: any, value: any): void;
    _receiveReplyErr(msgLength: any, req: any, value: any): void;
    _invokeHandler(rpcId: any, methodName: any, args: any): Promise<any>;
    _doInvokeHandler(rpcId: any, methodName: any, args: any): any;
    _remoteCall(rpcId: any, methodName: any, args: any): Promise<never> | LazyPromise;
}
export var RequestInitiator: any;
export var ResponsiveState: any;
export function parseJsonAndRestoreBufferRefs(jsonString: any, buffers: any, uriTransformer: any): any;
export function stringifyJsonWithBufferRefs(obj: any, replacer?: null, useSafeStringify?: boolean): {
    jsonString: string;
    referencedBuffers: any[];
};
import { Disposable } from "../../../../base/common/lifecycle.js";
import { LazyPromise } from "./lazyPromise.js";
//# sourceMappingURL=rpcProtocol.d.ts.map