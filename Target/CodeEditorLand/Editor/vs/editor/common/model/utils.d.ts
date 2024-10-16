/**
 * Returns:
 *  - -1 => the line consists of whitespace
 *  - otherwise => the indent level is returned value
 */
export declare function computeIndentLevel(
	line: string,
	tabSize: number,
): number;
