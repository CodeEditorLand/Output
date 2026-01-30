export var CancellationToken: any;
export class CancellationTokenPool {
    _source: CancellationTokenSource;
    _listeners: DisposableStore;
    _total: number;
    _cancelled: number;
    _isDone: boolean;
    get token(): any;
    /**
     * Add a token to the pool. If the token is already cancelled it is counted
     * immediately. Tokens added after the pool token has been cancelled are ignored.
     */
    add(token: any): void;
    _check(): void;
    dispose(): void;
}
export class CancellationTokenSource {
    constructor(parent: any);
    _parentListener: any;
    get token(): any;
    _token: any;
    cancel(): void;
    dispose(cancel?: boolean): void;
}
export function cancelOnDispose(store: any): any;
import { DisposableStore } from "./lifecycle.js";
//# sourceMappingURL=cancellation.d.ts.map