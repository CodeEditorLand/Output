export declare const enum StringEOL {
	Unknown = 0,
	Invalid = 3,
	LF = 1,
	CRLF = 2,
}
export declare function countEOL(
	text: string,
): [number, number, number, StringEOL];
