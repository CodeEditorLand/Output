export declare const enum Direction {
	Left = 0,
	Right = 1,
	Nearest = 2,
}
export declare class AtomicTabMoveOperations {
	/**
	 * Get the visible column at the position. If we get to a non-whitespace character first
	 * or past the end of string then return -1.
	 *
	 * **Note** `position` and the return value are 0-based.
	 */
	static whitespaceVisibleColumn(
		lineContent: string,
		position: number,
		tabSize: number,
	): [number, number, number];
	/**
	 * Return the position that should result from a move left, right or to the
	 * nearest tab, if atomic tabs are enabled. Left and right are used for the
	 * arrow key movements, nearest is used for mouse selection. It returns
	 * -1 if atomic tabs are not relevant and you should fall back to normal
	 * behaviour.
	 *
	 * **Note**: `position` and the return value are 0-based.
	 */
	static atomicPosition(
		lineContent: string,
		position: number,
		tabSize: number,
		direction: Direction,
	): number;
}
