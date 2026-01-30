export class AbstractIdleValue {
    constructor(targetWindow: any, executor: any);
    _didRun: boolean;
    _executor: () => void;
    _value: any;
    _error: unknown;
    _handle: any;
    dispose(): void;
    get value(): any;
    get isInitialized(): boolean;
}
export class AsyncIterableObject {
    static fromArray(items: any): AsyncIterableObject;
    static fromPromise(promise: any): AsyncIterableObject;
    static fromPromisesResolveOrder(promises: any): AsyncIterableObject;
    static merge(iterables: any): AsyncIterableObject;
    static map(iterable: any, mapFn: any): AsyncIterableObject;
    static filter(iterable: any, filterFn: any): AsyncIterableObject;
    static coalesce(iterable: any): AsyncIterableObject;
    static toPromise(iterable: any): Promise<any[]>;
    constructor(executor: any, onReturn: any);
    _state: number;
    _results: any[];
    _error: any;
    _onReturn: any;
    _onStateChanged: Emitter;
    map(mapFn: any): AsyncIterableObject;
    filter(filterFn: any): AsyncIterableObject;
    coalesce(): AsyncIterableObject;
    toPromise(): Promise<any[]>;
    /**
     * The value will be appended at the end.
     *
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */
    emitOne(value: any): void;
    /**
     * The values will be appended at the end.
     *
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */
    emitMany(values: any): void;
    /**
     * Calling `resolve()` will mark the result array as complete.
     *
     * **NOTE** `resolve()` must be called, otherwise all consumers of this iterable will hang indefinitely, similar to a non-resolved promise.
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */
    resolve(): void;
    /**
     * Writing an error will permanently invalidate this iterable.
     * The current users will receive an error thrown, as will all future users.
     *
     * **NOTE** If `resolve()` or `reject()` have already been called, this method has no effect.
     */
    reject(error: any): void;
    [Symbol.asyncIterator](): {
        next: any;
        return: any;
    };
}
export class AsyncIterableProducer {
    static fromArray(items: any): AsyncIterableProducer;
    static fromPromise(promise: any): AsyncIterableProducer;
    static fromPromisesResolveOrder(promises: any): AsyncIterableProducer;
    static merge(iterables: any): AsyncIterableProducer;
    static map(iterable: any, mapFn: any): AsyncIterableProducer;
    static tee(iterable: any): AsyncIterableProducer[];
    static coalesce(iterable: any): AsyncIterableProducer;
    static filter(iterable: any, filterFn: any): AsyncIterableProducer;
    constructor(executor: any, _onReturn: any);
    _onReturn: any;
    _producerConsumer: ProducerConsumer;
    _iterator: {
        next: any;
        return: any;
        throw: any;
    };
    map(mapFn: any): AsyncIterableProducer;
    coalesce(): AsyncIterableProducer;
    filter(filterFn: any): AsyncIterableProducer;
    _finishOk(): void;
    _finishError(error: any): void;
    [Symbol.asyncIterator](): {
        next: any;
        return: any;
        throw: any;
    };
}
export class AsyncIterableSource {
    /**
     *
     * @param onReturn A function that will be called when consuming the async iterable
     * has finished by the consumer, e.g the for-await-loop has be existed (break, return) early.
     * This is NOT called when resolving this source by its owner.
     */
    constructor(onReturn: any);
    _deferred: DeferredPromise;
    _asyncIterable: AsyncIterableObject;
    _errorFn: (error: any) => void;
    _emitOneFn: (item: any) => void;
    _emitManyFn: (items: any) => void;
    get asyncIterable(): AsyncIterableObject;
    resolve(): void;
    reject(error: any): void;
    emitOne(item: any): void;
    emitMany(items: any): void;
}
export class AsyncReader {
    constructor(_source: any);
    get endOfStream(): boolean;
    _source: any;
    _buffer: any[];
    _atEnd: boolean;
    read(): Promise<any>;
    readWhile(predicate: any, callback: any): Promise<void>;
    readBufferedOrThrow(): any;
    consumeToEnd(): Promise<void>;
    peek(): Promise<any>;
    peekBufferedOrThrow(): any;
    peekTimeout(timeoutMs: any): Promise<any>;
    _extendBuffer(): any;
    _extendBufferPromise: any;
}
export const AsyncReaderEndOfStream: unique symbol;
export class AutoOpenBarrier extends Barrier {
    constructor(autoOpenTimeMs: any);
    _timeout: TimeoutHandle;
}
export class Barrier {
    _isOpen: boolean;
    _promise: Promise<any>;
    _completePromise: (value: any) => void;
    isOpen(): boolean;
    open(): void;
    wait(): Promise<any>;
}
export class CancelableAsyncIterableProducer extends AsyncIterableProducer {
    _source: any;
    cancel(): void;
}
export class DeferredPromise {
    static fromPromise(promise: any): DeferredPromise;
    get isRejected(): boolean;
    get isResolved(): boolean;
    get isSettled(): boolean;
    get value(): any;
    p: Promise<any>;
    completeCallback: (value: any) => void;
    errorCallback: (reason?: any) => void;
    complete(value: any): Promise<any>;
    outcome: {
        outcome: number;
        value: any;
    } | {
        outcome: number;
        value: any;
    } | undefined;
    error(err: any): Promise<any>;
    settleWith(promise: any): any;
    cancel(): Promise<any>;
}
export class Delayer {
    constructor(defaultDelay: any);
    defaultDelay: any;
    deferred: any;
    completionPromise: any;
    doResolve: ((value: any) => void) | null;
    doReject: ((reason?: any) => void) | null;
    task: any;
    trigger(task: any, delay?: any): any;
    isTriggered(): boolean;
    cancel(): void;
    cancelTimeout(): void;
    dispose(): void;
}
export class GlobalIdleValue extends AbstractIdleValue {
    constructor(executor: any);
}
export class IntervalCounter {
    constructor(interval: any, nowFn?: () => number);
    interval: any;
    nowFn: () => number;
    lastIncrementTime: number;
    value: number;
    increment(): number;
}
export class IntervalTimer {
    isDisposed: boolean;
    cancel(): void;
    cancelAndSet(runner: any, interval: any, context?: typeof globalThis): void;
    disposable: any;
    dispose(): void;
}
export class LazyStatefulPromise {
    constructor(_compute: any);
    _compute: any;
    _promise: Lazy;
    /**
     * Returns the resolved value.
     * Throws if the promise is not resolved yet.
     */
    requireValue(): any;
    /**
     * Returns the promise (and triggers a computation of the promise if not yet done so).
     */
    getPromise(): any;
    /**
     * Reads the current value without triggering a computation of the promise.
     */
    get currentValue(): any;
}
export class LimitedQueue {
    sequentializer: TaskSequentializer;
    tasks: number;
    queue(factory: any): any;
}
export class Limiter {
    constructor(maxDegreeOfParalellism: any);
    _size: number;
    _isDisposed: boolean;
    maxDegreeOfParalellism: any;
    outstandingPromises: any[];
    runningPromises: number;
    _onDrained: Emitter;
    /**
     *
     * @returns A promise that resolved when all work is done (onDrained) or when
     * there is nothing to do
     */
    whenIdle(): any;
    get onDrained(): any;
    get size(): number;
    queue(factory: any): Promise<any>;
    consume(): void;
    consumed(): void;
    clear(): void;
    dispose(): void;
}
export class ProcessTimeRunOnceScheduler {
    constructor(runner: any, delay: any);
    runner: any;
    timeout: any;
    counter: number;
    intervalHandler: () => void;
    dispose(): void;
    cancel(): void;
    /**
     * Cancel previous runner (if any) & schedule a new runner.
     */
    schedule(delay?: any): void;
    intervalToken: TimeoutHandle | undefined;
    /**
     * Returns true if scheduled.
     */
    isScheduled(): boolean;
    onInterval(): void;
}
export var Promises: any;
export class Queue extends Limiter {
    constructor();
}
export class ResourceQueue {
    queues: Map<any, any>;
    drainers: Set<any>;
    drainListenerCount: number;
    whenDrained(): Promise<any>;
    isDrained(): boolean;
    queueSize(resource: any, extUri?: import("./resources.js").ExtUri): any;
    queueFor(resource: any, factory: any, extUri?: import("./resources.js").ExtUri): any;
    drainListeners: DisposableMap | undefined;
    onDidQueueDrain(): void;
    releaseDrainers(): void;
    dispose(): void;
}
export class RunOnceScheduler {
    constructor(runner: any, delay: any);
    runner: any;
    timeout: any;
    timeoutHandler: () => void;
    /**
     * Dispose RunOnceScheduler
     */
    dispose(): void;
    /**
     * Cancel current scheduled runner (if any).
     */
    cancel(): void;
    /**
     * Cancel previous runner (if any) & schedule a new runner.
     */
    schedule(delay?: any): void;
    timeoutToken: TimeoutHandle | undefined;
    set delay(value: any);
    get delay(): any;
    /**
     * Returns true if scheduled.
     */
    isScheduled(): boolean;
    flush(): void;
    onTimeout(): void;
    doRun(): void;
}
export class RunOnceWorker extends RunOnceScheduler {
    units: any[];
    work(unit: any): void;
}
export class Sequencer {
    current: Promise<null>;
    queue(promiseTask: any): Promise<any>;
}
export class SequencerByKey {
    promiseMap: Map<any, any>;
    queue(key: any, promiseTask: any): any;
    peek(key: any): any;
    keys(): MapIterator<any>;
}
export class StatefulPromise {
    constructor(promise: any);
    get value(): any;
    get error(): any;
    get isResolved(): boolean;
    _isResolved: boolean;
    promise: any;
    _value: any;
    _error: any;
    /**
     * Returns the resolved value.
     * Throws if the promise is not resolved yet.
     */
    requireValue(): any;
}
export class TaskQueue {
    _pendingTasks: any[];
    /**
     * Waits for the current and pending tasks to finish, then runs and awaits the given task.
     * If the task is skipped because of clearPending, the promise is rejected with a CancellationError.
    */
    schedule(task: any): Promise<any>;
    /**
     * Waits for the current and pending tasks to finish, then runs and awaits the given task.
     * If the task is skipped because of clearPending, the promise is resolved with undefined.
    */
    scheduleSkipIfCleared(task: any): Promise<any>;
    _runIfNotRunning(): void;
    _processQueue(): Promise<void>;
    _runningTask: any;
    /**
     * Clears all pending tasks. Does not cancel the currently running task.
    */
    clearPending(): void;
}
export class TaskSequentializer {
    isRunning(taskId: any): boolean;
    get running(): any;
    cancelRunning(): void;
    run(taskId: any, promise: any, onCancel: any): any;
    _running: {
        taskId: any;
        cancel: any;
        promise: any;
    } | undefined;
    doneRunning(taskId: any): void;
    runQueued(): void;
    /**
     * Note: the promise to schedule as next run MUST itself call `run`.
     *       Otherwise, this sequentializer will report `false` for `isRunning`
     *       even when this task is running. Missing this detail means that
     *       suddenly multiple tasks will run in parallel.
     */
    queue(run: any): Promise<any>;
    _queued: {
        run: any;
        promise: Promise<any>;
        promiseResolve: undefined;
        promiseReject: undefined;
    } | undefined;
    hasQueued(): boolean;
    join(): Promise<any>;
}
export class ThrottledDelayer {
    constructor(defaultDelay: any);
    delayer: Delayer;
    throttler: Throttler;
    trigger(promiseFactory: any, delay: any): any;
    isTriggered(): boolean;
    cancel(): void;
    dispose(): void;
}
export class ThrottledWorker extends Disposable {
    constructor(options: any, handler: any);
    options: any;
    handler: any;
    pendingWork: any[];
    throttler: any;
    disposed: boolean;
    lastExecutionTime: number;
    /**
     * The number of work units that are pending to be processed.
     */
    get pending(): number;
    /**
     * Add units to be worked on. Use `pending` to figure out
     * how many units are not yet processed after this method
     * was called.
     *
     * @returns whether the work was accepted or not. If the
     * worker is disposed, it will not accept any more work.
     * If the number of pending units would become larger
     * than `maxPendingWork`, more work will also not be accepted.
     */
    work(units: any): boolean;
    doWork(): void;
    scheduleThrottler(delay?: any): void;
}
export class Throttler {
    activePromise: any;
    queuedPromise: Promise<any> | null;
    queuedPromiseFactory: any;
    cancellationTokenSource: CancellationTokenSource;
    queue(promiseFactory: any): Promise<any>;
    dispose(): void;
}
export class TimeoutTimer {
    constructor(runner: any, timeout2: any);
    _isDisposed: boolean;
    dispose(): void;
    cancel(): void;
    cancelAndSet(runner: any, timeout2: any): void;
    _token: any;
    setIfNotSet(runner: any, timeout2: any): void;
}
export let _runWhenIdle: any;
export function asPromise(callback: any): Promise<any>;
export function cancellableIterable(iterableOrIterator: any, token: any): {
    next(): Promise<any>;
    throw: any;
    return: any;
    [Symbol.asyncIterator](): /*elided*/ any;
};
export function createCancelableAsyncIterableProducer(callback: any): CancelableAsyncIterableProducer;
export function createCancelablePromise(callback: any): {
    cancel(): void;
    then(resolve: any, reject: any): Promise<any>;
    catch(reject: any): Promise<any>;
    finally(onfinally: any): Promise<any>;
};
export function disposableTimeout(handler: any, timeout2: number | undefined, store: any): {
    _isDisposed: boolean;
    _fn: any;
    dispose(): void;
};
export function first(promiseFactories: any, shouldStop?: (t: any) => boolean, defaultValue?: null): any;
export function firstParallel(promiseList: any, shouldStop?: (t: any) => boolean, defaultValue?: null): Promise<any>;
export function isThenable(obj: any): boolean;
export function notCancellablePromise(promise: any): Promise<any>;
export function promiseWithResolvers(): {
    promise: Promise<any>;
    resolve: undefined;
    reject: undefined;
};
export function raceCancellablePromises(cancellablePromises: any): Promise<any>;
export function raceCancellation(promise: any, token: any, defaultValue: any): Promise<any>;
export function raceCancellationError(promise: any, token: any): Promise<any>;
export function raceTimeout(promise: any, timeout2: any, onTimeout: any): Promise<any>;
export function retry(task: any, delay: any, retries: any): Promise<any>;
export let runWhenGlobalIdle: any;
export function sequence(promiseFactories: any): Promise<any>;
export function timeout(millis: any, token: any): Promise<any> | {
    cancel(): void;
    then(resolve: any, reject: any): Promise<any>;
    catch(reject: any): Promise<any>;
    finally(onfinally: any): Promise<any>;
};
import { Emitter } from "./event.js";
declare class ProducerConsumer {
    _unsatisfiedConsumers: any[];
    _unconsumedValues: any[];
    get hasFinalValue(): boolean;
    produce(value: any): void;
    produceFinal(value: any): void;
    _finalValue: any;
    _ensureNoFinalValue(): void;
    _resolveOrRejectDeferred(deferred: any, value: any): void;
    consume(): Promise<any>;
}
import { Lazy } from "./lazy.js";
import { DisposableMap } from "./lifecycle.js";
import { Disposable } from "./lifecycle.js";
import { CancellationTokenSource } from "./cancellation.js";
export {};
//# sourceMappingURL=async.d.ts.map