export class AsyncEmitter extends Emitter {
    fireAsync(data: any, token: any, promiseJoin: any): Promise<void>;
    _asyncDeliveryQueue: LinkedList | undefined;
}
export class DebounceEmitter extends PauseableEmitter {
    _delay: any;
    _handle: any;
}
export class DynamicListEventMultiplexer {
    constructor(items: any, onAddItem: any, onRemoveItem: any, getEvent: any);
    _store: DisposableStore;
    event: any;
    dispose(): void;
}
export class Emitter {
    constructor(options: any);
    _size: number;
    _options: any;
    _leakageMon: LeakageMonitor | undefined;
    _perfMon: EventProfiling | undefined;
    _deliveryQueue: any;
    dispose(): void;
    _disposed: boolean | undefined;
    /**
     * For the public to allow to subscribe
     * to events from this Emitter
     */
    get event(): any;
    _listeners: any;
    _removeListener(listener: any): void;
    _deliver(listener: any, value: any): void;
    /** Delivers items in the queue. Assumes the queue is ready to go. */
    _deliverQueue(dq: any): void;
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    fire(event: any): void;
    hasListeners(): boolean;
}
export var Event: any;
export class EventBufferer {
    data: any[];
    wrapEvent(event: any, reduce: any, initial: any): (listener: any, thisArgs: any, disposables: any) => any;
    bufferEvents(fn: any): any;
}
export class EventMultiplexer {
    hasListeners: boolean;
    events: any[];
    emitter: Emitter;
    get event(): any;
    add(event: any): {
        _isDisposed: boolean;
        _fn: any;
        dispose(): void;
    };
    onFirstListenerAdd(): void;
    onLastListenerRemove(): void;
    hook(e: any): void;
    unhook(e: any): void;
    dispose(): void;
}
export class EventProfiling {
    constructor(name: any);
    listenerCount: number;
    invocationCount: number;
    elapsedOverall: number;
    durations: any[];
    name: string;
    start(listenerCount: any): void;
    _stopWatch: StopWatch | undefined;
    stop(): void;
}
export class ListenerLeakError extends Error {
    constructor(message: any, stack: any);
    stack: any;
}
export class ListenerRefusalError extends Error {
    constructor(message: any, stack: any);
    stack: any;
}
export class MicrotaskEmitter extends Emitter {
    _queuedEvents: any[];
    _mergeFn: any;
}
export class PauseableEmitter extends Emitter {
    get isPaused(): boolean;
    _isPaused: number;
    _eventQueue: LinkedList;
    _mergeFn: any;
    pause(): void;
    resume(): void;
}
export class Relay {
    listening: boolean;
    inputEvent: any;
    inputEventListener: Readonly<{
        dispose(): void;
    }> | undefined;
    emitter: Emitter;
    event: any;
    set input(event: any);
    dispose(): void;
}
export class ValueWithChangeEvent {
    static const(value: any): ConstValueWithChangeEvent;
    constructor(_value: any);
    _value: any;
    _onDidChange: Emitter;
    onDidChange: any;
    set value(value: any);
    get value(): any;
}
export const createEventDeliveryQueue: any;
export function setGlobalLeakWarningThreshold(n: any): {
    dispose(): void;
};
export function trackSetChanges(getData: any, onDidChangeData: any, handleItem: any): DisposableStore;
import { LinkedList } from "./linkedList.js";
import { DisposableStore } from "./lifecycle.js";
declare class LeakageMonitor {
    constructor(_errorHandler: any, threshold: any, name?: string);
    _errorHandler: any;
    threshold: any;
    name: string;
    _warnCountdown: number;
    dispose(): void;
    check(stack: any, listenerCount: any): (() => void) | undefined;
    _stacks: Map<any, any> | undefined;
    getMostFrequentStack(): any[] | undefined;
}
import { StopWatch } from "./stopwatch.js";
declare class ConstValueWithChangeEvent {
    constructor(value: any);
    value: any;
    onDidChange: any;
}
export {};
//# sourceMappingURL=event.d.ts.map