export interface INavigator<T> {
	current(): T | null;
	previous(): T | null;
	first(): T | null;
	last(): T | null;
	next(): T | null;
}
export declare class ArrayNavigator<T> implements INavigator<T> {
	private readonly items;
	protected start: number;
	protected end: number;
	protected index: number;
	constructor(
		items: readonly T[],
		start?: number,
		end?: number,
		index?: number,
	);
	current(): T | null;
	next(): T | null;
	previous(): T | null;
	first(): T | null;
	last(): T | null;
}
