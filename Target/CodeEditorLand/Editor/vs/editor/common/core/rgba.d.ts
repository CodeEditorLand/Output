/**
 * A very VM friendly rgba datastructure.
 * Please don't touch unless you take a look at the IR.
 */
export declare class RGBA8 {
	_rgba8Brand: void;
	static readonly Empty: RGBA8;
	/**
	 * Red: integer in [0-255]
	 */
	readonly r: number;
	/**
	 * Green: integer in [0-255]
	 */
	readonly g: number;
	/**
	 * Blue: integer in [0-255]
	 */
	readonly b: number;
	/**
	 * Alpha: integer in [0-255]
	 */
	readonly a: number;
	constructor(r: number, g: number, b: number, a: number);
	equals(other: RGBA8): boolean;
	static _clamp(c: number): number;
}
