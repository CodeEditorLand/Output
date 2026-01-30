export class BufferReader {
    constructor(buffer: any);
    buffer: any;
    pos: number;
    read(bytes: any): any;
}
export class BufferWriter {
    buffers: any[];
    get buffer(): VSBuffer;
    write(buffer: any): void;
}
export class ChannelClient {
    constructor(protocol: any, logger?: null);
    protocol: any;
    isDisposed: boolean;
    state: any;
    activeRequests: Set<any>;
    handlers: Map<any, any>;
    lastRequestId: number;
    _onDidInitialize: Emitter;
    onDidInitialize: any;
    protocolListener: any;
    logger: any;
    getChannel(channelName: any): {
        call(command: any, arg: any, cancellationToken: any): Promise<any>;
        listen(event: any, arg: any): any;
    };
    requestPromise(channelName: any, name: any, arg: any, cancellationToken?: any): Promise<any>;
    requestEvent(channelName: any, name: any, arg: any): any;
    sendRequest(request: any): void;
    send(header: any, body?: undefined): any;
    sendBuffer(message: any): any;
    onBuffer(message: any): void;
    onResponse(response: any): void;
    get onDidInitializePromise(): any;
    whenInitialized(): any;
    dispose(): void;
}
export class ChannelServer {
    constructor(protocol: any, ctx: any, logger?: null, timeoutDelay?: number);
    protocol: any;
    ctx: any;
    logger: any;
    timeoutDelay: number;
    channels: Map<any, any>;
    activeRequests: Map<any, any>;
    pendingRequests: Map<any, any>;
    protocolListener: any;
    registerChannel(channelName: any, channel: any): void;
    sendResponse(response: any): void;
    send(header: any, body?: undefined): any;
    sendBuffer(message: any): any;
    onRawMessage(message: any): void;
    onPromise(request: any): void;
    onEventListen(request: any): void;
    disposeActiveRequest(request: any): void;
    collectPendingRequest(request: any): void;
    flushPendingRequests(channelName: any): void;
    dispose(): void;
}
export class IPCClient {
    constructor(protocol: any, ctx: any, ipcLogger?: null);
    channelClient: ChannelClient;
    channelServer: ChannelServer;
    getChannel(channelName: any): {
        call(command: any, arg: any, cancellationToken: any): Promise<any>;
        listen(event: any, arg: any): any;
    };
    registerChannel(channelName: any, channel: any): void;
    dispose(): void;
}
export class IPCLogger {
    constructor(_outgoingPrefix: any, _incomingPrefix: any);
    _outgoingPrefix: any;
    _incomingPrefix: any;
    _totalIncoming: number;
    _totalOutgoing: number;
    logOutgoing(msgLength: any, requestId: any, initiator: any, str: any, data: any): void;
    logIncoming(msgLength: any, requestId: any, initiator: any, str: any, data: any): void;
}
export class IPCServer {
    constructor(onDidClientConnect: any, ipcLogger: any, timeoutDelay: any);
    get connections(): any[];
    channels: Map<any, any>;
    _connections: Set<any>;
    _onDidAddConnection: Emitter;
    onDidAddConnection: any;
    _onDidRemoveConnection: Emitter;
    onDidRemoveConnection: any;
    disposables: DisposableStore;
    getChannel(channelName: any, routerOrClientFilter: any): {
        call(command: any, arg: any, cancellationToken: any): any;
        listen(event: any, arg: any): any;
    };
    getMulticastEvent(channelName: any, clientFilter: any, eventName: any, arg: any): any;
    registerChannel(channelName: any, channel: any): void;
    dispose(): void;
}
export var ProxyChannel: any;
export var RequestInitiator: any;
export class StaticRouter {
    constructor(fn: any);
    fn: any;
    routeCall(hub: any): any;
    routeEvent(hub: any): any;
    route(hub: any): any;
}
export function deserialize(reader: any): any;
export function getDelayedChannel(promise: any): {
    call(command: any, arg: any, cancellationToken: any): any;
    listen(event: any, arg: any): any;
};
export function getNextTickChannel(channel: any): {
    call(command: any, arg: any, cancellationToken: any): any;
    listen(event: any, arg: any): any;
};
export function serialize(writer: any, data: any): void;
import { VSBuffer } from "../../../common/buffer.js";
import { Emitter } from "../../../common/event.js";
import { DisposableStore } from "../../../common/lifecycle.js";
//# sourceMappingURL=ipc.d.ts.map