export declare class KeyMod {
	static readonly CtrlCmd: number;
	static readonly Shift: number;
	static readonly Alt: number;
	static readonly WinCtrl: number;
	static chord(firstPart: number, secondPart: number): number;
}
export declare function createMonacoBaseAPI(): typeof monaco;
