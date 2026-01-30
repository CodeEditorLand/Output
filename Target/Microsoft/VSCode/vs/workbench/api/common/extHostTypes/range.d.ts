export let Range: {
    new (startLineOrStart: any, startColumnOrEnd: any, endLine: any, endColumn: any): {
        get start(): Position;
        get end(): Position;
        _start: Position;
        _end: Position;
        contains(positionOrRange: any): any;
        isEqual(other: any): boolean;
        intersection(other: any): any;
        union(other: any): any;
        get isEmpty(): boolean;
        get isSingleLine(): boolean;
        with(startOrChange: any, end?: Position): any;
        toJSON(): Position[];
    };
    isRange(thing: any): boolean;
    of(obj: any): any;
};
export function getDebugDescriptionOfRange(range: any): string;
import { Position } from "./position.js";
//# sourceMappingURL=range.d.ts.map