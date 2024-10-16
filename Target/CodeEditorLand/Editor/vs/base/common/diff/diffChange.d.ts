/**
 * Represents information about a specific difference between two sequences.
 */
export declare class DiffChange {
	/**
	 * The position of the first element in the original sequence which
	 * this change affects.
	 */
	originalStart: number;
	/**
	 * The number of elements from the original sequence which were
	 * affected.
	 */
	originalLength: number;
	/**
	 * The position of the first element in the modified sequence which
	 * this change affects.
	 */
	modifiedStart: number;
	/**
	 * The number of elements from the modified sequence which were
	 * affected (added).
	 */
	modifiedLength: number;
	/**
	 * Constructs a new DiffChange with the given sequence information
	 * and content.
	 */
	constructor(
		originalStart: number,
		originalLength: number,
		modifiedStart: number,
		modifiedLength: number,
	);
	/**
	 * The end point (exclusive) of the change in the original sequence.
	 */
	getOriginalEnd(): number;
	/**
	 * The end point (exclusive) of the change in the modified sequence.
	 */
	getModifiedEnd(): number;
}
