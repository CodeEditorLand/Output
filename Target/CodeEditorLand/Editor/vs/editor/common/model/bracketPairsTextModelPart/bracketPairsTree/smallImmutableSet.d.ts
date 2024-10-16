/**
 * Represents an immutable set that works best for a small number of elements (less than 32).
 * It uses bits to encode element membership efficiently.
 */
export declare class SmallImmutableSet<T> {
	private readonly items;
	private readonly additionalItems;
	private static cache;
	private static create;
	private static empty;
	static getEmpty<T>(): SmallImmutableSet<T>;
	private constructor();
	add(value: T, keyProvider: IDenseKeyProvider<T>): SmallImmutableSet<T>;
	has(value: T, keyProvider: IDenseKeyProvider<T>): boolean;
	merge(other: SmallImmutableSet<T>): SmallImmutableSet<T>;
	intersects(other: SmallImmutableSet<T>): boolean;
	equals(other: SmallImmutableSet<T>): boolean;
}
export interface IDenseKeyProvider<T> {
	getKey(value: T): number;
}
export declare const identityKeyProvider: IDenseKeyProvider<number>;
/**
 * Assigns values a unique incrementing key.
 */
export declare class DenseKeyProvider<T> {
	private readonly items;
	getKey(value: T): number;
	reverseLookup(value: number): T | undefined;
	reverseLookupSet(set: SmallImmutableSet<T>): T[];
	keys(): IterableIterator<T>;
}
