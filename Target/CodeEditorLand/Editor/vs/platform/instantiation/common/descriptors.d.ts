export declare class SyncDescriptor<T> {
	readonly ctor: any;
	readonly staticArguments: any[];
	readonly supportsDelayedInstantiation: boolean;
	constructor(
		ctor: new (...args: any[]) => T,
		staticArguments?: any[],
		supportsDelayedInstantiation?: boolean,
	);
}
export interface SyncDescriptor0<T> {
	readonly ctor: new () => T;
}
