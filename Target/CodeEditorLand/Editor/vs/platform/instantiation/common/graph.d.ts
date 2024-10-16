export declare class Node<T> {
	readonly key: string;
	readonly data: T;
	readonly incoming: Map<string, Node<T>>;
	readonly outgoing: Map<string, Node<T>>;
	constructor(key: string, data: T);
}
export declare class Graph<T> {
	private readonly _hashFn;
	private readonly _nodes;
	constructor(_hashFn: (element: T) => string);
	roots(): Node<T>[];
	insertEdge(from: T, to: T): void;
	removeNode(data: T): void;
	lookupOrInsertNode(data: T): Node<T>;
	lookup(data: T): Node<T> | undefined;
	isEmpty(): boolean;
	toString(): string;
	/**
	 * This is brute force and slow and **only** be used
	 * to trouble shoot.
	 */
	findCycleSlow(): string | undefined;
	private _findCycle;
}
