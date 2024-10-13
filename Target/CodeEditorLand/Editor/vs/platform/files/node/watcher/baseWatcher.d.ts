import { Emitter, Event } from "../../../../base/common/event.js";
import { Disposable } from "../../../../base/common/lifecycle.js";
import { IFileChange } from "../../common/files.js";
import {
	ILogMessage,
	IRecursiveWatcherWithSubscribe,
	IUniversalWatchRequest,
	IWatcher,
	IWatcherErrorEvent,
	IWatchRequestWithCorrelation,
} from "../../common/watcher.js";

interface ISuspendedWatchRequest {
	readonly id: number;
	readonly correlationId: number | undefined;
	readonly path: string;
}
export declare abstract class BaseWatcher
	extends Disposable
	implements IWatcher
{
	protected readonly _onDidChangeFile: Emitter<IFileChange[]>;
	readonly onDidChangeFile: Event<IFileChange[]>;
	protected readonly _onDidLogMessage: Emitter<ILogMessage>;
	readonly onDidLogMessage: Event<ILogMessage>;
	protected readonly _onDidWatchFail: Emitter<IUniversalWatchRequest>;
	private readonly onDidWatchFail;
	private readonly correlatedWatchRequests;
	private readonly nonCorrelatedWatchRequests;
	private readonly suspendedWatchRequests;
	private readonly suspendedWatchRequestsWithPolling;
	private readonly updateWatchersDelayer;
	protected readonly suspendedWatchRequestPollingInterval: number;
	private joinWatch;
	constructor();
	protected isCorrelated(
		request: IUniversalWatchRequest,
	): request is IWatchRequestWithCorrelation;
	private computeId;
	watch(requests: IUniversalWatchRequest[]): Promise<void>;
	private updateWatchers;
	protected getUpdateWatchersDelay(): number;
	isSuspended(request: IUniversalWatchRequest): "polling" | boolean;
	private suspendWatchRequest;
	private resumeWatchRequest;
	private monitorSuspendedWatchRequest;
	private doMonitorWithExistingWatcher;
	private doMonitorWithNodeJS;
	private onMonitoredPathAdded;
	private isPathNotFound;
	stop(): Promise<void>;
	protected traceEvent(
		event: IFileChange,
		request: IUniversalWatchRequest | ISuspendedWatchRequest,
	): void;
	protected traceWithCorrelation(
		message: string,
		request: IUniversalWatchRequest | ISuspendedWatchRequest,
	): void;
	protected requestToString(request: IUniversalWatchRequest): string;
	protected abstract doWatch(
		requests: IUniversalWatchRequest[],
	): Promise<void>;
	protected abstract readonly recursiveWatcher:
		| IRecursiveWatcherWithSubscribe
		| undefined;
	protected abstract trace(message: string): void;
	protected abstract warn(message: string): void;
	abstract onDidError: Event<IWatcherErrorEvent>;
	protected verboseLogging: boolean;
	setVerboseLogging(enabled: boolean): Promise<void>;
}
export {};
