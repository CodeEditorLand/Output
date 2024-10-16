export declare const EMPTY_LINE_TOKENS: ArrayBufferLike;
export declare class ContiguousTokensEditing {
	static deleteBeginning(
		lineTokens: Uint32Array | ArrayBuffer | null,
		toChIndex: number,
	): Uint32Array | ArrayBuffer | null;
	static deleteEnding(
		lineTokens: Uint32Array | ArrayBuffer | null,
		fromChIndex: number,
	): Uint32Array | ArrayBuffer | null;
	static delete(
		lineTokens: Uint32Array | ArrayBuffer | null,
		fromChIndex: number,
		toChIndex: number,
	): Uint32Array | ArrayBuffer | null;
	static append(
		lineTokens: Uint32Array | ArrayBuffer | null,
		_otherTokens: Uint32Array | ArrayBuffer | null,
	): Uint32Array | ArrayBuffer | null;
	static insert(
		lineTokens: Uint32Array | ArrayBuffer | null,
		chIndex: number,
		textLength: number,
	): Uint32Array | ArrayBuffer | null;
}
export declare function toUint32Array(
	arr: Uint32Array | ArrayBuffer,
): Uint32Array;
