import { Event } from '../../../base/common/event.js';
import { Disposable } from '../../../base/common/lifecycle.js';
import { IPCServer, IServerChannel } from '../../../base/parts/ipc/common/ipc.js';
import { IMcpGatewayService } from '../common/mcpGateway.js';
/**
 * IPC channel for the MCP Gateway service in the electron-main process.
 *
 * This channel tracks which client (identified by ctx) creates gateways,
 * enabling cleanup when a client disconnects (e.g., window crash).
 */
export declare class McpGatewayMainChannel extends Disposable implements IServerChannel<string> {
    private readonly mcpGatewayService;
    constructor(ipcServer: IPCServer, mcpGatewayService: IMcpGatewayService);
    listen<T>(_ctx: string, _event: string): Event<T>;
    call<T>(ctx: string, command: string, args?: unknown): Promise<T>;
}
