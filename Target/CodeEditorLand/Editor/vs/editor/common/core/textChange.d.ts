export declare class TextChange {
	readonly oldPosition: number;
	readonly oldText: string;
	readonly newPosition: number;
	readonly newText: string;
	get oldLength(): number;
	get oldEnd(): number;
	get newLength(): number;
	get newEnd(): number;
	constructor(
		oldPosition: number,
		oldText: string,
		newPosition: number,
		newText: string,
	);
	toString(): string;
	private static _writeStringSize;
	private static _writeString;
	private static _readString;
	writeSize(): number;
	write(b: Uint8Array, offset: number): number;
	static read(b: Uint8Array, offset: number, dest: TextChange[]): number;
}
export declare function compressConsecutiveTextChanges(
	prevEdits: TextChange[] | null,
	currEdits: TextChange[],
): TextChange[];
