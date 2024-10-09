/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { timeout } from '../../../base/common/async.js';
import { CancellationTokenSource } from '../../../base/common/cancellation.js';
import { Emitter } from '../../../base/common/event.js';
import { Disposable, dispose, toDisposable } from '../../../base/common/lifecycle.js';
import { ILogService } from '../../log/common/log.js';
/**
 * A helper class to track requests that have replies. Using this it's easy to implement an event
 * that accepts a reply.
 */
let RequestStore = class RequestStore extends Disposable {
    /**
     * @param timeout How long in ms to allow requests to go unanswered for, undefined will use the
     * default (15 seconds).
     */
    constructor(timeout, _logService) {
        super();
        this._logService = _logService;
        this._lastRequestId = 0;
        this._pendingRequests = new Map();
        this._pendingRequestDisposables = new Map();
        this._onCreateRequest = this._register(new Emitter());
        this.onCreateRequest = this._onCreateRequest.event;
        this._timeout = timeout === undefined ? 15000 : timeout;
        this._register(toDisposable(() => {
            for (const d of this._pendingRequestDisposables.values()) {
                dispose(d);
            }
        }));
    }
    /**
     * Creates a request.
     * @param args The arguments to pass to the onCreateRequest event.
     */
    createRequest(args) {
        return new Promise((resolve, reject) => {
            const requestId = ++this._lastRequestId;
            this._pendingRequests.set(requestId, resolve);
            this._onCreateRequest.fire({ requestId, ...args });
            const tokenSource = new CancellationTokenSource();
            timeout(this._timeout, tokenSource.token).then(() => reject(`Request ${requestId} timed out (${this._timeout}ms)`));
            this._pendingRequestDisposables.set(requestId, [toDisposable(() => tokenSource.cancel())]);
        });
    }
    /**
     * Accept a reply to a request.
     * @param requestId The request ID originating from the onCreateRequest event.
     * @param data The reply data.
     */
    acceptReply(requestId, data) {
        const resolveRequest = this._pendingRequests.get(requestId);
        if (resolveRequest) {
            this._pendingRequests.delete(requestId);
            dispose(this._pendingRequestDisposables.get(requestId) || []);
            this._pendingRequestDisposables.delete(requestId);
            resolveRequest(data);
        }
        else {
            this._logService.warn(`RequestStore#acceptReply was called without receiving a matching request ${requestId}`);
        }
    }
};
RequestStore = __decorate([
    __param(1, ILogService),
    __metadata("design:paramtypes", [Object, Object])
], RequestStore);
export { RequestStore };
