export let Selection: {
    new (anchorLineOrAnchor: any, anchorColumnOrActive: any, activeLine: any, activeColumn: any): {
        get anchor(): Position;
        get active(): Position;
        _anchor: Position;
        _active: Position;
        get isReversed(): boolean;
        toJSON(): {
            start: Position;
            end: Position;
            active: Position;
            anchor: Position;
        };
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
    };
    isSelection(thing: any): boolean;
    isRange(thing: any): boolean;
    of(obj: any): any;
};
export function getDebugDescriptionOfSelection(selection: any): string;
import { Position } from "./position.js";
//# sourceMappingURL=selection.d.ts.map