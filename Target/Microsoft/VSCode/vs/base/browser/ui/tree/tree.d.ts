declare namespace u {
    function acceptBubbleUp(): {
        accept: boolean;
        bubble: number;
    };
    function acceptBubbleDown(p?: boolean): {
        accept: boolean;
        bubble: number;
        autoExpand: boolean;
    };
    function acceptCopyBubbleUp(): {
        accept: boolean;
        bubble: number;
        effect: {
            type: number;
            position: string;
        };
    };
    function acceptCopyBubbleDown(p?: boolean): {
        accept: boolean;
        bubble: number;
        effect: {
            type: number;
            position: string;
        };
        autoExpand: boolean;
    };
}
declare class s extends Error {
    constructor(r: any, n: any);
}
declare class x {
    constructor(r: any);
    a: any;
    b: WeakMap<WeakKey, any>;
    map(r: any): any;
}
declare var o: any;
declare var t: any;
declare var d: any;
declare var c: any;
export { u as $O0, s as $P0, x as $Q0, o as ObjectTreeElementCollapseState, t as TreeDragOverBubble, d as TreeMouseEventTarget, c as TreeVisibility };
//# sourceMappingURL=tree.d.ts.map