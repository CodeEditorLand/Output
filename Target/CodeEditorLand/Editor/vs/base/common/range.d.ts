export interface IRange {
	start: number;
	end: number;
}
export interface IRangedGroup {
	range: IRange;
	size: number;
}
export declare namespace Range {
	/**
	 * Returns the intersection between two ranges as a range itself.
	 * Returns `{ start: 0, end: 0 }` if the intersection is empty.
	 */
	function intersect(one: IRange, other: IRange): IRange;
	function isEmpty(range: IRange): boolean;
	function intersects(one: IRange, other: IRange): boolean;
	function relativeComplement(one: IRange, other: IRange): IRange[];
}
